import { create } from "zustand";
import { devtools, persist } from "zustand/middleware"


const scalingStore = (set) => ({
      scale:1,
      scaleOffset:{x:0,y:0},
      changeScaling:(scale, scaleOffset) => {
          set({scale, scaleOffset})
      }
})

const useScalingStore = create(devtools(persist(scalingStore, {name:"scaling"})))

export default useScalingStore

