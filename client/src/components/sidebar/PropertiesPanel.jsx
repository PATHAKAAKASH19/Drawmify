import React, { useEffect, useState } from 'react'

export default function PropertiesPanel() {
  

  const [propObj, setPropObj] = useState(null)
    

  const changeProp = (e) => {


    setPropObj(prev =>  ({...prev, [e.traget.name]:e.target.value}))
  }
  useEffect(() => {

  }, [])



  return (
    <div>
      <div>
        <label>stroke color</label>
        <input type="text" name="strokeColor" value={propObj?.strokeColor} onChange={changeProp}/>
   
      </div>
      <h2>stroke width</h2>
      <input type="num" value={ propObj?.strokeWidth} onChange />
      <h2>backgroundcolor</h2>
      <h2>stroke style</h2>
    </div>
  );
}
