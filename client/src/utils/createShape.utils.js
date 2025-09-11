import rough from "roughjs"

const createShape = (x1, y1, x2, y2, shapeName) => {

      const generator = rough.generator()

      let roughObj
      switch(shapeName) {
        
        case "rectangle":
              roughObj = generator.rectangle(x1, y1, x2 - x1, y2 - y1);
              break;

        case "diamond":
              roughObj = createDiamond(x1, y1, x2, y2, generator)
              break;

        case "ellipse": 
               roughObj = generator.ellipse(x1, y1, x2 - x1, y2 - y1);
               break;

        case "line":
               roughObj = generator.line(x1, y1, x2, y2) 
               break;

        case "arrow": 
              roughObj = createArrow(x1, y1, x2, y2, generator)
              break;

        case "pencil":
              roughObj;
              break;

        case "image":
             roughObj = generator.polygon()
             break;
        
        default:
             return     
      }
    
      return {x1, y1, x2, y2, shapeName,roughObj}

}


const createDiamond = (x1, y1, x2, y2, generator) => {
      let height = (y2 -y1)
      let width = (x2 - x1)

      let diamond = [
            [x1, y1 - height],
            [x1 + width, y1],
            [x1, y1 + height],
            [x1 - width, y1]
      ]

      return generator.polygon(diamond)
}

const createArrow = (x1, y1, x2, y2, generator) => {
            const arrowline = generator.line(x1, y1, x2, y2)
              const angle = Math.atan2(y2 - y1, x2 - x1);
           
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

            return {arrowline, arrowhead1, arrowhead2}
}

export default createShape
