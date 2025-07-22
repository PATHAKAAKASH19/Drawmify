const createImage = (context, img , initialPos,mousePos) => {
   
      const image = new Image()
      image.src = img

      const width = mousePos?.x - initialPos?.x
      const height = mousePos?.y - initialPos?.y
      context.drawImage(image, initialPos?.x, initialPos?.y, width, height);

      
}


export {createImage}