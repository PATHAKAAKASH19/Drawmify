import useShapeTool from "../../hooks/useShapeTool"

export default function Arrow({canvasRef, contextRef}) {

  return useShapeTool(
    canvasRef,
    contextRef,
    "arrow"
  )
}
