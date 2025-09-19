import React, { useEffect, useState } from 'react'
import usePropertyStore from '../../stores/propertyStore';

export default function PropertiesPanel() {
  

  const [propObj, setPropObj] = useState({
    strokeColor: "#32CD32",
  });
    
  const updateProperties = usePropertyStore(state =>  state.updateProperties)

  const changeProp = (propName, value) => {

  
    setPropObj(prev => ({ ...prev, [propName]: value }))
    updateProperties({[propName]: value})
  }
 


  return (
    <div className="absolute top-10 w-60 left-6 shadow-emerald-200 shadow-2xl rounded-xl p-3 bg-white">
      <div className="pb-5">
        <h2 className="text-[14px]  capitalize pl-2">stroke color</h2>
        <div className="flex gap-3 pt-2 items-center justify-center">
          <div
            className="w-7 h-6 rounded-[0.2em] bg-[#0D2149] hover:cursor-pointer"
            onClick={() => changeProp("currentItemStrokeColor", "#0D2149")}
          ></div>
          <div
            className="w-7 h-6 rounded-[0.2em] bg-[#208AAE] hover:cursor-pointer"
            onClick={() => changeProp("currentItemStrokeColor", "#208AAE")}
          ></div>
          <div
            className="w-7 h-6 rounded-[0.2em] bg-[#208AAE] hover:cursor-pointer"
            onClick={() => changeProp("currentItemStrokeColor", "#208AAE")}
          ></div>
          <div
            className="w-7 h-6 rounded-[0.2em] bg-[#28666E] hover:cursor-pointer"
            onClick={() => changeProp("currentItemStrokeColor", "#28666E")}
          ></div>
          <div
            className="w-7 h-6 rounded-[0.2em] bg-[#7C9885] hover:cursor-pointer"
            onClick={() => changeProp("currentItemStrokeColor", "#7C9885")}
          ></div>
        </div>
      </div>

      <div className="pb-5">
        <h2 className="text-[14px] capitalize pl-2">background Color</h2>
        <div className="flex gap-3 pt-2 items-center justify-center">
          <div
            className="w-7 h-6 rounded-[0.2em] bg-[#ffd6ff] hover:cursor-pointer"
            onClick={() => changeProp("currentItemBackgroundColor", "#ffd6ff")}
          ></div>
          <div
            className="w-7 h-6 rounded-[0.2em] bg-[#e7c6ff] hover:cursor-pointer"
            onClick={() => changeProp("currentItemBackgroundColor", "#e7c6ff")}
          ></div>
          <div
            className="w-7 h-6 rounded-[0.2em] bg-[#c8b6ff] hover:cursor-pointer"
            onClick={() => changeProp("currentItemBackgroundColor", "#c8b6ff")}
          ></div>
          <div
            className="w-7 h-6 rounded-[0.2em] bg-[#b8c0ff] hover:cursor-pointer"
            onClick={() => changeProp("currentItemBackgroundColor", "#b8c0ff")}
          ></div>
          <div
            className="w-7 h-6 rounded-[0.2em] bg-[#bbd0ff] hover:cursor-pointer"
            onClick={() => changeProp("currentItemBackgroundColor", "#bbd0ff")}
          ></div>
        </div>
      </div>

      <div className="pb-5">
        <h2 className="text-[14px] capitalize pl-2">stroke width</h2>
        <div className="flex gap-3 pt-2 items-center pl-4">
          <div className="w-7 h-6 rounded-[0.2em] hover:cursor-pointer border"></div>
          <div className="w-7 h-6 rounded-[0.2em]  hover:cursor-pointer border">
            2
          </div>
          <div className="w-7 h-6 rounded-[0.2em]  hover:cursor-pointer border">
            3
          </div>
        </div>
      </div>

      <div className="pb-5">
        <h2 className="text-[14px] capitalize pl-2">stroke style</h2>
        <div className="flex gap-3 pt-2 items-center p-4">
          <div className="w-7 h-6 rounded-[0.2em] hover:cursor-pointer border"></div>
          <div className="w-7 h-6 rounded-[0.2em]  hover:cursor-pointer border"></div>
          <div className="w-7 h-6 rounded-[0.2em]  hover:cursor-pointer border"></div>
        </div>
      </div>
    </div>
  );
}
