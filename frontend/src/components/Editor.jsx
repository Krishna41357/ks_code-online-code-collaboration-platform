import React, { useEffect, useRef, useState } from "react";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";
import "codemirror/mode/clike/clike"; // For C, C++, Java
import "codemirror/mode/go/go";
import "codemirror/mode/rust/rust";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import CodeMirror from "codemirror";
import axios from "axios";
import toast from "react-hot-toast";

const LANGUAGE_MODES = {
  javascript: "javascript",
  js: "javascript",
  typescript: "javascript",
  ts: "javascript",
  python: "python",
  py: "python",
  cpp: "text/x-c++src",
  c: "text/x-csrc",
  java: "text/x-java",
  go: "text/x-go",
  rust: "text/x-rustsrc",
  rs: "text/x-rustsrc"
};

function Editor({ socketRef, roomId, onCodeChange, fileId }) {
  const editorRef = useRef(null);
  const [currentFile, setCurrentFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const autoSaveTimeout = useRef(null);
  const isInitialized = useRef(false);
  
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Replace the "Load file if fileId is provided" useEffect with this:

// Load file content when fileId changes
useEffect(() => {
  const loadFileContent = async () => {
    if (!fileId) {
      console.log('No fileId provided to Editor');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${API_URL}/files/${fileId}/open`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setCurrentFile(data);
      
      // Set code in editor if it exists and editor is ready
      if (editorRef.current && data.code !== undefined) {
        const currentCode = editorRef.current.getValue();
        
        // Only update if code is different to avoid unnecessary updates
        if (currentCode !== data.code) {
          editorRef.current.setValue(data.code || '');
          onCodeChange(data.code || '');
        }
      }
      
      console.log('Editor: File loaded', {
        fileId: data._id,
        filename: data.filename,
        language: data.language
      });
    } catch (error) {
      console.error('Editor: Failed to load file:', error);
      
      // Don't show toast here - let parent component handle it
      // toast.error('Failed to load file');
    }
  };

  // Only load if we have both fileId and editor is initialized
  if (fileId && isInitialized.current) {
    loadFileContent();
  } else if (fileId) {
    // If editor isn't ready yet, we'll load it after initialization
    console.log('Editor: Waiting for initialization before loading file');
  }
}, [fileId]); // Only depend on fileId

  // Initialize CodeMirror
  useEffect(() => {
    if (isInitialized.current) return;
    
    const init = async () => {
      const mode = currentFile?.language 
        ? LANGUAGE_MODES[currentFile.language] || "javascript"
        : "javascript";

      const editor = CodeMirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: { name: mode, json: true },
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
          indentUnit: 2,
          tabSize: 2,
          lineWrapping: true,
        }
      );

      editorRef.current = editor;
      editor.setSize(null, "100%");

      // Set initial code if available
      if (currentFile?.code) {
        editor.setValue(currentFile.code);
      }

      editor.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);

        if (origin !== "setValue") {
          // Emit real-time changes
          if (socketRef.current) {
            socketRef.current.emit('code-change', {
              roomId,
              code,
            });
          }

          // Auto-save after 2 seconds of inactivity
          if (fileId) {
            clearTimeout(autoSaveTimeout.current);
            autoSaveTimeout.current = setTimeout(() => {
              handleAutoSave(code);
            }, 2000);
          }
        }
      });

      isInitialized.current = true;
    };

    init();

    return () => {
      if (autoSaveTimeout.current) {
        clearTimeout(autoSaveTimeout.current);
      }
    };
  }, []);

  // Update editor mode when language changes
  useEffect(() => {
    if (editorRef.current && currentFile?.language) {
      const mode = LANGUAGE_MODES[currentFile.language] || "javascript";
      editorRef.current.setOption("mode", mode);
    }
  }, [currentFile?.language]);

  // Listen for code changes from socket
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on('code-change', ({ code }) => {
        if (code !== null && editorRef.current) {
          const cursor = editorRef.current.getCursor();
          const scrollInfo = editorRef.current.getScrollInfo();
          
          editorRef.current.setValue(code);
          
          // Restore cursor position
          editorRef.current.setCursor(cursor);
          editorRef.current.scrollTo(scrollInfo.left, scrollInfo.top);
        }
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off('code-change');
      }
    };
  }, [socketRef.current]);

  // Auto-save handler
  const handleAutoSave = async (code) => {
    if (!fileId) return;

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_URL}/files/autosave`,
        { fileId, code },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLastSaved(new Date());
    } catch (error) {
      console.error('Auto-save failed:', error);
      // Don't show error toast for auto-save failures
    }
  };

  // Manual save
  const handleSave = async () => {
    if (!fileId || !editorRef.current) {
      toast.error('No file to save');
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const code = editorRef.current.getValue();
      
      await axios.post(
        `${API_URL}/files/save`,
        { fileId, code },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setLastSaved(new Date());
      toast.success('File saved successfully');
    } catch (error) {
      console.error('Save failed:', error);
      toast.error('Failed to save file');
    } finally {
      setSaving(false);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + S to save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fileId]);

  // Expose save method to parent component
  useEffect(() => {
    if (window) {
      window.editorSave = handleSave;
    }
  }, [fileId]);

  return (
    <div className="h-100 d-flex flex-column position-relative">
      {/* File Info Bar */}
      {currentFile && (
        <div 
          className="d-flex align-items-center justify-content-between px-3 py-2"
          style={{
            background: 'rgba(15, 15, 15, 0.95)',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            fontSize: '13px'
          }}
        >
          <div className="d-flex align-items-center gap-3 text-white-50">
            <span className="fw-semibold text-white">{currentFile.filename}</span>
            <span>v{currentFile.version}</span>
            {lastSaved && (
              <span className="small">
                Saved {new Date(lastSaved).toLocaleTimeString()}
              </span>
            )}
          </div>
          <div className="d-flex align-items-center gap-2">
            {saving && (
              <span className="text-white-50 small">Saving...</span>
            )}
            <button
              onClick={handleSave}
              className="btn btn-sm"
              disabled={saving}
              style={{
                background: 'rgba(102, 126, 234, 0.2)',
                border: '1px solid rgba(102, 126, 234, 0.3)',
                color: '#667eea',
                borderRadius: '6px',
                padding: '4px 12px',
                fontSize: '12px'
              }}
            >
              💾 Save (Ctrl+S)
            </button>
          </div>
        </div>
      )}
      
      {/* Editor */}
      <div className="flex-grow-1" style={{ overflow: 'hidden' }}>
        <textarea id="realtimeEditor"></textarea>
      </div>

      <style>{`
        .CodeMirror {
          height: 100% !important;
          font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
          font-size: 14px;
          line-height: 1.6;
        }
        
        .CodeMirror-cursor {
          border-left: 2px solid #667eea !important;
        }
        
        .CodeMirror-selected {
          background: rgba(102, 126, 234, 0.3) !important;
        }
        
        .CodeMirror-activeline-background {
          background: rgba(255, 255, 255, 0.05) !important;
        }
      `}</style>
    </div>
  );
}

export default Editor;