import React, { useEffect,  useState } from 'react'
import getMousePos from '../../utils/getMousePos.utils'
import checkShapeCollision from '../../utils/checkShapeCollision.utils'
import useShapeStore from '../../stores/shapeStore'
import usePanningStore from '../../stores/panningStore'
import createShape from '../../utils/createShape.utils'
import rough from "roughjs"
import { createPencil } from '../../utils/pencil.utils';
import useScalingStore from "../../stores/scalingStore";

export default function Selector({canvasRef, contextRef}) {

   
   const [isSelected, setIsSelected] = useState(false)
   const [seletedShape, setSelectedShape] = useState(null)
  
  const [initialPos, setInitialPos] = useState(null)
   const shapesData = useShapeStore(state =>  state.shapesData)
   const  offset  = usePanningStore((state) =>  state.offset)
   const updateShape = useShapeStore(state =>  state.updateShape)
   const scale = useScalingStore((state) => state.scale);
   const scaleOffset = useScalingStore((state) => state.scaleOffset);
    
    
   useEffect(() => {

     const canvas = canvasRef.current
     const context = contextRef.current
     const roughCanvas = rough.canvas(canvas)
     let shapeObj
     if(!canvas || !context) return


     const startDrawing = (e) => {
        e.preventDefault()
        const mousePos = getMousePos(canvas, e)
        const element = checkShapeCollision(
          (mousePos.x - offset?.x * scale + scaleOffset.x) / scale,
          (mousePos.y - offset?.y * scale + scaleOffset.y) / scale,
          shapesData
        );
       
        if(element){
          setSelectedShape(element)
          setIsSelected(true)
          e.target.style.cursor = "move"
          setInitialPos(mousePos) 
        }
      }

     const draw = (e) => {
      
      e.preventDefault()
      if(!isSelected || !seletedShape || !initialPos) return
      
      
      const mousePos = getMousePos(canvas, e)
   
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.save();
      context.translate(offset?.x * scale - scaleOffset.x, offset?.y * scale - scaleOffset.y); 
      context.scale(scale, scale)
  
      shapesData.forEach((shape) =>{
           if(shape.roughObj && shape.id !== seletedShape.id){
          
        if(shape.shapeName === "arrow"){
          const { arrowline,arrowhead1, arrowhead2} = shape.roughObj
          roughCanvas.draw(arrowline)
          roughCanvas.draw(arrowhead1)
          roughCanvas.draw(arrowhead2)
        }else {
           roughCanvas.draw(shape.roughObj)
        }}
    
        if (shape.shapeName === "pencil" && shape.id !== seletedShape.id) {
          createPencil(shape.points, context);
        }})


       const dx = ((mousePos.x - offset?.x * scale + scaleOffset.x) / scale) -
                  ((initialPos.x - offset?.x * scale + scaleOffset.x) / scale)
       
       const dy = ((mousePos.y - offset?.y * scale + scaleOffset.y) / scale) -
                  ((initialPos.y - offset?.y * scale + scaleOffset.y) / scale)
       
     if(seletedShape.shapeName !== "pencil"){
      const {id, x1, y1, x2, y2, shapeName} = seletedShape
   
      const element = createShape(
        x1 + dx ,
        y1 + dy , 
        x2 + dx , 
        y2 + dy , 
        shapeName
      )  

       if (element.shapeName === "arrow") {
            const { arrowline, arrowhead1, arrowhead2 } = element.roughObj;
            roughCanvas.draw(arrowline);
            roughCanvas.draw(arrowhead1);
            roughCanvas.draw(arrowhead2);
        
       } else {
           roughCanvas.draw(element.roughObj); 
      }
    
      shapeObj = {id, ...element}
     
     } else {
         
      const {id, shapeName, points} = seletedShape
      const pointsArray = points.map((point) => ({x:point.x + dx , y:point.y+dy}))
      createPencil(pointsArray, context);
      shapeObj = { id, shapeName, points: pointsArray };
     }
       
      // createRectangle(context, mousePos, initialPos, seletedShape)
      context.restore();
    }

     const finishDrawing = (e) => {
      e.preventDefault()   
      setIsSelected(false)
      setSelectedShape(null)
      updateShape(shapeObj);
      e.target.style.cursor = "default"
     }



    canvas.addEventListener("mousedown", startDrawing)
    canvas.addEventListener("mousemove", draw)
    canvas.addEventListener("mouseup", finishDrawing)

    canvas.addEventListener("touchstart", startDrawing)
    canvas.addEventListener("touchmove", draw, {passive: false})
    canvas.addEventListener("touchend", finishDrawing)

    return () => {

      canvas.removeEventListener("mousedown", startDrawing)
      canvas.removeEventListener("mousemove", draw)
      canvas.removeEventListener("mouseup", finishDrawing)

      canvas.removeEventListener("touchstart", startDrawing)
      canvas.removeEventListener("touchmove", draw, {passive: false})
      canvas.removeEventListener("touchend", finishDrawing)
    }


   }, [canvasRef, contextRef,offset,seletedShape, updateShape,shapesData,isSelected, initialPos,scale, scaleOffset])


  return null
}
