
const createPencil = (context, pointArray) => {

    context.beginPath()
    context.moveTo(pointArray[0]?.x, pointArray[0]?.y)

    let i = 1
    while(i < pointArray.length){
        context.lineTo(pointArray[i].x, pointArray[i].y)
        i++
    }
    context.stroke()
}

const isPointInPencil = (x, y, pointArray) => {
      let i = 0
      while(i < pointArray.length && pointArray.length){
      
        if(x === pointArray[i].x && y === pointArray[i].y){
            return true
        }
        i++
      }

      return false
  }

  export {isPointInPencil, createPencil}
