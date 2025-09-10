import rough from "roughjs"

const createShape = (x1, y1, x2, y2, shapeName) => {

      const generator = rough.generator()

      let roughObj
      switch(shapeName) {
        
        case "rectangle":
              roughObj = generator.rectangle(x1, y1, x2 - x1, y2 - y1);
              break;

        case "diamond":{
              let height = (y2 -y1)
              let width = (x2 - x1)

              let diamond = [
                [x1, y1 - height],
                [x1 + width, y1],
                [x1, y1 + height],
                [x1 - width, y1]
              ]
              roughObj = generator.polygon(diamond)
              break;

        }

        case "ellipse": 
              roughObj = generator.ellipse(x1, y1, x2 - x1, y2 - y1);
              break;
    

        case "line":
              roughObj = generator.line(x1, y1, x2, y2) 
               break;
        
        case "arrow": {
              roughObj = generator.line(x1, y1, x2, y2)
              const angle = Math.atan2(y2 - y1, x2 - x1);
              const headAngle = 30 * Math.PI / 180;
              const headLength = 10;

              const arrowPoint1 = [
                 x2 - headLength * Math.cos(angle - Math.PI / 6),
                 y2 - headLength * Math.sin(angle - Math.PI / 6)
               ];
    
              const arrowPoint2 = [
                x2 -  headLength * Math.cos(angle + Math.PI / 6),
                y2 - headLength * Math.sin(angle + Math.PI / 6)
              ];

              const arrowhead1 = generator.line(x2, y2, arrowPoint1[0], arrowPoint1[1])
              const arrowhead2 = generator.line(x2, y2, arrowPoint2[0], arrowPoint2[1])
              break;
        }

        case "image":
             roughObj = generator.polygon()
             break;

        default:
             return     
      }
    
      return {x1, y1, x2, y2, shapeName,roughObj}
}

export default createShape
