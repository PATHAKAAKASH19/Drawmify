import useShapeTool from "../../hooks/useShapeTool";



export default function Pencil({canvasRef, contextRef}) {
   

  return useShapeTool(
    canvasRef,
    contextRef,
    "pencil"
  )
}
