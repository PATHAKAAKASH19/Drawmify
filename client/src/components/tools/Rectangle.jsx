import useShapeTool from "../../hooks/useShapeTool";

export default function Rectangle({ canvasRef, contextRef }) {
   
    return useShapeTool(
      canvasRef,
      contextRef,
      "rectangle"
    ) 
}
