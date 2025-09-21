import React, { useEffect, useState } from 'react'
import usePropertyStore from '../../stores/propertyStore';

export default function PropertiesPanel() {
  

  const [propObj, setPropObj] = useState({
    strokeColor: "#32CD32",
    strokeWidth: 1,
    strokeStyle: "normal",
    slopineess: "",
    opacity: "",
    Layers:"",
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
            className="w-7 h-6 rounded-[0.2em] bg-[#000000] hover:cursor-pointer"
            onClick={() => changeProp("currentItemStrokeColor", "#000000")}
          ></div>
          <div
            className="w-7 h-6 rounded-[0.2em] bg-[#d90429] hover:cursor-pointer"
            onClick={() => changeProp("currentItemStrokeColor", "#d90429")}
          ></div>
          <div
            className="w-7 h-6 rounded-[0.2em] bg-[#184e77] hover:cursor-pointer"
            onClick={() => changeProp("currentItemStrokeColor", "#184e77")}
          ></div>
          <div
            className="w-7 h-6 rounded-[0.2em] bg-[#7b2cbf] hover:cursor-pointer"
            onClick={() => changeProp("currentItemStrokeColor", "#7b2cbf")}
          ></div>
          <div
            className="w-7 h-6 rounded-[0.2em] bg-[#14746f] hover:cursor-pointer"
            onClick={() => changeProp("currentItemStrokeColor", "#14746f")}
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
        <div className="flex gap-3 pt-2 items-center pl-4">
          <div className="w-7 h-6 rounded-[0.2em] hover:cursor-pointer border"></div>
          <div className="w-7 h-6 rounded-[0.2em]  hover:cursor-pointer border"></div>
          <div className="w-7 h-6 rounded-[0.2em]  hover:cursor-pointer border"></div>
        </div>
      </div>

      <div className="pb-5">
        <h2 className="text-[14px] capitalize pl-2">background Color</h2>
        <div className="flex gap-3 pt-2 items-center justify-center">
          <div
            className="w-7 h-6 rounded-[0.2em] bg-[#c8b6ff] hover:cursor-pointer"
            onClick={() => changeProp("currentItemBackgroundColor", "#c8b6ff")}
          ></div>
          <div
            className="w-7 h-6 rounded-[0.2em] bg-[#bde0fe] hover:cursor-pointer"
            onClick={() => changeProp("currentItemBackgroundColor", "#bde0fe")}
          ></div>
          <div
            className="w-7 h-6 rounded-[0.2em] bg-[#f7b267] hover:cursor-pointer"
            onClick={() => changeProp("currentItemBackgroundColor", "#f7b267")}
          ></div>
          <div
            className="w-7 h-6 rounded-[0.2em] bg-[#ffc8dd] hover:cursor-pointer"
            onClick={() => changeProp("currentItemBackgroundColor", "#ffc8dd")}
          ></div>
          <div
            className="w-7 h-6 rounded-[0.2em] bg-[#74c69d] hover:cursor-pointer"
            onClick={() => changeProp("currentItemBackgroundColor", "#74c69d")}
          ></div>
        </div>
      </div>

      <div className="pb-5">
        <h2 className="text-[14px] capitalize pl-2">background Style</h2>
        <div className="flex gap-3 pt-2 items-center pl-4">
          <div className="w-7 h-6 rounded-[0.2em] hover:cursor-pointer border">
          
          </div>
          <div className="w-7 h-6 rounded-[0.2em]  hover:cursor-pointer border">
            2
          </div>
          <div className="w-7 h-6 rounded-[0.2em]  hover:cursor-pointer border">
            3
          </div>
        </div>
      </div>
    </div>
  );
}
