import { useState, useEffect, useLayoutEffect } from "react";
import usePanningStore from "../stores/panningStore";
import useScalingStore from "../stores/scalingStore";
import useShapeStore from "../stores/shapeStore";
import getMousePos from "../utils/getMousePos.utils";
import { createPencil } from "../utils/pencil.utils";
import createShape from "../utils/createShape.utils";
import rough from "roughjs";
import usePropertyStore from "../stores/propertyStore";

export default function useShapeTool(canvasRef, contextRef, shapeName) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [initialPos, setInitialPos] = useState(null);
  
  const [points, setPoints] = useState(null);
  const shapesData = useShapeStore((state) => state.shapesData);
  const scale = useScalingStore((state) => state.scale);
  const scaleOffset = useScalingStore((state) => state.scaleOffset);
  const addShapes = useShapeStore((state) => state.addShapes);
  const offset = usePanningStore((state) => state.offset);
  const properties = usePropertyStore((state) => state.properties);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    const roughCanvas = rough.canvas(canvas);
    let shape;

    if (!canvas && !context) return;

    const startDrawing = (e) => {
      e.preventDefault();
      const mousePos = getMousePos(canvas, e, offset, scale, scaleOffset);
      if (shapeName !== "pencil") {
        setInitialPos(mousePos);
      } else {
        setPoints([mousePos]);
      }

      setIsDrawing(true);
    };

    const draw = (e) => {
      e.preventDefault();
      if (!isDrawing) return;

      const mousePos = getMousePos(canvas, e, offset, scale, scaleOffset);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.save();
      context.translate(
        offset?.x * scale - scaleOffset.x,
        offset?.y * scale - scaleOffset.y
      );
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

      if (shapeName === "pencil") {
        const point = mousePos;
        const newPoints = [...points, point];
        setPoints(newPoints);
        createPencil(newPoints, context, properties);
      } else {
        shape = createShape(
          initialPos.x,
          initialPos.y,
          mousePos.x,
          mousePos.y,
          shapeName,
          properties
        );
        if (shapeName !== "arrow") {
          roughCanvas.draw(shape.roughObj);
        } else {
          const { arrowline, arrowhead1, arrowhead2 } = shape.roughObj;
          roughCanvas.draw(arrowline);
          roughCanvas.draw(arrowhead1);
          roughCanvas.draw(arrowhead2);
        }
      }

      context.restore();
    };

    const finishDrawing = (e) => {
      e.preventDefault();

      shapeName !== "pencil"
        ? addShapes(shape)
        : addShapes({
            shapeName: shapeName,
            points: points,
            propertiesObj: properties,
          });

      setIsDrawing(false);
      setInitialPos(null);
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
    scale,
    scaleOffset,
    shapesData,
    addShapes,
    isDrawing,
    initialPos,
    offset,
    shapeName,
    points,
    properties,
  ]);

  return null;
}
