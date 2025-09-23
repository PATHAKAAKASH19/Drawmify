import React, { useEffect, useState, useRef , useLayoutEffect} from 'react'
import useShapeStore from '../../stores/shapeStore'
import usePanningStore from '../../stores/panningStore'
import useToolStore from '../../stores/toolStore'
import useScalingStore from '../../stores/scalingStore'
import rough from "roughjs"
import { createPencil } from '../../utils/pencil.utils'

export default function AddImage({canvasRef, contextRef}) {

 
 const [img, setImg] = useState(null)
 const inputRef = useRef(null)
 const isInitialMount = useRef(true);
  
 const addShapes = useShapeStore((state) => state.addShapes)
 const shapesData = useShapeStore((state) => state.shapesData)
  const offset = usePanningStore((state) => state.offset)
  const scale = useScalingStore(state => state.scale)
  const scaleOffset = useScalingStore(state =>  state.scaleOffset)

 const  tool = useToolStore((state) => state.tool)



 const handleImage = (e) => {
  e.preventDefault()
  const file = e.target.files[0];
  if (!file) {
  
    return;
  }

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

     if (isInitialMount.current) {
      isInitialMount.current = false;
     }else if(tool === "image"  ) {
      inputRef.current.click()
    ;}
},[tool])
 

  
  
  useLayoutEffect(() => {

    const canvas = canvasRef.current;
    const context = contextRef.current;
    const roughCanvas = rough.canvas(canvas)
 

    if (!canvas || !context) return;

    if (img) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
        context.translate(offset?.x * scale -scaleOffset.x, offset?.y* scale - scaleOffset.y);

        context.scale(scale, scale)
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
             createPencil(shape.points, context,shape.propertiesObj);
           }

           if (shape.shapeName === "image") {
                const image = new Image();
                image.src = shape.img;
                context.drawImage(image, shape.x1, shape.y1, shape.x2 - shape.x1, shape.y2 - shape.y1);
           }

             if (shape.shapeName === "text") {
                context.font = shape.font;
                context.textBaseline = "hanging";
                context.fillStyle = shape.strokeColor;
                context.fillText(shape.text, shape.x1, shape.y1);
              }
         });
      

      const x1 = (500 - offset?.x * scale + scaleOffset.x)/ scale
      const y1 = (500 - offset?.y * scale + scaleOffset.y)/ scale
      const x2 = (900 - offset?.x * scale + scaleOffset.x)/ scale
      const y2 = (900- offset?.y * scale + scaleOffset.y)/ scale

      const width = x2 - x1
      const height = y2 - y1

      context.drawImage(img, x1, y1, width, height);
     
      context.restore();
      addShapes({ shapeName: "image", x1, y1, x2, y2, img:img.currentSrc });
      setImg(null) 
    }
  }, [img, contextRef, canvasRef, offset, scale, scaleOffset, shapesData, addShapes])

  return (
    <>
      <input type="file"   accept="image/*" ref={inputRef}  onChange={handleImage} className="hidden"/>
    </>
  )
}
