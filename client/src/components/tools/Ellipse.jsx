import useShapeTool from "../../hooks/useShapeTool"

export default function Ellipse({canvasRef, contextRef}) {
 
  return useShapeTool(
    canvasRef,
    contextRef,
    "ellipse"
  ) 
}
