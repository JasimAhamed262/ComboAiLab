"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function Home() {


  const {setTheme} = useTheme();

  return (
    <div>
      <h1>nanthanda leo</h1>
      <Button>Hey</Button>
      <Button onClick={()=>setTheme('dark')}>Dark Mode</Button>
      <Button onClick={()=>setTheme('light')}>Light Mode</Button>

    </div>
  );
}
