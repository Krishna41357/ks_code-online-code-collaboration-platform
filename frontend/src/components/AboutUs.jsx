import React, { useState, useEffect } from "react";
import { 
  Code2, 
  Sparkles, 
  Zap, 
  Users, 
  Globe, 
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Terminal,
  Heart,
  Coffee,
  Star,
  Home,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function AboutUs() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Zap size={28} />,
      title: "Real-Time Sync",
      description: "Experience lightning-fast synchronization across all connected users with zero latency."
    },
    {
      icon: <Users size={28} />,
      title: "Collaborative Rooms",
      description: "Create private or public rooms and invite team members for seamless collaboration."
    },
    {
      icon: <Code2 size={28} />,
      title: "Multi-Language Support",
      description: "Code in any language with syntax highlighting and intelligent autocomplete."
    },
    {
      icon: <Globe size={28} />,
      title: "Global Access",
      description: "Access your projects from anywhere in the world with cloud synchronization."
    }
  ];

  return (
    <div className="position-relative" style={{ 
      background: 'transparent',
      minHeight: '100vh',
      overflow: 'hidden'
    }}>
      {/* Back to Home Button */}
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

      {/* Cursor glow effect */}
      <div
        className="position-fixed rounded-circle"
        style={{
          width: '600px',
          height: '600px',
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
          transition: 'left 0.1s, top 0.1s',
          zIndex: 0
        }}
      />

      <div className="container py-5" style={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <div className="text-center mb-5 animate-on-scroll" id="hero" style={{
          opacity: isVisible.hero ? 1 : 0,
          transform: isVisible.hero ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease-out'
        }}>
          <div className="d-inline-flex align-items-center justify-content-center mb-4 position-relative">
            <div
              className="position-absolute rounded-circle"
              style={{
                width: '150px',
                height: '150px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                filter: 'blur(40px)',
                animation: 'pulse 3s ease-in-out infinite'
              }}
            />
            <div
              className="rounded-3 position-relative"
              style={{
                width: '120px',
                height: '120px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 60px rgba(102, 126, 234, 0.5)',
                animation: 'float 3s ease-in-out infinite'
              }}
            >
              <Code2 size={60} className="text-white" strokeWidth={2.5} />
            </div>
          </div>
          
          <h1 className="text-white fw-bold mb-3" style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            letterSpacing: '-0.02em'
          }}>
            Welcome to <span style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>KS CODE</span>
          </h1>
          
          <p className="text-white-50 fs-5 mb-0" style={{ maxWidth: '700px', margin: '0 auto' }}>
            The future of collaborative coding is here. Code together, build together, grow together.
          </p>
        </div>

        {/* About Platform Section */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-10">
            <div 
              className="p-4 p-md-5 rounded-4 animate-on-scroll"
              id="platform"
              style={{
                background: 'rgba(15, 15, 15, 0.85)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                opacity: isVisible.platform ? 1 : 0,
                transform: isVisible.platform ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s ease-out 0.2s'
              }}
            >
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="p-3 rounded-3" style={{
                  background: 'rgba(102, 126, 234, 0.1)',
                  border: '1px solid rgba(102, 126, 234, 0.3)'
                }}>
                  <Terminal size={32} className="text-white" />
                </div>
                <h2 className="text-white fw-bold mb-0">About KS CODE</h2>
              </div>
              
              <p className="text-white-50 fs-6 mb-4 lh-lg">
                KS CODE is a cutting-edge real-time code collaboration platform designed to revolutionize 
                the way developers work together. Whether you're pair programming, conducting code reviews, 
                or teaching programming concepts, KS CODE provides the perfect environment for seamless collaboration.
              </p>
              
              <p className="text-white-50 fs-6 mb-0 lh-lg">
                Built with modern web technologies and a focus on performance, KS CODE offers instant 
                synchronization, intelligent code editing, and a beautiful interface that makes coding 
                a pleasure. Join thousands of developers who are already collaborating better with KS CODE.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="row g-4 mb-5">
          {features.map((feature, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div
                className="h-100 p-4 rounded-4 animate-on-scroll"
                id={`feature-${index}`}
                style={{
                  background: 'rgba(15, 15, 15, 0.85)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.3s ease',
                  opacity: isVisible[`feature-${index}`] ? 1 : 0,
                  transform: isVisible[`feature-${index}`] ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: `${0.1 * index}s`,
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.5)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="mb-3 text-white" style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {feature.icon}
                </div>
                <h4 className="text-white fw-bold mb-2">{feature.title}</h4>
                <p className="text-white-50 mb-0 small">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* About Creator Section */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-10">
            <div
              className="p-4 p-md-5 rounded-4 animate-on-scroll"
              id="creator"
              style={{
                background: 'rgba(15, 15, 15, 0.85)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                opacity: isVisible.creator ? 1 : 0,
                transform: isVisible.creator ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s ease-out'
              }}
            >
              <div className="row align-items-center">
                <div className="col-md-4 text-center mb-4 mb-md-0">
                  <div className="position-relative d-inline-block">
                    <div
                      className="position-absolute top-0 start-0 w-100 h-100 rounded-circle"
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        filter: 'blur(30px)',
                        animation: 'pulse 3s ease-in-out infinite'
                      }}
                    />
                    <div
                      className="position-relative rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: '180px',
                        height: '180px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        boxShadow: '0 20px 60px rgba(102, 126, 234, 0.5)',
                        border: '4px solid rgba(255,255,255,0.1)'
                      }}
                    >
                      <span className="text-white fw-bold" style={{ fontSize: '4rem' }}>K</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 d-flex justify-content-center gap-3">
                    <a
                      href="https://github.com/krishna-intro"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm d-flex align-items-center gap-2"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        color: 'white',
                        borderRadius: '10px',
                        padding: '8px 16px'
                      }}
                    >
                      <Github size={18} />
                    </a>
                    <a
                      href="https://linkedin.com/in/krishna-srivastava"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm d-flex align-items-center gap-2"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        color: 'white',
                        borderRadius: '10px',
                        padding: '8px 16px'
                      }}
                    >
                      <Linkedin size={18} />
                    </a>
                    <a
                      href="mailto:krishna@example.com"
                      className="btn btn-sm d-flex align-items-center gap-2"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        color: 'white',
                        borderRadius: '10px',
                        padding: '8px 16px'
                      }}
                    >
                      <Mail size={18} />
                    </a>
                  </div>
                </div>
                
                <div className="col-md-8">
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="p-3 rounded-3" style={{
                      background: 'rgba(102, 126, 234, 0.1)',
                      border: '1px solid rgba(102, 126, 234, 0.3)'
                    }}>
                      <Heart size={28} className="text-white" />
                    </div>
                    <h2 className="text-white fw-bold mb-0">Meet the Creator</h2>
                  </div>
                  
                  <h3 className="text-white fw-bold mb-3">Krishna Srivastava</h3>
                  
                  <p className="text-white-50 mb-3 lh-lg">
                    A passionate full-stack developer and technology enthusiast dedicated to building 
                    tools that empower developers worldwide. With a deep love for clean code and 
                    innovative solutions, Krishna created KS CODE to bridge the gap between 
                    collaboration and productivity.
                  </p>
                  
                  <p className="text-white-50 mb-4 lh-lg">
                    When not coding, you'll find Krishna exploring new technologies, contributing to 
                    open-source projects, and sharing knowledge with the developer community.
                  </p>
                  
                  <a
                    href="https://krishna-intro.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn d-inline-flex align-items-center gap-2"
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px 24px',
                      color: 'white',
                      fontWeight: '600',
                      boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                      transition: 'all 0.3s'
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
                    View Portfolio
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div
              className="p-4 p-md-5 rounded-4 text-center animate-on-scroll"
              id="mission"
              style={{
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
                opacity: isVisible.mission ? 1 : 0,
                transform: isVisible.mission ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s ease-out'
              }}
            >
              <Coffee size={48} className="text-white mb-3" style={{ opacity: 0.8 }} />
              <h2 className="text-white fw-bold mb-3">Built with Love & Coffee</h2>
              <p className="text-white-50 mb-0 fs-5" style={{ maxWidth: '600px', margin: '0 auto' }}>
                Every line of code in KS CODE is crafted with attention to detail and a genuine 
                desire to make developers' lives easier. Thank you for being part of this journey!
              </p>
              <div className="d-flex justify-content-center gap-2 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={24}
                    className="text-warning"
                    fill="currentColor"
                    style={{
                      animation: `twinkle 2s ease-in-out infinite ${i * 0.2}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
        
        .animate-on-scroll {
          transition: all 0.8s ease-out;
        }
        
        a {
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}

export default AboutUs;