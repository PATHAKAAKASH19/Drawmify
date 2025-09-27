import React, { useEffect, useState } from 'react'
import { MdOutlineHorizontalRule } from "react-icons/md";
import usePropertyStore from '../../stores/propertyStore';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { CgBorderStyleDashed } from "react-icons/cg";
import { GiBigWave } from "react-icons/gi";
import { PiWaveSineBold } from "react-icons/pi";
import { PiWaveSawtoothLight } from "react-icons/pi";
import { LuArrowDownToLine } from "react-icons/lu";
import { LuArrowUp } from "react-icons/lu";
import { LuArrowUpToLine } from "react-icons/lu";
import { FiArrowDown } from "react-icons/fi";
import { CgViewGrid } from "react-icons/cg";
import { RxTransparencyGrid } from "react-icons/rx";
import { TbBackground } from "react-icons/tb";
import { PiSelectionBackgroundThin } from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";
import useShapeStore from '../../stores/shapeStore';


export default function PropertiesPanel() {
  

  const [propObj, setPropObj] = useState({
    strokeColor: "#32CD32",
    strokeWidth: 1,
    strokeStyle: "normal",
    slopineess: "",
    opacity: "",
    Layers:"",
  });
    
  const updateProperties = usePropertyStore(state => state.updateProperties)
  const properties = usePropertyStore(state => state.properties)
  const removeShape = useShapeStore(state => state.removeShape)
  const createShapeCopy = useShapeStore(state => state.createShapeCopy)

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
          <div
            title="Thin"
            className="w-7 h-6 rounded-[0.2em] hover:cursor-pointer border flex justify-center items-center "
            onClick={() => changeProp("currentItemStrokeWidth", 1)}
          >
            <div className="w-3.5 h-[2px] bg-gray-500 rounded-2xl" />
          </div>
          <div
            title="Bold"
            className="w-7 h-6 rounded-[0.2em]  hover:cursor-pointer border flex justify-center items-center"
            onClick={() => changeProp("currentItemStrokeWidth", 2)}
          >
            <div className="w-3.5 h-[3px] bg-black rounded-2xl" />
          </div>
          <div
            title="Extra Bold"
            className="w-7 h-6 rounded-[0.2em]  hover:cursor-pointer border flex justify-center items-center"
            onClick={() => changeProp("currentItemStrokeWidth", 3)}
          >
            <div className="w-3.5 h-[6px] bg-black rounded-2xl" />
          </div>
        </div>
      </div>

      <div className="pb-5">
        <h2 className="text-[14px] capitalize pl-2">stroke style</h2>
        <div className="flex gap-3 pt-2 items-center pl-4">
          <div
            title="Solid"
            className="w-7 h-6 rounded-[0.2em] hover:cursor-pointer border flex justify-center items-center"
            onClick={() => changeProp("currentItemStrokeStyle", "solid")}
          >
            <MdOutlineHorizontalRule className="text-[20px] font-bold" />
          </div>
          <div
            title="Dashed"
            className="w-7 h-6 rounded-[0.2em]  hover:cursor-pointer border flex justify-center items-center"
            onClick={() => changeProp("currentItemStrokeStyle", "dashed")}
          >
            <CgBorderStyleDashed className="text-[20px] font-bold " />
          </div>
          <div
            title="Dotted"
            className="w-7 h-6 rounded-[0.2em]  hover:cursor-pointer border flex justify-center items-center"
            onClick={() => changeProp("currentItemStrokeStyle", "dotted")}
          >
            <HiOutlineDotsHorizontal className="text-[18px] font-bold" />
          </div>
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
            className="w-7 h-6 rounded-[0.2em] bg-transparent hover:cursor-pointer flex justify-center items-center"
            onClick={() => changeProp("currentItemBackgroundColor", "")}
          >
            <RxTransparencyGrid className="w-7 h-6" />
          </div>
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
          <div
            title="Solid"
            className="w-7 h-6 rounded-[0.2em] hover:cursor-pointer border flex justify-center items-center"
            onClick={() => changeProp("currentItemFillStyle", "solid")}
          >
            <div className="w-3 h-3 rounded-[0.2em] hover:cursor-pointer border bg-gray-700 "></div>
          </div>
          <div
            title="Cross-Hatch"
            className="w-7 h-6 rounded-[0.2em]  hover:cursor-pointer border flex justify-center items-center"
            onClick={() => changeProp("currentItemFillStyle", "cross-hatch")}
          >
            <CgViewGrid />
          </div>
          <div
            title="Hachure"
            className="w-7 h-6 rounded-[0.2em]  hover:cursor-pointer border flex justify-center items-center"
            onClick={() => changeProp("currentItemFillStyle", "Hachure")}
          >
            <TbBackground />
          </div>
        </div>
      </div>

      <div className="pb-5">
        <h2 className="text-[14px] capitalize pl-2">Drawing Style</h2>
        <div className="flex gap-3 pt-2 items-center pl-4">
          <div
            title="Cartoonist"
            className="w-7 h-6 rounded-[0.2em] hover:cursor-pointer border flex justify-center items-center"
            onClick={() => changeProp("currentItemDrawingStyle", "cartoonist")}
          >
            <GiBigWave />
          </div>
          <div
            title="Artist"
            className="w-7 h-6 rounded-[0.2em]  hover:cursor-pointer border  flex justify-center items-center"
            onClick={() => changeProp("currentItemDrawingStyle", "artist")}
          >
            <PiWaveSineBold />
          </div>
          <div
            title="Normal"
            className="w-7 h-6 rounded-[0.2em]  hover:cursor-pointer border  flex justify-center items-center"
            onClick={() => changeProp("currentItemDrawingStyle", "normal")}
          >
            <PiWaveSawtoothLight />
          </div>
        </div>
      </div>

      <div className="pb-5">
        <h2 className="text-[14px] capitalize pl-2">Layers</h2>
        <div className="flex gap-3 pt-2 items-center pl-4">
          <div
            title="Send To Back"
            className="w-7 h-6 rounded-[0.2em] hover:cursor-pointer border flex justify-center items-center"
            onClick={() => changeProp("currentItemDrawingStyle", "cartoonist")}
          >
            <LuArrowDownToLine />
          </div>
          <div
            title="Send Backward"
            className="w-7 h-6 rounded-[0.2em]  hover:cursor-pointer border  flex justify-center items-center"
            onClick={() => changeProp("currentItemDrawingStyle", "artist")}
          >
            <FiArrowDown />
          </div>
          <div
            title="Bring Forward"
            className="w-7 h-6 rounded-[0.2em]  hover:cursor-pointer border  flex justify-center items-center"
            onClick={() => changeProp("currentItemDrawingStyle", "normal")}
          >
            <LuArrowUp />
          </div>

          <div
            title="Bring To Front"
            className="w-7 h-6 rounded-[0.2em] hover:cursor-pointer border flex justify-center items-center"
            onClick={() => changeProp("currentItemDrawingStyle", "cartoonist")}
          >
            <LuArrowUpToLine />
          </div>
        </div>
      </div>

      <div className="pb-5">
        <h2 className="text-[14px] capitalize pl-2">Actions</h2>
        <div className="flex gap-3 pt-2 items-center pl-4">
          <div
            title="Copy"
            className="w-7 h-6 rounded-[0.2em] hover:cursor-pointer border flex justify-center items-center"
            onClick={() => createShapeCopy(properties?.selectedItemId)}
          >
            <PiSelectionBackgroundThin />
          </div>

          <div
            title="Delete"
            className="w-7 h-6 rounded-[0.2em] hover:cursor-pointer border flex justify-center items-center"
            onClick={() => removeShape(properties?.selectedItemId)}
          >
            <RiDeleteBinLine />
          </div>
        </div>
      </div>
    </div>
  );
}
