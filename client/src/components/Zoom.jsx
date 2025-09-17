import React, { useEffect, useState } from 'react'
import useScalingStore from '../stores/scalingStore'

export default function Zoom({canvasRef}) {

    const [scale, setScale] = useState(1)
    const changeScaling = useScalingStore(state =>  state.changeScaling) 
  
    const onZoom = (delta) => {
       setScale((prev) => Math.min(Math.max(prev + delta, 0.1), 20))
    }

    useEffect(() => {

      const canvas = canvasRef.current
        
      const scaledWidth = canvas.width * scale
      const scaledHeight = canvas.height * scale

      const scaleOffsetX =  (scaledWidth - canvas.width) / 2
      const scaleOffsetY = (scaledHeight - canvas.height) / 2
      const offset = { x: scaleOffsetX, y: scaleOffsetY }
      
      changeScaling(scale, offset);

    }, [scale, canvasRef, changeScaling])
  

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
