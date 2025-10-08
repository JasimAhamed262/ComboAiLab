import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
import React, {useContext, useState, useEffect} from 'react'
import AiMultiModels from './AiMultiModels'
import { AiSelectedModelContext } from '@/context/AiSelectedModelContext'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/config/FireBaseConfig'
import { useUser } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'


function ChatinputBox() {
  const [userInput, setUserInput] = useState('')
  const {aiSelectedModels, setAiSelectedModels, messages, setMessages} = useContext(AiSelectedModelContext)
  const {user}=useUser()
  const [chatId,setChatId] =useState()
  const params = useSearchParams()

  useEffect(()=>{
    const chatId_= params.get('chatId')
    if(chatId_){
      setChatId(chatId_)
      GetMessages(chatId_)
    }
    else{
      setMessages([])
      setChatId(uuidv4())
    }
},[params])

 
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
      if(messages){
        SaveMessages()
      }

  }, [messages])

   const SaveMessages=async()=>{
       const docRef=doc(db,'chatHistory',chatId)

       await setDoc(docRef,{
        chatId:chatId,
        userEmail:user?.primaryEmailAddress?.emailAddress,
        messages:messages,
        lastUpdated: Date.now()
       })
   }

  const GetMessages = async (chatId) => {
  const docRef = doc(db, 'chatHistory', chatId);
  const docSnap = await getDoc(docRef);
  console.log(docSnap.data());
  const docData = docSnap.data();
  setMessages(docData.messages);
}
      
  



  return (
    <div className='relative min-h-[80vh] mt-[60px]'>
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

          <div className='mt-3 flex justify-end items-center'>
            <Button size={'icon'} onClick={handleSend}>
              <Send/>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatinputBox