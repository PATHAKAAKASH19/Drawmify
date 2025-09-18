import React, { useEffect, useState , useRef} from "react";
import getMousePos from "../../utils/getMousePos.utils";
import checkShapeCollision from "../../utils/checkShapeCollision.utils";
import useShapeStore from "../../stores/shapeStore";
import usePanningStore from "../../stores/panningStore";
import createShape from "../../utils/createShape.utils";
import rough from "roughjs";
import { createPencil } from "../../utils/pencil.utils";
import useScalingStore from "../../stores/scalingStore";
import { createBoundingBox } from "../../utils/borderAroundShape";

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




  const moveShape = (seletedShape,roughCanvas,context, dy, dx) => {
   
      if (seletedShape.shapeName !== "pencil") {
        const { id, x1, y1, x2, y2, shapeName } = seletedShape;

        const element = createShape(
          x1 + dx,
          y1 + dy,
          x2 + dx,
          y2 + dy,
          shapeName
        );

        if (element.shapeName === "arrow") {
          const { arrowline, arrowhead1, arrowhead2 } = element.roughObj;
          roughCanvas.draw(arrowline);
          roughCanvas.draw(arrowhead1);
          roughCanvas.draw(arrowhead2);
        } else {
          roughCanvas.draw(element.roughObj);
        }

        return{ id, ...element };
      } else {
        const { id, shapeName, points } = seletedShape;
        const pointsArray = points.map((point) => ({
          x: point.x + dx,
          y: point.y + dy,
        }));
        createPencil(pointsArray, context);
        return { id, shapeName, points: pointsArray };
      }
    
     
 }

  
  
  useEffect(() => {


    const context = contextRef.current
    const canvas = canvasRef.current
    const roughCanvas = rough.canvas(rough) 

    if(!context || !canvas) return

    if (!isBoxPresent && seletedShape) {

            
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
                        const { arrowline, arrowhead1, arrowhead2 } =
                          shape.roughObj;
                        roughCanvas.draw(arrowline);
                        roughCanvas.draw(arrowhead1);
                        roughCanvas.draw(arrowhead2);
                      } else {
                        roughCanvas.draw(shape.roughObj);
                      }
                    }

                    if (
                      shape.shapeName === "pencil" &&
                      shape.id !== seletedShape.id
                    ) {
                      createPencil(shape.points, context);
                    }
                  });
      
      
      
              const dx = 0
              const dy = 0

            
              createBoundingBox(context, seletedShape, dx, dy);
              context.restore();
             setIsBoxPresent(true)
       }
  }, [seletedShape,scaleOffset, scale, isBoxPresent, contextRef,offset, canvasRef, shapesData])


  useEffect(() => {
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
          createPencil(shape.points, context);
        }

      });

      const dx = mousePos.x - initialPos.x;
      const dy = mousePos.y - initialPos.y; 

      shapeObj = moveShape(seletedShape, roughCanvas, context, dy, dx)
      createBoundingBox(context, seletedShape, dx, dy);
      context.restore();
      
    };

    const finishDrawing = (e) => {
      e.preventDefault();
      setInitialPos(null)
      setIsSelected(false)
     
      setSelectedShape(null)
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
