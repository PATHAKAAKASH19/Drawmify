import React, { useEffect, useState } from 'react'
import useShapeStore from '../stores/shapeStore'

export default function UndoAndRedo() {

    const [undoState, setUndoState] = useState([])

    const [redoState, setRedoState] = useState([])
    const shapesData = useShapeStore(state => state.shapesData)
    const removeShape = useShapeStore(state => state.removeShape)
    const updateShape = useShapeStore(state =>  state.updateShape)
    

    const undo = () => {
        console.log(undoState)
        const removedShape = undoState.pop() 
        removeShape(removedShape.id)
        setRedoState(prev => [...prev , removedShape])
    }
    
    const redo = () => {
      
        console.log(redoState)
        const addShapeData = redoState.pop()
        updateShape(addShapeData)
        setUndoState(prev => [...prev, addShapeData])
    }

    return (
      <div className="flex absolute gap-5 bottom-13 right-10 ">
        <button
          type="button"
          onClick={undoState.length ? undo : null}
          className="w-20 h-10 border-2 flex rounded-[0.5em] justify-center items-center bg-black text-white"
        >
          undo
        </button>
        <button
          type="button"
          onClick={redoState.length ? redo : null}
          className="w-20 h-10 border-2 flex rounded-[0.5em] justify-center items-center bg-black text-white"
        >
          redo
        </button>
      </div>
    );
}
