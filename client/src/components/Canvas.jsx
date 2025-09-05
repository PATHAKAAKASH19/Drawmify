import { useEffect, useRef, useState } from 'react';
import SelectTool from './SelectTool.jsx';
import GetTool from './GetTool.jsx';


const Canvas = () => {
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [canvasSetUp, setCanvasSetUp] = useState(false)


  useEffect(() => {

    const canvas = canvasRef.current;
    if(!canvas) return


    canvas.style.width = `${window.innerWidth}px `;
    canvas.style.height = `${window.innerHeight}px`;

    canvas.width = window.innerWidth
    
    canvas.height = window.innerHeight

    const context = canvas.getContext("2d")

    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 1.5;
    contextRef.current = context

    setCanvasSetUp(true)
  
  }, [])


  return (
    <div className="relative h-screen flex justify-center items-center">
      <SelectTool/>
      <canvas
        ref={canvasRef}
        className="bg-white  border-gray-300  border-2"
      />
      {canvasSetUp &&(<GetTool canvasRef={canvasRef} contextRef={contextRef}/>)}
    </div>
  );
};

export default Canvas;