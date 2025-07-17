import { useEffect, useState } from "react";
import getMousePos from "../../utils/getMousePos";

export default function Rectangle({ canvasRef, contextRef }) {

  const [isDrawing, setIsDrawing] = useState(false);
  const [initialPos, setInitialPos]  = useState(null) 
  const [rectangles, setRectangles] = useState([])



  const createRectangle = (context,mousePos, initialPos) => {
    const width = mousePos.x - initialPos.x
      const height = mousePos.y - initialPos.y

      context.beginPath()
      context.rect(initialPos.x, initialPos.y, width, height);
      context.stroke()
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    let rectangleObj

    if (!canvas || !context) return;

    const startDrawing = (e) => {
      e.preventDefault() 
      const mousePos = getMousePos(canvas, e);
      setInitialPos(mousePos);
      setIsDrawing(true);
    };


    const draw = (e) => {
      
      e.preventDefault() 
      if (!isDrawing || !initialPos) return;

      const mousePos = getMousePos(canvas, e);
      context.clearRect(0, 0 , canvas.width, canvas.height)
    
      
      if(rectangles.length){
         rectangles.forEach((rectangle) => {
          createRectangle(context, rectangle.mousePos, rectangle.initialPos)
         })
      }
      createRectangle(context, mousePos, initialPos)
      rectangleObj = {
        initialPos,
        mousePos
      }

    };

    const finishDrawing = (e) => {
        e.preventDefault() 
        setRectangles(prev => [...prev, rectangleObj])
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
  }, [canvasRef, contextRef, isDrawing, initialPos, rectangles]);

  return null;
}
