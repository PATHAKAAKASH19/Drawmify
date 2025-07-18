import { useRef,  useEffect,  useState } from 'react'
import getMousePos from '../../utils/getMousePos'
import useShapeStore from "../../stores/shapeStore";





export default function Text({canvasRef, contextRef}) {
  
  const [text, setText] = useState("")
  const [initialPos, setInitialPos] = useState(null)
  const inputRef = useRef(null)


  const addShapes = useShapeStore((state) => state.addShapes)


  

 const handleTextComplete = (context) =>{

      if(!context) return
      context.textBaseline = "middle";
      context.font = "26px sans-serif";
      context.fillText(text, initialPos?.x, initialPos?.y )
      if(text){
      addShapes({shapeName:"text", initialPos, text})
      }

              

 }

  useEffect(() =>{
    
    const canvas = canvasRef.current
   const context = contextRef.current

    if(!canvas || ! context) return

  
     const handleText = (e) => {
      const mousePos = getMousePos(canvas, e)
      setInitialPos(mousePos)
      setText("")

      console.log(initialPos)
     
     
    }
     
     
     
     canvas.addEventListener("click" , handleText)
     return () => {
      canvas.removeEventListener("click", handleText)
     
    }
  }, [canvasRef,text, contextRef,initialPos, addShapes])



   useEffect(() => {
    if (initialPos && inputRef.current) {
      inputRef.current.focus()
      
}
  }, [initialPos])
  return (
    <>
    {( initialPos !== null)&& 
    <input 
    ref={inputRef}
    type='text' 
    value={text} 
    onChange={(e) => {setText(e.target.value)}} 
    onBlur={() => handleTextComplete(contextRef.current)}
    className={`absolute text-2xl px-4 font-sans`} 
    style={{
      top: `${initialPos?.y}px`,  
      left: `${initialPos?.x}px`,
 
      border:`0px`,
      outline:"none",
      
    }}/>
    }
  </>
  )
}
