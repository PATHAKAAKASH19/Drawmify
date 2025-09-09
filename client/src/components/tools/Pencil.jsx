import { useEffect, useState } from 'react'
import getMousePos from '../../utils/getMousePos.utils';
import useShapeStore from '../../stores/shapeStore';
import simpliyfy from "simplify-js"
import usePanningStore from '../../stores/panningStore';


export default function Pencil({canvasRef, contextRef,isActive}) {
   
  const [isDrawing, setIsDrawing] = useState(false)
  const [points, setPoints] = useState(null)
  const addShapes = useShapeStore(state =>  state.addShapes)
  const offset = usePanningStore(state =>  state.offset)
  
  
  useEffect(() => {
   
    const canvas = canvasRef.current;
    const context = contextRef.current;
 
    if (!canvas || !context) return;

    const startDrawing = (e) => {
        e.preventDefault()  
        const mousePos = getMousePos(canvas, e);
        context.beginPath()
        context.moveTo(mousePos.x, mousePos.y)
        setPoints([{x : mousePos.x - offset?.x, y: mousePos.y - offset?.y}])
        setIsDrawing(true)
     
    }
    
    const finishDrawing = (e) => {
        e.preventDefault()  
        setIsDrawing(false)
        context.closePath()
      
        if(points){
            const pointArray = simpliyfy(points, 1, false)
            addShapes({shapeName:"pencil", points:pointArray})
        }
  
    }
            
    const draw = (e) => {

      e.preventDefault()  
      if(!isDrawing) return
        
      const mousePos = getMousePos(canvas, e);
      context.lineTo(mousePos.x, mousePos.y)
      context.stroke()
      setPoints(prev =>  [...prev, {x : mousePos.x - offset?.x, y: mousePos.y - offset?.y}])
 
    }

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", finishDrawing);
 


    canvas.addEventListener("touchstart", startDrawing)
    canvas.addEventListener("touchmove", draw, {passive: false})
    canvas.addEventListener("touchend", finishDrawing)

    // Cleanup function
    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", finishDrawing);
     

      canvas.removeEventListener("touchstart", startDrawing)
      canvas.removeEventListener("touchmove", draw, {passive: false})
      canvas.removeEventListener("touchend", finishDrawing)
    };

    }, [isActive, canvasRef,contextRef,isDrawing,addShapes,points, offset])
    
  return null
}
