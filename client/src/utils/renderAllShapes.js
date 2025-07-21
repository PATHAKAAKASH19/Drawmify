
import createRectangle from "./createRectangle";
import createArrow from "./createArrow";
import createDiamond from "./createDiamond";
import createLine from "./createLine";
import createEllipse from "./createEllipse"
import createText from "./createText";
import createImage from "./createImage";



const renderAllShapes = (context,shapesData) => {
    

     shapesData.forEach(shape => {
      
      switch(shape.shapeName){
        case "rectangle":
           createRectangle(context, shape.mousePos, shape.initialPos);
           break;
        
        case "diamond":
           createDiamond(context, shape.mousePos, shape.initialPos);
           break;
        
        case "ellipse":
            createEllipse(context, shape.mousePos, shape.initialPos);
            break;

        case "arrow":
            createArrow(context, shape.mousePos, shape.initialPos);
            break;
        
        case "line":
            createLine(context, shape.mousePos, shape.initialPos);
            break;

        case "text":
            createText(context, shape.initialPos, shape.text);
            break;
        case "image":
            createImage(context, shape.img , shape.initialPos, shape.mousePos)
           break; 

      }
    });
}

export default renderAllShapes
