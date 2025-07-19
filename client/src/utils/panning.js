const panning = (context, mousePos, initialPos) => {
        
        const offsetX = mousePos?.x - initialPos?.x
        const offsetY = mousePos?.y - initialPos?.y
        context.save();
        context.translate(offsetX, offsetY); 
        renderAllShapes(context, shapesData);
        context.restore();

}

export default panning