import { useEffect, useState } from "react";
import usePanningStore from "../stores/panningStore";
import useScalingStore from "../stores/scalingStore";
import usePropertyStore from "../stores/propertyStore";
import useShapeStore from "../stores/shapeStore";

export default function useResize({canvasRef, contextRef}) {


  const shapesData = useShapeStore((state) => state.shapesData);
  const offset = usePanningStore((state) => state.offset);
  const updateShape = useShapeStore((state) => state.updateShape);
  const scale = useScalingStore((state) => state.scale);
  const scaleOffset = useScalingStore((state) => state.scaleOffset);
  const properties = usePropertyStore((state) => state.properties);
  const updateProperties = usePropertyStore((state) => state.updateProperties);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    const roughCanvas = rough.canvas(canvas);

    if (!canvas || !context) return;

    const startResize = (e) => {
      const mousePos = getMousePos(canvas, e, offset, scale, scaleOffset);

      const corner = checkCorner;
    };

    const resize = (e) => {
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

        if (shape.shapeName === "text" && shape.id !== seletedShape.id) {
          context.font = shape.font;
          context.textBaseline = "hanging";
          context.fillStyle = shape.strokeColor;
          context.fillText(shape.text, shape.x1, shape.y1);
        }
      });

      context.restore();
    };

    const stopResize = () => {};

    canvas.addEventListener("mousedown", startResize);
    canvas.addEventListener("mousemove", resize);
    canvas.addEventListener("mouseup", stopResize);

    canvas.addEventListener("touchstart", startResize);
    canvas.addEventListener("touchmove", resize, { passive: false });
    canvas.addEventListener("touchend", stopResize);

    return () => {
      canvas.removeEventListener("mousedown", startResize);
      canvas.removeEventListener("mousemove", resize);
      canvas.removeEventListener("mouseup", stopResize);

      canvas.removeEventListener("touchstart", startResize);
      canvas.removeEventListener("touchmove", resize, { passive: false });
      canvas.removeEventListener("touchend", stopResize);
    };
  }, []);

  return null
}
