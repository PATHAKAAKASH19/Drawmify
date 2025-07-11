import React, { useEffect, useRef, useState } from 'react';
import { Pen, Eraser, Square, Circle } from 'lucide-react';

// Headless Pencil Component - Contains all drawing logic
const PencilTool = ({ 
  isActive, 
  canvasRef, 
  contextRef, 
  color = '#000000', 
  width = 5,
  onColorChange,
  onWidthChange 
}) => {
  const [isDrawing, setIsDrawing] = useState(false);

  // Initialize canvas context when pencil becomes active
  useEffect(() => {
    if (!isActive || !contextRef.current) return;
    
    const context = contextRef.current;
    context.lineCap = "round";
    context.strokeStyle = color;
    context.lineWidth = width;
  }, [isActive, color, width]);

  // Update context properties when settings change
  useEffect(() => {
    if (!isActive || !contextRef.current) return;
    
    contextRef.current.strokeStyle = color;
    contextRef.current.lineWidth = width;
  }, [color, width, isActive]);

  const getMousePos = (canvas, evt) => {
    const rect = canvas.getBoundingClientRect();
    
    if (evt.touches) {
      return {
        x: (evt.touches?.[0]?.clientX - rect.left) * (canvas.width / rect.width),
        y: (evt.touches?.[0]?.clientY - rect.top) * (canvas.height / rect.height),
      };
    }
    
    return {
      x: (evt.clientX - rect.left) * (canvas.width / rect.width),
      y: (evt.clientY - rect.top) * (canvas.height / rect.height)
    };
  };

  const startDrawing = (e) => {
    if (!isActive) return;
    
    const mousePos = getMousePos(canvasRef.current, e);
    contextRef.current.beginPath();
    contextRef.current.moveTo(mousePos.x, mousePos.y);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    if (!isActive) return;
    
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = (e) => {
    if (!isDrawing || !isActive) return;
    
    const mousePos = getMousePos(canvasRef.current, e);
    contextRef.current.lineTo(mousePos.x, mousePos.y);
    contextRef.current.stroke();
  };

  // Return event handlers for the canvas
  const eventHandlers = isActive ? {
    onMouseDown: startDrawing,
    onMouseMove: draw,
    onMouseUp: finishDrawing,
    onMouseLeave: finishDrawing,
    onTouchStart: startDrawing,
    onTouchMove: draw,
    onTouchEnd: finishDrawing,
  } : {};

  // Settings UI (only renders when active)
  const SettingsPanel = () => {
    if (!isActive) return null;
    
    return (
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <h3 className="font-medium mb-3 text-gray-800">Pencil Settings</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => onColorChange?.(e.target.value)}
              className="w-12 h-8 rounded border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Width: {width}px
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={width}
              onChange={(e) => onWidthChange?.(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>
    );
  };

  return {
    eventHandlers,
    SettingsPanel,
    isDrawing,
    cursor: isActive ? 'cursor-crosshair' : 'cursor-default'
  };
};

// Main Drawing App Component
const DrawingApp = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [selectedTool, setSelectedTool] = useState('pencil');
  const [pencilColor, setPencilColor] = useState('#000000');
  const [pencilWidth, setPencilWidth] = useState(5);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 800;
    canvas.height = 600;

    const context = canvas.getContext("2d");
    contextRef.current = context;
  }, []);

  // Initialize Pencil Tool
  const pencilTool = PencilTool({
    isActive: selectedTool === 'pencil',
    canvasRef,
    contextRef,
    color: pencilColor,
    width: pencilWidth,
    onColorChange: setPencilColor,
    onWidthChange: setPencilWidth
  });

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
  };

  const ToolButton = ({ tool, icon: Icon, label, isSelected, onClick }) => (
    <button
      onClick={() => onClick(tool)}
      className={`p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-1 ${
        isSelected 
          ? 'border-blue-500 bg-blue-50 text-blue-600' 
          : 'border-gray-300 hover:border-gray-400 text-gray-600'
      }`}
      title={label}
    >
      <Icon size={20} />
      <span className="text-xs">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Drawing Tools</h2>
        
        {/* Tool Selection */}
        <div className="grid grid-cols-2 gap-2">
          <ToolButton
            tool="pencil"
            icon={Pen}
            label="Pencil"
            isSelected={selectedTool === 'pencil'}
            onClick={setSelectedTool}
          />
          <ToolButton
            tool="eraser"
            icon={Eraser}
            label="Eraser"
            isSelected={selectedTool === 'eraser'}
            onClick={setSelectedTool}
          />
          <ToolButton
            tool="rectangle"
            icon={Square}
            label="Rectangle"
            isSelected={selectedTool === 'rectangle'}
            onClick={setSelectedTool}
          />
          <ToolButton
            tool="circle"
            icon={Circle}
            label="Circle"
            isSelected={selectedTool === 'circle'}
            onClick={setSelectedTool}
          />
        </div>

        {/* Pencil Settings Panel (only shows when pencil is active) */}
        <pencilTool.SettingsPanel />

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={clearCanvas}
            className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Clear Canvas
          </button>
        </div>

        {/* Tool Info */}
        <div className="mt-6 p-3 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-700 mb-2">Current Tool</h4>
          <p className="text-sm text-gray-600 capitalize">{selectedTool}</p>
          {selectedTool === 'pencil' && (
            <div className="mt-2 text-xs text-gray-500">
              Click and drag to draw freehand
              <br />
              Drawing: {pencilTool.isDrawing ? 'Yes' : 'No'}
            </div>
          )}
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="relative">
          <canvas
            ref={canvasRef}
            {...pencilTool.eventHandlers}
            className={`border-2 border-gray-300 rounded-lg shadow-lg bg-white ${pencilTool.cursor}`}
          />
          
          {selectedTool !== 'pencil' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
              <div className="text-white text-center">
                <p className="text-lg font-medium">Select Pencil Tool</p>
                <p className="text-sm opacity-75">Choose the pencil from the sidebar to start drawing</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DrawingApp;