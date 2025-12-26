import React, { useCallback, useEffect, useRef, useState } from "react";
import Client from "./Client";
import Editor from "./Editor";
import { initSocket } from "../Socket";
import {
  useNavigate,
  useLocation,
  Navigate,
  useParams,
} from "react-router-dom";
import { toast } from "react-hot-toast";
import Draggable from "react-draggable";
import axios from "axios";
import { 
  Play, 
  Terminal, 
  ChevronUp, 
  ChevronDown, 
  Copy, 
  LogOut, 
  Users, 
  Video, 
  VideoOff, 
  X, 
  Menu,
  Trash2,
  Code2,
  Sparkle
} from "lucide-react";
import { Resizable } from "re-resizable";



const LANGUAGES = [
  { value: "py", label: "Python", icon: "🐍" },
  { value: "java", label: "Java", icon: "☕" },
  { value: "cpp", label: "C++", icon: "⚙️" },
  { value: "js", label: "JavaScript", icon: "🟨" },
  { value: "c", label: "C", icon: "🔵" },
  { value: "ruby", label: "Ruby", icon: "💎" },
  { value: "php", label: "PHP", icon: "🐘" }
];

function EditorPage() {
  const [clients, setClients] = useState([]);
  const [videoCall, setVideoCall] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [myStream, setMyStream] = useState(null);
  const [output, setOutput] = useState("");
  const [isCompileWindowOpen, setIsCompileWindowOpen] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [AiOutput, setAiOutput] = useState("");
  const[errorOutput,setErrorOutput]=useState(0);
  const [correctedCode , setCorrectedCode] = useState("")
  const API_URL = import.meta.env.VITE_API_URL

  const codeRef = useRef(null);
  const videoRef = useRef(null);
  const socketRef = useRef(null);

  const Location = useLocation();
  const navigate = useNavigate();
  const { roomId } = useParams();

  const startVideoCall = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setVideoCall(true);
      setShowModal(true);
      setMyStream(stream);
      toast.success("Video call started");
    } catch (err) {
      console.error("Error accessing camera/mic:", err);
      toast.error("Unable to access camera/mic");
    }
  }, []);

  const stopVideoCall = () => {
    if (myStream) {
      myStream.getTracks().forEach(track => track.stop());
      setMyStream(null);
      setVideoCall(false);
      toast.success("Video call ended");
    }
  };

  useEffect(() => {
    if (myStream && videoRef.current) {
      videoRef.current.srcObject = myStream;
    }
  }, [myStream]);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      

      const handleErrors = (err) => {
        console.log("Error", err);
        toast.error("Socket connection failed, Try again later");
        navigate("/");
      };

      socketRef.current.on("connect_error", handleErrors);
      socketRef.current.on("connect_failed", handleErrors);

      socketRef.current.emit("join", {
        roomId,
        username: Location.state?.username,
      });

      socketRef.current.on("joined", ({ clients, username, socketId }) => {
        if (username !== Location.state?.username) {
          toast.success(`${username} joined`);
        }
        setClients(clients);
        socketRef.current.emit("sync-code", {
          code: codeRef.current,
          socketId,
        });
      });

      socketRef.current.on("disconnected", ({ socketId, username }) => {
        toast.success(`${username} left the room`);
        setClients((prev) =>
          prev.filter((client) => client.socketId !== socketId)
        );
      });
    };

    init();

    return () => {
      if (myStream) {
        myStream.getTracks().forEach(track => track.stop());
      }
      socketRef.current && socketRef.current.disconnect();
      socketRef.current?.off("joined");
      socketRef.current?.off("disconnected");
    };
  }, [navigate, roomId, Location.state?.username]);

  if (!Location.state) {
    return <Navigate to="/" />;
  }

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success(`Room ID copied`);
    } catch (error) {
      console.log(error);
      toast.error("Unable to copy the room ID");
    }
  };

  const leaveRoom = async () => {
    if (myStream) {
      myStream.getTracks().forEach(track => track.stop());
    }
    navigate("/Home");
  };

  const runCode = async () => {
    if (!codeRef.current || codeRef.current.trim() === "") {
      toast.error("Please write some code first");
      return;
    }

    setIsCompiling(true);
    setOutput("Compiling...");
    const payload = {
      language: selectedLanguage,
      code: codeRef.current,
    };
    try {
      const { data } = await axios.post(
        "https://ks-compiler.onrender.com/run",
        payload
      );
      setOutput(data.output);
      setIsCompiling(false);
      toast.success("Code compiled successfully");
    } catch (err) {
      console.log(err);
      const errmsg =
        err?.response?.data?.err?.error ||
        err?.response?.data?.error ||
        "Something went wrong";
      setOutput(errmsg);
      setErrorOutput(1);
      setIsCompiling(false);
      toast.error("Compilation failed");
    }
  };
  const errorAnalysis = async () => {
  if (!errorOutput) {
    toast.error("No error to analyze");
    return;
  }

  setIsCompiling(true);
  setCorrectedCode(""); // reset previous fix

  try {
    const { data } = await axios.post(
      `${API_URL}/errorAnalyze/analyze-error`,
      {
        error: output,
        code: codeRef.current,
        language: selectedLanguage,
      }
    );

    setOutput(data.explanation);          // Explanation UI
    setCorrectedCode(data.correctedCode); // Apply Fix button
    setErrorOutput(0);
  } catch (err) {
    toast.error("AI analysis failed. Try again later.");
    setOutput("Unable to analyze the error at the moment.");
  } finally {
    setIsCompiling(false);
  }
};


  const toggleCompileWindow = () => {
    setIsCompileWindowOpen(!isCompileWindowOpen);
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column p-0" style={{ overflow: 'hidden', background: '#0a0a0a' }}>
      {/* Draggable Video Preview */}
      {myStream && (
        <Draggable>
          <div
            style={{
              position: "absolute",
              top: "80px",
              right: "20px",
              zIndex: 2000,
              cursor: "move",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0,0,0,0.8)",
              border: '2px solid rgba(255,255,255,0.1)'
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{
                width: "300px",
                height: "200px",
                background: "#000",
                display: "block",
              }}
            />
            <button
              onClick={stopVideoCall}
              className="btn btn-danger btn-sm"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                padding: "0",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                background: 'rgba(220, 53, 69, 0.9)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </Draggable>
      )}

      <div className="row flex-grow-1 g-0" style={{ height: '100%' }}>
        {/* Mobile Menu Toggle */}
        <button
          className="btn d-md-none position-fixed"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{ 
            top: "16px", 
            left: "16px", 
            zIndex: 1100,
            borderRadius: "12px",
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'white',
            padding: '10px 12px',
            boxShadow: "0 4px 16px rgba(0,0,0,0.4)"
          }}
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Sidebar */}
        <div 
          className={`col-md-3 col-lg-2 text-light d-flex flex-column ${
            isSidebarOpen ? 'd-block' : 'd-none d-md-flex'
          }`}
          style={{
            position: isSidebarOpen ? 'fixed' : 'relative',
            zIndex: 1050,
            height: '100vh',
            top: 0,
            left: 0,
            width: isSidebarOpen ? '85%' : 'auto',
            maxWidth: '320px',
            background: '#0f0f0f',
            borderRight: '1px solid rgba(255,255,255,0.1)',
            overflowY: 'auto',
            boxShadow: isSidebarOpen ? '4px 0 24px rgba(0,0,0,0.5)' : 'none'
          }}
        >
          <div className="p-4">


            {/* Members Section */}
            <div className="flex-grow-1 mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="fw-semibold text-white d-flex align-items-center gap-2">
                  <Users size={18} />
                  Members
                  <span className="badge rounded-pill" style={{ background: 'rgba(255,255,255,0.15)', fontSize: '0.7rem', padding: '4px 10px' }}>
                    {clients.length}
                  </span>
                </span>
              </div>
              
              <div className="d-flex flex-column gap-2" style={{ maxHeight: '320px', overflowY: 'auto' }}>
                {clients.map((client) => (
                  <Client key={client.socketId} username={client.username} />
                ))}
              </div>

              {/* Video Call Button */}
              {roomId && (
                <button
                  className={`btn w-100 mt-4 d-flex align-items-center justify-content-center gap-2`}
                  onClick={videoCall ? stopVideoCall : startVideoCall}
                  style={{
                    background: videoCall ? 'rgba(220, 53, 69, 0.15)' : 'rgba(255,255,255,0.1)',
                    border: videoCall ? '1px solid rgba(220, 53, 69, 0.3)' : '1px solid rgba(255,255,255,0.2)',
                    color: videoCall ? '#dc3545' : 'white',
                    borderRadius: '12px',
                    padding: '12px',
                    fontWeight: '500'
                  }}
                >
                  {videoCall ? <VideoOff size={18} /> : <Video size={18} />}
                  {videoCall ? 'End Video Call' : 'Start Video Call'}
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-auto pt-4">
              <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
              
              {/* Copy Room ID Button */}
              <button 
                className="btn w-100 d-flex align-items-center justify-content-center gap-2 mb-3"
                onClick={copyRoomId}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white',
                  borderRadius: '12px',
                  padding: '12px',
                  fontWeight: '500'
                }}
              >
                <Copy size={18} />
                Copy Room ID
              </button>

              {/* Leave Room Button */}
              <button 
                className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                onClick={leaveRoom}
                style={{
                  background: 'rgba(220, 53, 69, 0.1)',
                  border: '1px solid rgba(220, 53, 69, 0.3)',
                  color: '#dc3545',
                  borderRadius: '12px',
                  padding: '12px',
                  fontWeight: '500'
                }}
              >
                <LogOut size={18} />
                Leave Room
              </button>
            </div>
          </div>
        </div>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="d-md-none position-fixed top-0 start-0 w-100 h-100"
            style={{ background: 'rgba(0,0,0,0.7)', zIndex: 1040, backdropFilter: 'blur(4px)' }}
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Main Editor */}
        <div 
          className="col-md-9 col-lg-10 text-light d-flex flex-column" 
          style={{ 
            height: '100vh',
            position: 'relative'
          }}
        >
          {/* Top Bar */}
          <div className="p-3 d-flex justify-content-between align-items-center" style={{ background: '#0f0f0f', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="d-flex align-items-center gap-2">
              <Code2 size={20} className="d-none d-md-block" />
              <span className="fw-semibold d-none d-md-inline">Code Editor</span>
            </div>
            
            <div className="d-flex align-items-center gap-2">
              {/* Language Selector */}
              <select
                className="form-select form-select-sm"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                style={{ 
                  background: 'rgba(255,255,255,0.1)',
                  color: "white",
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  fontWeight: '500',
                  width: 'auto',
                  minWidth: '130px',
                  padding: '8px 12px'
                }}
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.value} value={lang.value} style={{ background: '#1a1a1a' }}>
                    {lang.icon} {lang.label}
                  </option>
                ))}
              </select>

              {/* Run Code Button (Desktop) */}
              <button
                className="btn btn-sm d-none d-md-inline-flex align-items-center gap-2"
                onClick={runCode}
                disabled={isCompiling}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  color: 'white',
                  fontWeight: '500'
                }}
              >
                <Play size={16} />
                {isCompiling ? 'Running...' : 'Run Code'}
              </button>
            </div>
          </div>

          {/* Code Editor - Takes remaining space */}
          <div 
            className="flex-grow-1" 
            style={{ 
              overflow: 'hidden',
              paddingBottom: isCompileWindowOpen ? '45vh' : '0',
              transition: 'padding-bottom 0.3s ease-in-out'
            }}
          >
            <Editor
              socketRef={socketRef}
              roomId={roomId}
              onCodeChange={(code) => {
                codeRef.current = code;
              }}
            />
          </div>

          {/* Compiler Output Section - Fixed at bottom */}
         

{isCompileWindowOpen && (
  <Resizable
    defaultSize={{
      width: '100%',
      height: '45vh',
    }}
    minHeight="20vh"
    maxHeight="80vh"
    enable={{
      top: true,
      right: false,
      left: false,
      bottom: false,
    }}
    handleStyles={{
      top: {
        height: '6px',
        cursor: 'row-resize',
        background: 'rgba(255,255,255,0.15)',
      },
    }}
    style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1060,
      background: '#0a0a0a',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      boxShadow: '0 -8px 32px rgba(0,0,0,0.6)',
    }}
  >
    <div className="h-100 d-flex flex-column p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3 pb-3"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <h6 className="m-0 fw-semibold d-flex align-items-center gap-2">
          <Terminal size={20} />
          Output
          <span className="badge rounded-pill"
            style={{ background: 'rgba(255,255,255,0.15)', fontSize: '0.7rem', padding: '4px 12px' }}>
            {LANGUAGES.find(l => l.value === selectedLanguage)?.label}
          </span>
        </h6>
        <div className="d-flex gap-2">
          {correctedCode && (
            <button className="btn btn-sm d-flex align-items-center gap-2"
              disabled={isCompiling}
              onClick={() => {
                codeRef.current = correctedCode;
                toast.success('Fix applied to editor');
              }}
              style={{
                background: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)',
                border: 'none',
                borderRadius: '8px',
                padding: '6px 14px',
                color: 'white',
                fontWeight: '500',
              }}>
              ✨ Apply Fix
            </button>
          )}
          <button className="btn btn-sm d-flex align-items-center gap-2"
            onClick={errorAnalysis}
            disabled={isCompiling}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '8px',
              padding: '6px 14px',
              color: 'white',
              fontWeight: '500',
              opacity: isCompiling ? 0.7 : 1,
            }}>
            <Sparkle size={14} />
            {isCompiling ? 'Analyzing...' : 'Understand Error'}
          </button>
          <button className="btn btn-sm d-flex align-items-center gap-2"
            onClick={runCode}
            disabled={isCompiling}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '8px',
              padding: '6px 14px',
              color: 'white',
              fontWeight: '500',
            }}>
            <Play size={14} />
            {isCompiling ? 'Running...' : 'Run'}
          </button>
          <button className="btn btn-sm"
            onClick={() => setOutput('')}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white',
              borderRadius: '8px',
              padding: '6px 12px',
            }}>
            <Trash2 size={14} />
          </button>
          <button className="btn btn-sm"
            onClick={toggleCompileWindow}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white',
              borderRadius: '8px',
              padding: '6px 12px',
            }}>
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Output Content */}
      <div className="flex-grow-1 overflow-auto">
        <pre className="p-3 rounded mb-0 h-100"
          style={{
            fontSize: '0.9rem',
            fontFamily: 'Consolas, Monaco, monospace',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#e0e0e0',
          }}>
          {output || '💡 Output will appear here after compilation\n\nPress "Run" or use the Run Code button to execute your code.'}
        </pre>
      </div>
    </div>
  </Resizable>
)}

        </div>
      </div>

      {/* Floating Action Buttons (Mobile) */}
      <div className="d-md-none position-fixed d-flex flex-column gap-3" style={{ bottom: '24px', right: '24px', zIndex: 1030 }}>
        <button
          className="btn rounded-circle shadow-lg"
          onClick={runCode}
          disabled={isCompiling}
          style={{ 
            width: '60px', 
            height: '60px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)'
          }}
        >
          <Play size={24} fill="white" />
        </button>
        <button
          className="btn rounded-circle shadow-lg"
          onClick={toggleCompileWindow}
          style={{ 
            width: '60px', 
            height: '60px',
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
          }}
        >
          {isCompileWindowOpen ? <X size={24} /> : <Terminal size={24} />}
        </button>
      </div>

      {/* Compiler Toggle Button (Desktop) */}
      <button
        className="btn d-none d-md-flex align-items-center gap-2 position-fixed shadow-lg"
        onClick={toggleCompileWindow}
        style={{ 
          bottom: '24px', 
          right: '24px', 
          zIndex: 1030,
          borderRadius: '12px',
          padding: '12px 20px',
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: 'white',
          fontWeight: '500'
        }}
      >
        {isCompileWindowOpen ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
        {isCompileWindowOpen ? "Hide Output" : "Show Output"}
      </button>
    </div>
  );
}

export default EditorPage;