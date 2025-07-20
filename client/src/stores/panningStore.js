import {create} from "zustand"
import { devtools, persist } from "zustand/middleware"

const panningStore = (set) => ({
      offset:null,
      addOffset:(offsetObj) => {
          set({offset:offsetObj})
      }
})

const usePanningStore = create(devtools(persist(panningStore, {name:"panning"})))

export default usePanningStore


