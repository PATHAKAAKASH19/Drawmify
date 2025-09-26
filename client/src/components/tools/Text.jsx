import { useRef, useEffect, useState, useLayoutEffect } from "react";
import getMousePos from "../../utils/getMousePos.utils";
import useShapeStore from "../../stores/shapeStore";
import usePanningStore from "../../stores/panningStore";
import useScalingStore from "../../stores/scalingStore";
import rough from "roughjs";
import { createPencil } from "../../utils/pencil.utils";
import usePropertyStore from "../../stores/propertyStore";

export default function Text({ canvasRef, contextRef }) {
  const [text, setText] = useState("");
  const [pos, setPos] = useState(null);

  const inputRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  const addShapes = useShapeStore((state) => state.addShapes);
  const shapesData = useShapeStore((state) => state.shapesData);
  const offset = usePanningStore((state) => state.offset);
  const scale = useScalingStore((state) => state.scale);
  const scaleOffset = useScalingStore((state) => state.scaleOffset);
  const properties = usePropertyStore((state) => state.properties);

  // Handle text completion
  const handleTextComplete = (e) => {

    e.preventDefault();
    const metrics = contextRef.current.measureText(text);
    console.log(metrics)
    if (text.trim()) {
      addShapes({
        shapeName: "text",
        x1: pos.x - 1,
        y1: pos.y + 9,
        x2: pos.x - 1 + 2.5*metrics.width,
        y2:
          pos.y +
          9 +
         2*( metrics.fontBoundingBoxAscent +
          metrics.fontBoundingBoxDescent),
        text: text.trim(),
        font: "normal 25px sans-serif",
        strokeColor: properties.currentItemStrokeColor,
        width: metrics.width,
        height:
          metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent,
      });
    }
    setText("");
    setPos(null);
    setIsActive(false);
  };

  // Handle text cancellation
  const handleCancel = () => {
    setText("");
    setPos(null);
    setIsActive(false);
  };

  // Handle keyboard events
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleCancel();
    }
  };

  useLayoutEffect(() => {
    if (!isActive || !pos || !canvasRef.current || !contextRef.current) return;

    const canvas = canvasRef.current;
    const context = contextRef.current;
    const roughCanvas = rough.canvas(canvas);

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.save();
      context.translate(
        offset?.x * scale - scaleOffset.x,
        offset?.y * scale - scaleOffset.y
      );
      context.scale(scale, scale);

      // Draw existing shapes
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
    };

    draw();

    return () => {
      // Cleanup function if needed
    };
  }, [
    shapesData,
    offset,
    scaleOffset,
    scale,
    canvasRef,
    contextRef,
    isActive,
    pos,
    properties,
  ]);

  // Setup click listener for text placement
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = contextRef.current;

    if (!canvas || !context) return;

    const handleText = (e) => {
      if (isActive) return; // Prevent new placement while active


    
      const mousePos = getMousePos(canvas, e, offset, scale, scaleOffset);
      setPos(mousePos);
      setIsActive(true);
    };

    canvas.addEventListener("click", handleText);
    return () => {
      canvas.removeEventListener("click", handleText);
    };
  }, [canvasRef, contextRef, offset, scale, scaleOffset, isActive]);

  // Focus input when active
  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  return (
    <>
      {isActive && (
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleTextComplete}
          onKeyDown={handleKeyDown}
          className="fixed pt-0 m-0  border-blue-500 rounded outline-none  bg-transparent "
          style={{
            top: `${(pos?.y ) * scale - scaleOffset.y + offset.y * scale}px`,
            left: `${
              (pos?.x - 1) * scale - scaleOffset.x + offset.x * scale
            }px`,

            color: properties.currentItemStrokeColor,
            fontSize: `${25 * scale}px`,
            fontFamily: "sans-serif",

            transform: "translateZ(0)", // Force hardware acceleration
            zIndex: 1001,
          }}
        />
      )}
    </>
  );
}
