import useShapeTool from "../../hooks/useShapeTool"

export default function Arrow({canvasRef, contextRef}) {

useShapeTool(
    canvasRef,
    contextRef,
    "arrow"
  )
}
