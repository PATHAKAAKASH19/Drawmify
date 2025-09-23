import React, { useEffect, useState } from 'react'
import useScalingStore from '../stores/scalingStore'

export default function Zoom({canvasRef}) {

  const [scale, setScale] = useState(null)
  const [touchStart, setTouchStart] = useState(false)
  const [prevTouchDis, setPrevTouchDis] = useState(null)

  const changeScaling = useScalingStore(state => state.changeScaling) 
  const scaleValue = useScalingStore(state =>  state.scale)
  
    const onZoom = (delta) => {
       setScale((prev) => Math.min(Math.max(prev + delta, 0.1), 20))
    }

  
  useEffect(() => {

    setScale(scaleValue)
  }, [scaleValue])
    

  useEffect(() => {
    
    const canvas = canvasRef.current


    if(!canvas) return

   const getDistance = (touch1, touch2) => {
     const dx = touch1.clientX - touch2.clientX;
     const dy = touch1.clientY - touch2.clientY;
     return Math.sqrt(dx * dx + dy * dy);
   };

    const handleTouchStart = (e) => {
         e.preventDefault();  
      console.log(e.targetTouches[0].identifier)
      if (e.touches.length === 2) {
      
        const distance = getDistance(e.touches[0], e.tocuhes[1])
        setTouchStart(true)
        setPrevTouchDis(distance)
      }
    }

    const handleTouchMove = (e) => {
      e.preventDefault()
      if (!touchStart) return
      
      if (e.touches.length === 2) {
        const newDistance = getDistance(e.touches[0], e.tocuhes[1]);
        

        if (prevTouchDis) {
          const scale = newDistance / prevTouchDis
          
           setScale((prev) => Math.min(Math.max(prev + scale, 0.1), 20));
        }

         setPrevTouchDis(newDistance);
       }
     }

    const handleTouchEnd = (e) => {
       e.preventDefault();  
      setTouchStart(false)
      setPrevTouchDis(null)
    }




  
    canvas.addEventListener("touchstart", handleTouchStart, )
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false })
    canvas.addEventListener("touchend", handleTouchEnd)

    return () => {
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      canvas.removeEventListener("touchend", handleTouchEnd);
    }
  }, [canvasRef, touchStart, prevTouchDis])


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
    <div className="absolute flex gap-3 top-14 left-20 cursor-pointer">
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
