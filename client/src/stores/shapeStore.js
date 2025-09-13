import {create} from "zustand"
import { devtools, persist } from "zustand/middleware"
import {v4 as uid} from "uuid"


const shapeStore = (set) => ({
     shapesData:[],
     addShapes:(shapeData)=> {
        set(state => ({shapesData:[...state.shapesData, {id:uid() , ...shapeData}]}))
     },
     removeShape:(shapeId) => {
      set(state => ({shapesData : state.shapesData.filter(s => (s.id !== shapeId))}))
   },
    
    updateShape:(shapeData) => {
      set(state => ({shapesData : state.shapesData.map(s => s.id === shapeData.id? shapeData:s)}))
    },

   undo:()=> {
     set(state => ({shapesData:state.shapesData.slice(0, -1)}))
   },

   redo:() => {

   }
})

const useShapeStore = create(devtools(persist(shapeStore,{name:"shapes"})))


export default useShapeStore