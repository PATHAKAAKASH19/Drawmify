import {create} from "zustand"
import {devtools, persist} from "zustand/middleware" 


const toolStore = (set) => ({
     tool:"pencil",
     changeTool: (selectedTool) => {
          set({tool: selectedTool})   
     }
})


const useToolStore = create(devtools(
    persist(toolStore, {name:"toolStore"})
))



export default useToolStore


