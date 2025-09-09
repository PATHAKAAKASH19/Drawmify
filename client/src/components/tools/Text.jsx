import { useRef,  useEffect,  useState } from 'react'
import getMousePos from '../../utils/getMousePos.utils'
import useShapeStore from "../../stores/shapeStore";
import usePanningStore from '../../stores/panningStore';
import renderAllShapes from '../../utils/renderAllShapes.utils';


export default function Text({canvasRef, contextRef}) {
  
  const [text, setText] = useState("")
  const [pos, setPos] = useState(null)
  const inputRef = useRef(null)


  const addShapes = useShapeStore((state) => state.addShapes)
  const shapesData = useShapeStore((state) => state.shapesData)
  const  offset  = usePanningStore((state) =>  state.offset)

  const handleTextComplete = (context, canvas) =>{

      if(!context) return
      
      context.font = "normal 25px sans-serif";
     
      context.textBaseline = "top";
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.save();
      context.translate(offset?.x, offset?.y); 
      renderAllShapes(context, shapesData)
      context.restore();
      context.fillText(text, pos?.x, pos?.y+8)
      if(text && pos && offset){
        
        const initialPos = {
          x : pos?.x - offset?.x,
          y : pos?.y - offset?.y+8
        }
        
      addShapes({shapeName:"text", initialPos, text})
      }else if (text && pos) {
          const initialPos = {
          x : pos?.x,
          y : pos?.y+8
        }
        addShapes({shapeName:"text", initialPos, text})
      }

      
 }


 useEffect(() =>{
    
    const canvas = canvasRef.current
    const context = contextRef.current

    if(!canvas || ! context) return

      const handleText = (e) => {
     
      const mousePos = getMousePos(canvas, e)
      setPos(mousePos)
      setText("")
    }
     
     canvas.addEventListener("click" , handleText)
     return () => {
      canvas.removeEventListener("click", handleText)
     
    }
  }, [canvasRef,text, contextRef,offset,pos, addShapes])



   useEffect(() => {
    if (pos && inputRef.current) {
      inputRef.current.focus()
      
}
  }, [pos])
  return (
    <>
    {( pos !== null)&& 
    <textarea 
    ref={inputRef}
    type='text' 
    value={text} 
    onChange={(e) => {setText(e.target.value)}} 
    onBlur={() => handleTextComplete(contextRef.current, canvasRef.current)}
    className={`fixed text-2xl p-0 m-0 w-full h-32 border-none rounded-lg 
         outline-none appearance-none text-black-800 font-sans`} 
    style={{
      top: `${pos?.y}px`,  
      left: `${pos?.x}px`,
    }}/>
    }
  </>
  )
}
