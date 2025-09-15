import { useEffect, useState } from 'react'
import getMousePos from '../../utils/getMousePos.utils'
import useShapeStore from "../../stores/shapeStore";
import usePanningStore from '../../stores/panningStore';
import rough from "roughjs"
import createShape from '../../utils/createShape.utils';
import { createPencil } from '../../utils/pencil.utils';
import useScalingStore from '../../stores/scalingStore';


export default function Arrow({canvasRef, contextRef}) {

  const [isDrawing, setIsDrawing] = useState(false)
  const [initialPos, setInitialPos] = useState(null)

  const addShapes = useShapeStore((state) => state.addShapes)
  const shapesData = useShapeStore((state) => state.shapesData)
  const  offset  = usePanningStore((state) =>  state.offset)
   const scale = useScalingStore((state) => state.scale);
   const scaleOffset = useScalingStore((state) => state.scaleOffset);

  useEffect(() => {

     const canvas = canvasRef.current
     const context = contextRef.current
     const roughCanvas = rough.canvas(canvas)
     let element

     if(!canvas || !context) return

     const startDrawing = (e) => {
        e.preventDefault()
        const mousePos = getMousePos(canvas, e)
        setInitialPos(mousePos)
        setIsDrawing(true)
      }

      const draw = (e) => {
        if(!isDrawing || !initialPos) return
         
        e.preventDefault()
        const mousePos = getMousePos(canvas, e)
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
        context.translate(
          offset?.x * scale - scaleOffset.x,
          offset?.y * scale - scaleOffset.y
        );

        context.scale(scale, scale);
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

      element = createShape(
        (initialPos.x -offset.x * scale +scaleOffset.x)/ scale, 
        (initialPos.y -offset.y * scale +scaleOffset.y)/ scale,
        (mousePos.x -  offset.x * scale +scaleOffset.x)/ scale,
       ( mousePos.y - offset.y * scale +scaleOffset.y)/ scale,
        "arrow"
      )

       const {arrowline, arrowhead1, arrowhead2} = element.roughObj
        if(arrowline && arrowhead1 && arrowhead2){
          roughCanvas.draw(arrowline)
          roughCanvas.draw(arrowhead1)
          roughCanvas.draw(arrowhead2)
        }
    
      context.restore();
       
     }

     const finishDrawing = (e) =>{
       e.preventDefault()  
       addShapes(element)
       setIsDrawing(false)
       setInitialPos(null)
     }

     // handle mouse event
     canvas.addEventListener("mousedown", startDrawing)
     canvas.addEventListener("mousemove", draw)
     canvas.addEventListener("mouseup", finishDrawing)
      
     // handle touch event
     canvas.addEventListener("touchstart", startDrawing)
     canvas.addEventListener("touchmove", draw, {passive: false})
     canvas.addEventListener("touchend", finishDrawing)


   return () => {
      // mouse event
      canvas.removeEventListener("mousedown", startDrawing)
      canvas.removeEventListener("mousemove", draw)
      canvas.removeEventListener("mouseup", finishDrawing)
      
      // touch event
      canvas.removeEventListener("touchstart", startDrawing)
      canvas.removeEventListener("touchmove", draw, {passive: false})
      canvas.removeEventListener("touchend", finishDrawing)
   }

  }, [canvasRef, contextRef, isDrawing, initialPos,offset, addShapes,shapesData])

  return null
}
