import {create} from "zustand"
import { devtools, persist } from "zustand/middleware"


const propertyStore = (set) => ({
    properties: {
        currentItemStrokeColor: "green",
        currentItemStrokeWidth: 4,
        currentItemStrokeStyle: "solid",
        currentItemOpacity: 100,
        currentItemBackgroundColor: "blue",
        currentItemEdges: "round",
        currentItemFillStyle: "hachure",
        currentItemSlopiness: 2,
        currentItemArrowType: "straight",
        currentItemFontFamily: 6,
        currentItemFontSize: 6,
        currentItemTextAlign:"right",
        
    },

    changeProperties: (propertyObj) => {
        set((state) => ({ properties: { ...state.properties, propertyObj } }))
    }
    
})


const usePropertyStore = create(devtools(persist(propertyStore, { name: "properties" })))

export default usePropertyStore