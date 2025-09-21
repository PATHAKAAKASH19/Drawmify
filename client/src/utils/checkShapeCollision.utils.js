  
  import { isPointInRectangle } from "./checkCursorInShape.utils";
  import { isPointInDiamond } from "./checkCursorInShape.utils";
  import { isPointInEllipse } from "./checkCursorInShape.utils";
  import { isPointInArrow } from "./checkCursorInShape.utils";
  import { isPointInLine } from "./checkCursorInShape.utils";
  import { isPointInPencil } from "./checkCursorInShape.utils";
  import { isPointInImage } from "./checkCursorInShape.utils";
  import { isPointInText } from "./checkCursorInShape.utils";
  
  
  const isPointInShape = (x, y, shape) => {

    let initialPos = {
      x:shape.x1,
      y:shape.y1
    }

    let mousePos = {
      x:shape.x2,
      y:shape.y2
    }

 
    
    switch (shape.shapeName) {
      case "pencil":
         return isPointInPencil(x, y, shape.points);
      case "diamond":
        return isPointInDiamond(x, y, initialPos, mousePos)
      case 'rectangle':
        return isPointInRectangle(x, y, initialPos,mousePos);
      case "ellipse":
         return isPointInEllipse(x, y, initialPos, mousePos);
      case "arrow":
          return isPointInArrow(x, y, initialPos, mousePos);
      case "line":
        return isPointInLine(x, y, initialPos, mousePos);
      case "image":
         return isPointInImage(x, y, initialPos, mousePos);
      case "text":
         return isPointInText(x, y,initialPos, mousePos)
      default:
        return false;
    }
  };


  const checkShapeCollision = (x, y, shapesData) => {
    const shape = shapesData.find(shape => isPointInShape(x, y, shape))
    if(shape) return shape;
    
    return null;
  };

  export default checkShapeCollision