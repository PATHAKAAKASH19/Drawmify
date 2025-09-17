import useShapeTool from "../../hooks/useShapeTool";

export default function Line({ canvasRef, contextRef }) {
  return useShapeTool(canvasRef, contextRef, "line");
}
