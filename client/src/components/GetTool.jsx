import React from 'react'
import Arrow from './tools/Arrow'
import Diamond from './tools/Diamond'
import Ellipse from './tools/Ellipse'
import Eraser from './tools/Eraser'
import AddImage from './tools/AddImage'
import Line from './tools/Line'
import Pencil from './tools/Pencil'
import Rectangle from './tools/Rectangle'
import Text from './tools/Text'
import Panning from './tools/Panning'
import Selector from './tools/Selector'
import useToolStore from '../stores/toolStore'


export default function GetTool({canvasRef, contextRef}) {
  
  const selectedTool = useToolStore((state) => state.tool)

  const toolsArray = [
        {
          element:<Panning/>,
          name:"panning"
        }, 
       {
         element: <Selector/>,
         name:"selector", 
        },
        {
          element: <Rectangle/>,
          name:"rectangle",
        }, 
        {
         element:  <Diamond/>,
         name:"diamond",
        }, 
        {
         element: <Ellipse/>,
         name:"ellipse",
        },

        {
          element:<Arrow/>,
          name:"arrow",
        },   
        {
         element: <Line/>,
         name:"line",
        },
        {
         element:<Pencil />,
         name:"pencil",
        },
        {
         element:<AddImage/>,
         name:"image",
        },

        {
          element:<Text/>,
          name:"text",
        },
        {
         element:<Eraser />,
         name:"eraser"
        }
  ]
  
  

  return (
    <>
     {React.cloneElement(toolsArray.find((tool) => tool.name === selectedTool).element, {canvasRef, contextRef})}
    </>
  )
}
