


const createText = (context, initialPos, text) => {
    
    context.font = "semi-bold 25px sans-serif";
    context.fillText( text, initialPos?.x, initialPos?.y )
}

export default createText