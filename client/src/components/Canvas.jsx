import React, { useEffect, useRef, useState } from 'react';
import Pencil from "./tools/Pencil.jsx"
import Rectangle from './tools/Rectangle.jsx';
import Ellipse from './tools/Ellipse.jsx';
import Line from './tools/Line.jsx';
import Diamond from './tools/Diamond.jsx';
import Arrow from './tools/Arrow.jsx';
import Text from './tools/Text.jsx';
import SelectTool from './SelectTool.jsx';


const Canvas = () => {
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [canvasSetUp, setCanvasSetUp] = useState(false)



  useEffect(() => {

    const canvas = canvasRef.current;
    if(!canvas) return


    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    canvas.width = window.innerWidth* window.devicePixelRatio;;
    
    canvas.height = window.innerHeight*window.devicePixelRatio;
  

    const context = canvas.getContext("2d")

    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 2;
    contextRef.current = context

    setCanvasSetUp(true)
  
  }, [])

  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      <SelectTool/>
      <canvas
        ref={canvasRef}
        className="bg-white  border-gray-300  border-2"
      />
      {canvasSetUp &&(<Circle  canvasRef={canvasRef} contextRef={contextRef}/>)}
    </div>
  );
};

export default Canvas;