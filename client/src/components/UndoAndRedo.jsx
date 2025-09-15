import useShapeStore from '../stores/shapeStore'

export default function UndoAndRedo() {
    
    const undo = useShapeStore(state => state.undo)
    const redo = useShapeStore(state =>  state.redo)
    const clearCanvas = useShapeStore(state =>  state.clearCanvas)
    // const prevState = useShapeStore((state) => state.prevState);
    // const nextState = useShapeStore((state) => state.nextState);
    

    return (
      <div className="flex absolute gap-5 bottom-13 right-10 ">
        <button
          type="button"
          onClick={undo}
          className="w-20 h-10 border-2 flex rounded-[0.5em] justify-center items-center bg-black text-white"
        >
          undo
        </button>
        <button
          type="button"
          onClick={redo}
          className="w-20 h-10 border-2 flex rounded-[0.5em] justify-center items-center bg-black text-white"
        >
          redo
        </button>

        <button
          type="button"
          onClick={clearCanvas}
          className="w-20 h-10 border-2 flex rounded-[0.5em] justify-center items-center bg-black text-white"
        >
          clear
        </button>
      </div>
    );
}
