import useShapeTool from "../../hooks/useShapeTool";

export default function Diamond({ canvasRef, contextRef }) {
  
    return useShapeTool(
      canvasRef,
      contextRef,
      "diamond"
    ) 
}
