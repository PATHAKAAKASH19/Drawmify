import React, { useEffect, useState , useRef, useLayoutEffect} from "react";
import getMousePos from "../../utils/getMousePos.utils";
import checkShapeCollision from "../../utils/checkShapeCollision.utils";
import useShapeStore from "../../stores/shapeStore";
import usePanningStore from "../../stores/panningStore";
import createShape from "../../utils/createShape.utils";
import rough from "roughjs";
import { createPencil } from "../../utils/pencil.utils";
import useScalingStore from "../../stores/scalingStore";
import { createBoundingBox } from "../../utils/borderAroundShape";
import usePropertyStore from "../../stores/propertyStore";

export default function Selector({ canvasRef, contextRef }) {
  const [isSelected, setIsSelected] = useState(false);
  const [seletedShape, setSelectedShape] = useState(null);
  const [isBoxPresent, setIsBoxPresent] = useState(false)

  const [initialPos, setInitialPos] = useState(null);
  const shapesData = useShapeStore((state) => state.shapesData);
  const offset = usePanningStore((state) => state.offset);
  const updateShape = useShapeStore((state) => state.updateShape);
  const scale = useScalingStore((state) => state.scale);
  const scaleOffset = useScalingStore((state) => state.scaleOffset);
  const properties = usePropertyStore(state => state.properties)



  const moveShape = (seletedShape,roughCanvas,context, dy, dx) => {
   
    if (seletedShape.shapeName === "pencil") {
        
       const { id, shapeName, points , propertiesObj} = seletedShape;
       const pointsArray = points.map((point) => ({
         x: point.x + dx,
         y: point.y + dy,
       }));
       createPencil(pointsArray, context, propertiesObj);
       return { id, shapeName, points: pointsArray , propertiesObj: propertiesObj};
        
    } else if (seletedShape.shapeName === "image") {
      const { id, x1, y1, x2, y2, img, shapeName } = seletedShape
      
         const image = new Image();
         image.src = img;
        
            const newX1 = x1 + dx;
            const  newX2 = x2 + dx;

            const  newY1 = y1 + dy;
            const  newY2 = y2 + dy;

   
      context.drawImage(image, newX1, newY1, newX2 - newX1, newY2 - newY1)
      return { id:id, x1:newX1, y1:newY1, x2:newX2, y2:newY2, img : img, shapeName:shapeName}

      } else {
      

           const { id, x1, y1, x2, y2, shapeName , propertiesObj} = seletedShape;

         console.log()
           const element = createShape(
             x1 + dx,
             y1 + dy,
             x2 + dx,
             y2 + dy,
             shapeName,
            propertiesObj
           );

           if (element.shapeName === "arrow") {
             const { arrowline, arrowhead1, arrowhead2 } = element.roughObj;
             roughCanvas.draw(arrowline);
             roughCanvas.draw(arrowhead1);
             roughCanvas.draw(arrowhead2);
           } else {
             roughCanvas.draw(element.roughObj);
           }

           return { id, ...element };
      }
    
     
 }

  
  
  // useEffect(() => {


  //   const context = contextRef.current

  //   if (!isBoxPresent && seletedShape) {

  //             context.save();
  //             context.translate(
  //               offset?.x * scale - scaleOffset.x,
  //               offset?.y * scale - scaleOffset.y
  //             );
  //             context.scale(scale, scale);

  //             const dx = 0
  //             const dy = 0
  //             createBoundingBox(context, seletedShape, dx, dy);
  //             context.restore();
  //            setIsBoxPresent(true)
  //      }
  // }, [seletedShape,scaleOffset, scale, isBoxPresent, contextRef,offset])


  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    const roughCanvas = rough.canvas(canvas);
    let shapeObj;
 
    if (!canvas || !context) return;


    const startDrawing = (e) => {

      e.preventDefault();
      const mousePos = getMousePos(canvas, e, offset, scale, scaleOffset);
      const element = checkShapeCollision(mousePos.x, mousePos.y, shapesData);

      if (element) {
        setSelectedShape(element);
        setIsSelected(true);
        e.target.style.cursor = "move";
        setInitialPos(mousePos);
      }
    };

    const draw = (e) => {
      e.preventDefault();
      if (!isSelected || !seletedShape || !initialPos) return;

      const mousePos = getMousePos(canvas, e, offset, scale, scaleOffset);
  
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.save();
      context.translate(
        offset?.x * scale - scaleOffset.x,
        offset?.y * scale - scaleOffset.y
      );
      context.scale(scale, scale);
      
      shapesData.forEach((shape) => {
        if (shape.roughObj && shape.id !== seletedShape.id) {
          if (shape.shapeName === "arrow") {
            const { arrowline, arrowhead1, arrowhead2 } = shape.roughObj;
            roughCanvas.draw(arrowline);
            roughCanvas.draw(arrowhead1);
            roughCanvas.draw(arrowhead2);
          } else {
            roughCanvas.draw(shape.roughObj);
             
          }
        }

        if (shape.shapeName === "pencil" && shape.id !== seletedShape.id) {
          createPencil(shape.points, context, shape.propertiesObj);
        }

       
        if (shape.shapeName === "image" && shape.id !== seletedShape.id) {
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
      });

      const dx = mousePos.x - initialPos.x;
      const dy = mousePos.y - initialPos.y; 

      shapeObj = moveShape(seletedShape, roughCanvas, context, dy, dx)
      // createBoundingBox(context, seletedShape, dx, dy);
      context.restore();
      
    };

    const finishDrawing = (e) => {
      e.preventDefault();
      setInitialPos(null)
      setIsSelected(false)
      setIsBoxPresent(false)
      if (shapeObj?.id) {
        updateShape(shapeObj);
      }
      e.target.style.cursor = "default";
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", finishDrawing);
    
    canvas.addEventListener("touchstart", startDrawing);
    canvas.addEventListener("touchmove", draw, { passive: false });
    canvas.addEventListener("touchend", finishDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", finishDrawing);
   

      canvas.removeEventListener("touchstart", startDrawing);
      canvas.removeEventListener("touchmove", draw, { passive: false });
      canvas.removeEventListener("touchend", finishDrawing);
    };
  }, [
    canvasRef,
    contextRef,
    offset,
    seletedShape,
    updateShape,
    shapesData,
    isSelected,
    initialPos,
    scale,
    scaleOffset,
  ]);

  return null;
}
