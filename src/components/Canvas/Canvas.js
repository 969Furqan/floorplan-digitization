import React, { useLayoutEffect, useRef, useCallback, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Tldraw, 
  useEditor, 
  useIsDarkMode, 
  useValue, 
  DefaultDashStyle, 
  LineShapeSplineStyle, 
  DefaultToolbar,
  TldrawUiMenuItem,
  useTools,
  exportAs
} from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';
import './Canvas.css';
import projectService from '../../services/projectService';

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
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('project');
  const isNewProject = searchParams.get('new') === 'true';
  const [projectName, setProjectName] = useState('');
  const editorRef = useRef(null);

  useEffect(() => {
    const loadProjectDetails = async () => {
      if (projectId) {
        try {
          const project = await projectService.getProject(projectId);
          if (project) {
            setProjectName(project.filename);
          }
        } catch (error) {
          console.error('Failed to load project details:', error);
        }
      }
    };

    loadProjectDetails();
  }, [projectId]);

  const handleCanvasChange = useCallback(async (editor) => {
    if (!projectId) return;
    
    try {
      const canvasState = editor.getSnapshot();
      await projectService.saveProjectCanvas(parseInt(projectId), canvasState);
    } catch (error) {
      console.error('Failed to save project:', error);
    }
  }, [projectId]);

  const loadProject = useCallback(async (editor) => {
    if (!projectId || isNewProject) return;

    try {
      const project = await projectService.getProject(projectId);
      if (project?.canvasState) {
        editor.loadSnapshot(project.canvasState);
      }
    } catch (error) {
      console.error('Failed to load project:', error);
    }
  }, [projectId, isNewProject]);

  const handleMount = useCallback((editor) => {
    editorRef.current = editor;
    editor.updateInstanceState({ isGridMode: true });
    loadProject(editor);

    // Override the export methods
    const originalExportImage = editor.exportImage;
    editor.exportImage = async (format, options = {}) => {
      const allShapeIds = editor.getCurrentPageShapeIds();
      await exportAs(
        editor,
        allShapeIds,
        format,
        projectName || 'untitled',
        {
          ...options,
          scale: 1,
          background: true,
          preserveAspectRatio: true
        }
      );
      // Return null since we're handling the export directly
      return null;
    };
  }, [loadProject, projectName]);

  return (
    <div className="canvas-container">
      <Tldraw
        components={{ 
          Grid,
          Toolbar: CustomToolbar 
        }}
        persistenceKey={`floorplan-${projectId}`}
        onMount={handleMount}
        onChange={(editor) => {
          handleCanvasChange(editor);
        }}
      />
    </div>
  );
};

export default Canvas;
