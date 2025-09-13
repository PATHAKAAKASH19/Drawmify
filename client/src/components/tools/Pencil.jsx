import { useEffect, useState } from 'react'
import getMousePos from '../../utils/getMousePos.utils';
import useShapeStore from '../../stores/shapeStore';
import simpliyfy from "simplify-js"
import usePanningStore from '../../stores/panningStore';
import rough from "roughjs"
import { createPencil } from '../../utils/pencil.utils';


export default function Pencil({canvasRef, contextRef,isActive}) {
   
  const [isDrawing, setIsDrawing] = useState(false)
  const [points, setPoints] = useState(null)
  const addShapes = useShapeStore(state =>  state.addShapes)
  const offset = usePanningStore(state =>  state.offset)
  const shapesData = useShapeStore(state =>  state.shapesData)



  useEffect(() => {
   
    const canvas = canvasRef.current;
    const context = contextRef.current;
    const roughCanvas = rough.canvas(canvas)
 
    if (!canvas || !context) return;

    const startDrawing = (e) => {
        e.preventDefault()  
        const mousePos = getMousePos(canvas, e);
        setPoints([{x : mousePos.x - offset?.x, y: mousePos.y - offset?.y} ])
        setIsDrawing(true)
    }
    
            
    const draw = (e) => {

      e.preventDefault()  
      if(!isDrawing || !points) return
        
      const mousePos = getMousePos(canvas, e);
      
      const newPoints = [...points , {x : mousePos.x - offset?.x, y: mousePos.y - offset?.y}]
      setPoints(newPoints)

      context.clearRect(0, 0, canvas.width , canvas.height)
      context.save()
      context.translate(offset?.x, offset?.y)


      shapesData.forEach((shape) =>{
           if(shape.roughObj){
          
        if(shape.shapeName === "arrow"){
          const { arrowline,arrowhead1, arrowhead2} = shape.roughObj
          roughCanvas.draw(arrowline)
          roughCanvas.draw(arrowhead1)
          roughCanvas.draw(arrowhead2)
        }else {
           roughCanvas.draw(shape.roughObj)
        }}
    
        if(shape.shapeName === "pencil"){
          createPencil(shape.points, context)
        }})

   
      createPencil(newPoints, context)
      context.restore()
    }


    const finishDrawing = (e) => {
        e.preventDefault()  
        setIsDrawing(false)
        if(points.length){
          addShapes({shapeName:"pencil", points:points})
        }
        setPoints(null)
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

    }, [isActive, canvasRef,contextRef,isDrawing,addShapes,points, offset, shapesData])
    
  return null
}
