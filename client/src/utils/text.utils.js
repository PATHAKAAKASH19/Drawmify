


const createText = (context, initialPos, text) => {
    
    context.font = "normal 25px sans-serif";
    context.textBaseline = "top";
    context.fillText( text, initialPos?.x, initialPos?.y)
    
}


const isPointInText = (x, y, initialPos) => {
      
}


export {createText, isPointInText}