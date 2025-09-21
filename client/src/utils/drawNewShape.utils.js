// const createArrow = (context, mousePos, initialPos) => {
//   context.beginPath();
//   context.moveTo(initialPos?.x, initialPos?.y);
//   context.lineTo(mousePos?.x, mousePos?.y);
//   context.stroke();

//   const angle = Math.atan2(
//     mousePos?.y - initialPos?.y,
//     mousePos?.x - initialPos?.x
//   );
//   const headLength = 10;

//   context.beginPath();
//   context.moveTo(mousePos?.x, mousePos?.y);
//   context.lineTo(
//     mousePos?.x - headLength * Math.cos(angle - Math.PI / 6),
//     mousePos?.y - headLength * Math.sin(angle - Math.PI / 6)
//   );
//   context.lineTo(
//     mousePos?.x - headLength * Math.cos(angle + Math.PI / 6),
//     mousePos?.y - headLength * Math.sin(angle + Math.PI / 6)
//   );
//   context.closePath();
//   context.stroke();
// };


//  const createDiamond = (context, mousePos, initialPos) => {
//    const height = 2 * (mousePos?.y - initialPos?.y);
//    const width = 2 * (mousePos?.x - initialPos?.x);

//    context.beginPath();
//    context.lineTo(initialPos?.x, initialPos?.y - height / 2);
//    context.lineTo(initialPos?.x + width / 2, initialPos?.y);
//    context.lineTo(initialPos?.x, initialPos?.y + height / 2);
//    context.lineTo(initialPos?.x - width / 2, initialPos?.y);
//    context.closePath();
//    context.stroke();
//  };


//    const createEllipse = (context, mousePos, initialPos) => {
//      const radiusX = Math.abs(mousePos?.x - initialPos?.x) / 2;
//      const radiusY = Math.abs(mousePos?.y - initialPos?.y) / 2;
//      context.beginPath();
//      context.ellipse(
//        initialPos?.x,
//        initialPos?.y,
//        radiusX,
//        radiusY,
//        Math.PI / 180,
//        0,
//        Math.PI * 2
//      );
//      context.stroke();
//    };


//    const createImage = (context, img, initialPos, mousePos) => {
//      const image = new Image();
//      image.src = img;

//      const width = mousePos?.x - initialPos?.x;
//      const height = mousePos?.y - initialPos?.y;
//      context.drawImage(image, initialPos?.x, initialPos?.y, width, height);
//    };


//      const createLine = (context, mousePos, initialPos) => {
//        context.beginPath();
//        context.moveTo(initialPos?.x, initialPos?.y);
//        context.lineTo(mousePos?.x, mousePos?.y);
//        context.stroke();
//      };


// const createPencil = (context, pointArray) => {

//     context.beginPath()
//     context.moveTo(pointArray[0]?.x, pointArray[0]?.y)

//     let i = 1
//     while(i < pointArray.length){
//         context.lineTo(pointArray[i].x, pointArray[i].y)
//         i++
//     }
//     context.stroke()
    
// }


//  const createRectangle = (context, mousePos, initialPos, shapeData) => {
//    const { x1, y1, x2, y2 } = shapeData;
//    const dx = mousePos?.x - initialPos?.x;
//    const dy = mousePos?.y - initialPos?.y;

//    const rectX1 = x1 + dx - 20;
//    const rectY1 = y1 + dy - 20;
//    const rectX2 = x2 + dx + 20;
//    const rectY2 = y2 + dy + 20;

//    context.beginPath();
//    context.rect(rectX1, rectY1, rectX2 - rectX1, rectY2 - rectY1);
//    context.strokeStyle = "blue";
//    context.stroke();
//  };


// const createText = (context, initialPos, text) => {
//   context.font = "normal 25px sans-serif";
//   context.textBaseline = "top";
//   context.fillText(text, initialPos?.x, initialPos?.y);
// };




