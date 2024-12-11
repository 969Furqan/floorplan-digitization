import React, { useLayoutEffect, useRef } from 'react';
import { 
  Tldraw, 
  useEditor, 
  useIsDarkMode, 
  useValue, 
  DefaultDashStyle, 
  LineShapeSplineStyle, 
  DefaultToolbar,
  TldrawUiMenuItem,
  useTools
} from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';
import './Canvas.css';

DefaultDashStyle.setDefaultValue('solid')
LineShapeSplineStyle.setDefaultValue('line')

// Custom Toolbar component
const CustomToolbar = () => {
  const tools = useTools()
  
  return (
    <div>
      <DefaultToolbar>
        <TldrawUiMenuItem {...tools['select']} />
        <TldrawUiMenuItem {...tools['hand']} />
        <TldrawUiMenuItem {...tools['eraser']} />
        <TldrawUiMenuItem {...tools['text']} />
        <TldrawUiMenuItem {...tools['line']} />
        <TldrawUiMenuItem {...tools['draw']} />
        <TldrawUiMenuItem {...tools['rectangle']} />
        <TldrawUiMenuItem {...tools['ellipse']} />
      </DefaultToolbar>
    </div>
  );
};

// Define the approximately function
function approximately(a, b, tolerance = 0.0001) {
  return Math.abs(a - b) < tolerance;
}

// Custom Grid component
const Grid = ({ size, ...camera }) => {
  const editor = useEditor();
  const screenBounds = useValue('screenBounds', () => editor.getViewportScreenBounds(), []);
  const devicePixelRatio = useValue('dpr', () => editor.getInstanceState().devicePixelRatio, []);
  const isDarkMode = useIsDarkMode();
  const canvas = useRef(null);

  useLayoutEffect(() => {
    if (!canvas.current) return;
    const canvasW = screenBounds.w * devicePixelRatio;
    const canvasH = screenBounds.h * devicePixelRatio;
    canvas.current.width = canvasW;
    canvas.current.height = canvasH;

    const ctx = canvas.current.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasW, canvasH);

    const pageViewportBounds = editor.getViewportPageBounds();
    const startPageX = Math.ceil(pageViewportBounds.minX / size) * size;
    const startPageY = Math.ceil(pageViewportBounds.minY / size) * size;
    const endPageX = Math.floor(pageViewportBounds.maxX / size) * size;
    const endPageY = Math.floor(pageViewportBounds.maxY / size) * size;
    const numRows = Math.round((endPageY - startPageY) / size);
    const numCols = Math.round((endPageX - startPageX) / size);

    ctx.strokeStyle = isDarkMode ? '#555' : '#BBB';

    for (let row = 0; row <= numRows; row++) {
      const pageY = startPageY + row * size;
      const canvasY = (pageY + camera.y) * camera.z * devicePixelRatio;
      const isMajorLine = approximately(pageY % (size * 10), 0);
      drawLine(ctx, 0, canvasY, canvasW, canvasY, isMajorLine ? 3 : 1);
    }
    for (let col = 0; col <= numCols; col++) {
      const pageX = startPageX + col * size;
      const canvasX = (pageX + camera.x) * camera.z * devicePixelRatio;
      const isMajorLine = approximately(pageX % (size * 10), 0);
      drawLine(ctx, canvasX, 0, canvasX, canvasH, isMajorLine ? 3 : 1);
    }
  }, [screenBounds, camera, size, devicePixelRatio, editor, isDarkMode]);

  return <canvas className="tl-grid" ref={canvas} />;
};

// Helper function to draw grid lines
function drawLine(ctx, x1, y1, x2, y2, width) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineWidth = width;
  ctx.stroke();
}

const Canvas = () => {
  return (
    <div className="canvas-container">
      <Tldraw
        components={{ 
          Grid,
          Toolbar: CustomToolbar 
        }}
        persistenceKey="example"
        onMount={(editor) => {
          editor.updateInstanceState({ isGridMode: true });
        }}
      />
    </div>
  );
};

export default Canvas;
