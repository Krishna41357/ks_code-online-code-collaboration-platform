import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
import { Code2, User, Mail, Lock, LogIn, UserPlus, Sparkles } from "lucide-react";

// Google OAuth script loader
const loadGoogleScript = () => {
  return new Promise((resolve, reject) => {
    if (window.google) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login, register, googleLogin, isAuthenticated, token } = useAuth();
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID";

  useEffect(() => {
    // Check for token in localStorage or from auth context
    const storedToken = localStorage.getItem('token');
    
    // Redirect if already authenticated or token exists
    if (isAuthenticated || storedToken || token) {
      navigate("/Home");
    }
  }, [isAuthenticated, token, navigate]);

  useEffect(() => {
    // Initialize Google Sign-In
    loadGoogleScript()
      .then(() => {
        if (window.google) {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleResponse,
          });
          
          const buttonDiv = document.getElementById("googleSignInButton");
          if (buttonDiv) {
            window.google.accounts.id.renderButton(
              buttonDiv,
              {
                theme: "filled_blue",
                size: "large",
                text: isLogin ? "signin_with" : "signup_with",
                width: "100%",
              }
            );
          }
        }
      })
      .catch((error) => {
        console.error("Error loading Google script:", error);
      });
  }, [isLogin, GOOGLE_CLIENT_ID]);

  const handleGoogleResponse = async (response) => {
    try {
      setLoading(true);
      const result = await googleLogin(response.credential);
      
      if (result.success) {
        navigate("/Home");
      }
    } catch (error) {
      console.error("Google auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (isLogin) {
      if (!formData.email || !formData.password) {
        return; // Toast handled by context
      }
    } else {
      if (!formData.username || !formData.email || !formData.password) {
        return; // Toast handled by context
      }
    }

    try {
      setLoading(true);
      let result;

      if (isLogin) {
        result = await login(formData.email, formData.password);
      } else {
        result = await register(formData.username, formData.email, formData.password);
      }

      if (result.success) {
        navigate("/Home");
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="container-fluid p-0 min-vh-100" style={{ background: 'transparent', overflow: 'hidden' }}>
      <div className="d-flex align-items-center justify-content-center min-vh-100 p-3 p-sm-4">
        <div className="w-100" style={{ maxWidth: '480px' }}>
          <div 
            className="card shadow-lg"
            style={{ 
              background: 'rgba(15, 15, 15, 0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '20px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)'
            }}
          >
            <div className="card-body p-3 p-sm-4">
              {/* Logo */}
              <div className="text-center mb-3">
                <div 
                  className="d-inline-flex align-items-center justify-content-center mb-3 rounded-3"
                  style={{ 
                    width: '70px', 
                    height: '70px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 12px 32px rgba(102, 126, 234, 0.4)'
                  }}
                >
                  <Code2 size={36} className="text-white" strokeWidth={2.5} />
                </div>
                <h2 className="text-white fw-bold fs-4 mb-1">
                  {isLogin ? "Welcome Back!" : "Create Account"}
                </h2>
                <p className="text-white-50 mb-0" style={{ fontSize: '13px' }}>
                  {isLogin ? "Sign in to continue coding" : "Join the collaborative coding community"}
                </p>
              </div>

              <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '0 0 24px 0' }} />

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-column gap-3 mb-3">
                  {!isLogin && (
                    <div className="position-relative">
                      <User 
                        size={18} 
                        className="position-absolute text-white-50" 
                        style={{ left: '16px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
                      />
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Username"
                        disabled={loading}
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          borderRadius: '12px',
                          color: '#fff',
                          fontSize: '14px',
                          padding: '12px 16px 12px 42px',
                          fontWeight: '500'
                        }}
                      />
                    </div>
                  )}

                  <div className="position-relative">
                    <Mail 
                      size={18} 
                      className="position-absolute text-white-50" 
                      style={{ left: '16px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Email"
                      disabled={loading}
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '15px',
                        padding: '14px 18px 14px 46px',
                        fontWeight: '500'
                      }}
                    />
                  </div>

                  <div className="position-relative">
                    <Lock 
                      size={18} 
                      className="position-absolute text-white-50" 
                      style={{ left: '16px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
                    />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Password"
                      disabled={loading}
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '15px',
                        padding: '14px 18px 14px 46px',
                        fontWeight: '500'
                      }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn w-100 fw-bold text-uppercase d-flex align-items-center justify-content-center gap-2 mb-3"
                  disabled={loading}
                  style={{ 
                    background: loading ? 'rgba(102, 126, 234, 0.5)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '12px',
                    color: 'white',
                    fontSize: '15px',
                    letterSpacing: '1.5px',
                    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                    transition: 'all 0.3s',
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 12px 32px rgba(102, 126, 234, 0.5)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.4)';
                    }
                  }}
                >
                  {loading ? (
                    <>
                      <div className="spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      Please wait...
                    </>
                  ) : (
                    <>
                      {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
                      {isLogin ? "LOGIN" : "SIGN UP"}
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="position-relative mb-3">
                <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                <span
                  className="position-absolute top-50 start-50 translate-middle px-3 text-white-50"
                  style={{ 
                    fontSize: "13px",
                    fontWeight: '500'
                  }}
                >
                  OR
                </span>
              </div>

              {/* Google Sign In */}
              <div id="googleSignInButton" className="mb-3" style={{ 
                display: 'flex', 
                justifyContent: 'center',
                opacity: loading ? '0.5' : '1',
                pointerEvents: loading ? 'none' : 'auto'
              }}></div>

              {/* Toggle Login/Signup */}
              <div className="text-center">
                <p className="text-white-50 mb-0 small">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                  <span
                    onClick={toggleMode}
                    className="text-white fw-semibold"
                    style={{ 
                      cursor: 'pointer', 
                      textDecoration: 'underline',
                      textDecorationColor: 'rgba(102, 126, 234, 0.6)'
                    }}
                  >
                    {isLogin ? "Sign Up" : "Login"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Branding */}
          <div className="text-center mt-4">
            <p className="text-white-50 small mb-0 d-flex align-items-center justify-content-center gap-2">
              <Sparkles size={14} />
              Powered by KS CODE
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .form-control::placeholder {
          color: rgba(255,255,255,0.4);
          font-weight: 500;
        }
        
        .form-control:focus {
          background: rgba(255,255,255,0.08) !important;
          border-color: rgba(255,255,255,0.25) !important;
          color: #fff !important;
          box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.15) !important;
          outline: none;
        }

        .form-control:disabled {
          background: rgba(255,255,255,0.03) !important;
          cursor: not-allowed;
          opacity: 0.6;
        }

        .spinner-border {
          width: 1.2rem;
          height: 1.2rem;
          border-width: 2px;
        }
      `}</style>
    </div>
  );
}

export default Login;