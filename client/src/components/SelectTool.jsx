import React, { useState } from 'react'
import { 
  Pencil, Eraser, MoveRight, Circle,  Minus, 
   Diamond,  Image, MousePointer, LockKeyhole, 
    LockKeyholeOpen,  Hand,  Square,  Keyboard
  } from 'lucide-react';

 
export default function SelectTool() {

  const [selectedTool, setSelectedTool] = useState("selector")
  const [lock, setLock] = useState(false)
  
  const handleToolSelection = (name)=>{
        setSelectedTool(name)
  }   
   
  const toolsArray = [
        {
          element:<Hand />,
          name:"panning"
        }, 
       {
         element: <MousePointer />,
         name:"selector", 
        },
        {
          element:<Square/>,
          name:"rectangle",
        }, 
        {
         element:<Diamond />,
         name:"diamond",
        }, 
        {
         element:<Circle /> ,
         name:"circle",
        },

        {
          element:<MoveRight/>,
          name:"arrow",
        },   
        {
         element:<Minus/>,
         name:"line",
        },
        {
         element:<Pencil />,
         name:"pencil",
        },
        {
         element:<Image/>,
         name:"image",
        },

        {
          element:<Keyboard/>,
          name:"text",
        },
        {
         element:<Eraser />,
         name:"eraser"
        }
  ]

  return (
    <div className="absolute flex gap-2 bottom-10 border px-5 py-1 rounded-2xl bg-white items-center">
      <div className={`px-2.5 py-2.5 rounded-xl hover:cursor-pointer ${lock?`bg-blue-300`:"hover:bg-blue-100"}`}>
        { lock ?<LockKeyhole onClick={() => setLock(false)}  className="size-5"/>:<LockKeyholeOpen onClick={() => setLock(true)}  className="size-5"/>}
      </div>
      {
        toolsArray.map((tool, i) => {
          return (
            <div key={i} className={`px-2.5 py-2.5 rounded-xl hover:cursor-pointer ${selectedTool===tool.name ? `bg-blue-300`:"hover:bg-blue-100"}`} onClick={(e)=>handleToolSelection(tool.name)}>
             {React.cloneElement(tool.element, {className:"size-4"}) }
            </div>
          )
        })
       }
    </div>
  )
}
