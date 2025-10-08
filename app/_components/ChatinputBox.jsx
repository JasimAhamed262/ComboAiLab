import { Button } from '@/components/ui/button'
import { Mic, Paperclip, Send } from 'lucide-react'
import React, {useContext, useState, useEffect} from 'react'
import AiMultiModels from './AiMultiModels'
import { AiSelectedModelContext } from '@/context/AiSelectedModelContext'
import axios from 'axios'

function ChatinputBox() {
  const [userInput, setUserInput] = useState('')
  const {aiSelectedModels, setAiSelectedModels, messages, setMessages} = useContext(AiSelectedModelContext)
 
  const handleSend = async () => {
    if (!userInput.trim()) return;

    const currentInput = userInput;
    
    // Clear input immediately
    setUserInput('');

    // Add user message to all enabled models
    setMessages((prev) => {
      const updated = { ...prev };
      Object.keys(aiSelectedModels).forEach((modelKey) => {
       if(aiSelectedModels[modelKey].enable){
        updated[modelKey] = (updated[modelKey] ?? []).concat([
          { role: 'user', content: currentInput },
        ]);
      }
      });
      return updated;
    });

    // Fetch response from each enabled model
    const promises = Object.entries(aiSelectedModels).map(async ([parentModel, modelInfo]) => {
      if (!modelInfo.modelId || aiSelectedModels[parentModel].enable==false) return;

      // Add a loading placeholder before API call
      setMessages((prev) => ({
        ...prev,
        [parentModel]: [
          ...(prev[parentModel] ?? []),
          { role: 'assistant', content: "Thinking...", model: parentModel, loading: true },
        ],
      }));

      try {
        const result = await axios.post("/api/ai-multi-model", {
          model: modelInfo.modelId,
          msg: [{ role: 'user', content: currentInput }],
          parentModel,
        });

        const { aiResponse, model } = result.data;

        // Replace loading message with actual response
        setMessages((prev) => {
          const modelMessages = prev[parentModel] ?? [];
          const loadingIndex = modelMessages.findIndex(m => m.loading);

          if (loadingIndex !== -1) {
            const updated = [...modelMessages];
            updated[loadingIndex] = {
              role: "assistant",
              content: aiResponse,
              model,
              loading: false,
            };
            return { ...prev, [parentModel]: updated };
          } else {
            // Fallback: no loading message found
            return {
              ...prev,
              [parentModel]: [
                ...modelMessages,
                {
                  role: "assistant",
                  content: aiResponse,
                  model,
                  loading: false,
                }
              ]
            };
          }
        });
      } catch (err) {
        console.error(err);
        setMessages((prev) => {
          const modelMessages = prev[parentModel] ?? [];
          const loadingIndex = modelMessages.findIndex(m => m.loading);
          
          if (loadingIndex !== -1) {
            const updated = [...modelMessages];
            updated[loadingIndex] = {
              role: "assistant",
              content: "⚠️ Error fetching response.",
              model: parentModel,
              loading: false,
            };
            return { ...prev, [parentModel]: updated };
          } else {
            return {
              ...prev,
              [parentModel]: [
                ...modelMessages,
                { role: "assistant", content: "⚠️ Error fetching response.", model: parentModel, loading: false }
              ]
            };
          }
        });
      }
    });

    // Wait for all promises to complete
    await Promise.all(promises);
  };

  useEffect(() => {
    console.log(messages)
  }, [messages])

  return (
    <div className='relative min-h-screen'>
      {/* Page Content */}
      <div>
        <AiMultiModels/> 
      </div>
      {/* Fixed Chat Input */}
      <div className='fixed bottom-0 left-0 w-full flex justify-center px-4 pb-4'>
        <div className='w-full border rounded-xl shadow-md max-w-2xl p-4'>
          <input 
            type='text' 
            placeholder='Ask me anything...'
            className='border-0 outline-none w-full'
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />

          <div className='mt-3 flex justify-between items-center'>
            <Button className={''} variant={'ghost'} size={'icon'}>
              <Paperclip className='h-5 w-5'/>
            </Button>
            <div className='flex gap-5'>
              <Button variant={'ghost'} size={'icon'}><Mic/></Button>
              <Button size={'icon'} onClick={handleSend}><Send/></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatinputBox