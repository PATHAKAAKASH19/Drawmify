import rough from "roughjs"

const createShape = (x1, y1, x2, y2, shapeName, optionObj) => {

      const generator = rough.generator()

      let strokeStyle
      switch (optionObj.currentItemStrokeStyle) {
            case "solid":
                  strokeStyle = []
                  break;
            case "dashed":
                  strokeStyle = [20, 8];
                  break;
            case "dotted":
                  strokeStyle = [4, 7];
                  break;
      }
      

      let DrawingStyle = {}
      switch (optionObj?.currentItemDrawingStyle) {
        case "cartoonist":
            DrawingStyle = {
                  roughness: 6,
                  bowing:2,
           };
          break;
        case "artist":
            DrawingStyle = {
                  roughness:3,
                  bowing: 1
          };
          break;
        case "normal":
            DrawingStyle = {
                  roughness: 0,
                  bowing: 0
          };
          break;
      }
      
   
      let propertiesObj = {
        stroke: optionObj.currentItemStrokeColor,
        strokeWidth: optionObj.currentItemStrokeWidth,
        fill: optionObj.currentItemBackgroundColor,
        fillStyle: optionObj.currentItemFillStyle,
        fillWeight: 3,
        hachureAngle: 60,
        hachureGap: 20,
        roughness:DrawingStyle?.roughness,
        bowing: DrawingStyle?.bowing,

        strokeLineDash: strokeStyle,
        simplification: 0.9,
      };
      
      let roughObj
      switch(shapeName) {
        
        case "rectangle":
              roughObj = generator.rectangle(x1, y1, x2 - x1, y2 - y1, propertiesObj);
              break;

        case "diamond":
              roughObj = createDiamond(x1, y1, x2, y2, propertiesObj, generator)
              break;

        case "ellipse": 
               roughObj = generator.ellipse(x1, y1, x2 - x1, y2 - y1, propertiesObj);
               break;

        case "line":
               roughObj = generator.line(x1, y1, x2, y2, propertiesObj) 
               break;

        case "arrow": 
              roughObj = createArrow(x1, y1, x2, y2, propertiesObj, generator)
              break;

        default:
             return     
      }
    
      return {x1, y1, x2, y2, shapeName, roughObj, propertiesObj:optionObj}

}


const createDiamond = (x1, y1, x2, y2, propertyObj, generator) => {
      let height = (y2 -y1)
      let width = (x2 - x1)

      let diamond = [
            [x1, y1 - height],
            [x1 + width, y1],
            [x1, y1 + height],
            [x1 - width, y1]
      ]

      return generator.polygon(diamond, propertyObj)
}

const createArrow = (x1, y1, x2, y2, propertyObj, generator) => {
            const arrowline = generator.line(x1, y1, x2, y2, propertyObj)
            const angle = Math.atan2(y2 - y1, x2 - x1);
           
            const headLength = 15;

            const arrowPoint1 = [
                 x2 - headLength * Math.cos(angle - Math.PI / 6),
                 y2 - headLength * Math.sin(angle - Math.PI / 6)
            ];
    
            const arrowPoint2 = [
                x2 -  headLength * Math.cos(angle + Math.PI / 6),
                y2 - headLength * Math.sin(angle + Math.PI / 6)
            ];

            const arrowhead1 = generator.line(x2, y2, arrowPoint1[0], arrowPoint1[1], propertyObj)
            const arrowhead2 = generator.line(x2, y2, arrowPoint2[0], arrowPoint2[1], propertyObj)

            return {arrowline, arrowhead1, arrowhead2}
}

export default createShape
