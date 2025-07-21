import React, { useEffect, useState, useRef } from 'react'
import getMousePos from '../../utils/getMousePos'
import useShapeStore from '../../stores/shapeStore'
import usePanningStore from '../../stores/panningStore'
import renderAllShapes from '../../utils/renderAllShapes'
import useToolStore from '../../stores/toolStore'

export default function AddImage({canvasRef, contextRef}) {

 const [isDrawing, setIsDrawing] = useState(false)
 const [initialPos, setInitialPos] = useState(null)
 const [img, setImg] = useState(null)
 const inputRef = useRef(null)

  
 const addShapes = useShapeStore((state) => state.addShapes)
 const shapesData = useShapeStore((state) => state.shapesData)
 const  offset  = usePanningStore((state) =>  state.offset)
 const  tool = useToolStore((state) => state.tool)




  const handleImage = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const image = new Image();
    image.onload = () => {
      setImg(image);
      // No need to revoke URL since we're using Base64
    };
    image.src = event.target.result; // Base64 URL
  };
  reader.readAsDataURL(file); // Convert to persistent Base64
};
   


 useEffect(() => {

   
      if(tool === "image"){
        inputRef.current.click();
      }



  
 },[tool])
 
 useEffect(() => {

    const canvas = canvasRef.current
    const context = contextRef.current
    let imgObj 

    if(!canvas || !context) return


    const startImage = (e) => {
       e.preventDefault()
       const mousePos = getMousePos(canvas, e)
       setInitialPos(mousePos)
       setIsDrawing(true)
    } 

    const image = (e) => {

      e.preventDefault()
      if(!isDrawing) return

      const mousePos = getMousePos(canvas, e)
       context.clearRect(0, 0, canvas.width, canvas.height);
      

      const width = mousePos.x - initialPos.x
      const height = mousePos.y - initialPos.y

      context.save();
      context.translate(offset?.x, offset?.y)
      renderAllShapes(context, shapesData)
      context.restore();
      context.drawImage(img, initialPos.x, initialPos.y, width, height);
     
       if(offset){
    
        imgObj = {
         img:img.currentSrc,
         initialPos:{
           x: initialPos?.x - offset?.x,
           y: initialPos?.y -offset?.y,
         },
         mousePos:{
           x: mousePos?.x - offset?.x,
           y: mousePos?.y - offset?.y
         }
      }
       }else{
          imgObj = {
        img:img.currentSrc,
        initialPos,
        mousePos
      }
       }
    };
  
  
 

    const finishImage = (e) => {
      e.preventDefault()
       addShapes({shapeName:"image", ...imgObj})
       setIsDrawing(false)
    }

    canvas.addEventListener("mousedown" , startImage)
    canvas.addEventListener("mousemove", image)
    canvas.addEventListener("mouseup" , finishImage)

    canvas.addEventListener("touchstart", startImage)
    canvas.addEventListener("touchmove", image, {passive: false})
    canvas.addEventListener("touchend", finishImage)

    return () => {
       canvas.removeEventListener("mousedown" , startImage)
       canvas.removeEventListener("mousemove", image)
       canvas.removeEventListener("mouseup" , finishImage)

       canvas.removeEventListener("touchstart", startImage)
       canvas.removeEventListener("touchmove", image, {passive: false})
       canvas.removeEventListener("touchend", finishImage)
    }
    

  }, [canvasRef,img,isDrawing,contextRef, addShapes,offset, shapesData, initialPos])
  return (
    <>
      <input type="file" accept="image/*" ref={inputRef}  onChange={handleImage} className="hidden"/>
    </>
  )
}
