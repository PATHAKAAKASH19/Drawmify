


const createText = (context, initialPos, text) => {
    
    context.font = "24px sans-serif";
    context.fillText( text, initialPos?.x, initialPos?.y )
}

export default createText