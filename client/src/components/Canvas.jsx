import { useEffect, useRef, useState } from 'react';
import SelectTool from './SelectTool.jsx';
import GetTool from './GetTool.jsx';
import useShapeStore from '../stores/shapeStore.js';
import { Undo2 } from 'lucide-react';


const Canvas = () => {
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [canvasSetUp, setCanvasSetUp] = useState(false)
  const undo = useShapeStore(state =>  state.undo)


  const handleUndo = () => {
    console.log("aa")
    undo()
  }
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
      <button 
      className="absolute border-2 w-30 h-12 rounded-2xl bg-amber-400
      text-amber-50 font-medium bottom-8 left-15 hover:cursor-pointer"
      type="button"
      onClick={handleUndo}
      >
      undo
      </button>
      {canvasSetUp &&(<GetTool canvasRef={canvasRef} contextRef={contextRef}/>)}
    </div>
  );
};

export default Canvas;