



import {getStroke} from "perfect-freehand"



  const createPencil = (newPoints, context, propertiesObj) => {
       
        const outlinePoints = getStroke(newPoints, {
          size:  8*propertiesObj.currentItemStrokeWidth,
          thinning: 0.65,
          smoothing: 0.99,
          streamline: 0.89,
         
            start: {
            cap: true,
            taper: 0,
            easing: (t) => t,
          },
            end: {
            cap: true,
            taper: 50,
            easing: (t) => t,
          },
        })
    console.log(propertiesObj.currentItemStrokeWidth)
    
     

     
        const pathData = getSvgPathFromStroke(outlinePoints)
        let myPath = new Path2D(pathData)
        context.fillStyle = propertiesObj.currentItemStrokeColor;
       
        context.fill(myPath)
  }
  





  

function getSvgPathFromStroke(points, closed = true) {
    const average = (a, b) => (a + b) / 2;
    const len = points.length;

    if (len < 4) {
      return ``;
    }

    let a = points[0];
    let b = points[1];
    const c = points[2];

    let result = `M${a[0].toFixed(2)},${a[1].toFixed(2)} Q${b[0].toFixed(
      2
    )},${b[1].toFixed(2)} ${average(b[0], c[0]).toFixed(2)},${average(
      b[1],
      c[1]
    ).toFixed(2)} T`;

    for (let i = 2, max = len - 1; i < max; i++) {
      a = points[i];
      b = points[i + 1];
      result += `${average(a[0], b[0]).toFixed(2)},${average(
        a[1],
        b[1]
      ).toFixed(2)} `;
    }

    if (closed) {
      result += "Z";
    }

    return result;
  }






  export {createPencil}
