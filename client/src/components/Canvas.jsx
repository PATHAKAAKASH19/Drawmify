import { useEffect, useRef, useState } from 'react';
import SelectTool from './SelectTool.jsx';
import GetTool from './GetTool.jsx';
import rough from 'roughjs';
import useToolStore from '../stores/toolStore.js';
import Zoom from './Zoom.jsx';
import { createPencil } from '../utils/pencil.utils.js';
import useShapeStore from '../stores/shapeStore.js';
import useScalingStore from '../stores/scalingStore.js';
import usePanningStore from '../stores/panningStore.js';
import UndoAndRedo from './UndoAndRedo.jsx';
import PropertiesPanel from './sidebar/PropertiesPanel.jsx';



const Canvas = () => {
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [canvasSetUp, setCanvasSetUp] = useState(false)
  const tool = useToolStore((state) => state.tool)
  const shapesData = useShapeStore(state => state.shapesData)
  const offset = usePanningStore(state => state.offset)
  const scale = useScalingStore(state => state.scale)
  const scaleOffset = useScalingStore(state => state.scaleOffset)


  useEffect(() => {

    const canvas = canvasRef.current;
    if(!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const context = canvas.getContext("2d")
    contextRef.current = context
   
    setCanvasSetUp(true)

  }, [])


  useEffect(() => {
        
    const canvas = canvasRef.current
    if(tool === "panning") {
        canvas.style.cursor = "grab"
    }else if (tool === "eraser") {
       canvas.style.cursor = "alias"
    }else if(tool === "selector"){
        canvas.style.cursor = "pointer"
    }else{
      canvas.style.cursor = "crosshair"
    }

  }, [tool])

  useEffect(() => {

    const canvas = canvasRef.current
    const context = contextRef.current
    const roughCanvas = rough.canvas(canvas)

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.translate(offset?.x * scale - scaleOffset.x, offset?.y * scale - scaleOffset.y);

    context.scale(scale, scale);
    shapesData.forEach((shape) => {
      if (shape.roughObj) {
        if (shape.shapeName === "arrow") {
          const { arrowline, arrowhead1, arrowhead2 } = shape.roughObj;
          roughCanvas.draw(arrowline);
          roughCanvas.draw(arrowhead1);
          roughCanvas.draw(arrowhead2);
        } else {
          roughCanvas.draw(shape.roughObj);
        }
      }

      if (shape.shapeName === "pencil") {
       
        createPencil(shape.points, context, shape.propertiesObj);
      }

      if (shape.shapeName === "image") {
         
        const image = new Image();
        image.src = shape.img;
       
          context.drawImage(
            image,
            shape.x1,
            shape.y1,
            shape.x2 - shape.x1,
            shape.y2 - shape.y1
          );
       
      }

        if (shape.shapeName === "text") {
          context.font = shape.font;
          context.textBaseline = "hanging";
          context.fillStyle = shape.strokeColor;
          context.fillText(shape.text, shape.x1, shape.y1);
        }
    });

  
    context.restore();

  } ,[offset, scale, shapesData, scaleOffset])



  useEffect(() => {
    const preventZoom = (e) => {
      if (
        e.ctrlKey || // ctrl + scroll
        e.metaKey || // ⌘ + scroll (Mac)
        e.type === "gesturestart" ||
        e.type === "gesturechange"
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", preventZoom, { passive: false });
    window.addEventListener("gesturestart", preventZoom, { passive: false });
    window.addEventListener("gesturechange", preventZoom, { passive: false });
    window.addEventListener("gestureend", preventZoom, { passive: false });

    return () => {
      window.removeEventListener("wheel", preventZoom);
      window.removeEventListener("gesturestart", preventZoom);
      window.removeEventListener("gesturechange", preventZoom);
      window.removeEventListener("gestureend", preventZoom);
    };
  }, []);

  return (
    <div className="relative h-screen flex justify-center items-center ">
      <SelectTool/>
      <canvas
        ref={canvasRef}
        className={`bg-white border-gray-300`}
        style={{
            touchAction:"none"
        }}
       
      />
       
     <PropertiesPanel></PropertiesPanel> 
       <UndoAndRedo/> 

      
      <Zoom canvasRef={canvasRef}></Zoom>

      {canvasSetUp &&(<GetTool canvasRef={canvasRef}  contextRef={contextRef}/>)}
    </div>
  );
};

export default Canvas;


