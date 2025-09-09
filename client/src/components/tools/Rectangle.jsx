import { useEffect, useState } from "react";
import getMousePos from "../../utils/getMousePos.utils";
import {createRectangle} from "../../utils/rectangle.utils";
import useShapeStore from "../../stores/shapeStore";
import renderAllShapes from "../../utils/renderAllShapes.utils";
import usePanningStore from "../../stores/panningStore";
import rough from "roughjs"

const createElement = (x1, y1, x2, y2) => {
      const generator = rough.generator()
      const roughObj = generator.rectangle(x1, y1, x2 - x1, y2 - y1)
      console.log(roughObj)
      return {x1, y1, x2, y2,roughObj}
}

export default function Rectangle({ canvasRef, contextRef }) {

  const [isDrawing, setIsDrawing] = useState(false);
  const [initialPos, setInitialPos]  = useState(null) 

  const addShapes = useShapeStore((state) => state.addShapes)
  const shapesData = useShapeStore((state) => state.shapesData)
  const  offset  = usePanningStore((state) =>  state.offset)


  useEffect(() => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    const roughCanvas = rough.canvas(canvas)

   let element

    if (!canvas || !context) return;

    const startDrawing = (e) => {
      e.preventDefault() 
      const mousePos = getMousePos(canvas, e);
      element = createElement(mousePos.x, mousePos.y, mousePos.x, mousePos.y)
      roughCanvas.draw(element.roughObj)
      setInitialPos(mousePos);
      setIsDrawing(true);
    };


    const draw = (e) => {
      
      e.preventDefault() 
      if (!isDrawing || !initialPos) return;

      const mousePos = getMousePos(canvas, e);
      context.clearRect(0, 0 , canvas.width, canvas.height)

      context.save()
      context.translate(offset?.x, offset?.y)
     
       shapesData.forEach((shape) => {
       if(shape.roughObj){
          roughCanvas.draw(shape.roughObj)
        }
     })
 
      context.restore()
      console.log( initialPos, offset )
      element = createElement(
        initialPos.x -offset.x, 
        initialPos.y -offset.y,
        mousePos.x -  offset.x,
        mousePos.y - offset.y
      )

      context.save();
      context.translate(offset.x, offset.y);
      roughCanvas.draw(element.roughObj)
      context.restore();
    };

    const finishDrawing = (e) => {
        e.preventDefault() 
    
   
        addShapes(element)
      
        setIsDrawing(false);
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", finishDrawing);

    canvas.addEventListener("touchstart", startDrawing)
    canvas.addEventListener("touchmove", draw, {passive: false})
    canvas.addEventListener("touchend", finishDrawing)

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", finishDrawing);

      canvas.removeEventListener("touchstart", startDrawing)
      canvas.removeEventListener("touchmove", draw, {passive: false})
      canvas.removeEventListener("touchend", finishDrawing)
    };
  }, [canvasRef, contextRef, isDrawing, offset,initialPos,addShapes , shapesData]);

  return null;
}
