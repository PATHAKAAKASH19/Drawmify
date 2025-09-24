import React, { useEffect, useState , useRef} from 'react'
import useScalingStore from '../stores/scalingStore'
import getMousePos from '../utils/getMousePos.utils'
import usePanningStore from '../stores/panningStore'

export default function Zoom({canvasRef}) {

  const [scale, setScale] = useState(null)

  const [isZooming, setIsZooming] = useState(false)
  const currentScale = useRef(true)

  const changeScaling = useScalingStore(state => state.changeScaling) 
  const scaleValue = useScalingStore(state => state.scale)
  const prevdis = useRef(0) 
  const scaleOffset = useScalingStore(state => state.scaleOffset)
  const offset = usePanningStore(state => state.offset)

    const onZoom = (delta) => {
       setScale((prev) => Math.min(Math.max(prev + delta, 0.1), 20))
    }

  
  useEffect(() => {

    if (currentScale.current) {
      setScale(scaleValue)
      currentScale.current = false
    }
  }, [scaleValue])
    

  useEffect(() => {
    
    const canvas = canvasRef.current
    

    if(!canvas) return


   

    const handleMove = (e) => {
   
        e.preventDefault(); // This will WORK with { passive: false }
        e.stopPropagation();
      
      if (e.deltaY) {
       const zoomIntensity = 0.05;
        const wheel = e.deltaY < 0 ? 0.5 : -0.5;
        const zoomFactor = Math.exp(wheel * zoomIntensity);
        setScale((prev) => Math.max(0.1, Math.min(20, prev * zoomFactor)));
      }
    }

    const handleTouchStart = (e) => {
      if (e.touches.length === 2) {
       let initialDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );

        setIsZooming(initialDistance)
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 2 && isZooming) {
        e.preventDefault();

        const currentDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );

        const zoomFactor = currentDistance / isZooming;

           const smoothedRatio = 1 + (zoomFactor - 1) * 0.01; 
      
        setScale((prev) => Math.max(0.1, Math.min(20, prev * smoothedRatio)));
      }
    };

    const handleTouchEnd = () => {
       setIsZooming(null)
    };


  



      canvas.addEventListener("wheel", handleMove, {passive: false});
      canvas.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
    canvas.addEventListener("touchmove", handleTouchMove,  { passive: false })
    canvas.addEventListener("touchend",handleTouchEnd)

    return () => {
      
      canvas.removeEventListener("wheel", handleMove);
    canvas.removeEventListener("touchstart", handleTouchStart);
    canvas.removeEventListener("touchmove", handleTouchMove);
    canvas.removeEventListener("touchend", handleTouchEnd);
    }
   
    

  }, [canvasRef,isZooming])


    useEffect(() => {

      
      if (scale) {
        const canvas = canvasRef.current
        
      const scaledWidth = canvas.width * scale
      const scaledHeight = canvas.height * scale

      const scaleOffsetX =  (scaledWidth - canvas.width) / 2
      const scaleOffsetY = (scaledHeight - canvas.height) / 2
      const offset = { x: scaleOffsetX, y: scaleOffsetY }
      
      changeScaling(scale, offset);
      }

    }, [scale, canvasRef, changeScaling, scaleValue])
  

  return (
    <div className="absolute flex gap-3 bottom-14 left-20 cursor-pointer">
      <button
        type="button"
        className="w-18 h-6 border-1 flex justify-center items-center  text-4xl rounded cursor-pointer "
        onClick={() => onZoom(-0.1)}
      >
        -
      </button>

      <span onClick={() => setScale(1)}>
        {new Intl.NumberFormat("en-GB", { style: "percent" }).format(scale)}
      </span>

      <button
        type="button"
        className="w-18 h-6 border-1 flex justify-center items-center  text-2xl cursor-pointer"
        onClick={() => onZoom(+0.1)}
      >
        +
      </button>
    </div>
  );
}
