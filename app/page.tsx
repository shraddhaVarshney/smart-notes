"use client"
import { Button } from "@/components/ui/button";
import 'regenerator-runtime/runtime'
import { FaMicrophoneLines } from "react-icons/fa6";
import { FaMicrophoneLinesSlash } from "react-icons/fa6";
import { LuDownload } from "react-icons/lu";

import SpeechRecognition,{useSpeechRecognition} from "react-speech-recognition"
import { useState } from "react";
import { FaFilePdf } from "react-icons/fa6";

import { jsPDF } from "jspdf";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input";


export default function Home() {
  const {transcript, browserSupportsSpeechRecognition} = useSpeechRecognition();
  const [toggleMic,setToggleMic] = useState<boolean>(false)
  const [generatingPdf,setGeneratingPdf] = useState<boolean>(false);
  const [open,setOpen] = useState<boolean>(false)

  const [fileName,setFileName] = useState<string>("smart-notes")

  const startListening = () => SpeechRecognition.startListening({ continuous: true });
  const stopListening = () => SpeechRecognition.stopListening();

  if (!browserSupportsSpeechRecognition) {
    return "not supported";
  }

const generatePdf = (fileName:string)=>{
  if(transcript && transcript !== ""){
    setGeneratingPdf(true);
    const doc = new jsPDF('p','pt','a4');
    doc.addFont('ComicSansMS', 'Comic Sans', 'normal');
    doc.setFont('ComicSansMS');
    const splitTitle = doc.splitTextToSize(transcript, 490);
    doc.text(splitTitle, 50, 50);
    doc.save(`${fileName || "smart-notes"}.pdf`);
    setGeneratingPdf(false);
  }else{
    alert("Please type something before download");
  }
  
}
  return (
    <section className="w-full flex justify-center text-black  flex-col gap-2 items-center p-5 ">
       {/* <section className="w-full flex items-center justify-center p-3 font-bold text-[20px]">Your Notes</section> */}
      <div className="min-h-[300px] max-h-[300px] overflow-y-auto max-sm:w-full rounded-md bg-white border-black sm:w-full md:w-full lg:w-[60%] shadow-lg p-3 border text-black">{transcript}</div>
      <section className="w-full flex flex-row justify-center items-center gap-2 flex-wrap">
      <Button onClick={()=>{
        setToggleMic(prev => !prev)
        startListening()
      }
      } disabled={toggleMic === true} className="flex gap-2 justify-center items-center"><FaMicrophoneLines/> Start Speech</Button>
      <Button onClick={()=>{
        setToggleMic(prev => !prev)
        stopListening()
      }
      } disabled={toggleMic === false} className="flex gap-2 justify-center items-center"><FaMicrophoneLinesSlash/> Stop Speech</Button>
      <Button disabled={transcript === ""} onClick={()=>setOpen(true)} className="flex justify-center items-center gap-2"><FaFilePdf/> Generate PDF</Button>
      {/* <a href="" id="a" onClick={CreateTextFile} className="flex gap-2 justify-center items-center">Copy to Clipboard</a> */}
      {/* <script src = "https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.0/FileSaver.min.js" integrity="sha512-csNcFYJniKjJxRWRV1R7fvnXrycHP6qDR21mgz1ZP55xY5d+aHLfo9/FcGDQLfn2IfngbAHd8LdfsagcCqgTcQ=="> </script> */}
</section>
<AlertDialog open={open}>
  {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
  <AlertDialogContent className="bg-white">
    <AlertDialogHeader>
      <AlertDialogTitle>Confirm your download your file will be download as {fileName}.pdf</AlertDialogTitle>
      <AlertDialogDescription>
        <Input className="shadow-md" onChange={(e)=>setFileName(e.target.value)} placeholder="Enter a name for file otherwise it will be prefixed by smart-notes"/>
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={()=>setOpen(false)}>Cancel</AlertDialogCancel>
      <AlertDialogAction disabled={generatingPdf === true} onClick={()=>{
        generatePdf(fileName);
        setOpen(true)
      }}><LuDownload/> Download PDF</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

</section>



  );
}




