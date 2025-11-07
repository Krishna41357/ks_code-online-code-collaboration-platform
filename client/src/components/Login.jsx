import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";

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
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm p-2 mb-5 bg-secondary rounded">
            <div className="card-body text-center bg-dark">
              <img
                src="/favicon.ico"
                alt="Logo"
                className="img-fluid mx-auto d-block mb-3"
                style={{ maxWidth: "150px" }}
              />
              <h4 className="card-title text-light mb-4">
                {isLogin ? "Welcome Back!" : "Create Account"}
              </h4>

              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Username"
                      disabled={loading}
                    />
                  </div>
                )}

                <div className="form-group mb-3">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Email"
                    disabled={loading}
                  />
                </div>

                <div className="form-group mb-3">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Password"
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success btn-lg btn-block w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? "Please wait..." : isLogin ? "LOGIN" : "SIGN UP"}
                </button>
              </form>

              <div className="position-relative mb-3">
                <hr style={{ color: "white" }} />
                <span
                  className="position-absolute top-50 start-50 translate-middle bg-dark px-3 text-light"
                  style={{ fontSize: "14px" }}
                >
                  OR
                </span>
              </div>

              <div id="googleSignInButton" className="mb-3"></div>

              <p className="mt-3 text-light mb-0">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <span
                  onClick={toggleMode}
                  className="text-success"
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  {isLogin ? "Sign Up" : "Login"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;