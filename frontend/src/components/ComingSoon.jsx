import React, { useState, useEffect } from "react";
import { 
  Code2, 
  Sparkles, 
  Rocket,
  Bell,
  ArrowRight,
  Check,
  Star,
  Zap,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function ComingSoon() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [particles, setParticles] = useState([]);
  const [activeFeature, setActiveFeature] = useState(0);
  const navigate =useNavigate();

  const features = [
    { 
      icon: Code2, 
      title: "AI Code Suggestions", 
      desc: "Smart code completion powered by advanced AI",
      color: "#667eea"
    },
    { 
      icon: Sparkles, 
      title: "Video Chat", 
      desc: "Crystal clear HD communication",
      color: "#764ba2"
    },
    { 
      icon: Zap, 
      title: "Lightning Fast", 
      desc: "Optimized for peak performance",
      color: "#f59e0b"
    },
    { 
      icon: Star, 
      title: "Theme Editor", 
      desc: "Customize your entire experience",
      color: "#ec4899"
    }
  ];

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10
    }));
    setParticles(newParticles);

    const featureTimer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(featureTimer);
  }, []);

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 5000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubscribe();
    }
  };

  return (
    <div className="position-relative d-flex align-items-center justify-content-center" style={{ 
      minHeight: '100vh',
      maxHeight: '100vh',
      background: 'transparent',
      overflow: 'hidden',
      padding: '10px'
    }}>
      {/* Animated particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="position-absolute"
          style={{
            left: `${particle.left}%`,
            bottom: '-20px',
            width: '3px',
            height: '3px',
            background: 'rgba(102, 126, 234, 0.6)',
            borderRadius: '50%',
            animation: `float-up ${particle.duration}s ease-in infinite`,
            animationDelay: `${particle.delay}s`,
            boxShadow: '0 0 8px rgba(102, 126, 234, 0.8)'
          }}
        />
      ))}
      <button
        onClick={() => navigate('/home')}
        className="btn position-fixed d-flex align-items-center gap-2"
        style={{
          top: '20px',
          left: '20px',
          zIndex: 1060,
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.15)',
          color: 'white',
          borderRadius: '10px',
          padding: '8px 16px',
          fontWeight: '500',
          fontSize: '14px',
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
        }}
      >
        <ArrowLeft size={18} />
        <span className="d-none d-sm-inline">Home</span>
      </button>

      {/* Main gradient orbs */}
      <div
        className="position-absolute rounded-circle"
        style={{
          width: '300px',
          height: '300px',
          top: '10%',
          right: '10%',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.25) 0%, transparent 70%)',
          filter: 'blur(50px)',
          animation: 'pulse-glow 4s ease-in-out infinite'
        }}
      />
      <div
        className="position-absolute rounded-circle"
        style={{
          width: '350px',
          height: '350px',
          bottom: '10%',
          left: '10%',
          background: 'radial-gradient(circle, rgba(118, 75, 162, 0.25) 0%, transparent 70%)',
          filter: 'blur(50px)',
          animation: 'pulse-glow 4s ease-in-out infinite 2s'
        }}
      />

      <div className="container-fluid h-100 d-flex align-items-center" style={{ position: 'relative', zIndex: 1, maxWidth: '1400px' }}>
        <div className="row w-100 g-3 g-lg-4 align-items-center">
          {/* Left Column - Main Content */}
          <div className="col-12 col-lg-5">
            <div
              className="text-center text-lg-start p-3 p-md-4 rounded-4"
              style={{
                background: 'rgba(15, 15, 15, 0.9)',
                backdropFilter: 'blur(30px)',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.7)',
                animation: 'fade-in-up 1s ease-out'
              }}
            >
              {/* Icon */}
              <div className="mb-3 position-relative d-inline-block">
                <div
                  className="position-absolute top-50 start-50 translate-middle rounded-circle"
                  style={{
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    filter: 'blur(40px)',
                    animation: 'pulse-glow 3s ease-in-out infinite'
                  }}
                />
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-3 position-relative"
                  style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 15px 40px rgba(102, 126, 234, 0.6)',
                    animation: 'float 3s ease-in-out infinite'
                  }}
                >
                  <Rocket size={30} className="text-white" strokeWidth={2.5} />
                </div>
              </div>

              {/* Heading */}
              <h1 className="text-white fw-bold mb-2" style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                letterSpacing: '-0.02em'
              }}>
                Something Amazing is <br className="d-none d-sm-block"/>
                <span style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>Coming Soon</span>
              </h1>

              <p className="text-white-50 mb-3" style={{ fontSize: 'clamp(12px, 2vw, 14px)', lineHeight: '1.6' }}>
                We're crafting something extraordinary. A revolutionary platform that will transform the way you work.
              </p>

              {/* Stats Section */}
              <div className="row g-2 mb-3">
                <div className="col-4">
                  <div
                    className="p-2 rounded-3"
                    style={{
                      background: 'rgba(102, 126, 234, 0.1)',
                      border: '1px solid rgba(102, 126, 234, 0.2)'
                    }}
                  >
                    <div className="text-white fw-bold mb-0" style={{ fontSize: 'clamp(16px, 3vw, 20px)' }}>
                      500+
                    </div>
                    <div className="text-white-50" style={{ fontSize: 'clamp(9px, 1.5vw, 11px)' }}>
                      Early Access
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div
                    className="p-2 rounded-3"
                    style={{
                      background: 'rgba(118, 75, 162, 0.1)',
                      border: '1px solid rgba(118, 75, 162, 0.2)'
                    }}
                  >
                    <div className="text-white fw-bold mb-0" style={{ fontSize: 'clamp(16px, 3vw, 20px)' }}>
                      24/7
                    </div>
                    <div className="text-white-50" style={{ fontSize: 'clamp(9px, 1.5vw, 11px)' }}>
                      Support
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div
                    className="p-2 rounded-3"
                    style={{
                      background: 'rgba(245, 158, 11, 0.1)',
                      border: '1px solid rgba(245, 158, 11, 0.2)'
                    }}
                  >
                    <div className="text-white fw-bold mb-0" style={{ fontSize: 'clamp(16px, 3vw, 20px)' }}>
                      Q1 '25
                    </div>
                    <div className="text-white-50" style={{ fontSize: 'clamp(9px, 1.5vw, 11px)' }}>
                      Launch Date
                    </div>
                  </div>
                </div>
              </div>

              {/* Newsletter Subscription */}
              <div className="mt-3">
                {!subscribed ? (
                  <>
                    <p className="text-white-50 mb-2" style={{ fontSize: 'clamp(11px, 2vw, 13px)' }}>
                      <Bell size={14} className="me-1" style={{ verticalAlign: 'text-bottom' }} />
                      Get notified when we launch
                    </p>
                    <div className="d-flex flex-column flex-sm-row gap-2">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter your email"
                        className="form-control flex-grow-1"
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          borderRadius: '10px',
                          color: '#fff',
                          fontSize: 'clamp(12px, 2vw, 13px)',
                          padding: '10px 14px'
                        }}
                      />
                      <button
                        onClick={handleSubscribe}
                        className="btn d-flex align-items-center justify-content-center gap-2"
                        style={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          border: 'none',
                          borderRadius: '10px',
                          padding: '10px 20px',
                          color: 'white',
                          fontWeight: '600',
                          fontSize: 'clamp(12px, 2vw, 13px)',
                          boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                          transition: 'all 0.3s',
                          whiteSpace: 'nowrap'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 12px 32px rgba(102, 126, 234, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.4)';
                        }}
                      >
                        Notify Me
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </>
                ) : (
                  <div
                    className="p-3 rounded-3 d-flex align-items-center justify-content-center gap-2"
                    style={{
                      background: 'rgba(34, 197, 94, 0.1)',
                      border: '1px solid rgba(34, 197, 94, 0.3)',
                      animation: 'fade-in 0.5s ease-out'
                    }}
                  >
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: 'rgba(34, 197, 94, 0.2)'
                      }}
                    >
                      <Check size={16} className="text-success" />
                    </div>
                    <span className="text-success fw-medium" style={{ fontSize: 'clamp(12px, 2vw, 13px)' }}>
                      You're on the list! We'll notify you soon.
                    </span>
                  </div>
                )}
              </div>

              {/* Stars decoration */}
              <div className="d-flex justify-content-center justify-content-lg-start gap-2 mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="text-warning"
                    fill="currentColor"
                    style={{
                      animation: `twinkle 2s ease-in-out infinite ${i * 0.3}s`,
                      opacity: 0.8
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - What's Coming */}
          <div className="col-12 col-lg-7">
            <div
              className="p-3 p-md-4 rounded-4"
              style={{
                background: 'rgba(15, 15, 15, 0.9)',
                backdropFilter: 'blur(30px)',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.7)',
                animation: 'fade-in-up 1s ease-out 0.2s backwards'
              }}
            >
              <div className="d-flex align-items-center gap-2 mb-3">
                <Sparkles size={20} className="text-white" />
                <h2 className="text-white fw-bold mb-0" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)' }}>
                  What's Coming
                </h2>
              </div>

              {/* Featured Highlight */}
              <div className="mb-3">
                <div
                  className="p-4 rounded-4 position-relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
                    border: '1px solid rgba(102, 126, 234, 0.3)',
                    boxShadow: '0 15px 40px rgba(102, 126, 234, 0.3)',
                    minHeight: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {features.map((feature, index) => {
                    const FeatureIcon = feature.icon;
                    return (
                      <div
                        key={index}
                        className="text-center"
                        style={{
                          opacity: activeFeature === index ? 1 : 0,
                          transition: 'opacity 0.5s ease',
                          position: activeFeature === index ? 'relative' : 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, 0%)',
                          width: '100%'
                        }}
                      >
                        <div
                          className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                          style={{
                            width: '70px',
                            height: '70px',
                            background: feature.color,
                            boxShadow: `0 10px 30px ${feature.color}60`,
                            animation: 'float 3s ease-in-out infinite'
                          }}
                        >
                          <FeatureIcon size={36} className="text-white" strokeWidth={2.5} />
                        </div>
                        <h3 className="text-white fw-bold mb-2" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)' }}>
                          {feature.title}
                        </h3>
                        <p className="text-white-50 mb-0 px-3" style={{ fontSize: 'clamp(13px, 2vw, 15px)' }}>
                          {feature.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Feature dots indicator */}
                <div className="d-flex justify-content-center gap-2 mt-3">
                  {features.map((_, index) => (
                    <div
                      key={index}
                      className="rounded-pill"
                      style={{
                        width: activeFeature === index ? '32px' : '10px',
                        height: '10px',
                        background: activeFeature === index 
                          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                          : 'rgba(255,255,255,0.2)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onClick={() => setActiveFeature(index)}
                    />
                  ))}
                </div>
              </div>

              {/* All Features Grid */}
              <div className="row g-2">
                {features.map((feature, index) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <div key={index} className="col-6">
                      <div
                        className="p-3 rounded-3 h-100"
                        style={{
                          background: `${feature.color}15`,
                          border: `1px solid ${feature.color}40`,
                          transition: 'all 0.3s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-4px)';
                          e.currentTarget.style.boxShadow = `0 8px 20px ${feature.color}40`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                        onClick={() => setActiveFeature(index)}
                      >
                        <div
                          className="d-inline-flex align-items-center justify-content-center rounded-2 mb-2"
                          style={{
                            width: '36px',
                            height: '36px',
                            background: feature.color
                          }}
                        >
                          <FeatureIcon size={20} className="text-white" strokeWidth={2.5} />
                        </div>
                        <h4 className="text-white fw-bold mb-1" style={{ fontSize: 'clamp(13px, 2vw, 15px)' }}>
                          {feature.title}
                        </h4>
                        <p className="text-white-50 mb-0" style={{ fontSize: 'clamp(11px, 1.5vw, 12px)' }}>
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes float-up {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
          50% { opacity: 0.3; transform: scale(0.7) rotate(180deg); }
        }
        
        .form-control::placeholder {
          color: rgba(255,255,255,0.4);
        }
        
        .form-control:focus {
          background: rgba(255,255,255,0.08) !important;
          border-color: rgba(102, 126, 234, 0.5) !important;
          color: #fff !important;
          box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.15) !important;
          outline: none;
        }

        @media (max-width: 991px) {
          .col-12.col-lg-5, .col-12.col-lg-7 {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default ComingSoon;