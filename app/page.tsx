"use client"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

import { FaMicrophoneSlash } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";

import { MdDownload } from "react-icons/md";



export default function Home() {

  const [micOn,setMicOn] = useState(false);
  const [notes,setNotes] = useState<String>("something");

  const toggleMic =()=>{
    setMicOn(prev=>!prev);

    // const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    // recognition.lang = 'en-US';
    // recognition.start();

  }

  return (
    <div className="w-full flex justify-center gap-2 items-center p-5 ">
      <div className="w-full flex justify-center items-center px-3 h-[90vh] flex-col gap-2 rounded-lg bg-[#1b1b1b]">
    {/* <h1 className="text-3xl font-semibold">Smart Notes</h1> */}
    <Button onClick={()=>toggleMic()} className="flex gap-2 w-full">
      {micOn ? <FaMicrophoneSlash size={45}/> :<FaMicrophone size={45}/>}
      Speak</Button>
    <Textarea className="rounded-md border-none bg-[#141414]" placeholder="type your notes here..." rows={20}/>
    </div>
    <div className="w-full h-[90vh] bg-[#1b1b1b] p-3 rounded-lg flex flex-col gap-2" id="notesDisplay ">
      <div className="w-full flex items-center justify-center p-3 font-bold text-[20px]">Your Notes</div>
      <div className="w-full flex-1 bg-[#141414] p-3">{notes}</div>
      <Button className="flex gap-2 justify-center items-center"><MdDownload size={45}/> Download Notes</Button>
    </div>
</div>

  );
}
