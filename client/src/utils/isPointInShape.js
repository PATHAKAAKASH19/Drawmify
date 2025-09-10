  import { isPointInRectangle } from "./rectangle.utils";
  import { isPointInDiamond } from "./diamond.utils";
  import { isPointInEllipse } from "./ellipse.utils";
  import { isPointInArrow } from "./arrow.utils";
  import { isPointInLine } from "./line.utils";
  import { isPointInPencil } from "./pencil.utils";
  import { isPointInImage } from "./image.utils";
  import { isPointInText } from "./text.utils";
  
  
  const isPointInShape = (x, y, shape) => {

    let initialPos = {
      x:shape.x1,
      y:shape.y1
    }

    let mousePos = {
      x:shape.x2,
      y:shape.y2
    }

    let points
    if(shape.shapeName === "pencil"){
     points = shape.points
    }
    switch (shape.shapeName) {
      case "diamond":
        return isPointInDiamond(x, y, initialPos, mousePos)
      case 'rectangle':
        return isPointInRectangle(x, y, initialPos,mousePos);
      case "ellipse":
         return isPointInEllipse(x, y, initialPos, mousePos);
      case "arrow":
          return isPointInArrow(x, y, initialPos, mousePos );
      case "line":
        return isPointInLine(x, y, initialPos, mousePos);
      case "pencil":
         return isPointInPencil(x, y, points);
      case "image":
         return isPointInImage(x, y, initialPos, mousePos);
      case "text":
         return isPointInText(x, y,initialPos, mousePos)
      default:
        return false;
    }
  };

export default isPointInShape