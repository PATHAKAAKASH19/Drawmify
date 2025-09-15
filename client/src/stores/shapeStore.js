import {create} from "zustand"
import { devtools, persist } from "zustand/middleware"
import {v4 as uid} from "uuid"


const shapeStore = (set) => ({
     prevState:[],
     shapesData: [],
     nextState:[],
     addShapes:(shapeData)=> {
       set(state => {
         return {
           prevState:[...state.prevState, state.shapesData],
           shapesData: [...state.shapesData, { id: uid(), ...shapeData }],
           nextState:[]
         }
       })
     },
     removeShape:(shapeId) => {
       set(state => {
         return {
           prevState: [...state.prevState, state.shapesData],
           shapesData: state.shapesData.filter(s => (s.id !== shapeId)),
           nextState:[],
         }
       })
   },
    
    updateShape:(shapeData) => {
      set(state => {
        return {
          prevState: [...state.prevState, state.shapesData],
          shapesData: state.shapesData.map(s => s.id === shapeData.id ? shapeData : s),
          nextState: []
        }
      })
    },

   undo:()=> {
     set(state => {
       if (state.prevState.length === 0) return state
       const previous = state.prevState[state.prevState.length - 1]
       const newPrev = state.prevState.slice(0,-1)
      return {
        prevState:[...newPrev],
        shapesData:previous,
        nextState:[...state.nextState,state.shapesData ], 
       }
       
     })
   },

  redo: () => {
    set((state) => {
       
      if (state.nextState.length === 0) return state
      const next = state.nextState[state.nextState.length - 1]
      const newNext = state.nextState.slice(0, -1)
      return {
        prevState: [...state.prevState,  state.shapesData],
        shapesData: next,
        nextState: [...newNext]
      }
     })

  },
   
  clearCanvas: () => {
    set({
      prevState: [],
      shapesData:[],
      nextState:[]
     })
   }


})

const useShapeStore = create(
  devtools(
    persist(
      shapeStore, {
        name: "shapes",
       partialize:(state) => ({shapesData:state.shapesData})
})))


export default useShapeStore