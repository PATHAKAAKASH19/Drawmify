  import { isPointInRectangle } from "./rectangle.utils";
  import { isPointInDiamond } from "./diamond.utils";
  import { isPointInEllipse } from "./ellipse.utils";
  import { isPointInArrow } from "./arrow.utils";
  import { isPointInLine } from "./line.utils";
  import { isPointInPencil } from "./pencil.utils";
  import { isPointInImage } from "./image.utils";
  import { isPointInText } from "./text.utils";
  
  
  const isPointInShape = (x, y, shape) => {
    switch (shape.shapeName) {
        case "diamond":
           return isPointInDiamond(x, y, shape.initialPos, shape.mousePos)
      case 'rectangle':
        return isPointInRectangle(x, y, shape.initialPos,shape.mousePos);
      case "ellipse":
         return isPointInEllipse(x, y, shape.initialPos, shape.mousePos);
      case "arrow":
          return isPointInArrow(x, y, shape.initialPos, shape.mousePos );
      case "line":
        return isPointInLine(x, y, shape.initialPos, shape.mousePos);
      case "pencil":
         return isPointInPencil(x, y, shape.initialPos, shape.mousePos);
      case "image":
         return isPointInImage(x, y, shape.initialPos, shape.mousePos);
      case "text":
         return isPointInText(x, y,shape.initialPos, shape.mousePos )
        default:
        return false;
    }
  };

export default isPointInShape