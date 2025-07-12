import React, { useEffect, useRef, useState } from 'react';
import Pencil from "./tools/Pencil.jsx"
import Rectangle from './tools/Rectangle.jsx';
import Circle from './tools/Circle.jsx';
import Line from './tools/Line.jsx';



const Canvas = () => {
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [canvasSetUp, setCanvasSetUp] = useState(false)



  useEffect(() => {

    const canvas = canvasRef.current;
    if(!canvas) return

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const context = canvas.getContext("2d")

    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 2;
    contextRef.current = context

    setCanvasSetUp(true)
    console.log("hey")
  }, [])

  return (
    <div className="relative w-full h-screen flex justify-center items-center ">
      <canvas

      
        ref={canvasRef}
        className="bg-white  border-gray-300  border-2"
      />
      {canvasSetUp &&(<Line canvasRef={canvasRef} contextRef={contextRef}/>)}
    </div>
  );
};

export default Canvas;