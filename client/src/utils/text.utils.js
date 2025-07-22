


const createText = (context, initialPos, text) => {
    
    context.font = "25px sans-serif";
    context.fillText( text, initialPos?.x, initialPos?.y )
}

export {createText}