



   const createBoundingBox = (context, selectedShape, corner,dx, dy) => {

    let bBoxObj = BoundingBoxDimension(selectedShape, corner, dx, dy)
     
   
     context.beginPath();
     if (corner) {
        context.roundRect(
          bBoxObj.x ,
          bBoxObj.y ,
          bBoxObj.width,
          bBoxObj.height
        );
     } else {
        context.roundRect(
          bBoxObj.x + dx,
          bBoxObj.y + dy,
          bBoxObj.width,
          bBoxObj.height
        );
     }
   
    context.strokeStyle = "#8093f1";
    context.stroke();
     

     context.beginPath();
      bBoxObj.handles.forEach((handle) => {
        if (corner) {
              let x = handle.x - 5;
            let y = handle.y - 5;
            context.roundRect(x, y , 10, 10, 5);
        } else {
             let x = handle.x - 5;
            let y = handle.y - 5;
            context.roundRect(x + dx, y + dy, 10, 10, 5);
         }
        });
   
     context.fillStyle = "#8093f1";
     context.fill()
     context.stroke()
 
   }







const BoundingBoxDimension = (selectedShape, corner, dx, dy) => {
        let{ x1, y1, x2, y2 } = selectedShape;
    switch (corner) {
      case "top-left":
        x1 += dx;
        y1 += dy;
        break;
      case "top-right":
        x2 += dx;
        y1 += dy;
        break;
      case "bottom-left":
        x1 += dx;
        y2 += dy;
        break;
      case "bottom-right":
        x2 += dx;
        y2 += dy;
        break;

      case "top":
        y1 += dy;
        break;
      case "bottom":
        y2 += dy;
        break;
      case "right":
        x2 += dx;
        break;
      case "left":
        x1 += dx;
        break;
    }

     let bBox;

     if (selectedShape.shapeName === "rectangle" || selectedShape.shapeName === "image" || selectedShape.shapeName === "text") {
      
     
       bBox = {
         x: Math.min(x1, x2) - 20,
         y: Math.min(y1, y2)-20,
         width: Math.max(x1, x2) - Math.min(x2 , x1) + 40 ,
         height: Math.max(y1, y2 ) - Math.min(y2, y1) +40,
       };
     } else if (selectedShape.shapeName === "ellipse") {
      
  
       const cx = x1  ;
       const cy = y1;

       const rx = Math.abs(x2 - x1) /2;
       const ry = Math.abs(y2 - y1)/2 ;

       bBox = {
         x: (cx - rx) -20,
         y: (cy - ry)  - 20,
         width: 2 * rx +40,
         height: 2 * ry + 40,
       };
     } else if (selectedShape.shapeName === "line" || selectedShape.shapeName === "arrow") {
     
      
       bBox = {
        x: Math.min(x1, x2) -20,
        y: Math.min(y1, y2) - 20,
        width: Math.abs(x2 - x1) + 40,
        height: Math.abs(y2 - y1)+ 40,
       }
     } else if ( selectedShape.shapeName === "pencil") {
       
       const xs = selectedShape.points.map((p) => p.x);
       const ys = selectedShape.points.map((p) => p.y);
       const padding = 5; 
       bBox = {
         x: Math.min(...xs) - padding,
         y: Math.min(...ys) - padding,
         width: Math.max(...xs) - Math.min(...xs) + padding * 2,
         height: Math.max(...ys) - Math.min(...ys) + padding * 2,
       };
     } else if (selectedShape.shapeName === "diamond") {
       bBox = {
         x: x1 - Math.abs(x2 - x1) - 20,
         y: y1 - Math.abs(y2 - y1) - 20,
         width:  2*Math.abs(x2 - x1) + 40,
         height:  2*Math.abs(y2 - y1) + 40,
       };
     }

     let handles = [
       {
         x: bBox.x,
         y: bBox.y,
         cursor: "nwse-resize",
         position: "top-left",
       },
       {
         x: bBox.x + bBox.width / 2,
         y: bBox.y,
         cursor: "ns-resize",
         position: "top",
       },
       {
         x: bBox.x + bBox.width,
         y: bBox.y,
         cursor: "nesw-resize",
         position: "top-right",
       },
       {
         x: bBox.x,
         y: bBox.y + bBox.height / 2,
         cursor: "ew-resize",
         position: "left",
       },
       {
         x: bBox.x + bBox.width,
         y: bBox.y + bBox.height / 2,
         cursor: "ew-resize",
         position: "right",
       },
       {
         x: bBox.x,
         y: bBox.y + bBox.height,
         cursor: "nesw-resize",
         position: "bottom-left",
       },
       {
         x: bBox.x + bBox.width / 2,
         y: bBox.y + bBox.height,
         cursor: "ns-resize",
         position: "bottom",
       },
       {
         x: bBox.x + bBox.width,
         y: bBox.y + bBox.height,
         cursor: "nwse-resize",
         position: "bottom-right",
       },
     ];

     return {
       ...bBox,
       handles: handles,
     };
   };
export { createBoundingBox }

