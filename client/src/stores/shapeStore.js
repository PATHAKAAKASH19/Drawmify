import {create} from "zustand"
import { devtools, persist } from "zustand/middleware"


const shapeStore = (set) => ({
     shapesData:[],
     addShapes:(shapeData)=> {
        set(state => ({shapesData:[...state.shapesData, shapeData]}))
     }
})

const useShapeStore = create(devtools(persist(shapeStore,{name:"shapes"})))



export default useShapeStore