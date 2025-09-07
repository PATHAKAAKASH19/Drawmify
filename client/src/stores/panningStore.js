import {create} from "zustand"
import { devtools, persist } from "zustand/middleware"

const panningStore = (set) => ({
      offset:{x:0,y:0},
      addOffset:(offsetObj) => {
          set({offset:offsetObj})
      }
})

const usePanningStore = create(devtools(persist(panningStore, {name:"panning"})))

export default usePanningStore


