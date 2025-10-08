"use client"
import { Suspense } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import ChatinputBox from "./_components/ChatinputBox";

export default function Home() {
  const {setTheme} = useTheme();

  return (
    <div> 
      <Suspense fallback={<div>Loading...</div>}>
        <ChatinputBox/>
      </Suspense>
    </div>
  )
}
