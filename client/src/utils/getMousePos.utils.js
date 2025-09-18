  const getMousePos = (canvas, evt, offset, scale, scaleOffset) => {
    const rect = canvas.getBoundingClientRect();

    let cordinates
    if (evt.touches) {
      cordinates= {
        x:
          (evt.touches?.[0]?.clientX - rect.left) * (canvas.width / rect.width),
        y:
          (evt.touches?.[0]?.clientY - rect.top) *
          (canvas.height / rect.height),
      };
    } else {
        cordinates = {
         x: (evt.clientX - rect.left) * (canvas.width / rect.width),
         y: (evt.clientY - rect.top) * (canvas.height / rect.height),
       };
    }

    return {
      x: (cordinates.x - offset?.x * scale + scaleOffset.x) / scale,
      y: (cordinates.y - offset?.y * scale + scaleOffset.y) / scale,
    };
  };


export default getMousePos