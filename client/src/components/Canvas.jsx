import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import SelectTool from './SelectTool.jsx';
import GetTool from './GetTool.jsx';
import rough from 'roughjs';
import useToolStore from '../stores/toolStore.js';
import useShapeStore from '../stores/shapeStore.js';
import renderAllShapes from '../utils/renderAllShapes.utils.js';
import usePanningStore from '../stores/panningStore.js';


const Canvas = () => {
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const roughCanvasRef = useRef(null) 
  const [canvasSetUp, setCanvasSetUp] = useState(false)


 
  useLayoutEffect(() => {

    const canvas = canvasRef.current;
    if(!canvas) return


    canvas.style.width = `${window.innerWidth}px `;
    canvas.style.height = `${window.innerHeight}px`;
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const context = canvas.getContext("2d")

    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = "2";
    contextRef.current = context
   

    roughCanvasRef.current = rough.canvas(canvas)
    setCanvasSetUp(true)
  
  }, [])


   
  // useLayoutEffect(() => {

  //   const canvas = canvasRef.current
  //   const context = contextRef.current
  //   const roughCanvas = roughCanvasRef.current

  //   if(!canvas || !context || !roughCanvas) return

  //   context.clearRect(0, 0, canvas.width, canvas.height)

  //   context.save()
  //   context.translate(offset?.x, offset?.y)
  //   if(shapesData){
  //   shapesData.forEach((shape) => {
  //     if(shape.roughObj){
  //         roughCanvas.draw(shape.roughObj)
  //     }
  //    })
  //   }
  //   context.restore()

  // } ,[])



  return (
    <div className="relative h-screen flex justify-center items-center">
      <SelectTool/>
      <canvas
        ref={canvasRef}
        className={`bg-white  border-gray-300  border-2`}
      />
      {/* <button 
      className="absolute border-2 w-30 h-12 rounded-2xl bg-amber-400
      text-amber-50 font-medium bottom-8 left-15 hover:cursor-pointer"
      type="button"
    
      >
      undo
      </button> */}
      {canvasSetUp &&(<GetTool canvasRef={canvasRef} roughCanvasRef={roughCanvasRef} contextRef={contextRef}/>)}
    </div>
  );
};

export default Canvas;


