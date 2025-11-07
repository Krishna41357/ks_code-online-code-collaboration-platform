import React, { useState, useEffect } from "react";
import { Code2, Mail, Lock, User, Sparkles } from "lucide-react";

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

  const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";

  useEffect(() => {
    // Initialize Google Sign-In
    loadGoogleScript()
      .then(() => {
        if (window.google) {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleResponse,
          });
          window.google.accounts.id.renderButton(
            document.getElementById("googleSignInButton"),
            {
              theme: "filled_blue",
              size: "large",
              text: isLogin ? "signin_with" : "signup_with",
              width: "100%",
            }
          );
        }
      })
      .catch((error) => {
        console.error("Error loading Google script:", error);
      });
  }, [isLogin]);

  const handleGoogleResponse = async (response) => {
    try {
      setLoading(true);
      console.log("Google response:", response);
      alert("Google login successful!");
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (isLogin) {
      if (!formData.email || !formData.password) {
        alert("Email and password are required");
        return;
      }
    } else {
      if (!formData.username || !formData.email || !formData.password) {
        alert("All fields are required");
        return;
      }
    }

    setLoading(true);
    setTimeout(() => {
      console.log("Form data:", formData);
      alert(isLogin ? "Login successful!" : "Registration successful!");
      setLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
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
    <div 
      className="d-flex align-items-center justify-content-center min-vh-100 p-3" 
      style={{ background: 'transparent' }}
    >
      <div className="w-100" style={{ maxWidth: '440px' }}>
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
          <div className="card-body p-4 p-sm-5">
            {/* Logo */}
            <div className="text-center mb-4">
              <div 
                className="d-inline-flex align-items-center justify-content-center mb-3 rounded-3"
                style={{ 
                  width: '100px', 
                  height: '100px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 12px 32px rgba(102, 126, 234, 0.4)'
                }}
              >
                <Code2 size={48} className="text-white" strokeWidth={2.5} />
              </div>
              <h2 className="text-white fw-bold fs-4 mb-2">
                {isLogin ? "Welcome Back!" : "Create Account"}
              </h2>
              <p className="text-white-50 mb-0 small">
                {isLogin ? "Sign in to continue coding" : "Join our coding community"}
              </p>
            </div>

            {/* Form Fields */}
            <div className="d-flex flex-column gap-3 mb-4">
              {!isLogin && (
                <div className="position-relative">
                  <User 
                    size={18} 
                    className="position-absolute text-white-50" 
                    style={{ left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 1 }}
                  />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Username"
                    disabled={loading}
                    className="form-control"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '15px',
                      padding: '12px 16px 12px 46px',
                      fontWeight: '500'
                    }}
                  />
                </div>
              )}

              <div className="position-relative">
                <Mail 
                  size={18} 
                  className="position-absolute text-white-50" 
                  style={{ left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 1 }}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Email"
                  disabled={loading}
                  className="form-control"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '15px',
                    padding: '12px 16px 12px 46px',
                    fontWeight: '500'
                  }}
                />
              </div>

              <div className="position-relative">
                <Lock 
                  size={18} 
                  className="position-absolute text-white-50" 
                  style={{ left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 1 }}
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Password"
                  disabled={loading}
                  className="form-control"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '15px',
                    padding: '12px 16px 12px 46px',
                    fontWeight: '500'
                  }}
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn w-100 fw-bold text-uppercase mb-3"
              style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '12px',
                padding: '13px',
                color: 'white',
                fontSize: '15px',
                letterSpacing: '1.5px',
                boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s',
                opacity: loading ? 0.6 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(102, 126, 234, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.4)';
              }}
            >
              {loading ? "Please wait..." : isLogin ? "LOGIN" : "SIGN UP"}
            </button>

            {/* Divider */}
            <div className="position-relative mb-3">
              <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
              <span
                className="position-absolute top-50 start-50 translate-middle px-3 text-white-50"
                style={{ 
                  background: 'rgba(15, 15, 15, 0.85)',
                  fontSize: '13px',
                  fontWeight: '500'
                }}
              >
                OR
              </span>
            </div>

            {/* Google Sign In */}
            <div id="googleSignInButton" className="mb-4"></div>

            {/* Toggle Login/Register */}
            <div className="text-center">
              <p className="text-white-50 mb-0 small">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <span
                  onClick={toggleMode}
                  className="text-white fw-semibold"
                  style={{ 
                    cursor: 'pointer', 
                    textDecoration: 'underline',
                    textDecorationColor: 'rgba(255,255,255,0.4)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textDecorationColor = 'rgba(255,255,255,1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textDecorationColor = 'rgba(255,255,255,0.4)';
                  }}
                >
                  {isLogin ? "Sign Up" : "Login"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <div className="text-center mt-4">
          <p className="text-white-50 mb-0 small d-flex align-items-center justify-content-center gap-1">
            <Sparkles size={14} />
            Built for developers, by developers
          </p>
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
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Google button styling override */
        #googleSignInButton {
          border-radius: 12px !important;
          overflow: hidden;
        }

        #googleSignInButton > div {
          border-radius: 12px !important;
        }
      `}</style>
    </div>
  );
}

export default Login;