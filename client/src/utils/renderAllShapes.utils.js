
import {createRectangle} from "./rectangle.utils";
import   {createArrow} from "./arrow.utils";
import   {createDiamond} from "./diamond.utils";
import  { createLine} from "./line.utils";
import   {createEllipse} from "./ellipse.utils"
import  { createText} from "./text.utils";
import   {createImage} from "./image.utils";



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
