import {create} from "zustand"
import { devtools, persist } from "zustand/middleware"


const propertyStore = (set) => ({
    properties: {
        currentItemStrokeColor: "green",
        currentItemStrokeWidth: 1,
        currentItemStrokeStyle: "solid",
        currentItemOpacity: 100,
        currentItemBackgroundColor: "blue",
        currentItemEdges: "round",
        currentItemFillStyle: "hachure",
        currentItemDrawingStyle: "normal",
        currentItemArrowType: "straight",
        currentItemFontFamily: 6,
        currentItemFontSize: 6,
        currentItemTextAlign:"right",
        
    },

    updateProperties: (propertyObj) => {
        set((state) => ({ properties: { ...state.properties, ...propertyObj } }))
    }
    
})


const usePropertyStore = create(devtools(persist(propertyStore, { name: "properties" })))

export default usePropertyStore