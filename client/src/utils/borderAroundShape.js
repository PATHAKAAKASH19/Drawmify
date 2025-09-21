



   const createBoundingBox = (context, selectedShape, dx, dy) => {

    let bBoxObj = BoundingBoxDimension(selectedShape)
     
    context.beginPath();
    context.rect(bBoxObj.x + dx, bBoxObj.y + dy, bBoxObj.width, bBoxObj.height);
    context.strokeStyle = "blue";
    context.stroke();
     

     context.beginPath()
     context.fillStyle = "lightblue";
      
        bBoxObj.handles.forEach((handle) => {
          if (handle.position === "top-left") {
            let x = handle.x - 5;
            let y = handle.y - 5;

            context.fillRect(x + dx, y + dy, 10, 10);
          } else if (handle.position === "top-right") {
            let x = handle.x - 5;
            let y = handle.y - 5;

            context.fillRect(x + dx, y + dy, 10, 10);
          } else if (handle.position === "bottom-right") {
            let x = handle.x - 5;
            let y = handle.y - 5;

            context.fillRect(x + dx, y + dy, 10, 10);
          } else if (handle.position === "bottom-left") {
            let x = handle.x - 5;
            let y = handle.y - 5;

            context.fillRect(x + dx, y + dy, 10, 10);
          } 
        });
   
     context.stroke()
 
   }







const BoundingBoxDimension = (selectedShape) => {
     

     let bBox;

     if (selectedShape.shapeName === "rectangle") {
      
        const { x1, y1, x2, y2 } = selectedShape;
       bBox = {
         x: x1 -10,
         y: y1 -10,
         width: (x2 - x1) +20 ,
         height: (y2 - y1) + 20 ,
       };
     } else if (selectedShape.shapeName === "ellipse") {
      
        const { x1, y1, x2, y2 } = selectedShape;
       const cx = x1;
       const cy = y1;

       const rx = (x2 - x1)/2;
       const ry = (y2 - y1)/2;

       bBox = {
         x: cx - rx,
         y: cy - ry,
         width: 2 * rx,
         height: 2* ry,
       };
     } else if (selectedShape.shapeName === "line") {
     
        const { x1, y1, x2, y2 } = selectedShape;
       bBox = {
        x: Math.min(x1, x2),
        y: Math.min(y1, y2),
        width: Math.abs(x2 - x1),
        height: Math.abs(y2 - y1)
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

