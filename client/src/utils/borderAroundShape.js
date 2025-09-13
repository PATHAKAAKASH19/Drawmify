

import createShape from "./createShape.utils"
import { createRectangle } from "./rectangle.utils"

   const createBorderAroundShape = (context, mousePos, initialPos, shapeData) => {
     




    createRectangle(context, mousePos, initialPos, shapeData)

    //  const {x1, y1, x2, y2 } = shapeData

    //   const border = createShape(
    //     x1 + dx -10- offset.x  ,
    //     y1 + dy -10 - offset.y, 
    //     x2 + dx +10 - offset.x , 
    //     y2 + dy +10- offset.y, 
    //     "rectangle",
    //     {stroke:"blue"}
    //   )

    //    const circle1 = createShape(
    //     mousePos.x - offset.x  ,
    //     mousePos.y - offset.y, 
    //     mousePos.x -10- offset.x , 
    //       mousePos.y -10- offset.y, 
    //     "ellipse",
    //     {stroke:"blue"}
    //   )

    //    const circle2 = createShape(
    //     mousePos.x +width- offset.x  ,
    //     mousePos.y - offset.y, 
    //     mousePos.x -10- offset.x , 
    //       mousePos.y -10- offset.y, 
    //     "ellipse",
    //     {stroke:"blue"}
    //   )

    //    const circle3 = createShape(
    //     mousePos.x - offset.x  ,
    //     mousePos.y +height- offset.y, 
    //     mousePos.x -10- offset.x , 
    //       mousePos.y -10- offset.y, 
    //     "ellipse",
    //     {stroke:"blue"}
    //   )

    //    const circle4 = createShape(
    //     mousePos.x +width - offset.x  ,
    //     mousePos.y +height- offset.y, 
    //     mousePos.x -10- offset.x , 
    //       mousePos.y -10- offset.y, 
    //     "ellipse",
    //     {stroke:"blue"}
    //   )
     
      roughCanvas.draw(border.roughObj)
    //   roughCanvas.draw(circle1.roughObj)
    //   roughCanvas.draw(circle2.roughObj)
    //   roughCanvas.draw(circle3.roughObj)
    //   roughCanvas.draw(circle4.roughObj)
   }

   export default createBorderAroundShape

