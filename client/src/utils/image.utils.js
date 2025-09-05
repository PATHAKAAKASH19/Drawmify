const createImage = (context, img , initialPos,mousePos) => {
   
      const image = new Image()
      image.src = img

      const width = mousePos?.x - initialPos?.x
      const height = mousePos?.y - initialPos?.y
      context.drawImage(image, initialPos?.x, initialPos?.y, width, height);

      
}

 const isPointInImage = (x, y, initialPos, mousePos) => {
    const left = Math.min(initialPos?.x, mousePos?.x);
    const right = Math.max(initialPos?.x, mousePos?.x);
    const top = Math.min(initialPos?.y, mousePos?.y);
    const bottom = Math.max(initialPos?.y,mousePos?.y);
    
    return x >= left && x <= right && y >= top && y <= bottom;
  }


export {createImage, isPointInImage}