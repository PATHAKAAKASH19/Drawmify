import React, { useEffect, useState } from 'react'
import { 
  Pencil, Eraser, MoveRight, Circle,  Minus, 
   Diamond,  Image, MousePointer, LockKeyhole, 
    LockKeyholeOpen,  Hand,  Square,  Keyboard
  } from 'lucide-react';
import useToolStore from '../stores/toolStore';

 
export default function SelectTool() {

  const [selectedTool, setSelectedTool] = useState("")
  const [lock, setLock] = useState(false)
  const changeTool = useToolStore((state) => state.changeTool)
  const tool = useToolStore((state) => state.tool )
  
  const handleToolSelection = (name)=>{
        setSelectedTool(name)
        changeTool(name)
  }   


  useEffect(() => {
     
    setSelectedTool(tool)
  }, [tool])
   
  const toolsIconArray = [
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
         name:"ellipse",
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
    <div className="absolute flex gap-2 bottom-10 border px-5 py-1 rounded-2xl bg-white items-center cursor-pointer">
      <div className={`px-2.5 py-2.5 rounded-xl hover:cursor-pointer ${lock?`bg-blue-300`:"hover:bg-blue-100"}`}>
        { lock ?<LockKeyhole onClick={() => setLock(false)}  className="size-5"/>:<LockKeyholeOpen onClick={() => setLock(true)}  className="size-5"/>}
      </div>
      {
        toolsIconArray.map((tool, i) => {
          return (
            <div key={i} title={tool.name} className={`px-2.5 py-2.5 rounded-xl hover:cursor-pointer ${selectedTool===tool.name ? `bg-blue-300`:"hover:bg-blue-100"}`} onClick={() => handleToolSelection(tool.name)}>
             {React.cloneElement(tool.element, {className:"size-4" }) }
            </div>
          )
        })
       }
    </div>
  )
}
