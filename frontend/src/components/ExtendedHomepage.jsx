import React, { useState } from "react";
import { 
  Code2, 
  Sparkles, 
  Zap,
  Users,
  Video,
  Lock,
  Palette,
  Terminal,
  Globe,
  Github,
  Linkedin,
  Mail,
  Heart,
  CheckCircle,
  ArrowRight,
  Play,
  MessageSquare,
  Cloud
} from "lucide-react";

function ExtendedHomepage() {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 992);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const features = [
    {
      icon: Code2,
      title: "Real-time Collaboration",
      description: "Code together with your team in real-time. See changes instantly as they happen.",
      color: "#667eea",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      icon: Video,
      title: "Video Chat Integration",
      description: "Built-in HD video chat to discuss code while you work together seamlessly.",
      color: "#ec4899",
      gradient: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)"
    },
    {
      icon: Terminal,
      title: "AI Code Suggestions",
      description: "Smart AI-powered code completion and suggestions to boost your productivity.",
      color: "#10b981",
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)"
    },
    {
      icon: Users,
      title: "Multi-user Support",
      description: "Invite unlimited team members and collaborate on projects together.",
      color: "#f59e0b",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
    },
    {
      icon: Lock,
      title: "Secure & Private",
      description: "End-to-end encryption ensures your code and conversations stay private.",
      color: "#ef4444",
      gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
    },
    {
      icon: Palette,
      title: "Customizable Themes",
      description: "Personalize your workspace with beautiful themes and custom color schemes.",
      color: "#8b5cf6",
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
    }
  ];

  const techStack = [
    { name: "React", color: "#61dafb" },
    { name: "Node.js", color: "#68a063" },
    { name: "Socket.IO", color: "#010101" },
    { name: "WebRTC", color: "#333333" },
    { name: "MongoDB", color: "#47a248" },
    { name: "Express", color: "#000000" }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "50K+", label: "Code Sessions" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="w-100" style={{ background: 'transparent' }}>
      {/* Features Section */}
      <section className="py-4 py-md-5" style={{ background: 'transparent' }}>
        <div className="d-flex justify-content-center" style={{ width: '100%' }}>
          <div style={{ maxWidth: isMobile ? '100%' : '1000px', width: '100%', padding: '0 20px' }}>
            <div className="text-center mb-4">
              <div className="d-inline-flex align-items-center gap-2 mb-3">
                <Sparkles size={20} style={{ color: '#667eea' }} />
                <h2 className="text-white fw-bold mb-0" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
                  Powerful Features
                </h2>
              </div>
              <p className="text-white-50 mx-auto" style={{ maxWidth: '600px', fontSize: 'clamp(13px, 1.8vw, 15px)' }}>
                Everything you need for seamless collaborative coding in one platform
              </p>
            </div>

            <div className="row g-3">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="col-12 col-sm-6 col-lg-4">
                    <div
                      className="h-100 p-3 p-md-4 rounded-4 position-relative"
                      style={{
                        background: hoveredFeature === index 
                          ? 'rgba(255,255,255,0.08)' 
                          : 'rgba(255,255,255,0.03)',
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${hoveredFeature === index ? feature.color + '60' : 'rgba(255,255,255,0.1)'}`,
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        transform: hoveredFeature === index ? 'translateY(-8px)' : 'translateY(0)',
                        boxShadow: hoveredFeature === index ? `0 20px 40px ${feature.color}40` : '0 4px 12px rgba(0,0,0,0.3)'
                      }}
                      onMouseEnter={() => setHoveredFeature(index)}
                      onMouseLeave={() => setHoveredFeature(null)}
                    >
                      <div
                        className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                        style={{
                          width: 'clamp(48px, 8vw, 56px)',
                          height: 'clamp(48px, 8vw, 56px)',
                          background: feature.gradient,
                          boxShadow: `0 8px 20px ${feature.color}50`
                        }}
                      >
                        <Icon size={24} className="text-white" strokeWidth={2.5} />
                      </div>
                      <h3 className="text-white fw-bold mb-2" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.15rem)' }}>
                        {feature.title}
                      </h3>
                      <p className="text-white-50 mb-0" style={{ fontSize: 'clamp(12px, 1.5vw, 14px)', lineHeight: '1.6' }}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-4 py-md-5" style={{ background: 'rgba(102, 126, 234, 0.05)' }}>
        <div className="d-flex justify-content-center" style={{ width: '100%' }}>
          <div style={{ maxWidth: isMobile ? '100%' : '1000px', width: '100%', padding: '0 20px' }}>
            <div className="row g-2 g-md-3">
              {stats.map((stat, index) => (
                <div key={index} className="col-6 col-lg-3">
                  <div
                    className="text-center p-3 p-md-4 rounded-4"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    <div 
                      className="text-white fw-bold mb-1 mb-md-2" 
                      style={{ 
                        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      {stat.number}
                    </div>
                    <div className="text-white-50 fw-medium" style={{ fontSize: 'clamp(11px, 1.3vw, 13px)' }}>
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-4 py-md-5" style={{ background: 'transparent' }}>
        <div className="d-flex justify-content-center" style={{ width: '100%' }}>
          <div style={{ maxWidth: isMobile ? '100%' : '1000px', width: '100%', padding: '0 20px' }}>
            <div className="text-center mb-3 mb-md-4">
              <h3 className="text-white fw-bold mb-2 mb-md-3" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}>
                Built With Modern Technologies
              </h3>
              <p className="text-white-50" style={{ fontSize: 'clamp(12px, 1.5vw, 14px)' }}>
                Powered by the latest and most reliable tech stack
              </p>
            </div>
            <div className="d-flex flex-wrap justify-content-center gap-2">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="px-3 py-2 rounded-pill"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.borderColor = tech.color + '80';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span className="text-white fw-medium" style={{ fontSize: 'clamp(12px, 1.4vw, 14px)' }}>
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-4 py-md-5" style={{ background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)' }}>
        <div className="d-flex justify-content-center" style={{ width: '100%' }}>
          <div style={{ maxWidth: isMobile ? '100%' : '1000px', width: '100%', padding: '0 20px' }}>
            <div 
              className="text-center p-3 p-md-5 rounded-4"
              style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                style={{
                  width: 'clamp(56px, 10vw, 70px)',
                  height: 'clamp(56px, 10vw, 70px)',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 15px 40px rgba(102, 126, 234, 0.5)'
                }}
              >
                <Code2 size={32} className="text-white" strokeWidth={2.5} />
              </div>
              <h2 className="text-white fw-bold mb-2 mb-md-3" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
                Ready to Start Coding Together?
              </h2>
              <p className="text-white-50 mb-3 mb-md-4 mx-auto" style={{ maxWidth: '600px', fontSize: 'clamp(13px, 1.6vw, 15px)' }}>
                Join thousands of developers already collaborating on KS CODE
              </p>
              <button
                className="btn btn-lg d-inline-flex align-items-center gap-2 fw-bold"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: 'clamp(10px, 2vw, 14px) clamp(20px, 4vw, 32px)',
                  color: 'white',
                  fontSize: 'clamp(13px, 1.6vw, 15px)',
                  boxShadow: '0 12px 32px rgba(102, 126, 234, 0.4)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(102, 126, 234, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(102, 126, 234, 0.4)';
                }}
              >
                Get Started Now
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 py-md-5" style={{ background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="d-flex justify-content-center" style={{ width: '100%' }}>
          <div style={{ maxWidth: isMobile ? '100%' : '1200px', width: '100%', padding: '0 20px' }}>
            <div className="row g-3 g-md-4">
              {/* About */}
              <div className="col-12 col-md-6 col-lg-4">
                <h3 className="text-white fw-bold mb-2 mb-md-3" style={{ fontSize: 'clamp(1.15rem, 2vw, 1.35rem)' }}>
                  KS CODE
                </h3>
                <p className="text-white-50 mb-2 mb-md-3" style={{ fontSize: 'clamp(12px, 1.4vw, 14px)', lineHeight: '1.7' }}>
                  A revolutionary real-time collaborative coding platform designed to bring developers together. Code, collaborate, and create amazing projects with your team.
                </p>
                <div className="d-flex gap-2">
                  <a 
                    href="#" 
                    className="btn btn-sm d-inline-flex align-items-center justify-content-center"
                    style={{
                      width: '36px',
                      height: '36px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '10px',
                      color: 'white',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.borderColor = '#667eea';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                    }}
                  >
                    <Github size={16} />
                  </a>
                  <a 
                    href="#" 
                    className="btn btn-sm d-inline-flex align-items-center justify-content-center"
                    style={{
                      width: '36px',
                      height: '36px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '10px',
                      color: 'white',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.borderColor = '#0077b5';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                    }}
                  >
                    <Linkedin size={16} />
                  </a>
                  <a 
                    href="#" 
                    className="btn btn-sm d-inline-flex align-items-center justify-content-center"
                    style={{
                      width: '36px',
                      height: '36px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '10px',
                      color: 'white',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.borderColor = '#ea4335';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                    }}
                  >
                    <Mail size={16} />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="col-6 col-md-3 col-lg-2">
                <h4 className="text-white fw-bold mb-2 mb-md-3" style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)' }}>
                  Product
                </h4>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <a href="#" className="text-white-50 text-decoration-none" style={{ fontSize: 'clamp(12px, 1.3vw, 13px)', transition: 'color 0.3s' }}
                       onMouseEnter={(e) => e.currentTarget.style.color = '#667eea'}
                       onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                      Features
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-white-50 text-decoration-none" style={{ fontSize: 'clamp(12px, 1.3vw, 13px)', transition: 'color 0.3s' }}
                       onMouseEnter={(e) => e.currentTarget.style.color = '#667eea'}
                       onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                      Pricing
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-white-50 text-decoration-none" style={{ fontSize: 'clamp(12px, 1.3vw, 13px)', transition: 'color 0.3s' }}
                       onMouseEnter={(e) => e.currentTarget.style.color = '#667eea'}
                       onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                      Documentation
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-white-50 text-decoration-none" style={{ fontSize: 'clamp(12px, 1.3vw, 13px)', transition: 'color 0.3s' }}
                       onMouseEnter={(e) => e.currentTarget.style.color = '#667eea'}
                       onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                      API
                    </a>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div className="col-6 col-md-3 col-lg-2">
                <h4 className="text-white fw-bold mb-2 mb-md-3" style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)' }}>
                  Company
                </h4>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <a href="#" className="text-white-50 text-decoration-none" style={{ fontSize: 'clamp(12px, 1.3vw, 13px)', transition: 'color 0.3s' }}
                       onMouseEnter={(e) => e.currentTarget.style.color = '#667eea'}
                       onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                      About Us
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-white-50 text-decoration-none" style={{ fontSize: 'clamp(12px, 1.3vw, 13px)', transition: 'color 0.3s' }}
                       onMouseEnter={(e) => e.currentTarget.style.color = '#667eea'}
                       onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                      Blog
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-white-50 text-decoration-none" style={{ fontSize: 'clamp(12px, 1.3vw, 13px)', transition: 'color 0.3s' }}
                       onMouseEnter={(e) => e.currentTarget.style.color = '#667eea'}
                       onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                      Careers
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-white-50 text-decoration-none" style={{ fontSize: 'clamp(12px, 1.3vw, 13px)', transition: 'color 0.3s' }}
                       onMouseEnter={(e) => e.currentTarget.style.color = '#667eea'}
                       onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              {/* Creator Info */}
              <div className="col-12 col-lg-4">
                <div 
                  className="p-3 p-md-4 rounded-4"
                  style={{
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <div className="d-flex align-items-center gap-2 gap-md-3 mb-2 mb-md-3">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                      style={{
                        width: 'clamp(40px, 7vw, 50px)',
                        height: 'clamp(40px, 7vw, 50px)',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)'
                      }}
                    >
                      <span className="text-white fw-bold" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>KS</span>
                    </div>
                    <div>
                      <h4 className="text-white fw-bold mb-0" style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)' }}>
                        Krishna Srivastava
                      </h4>
                      <p className="text-white-50 mb-0" style={{ fontSize: 'clamp(11px, 1.3vw, 12px)' }}>
                        Creator & Developer
                      </p>
                    </div>
                  </div>
                  <p className="text-white-50 mb-0" style={{ fontSize: 'clamp(11px, 1.3vw, 13px)', lineHeight: '1.6' }}>
                    Building innovative AI-powered coding solutions to empower developers worldwide. Passionate about creating tools that make collaboration seamless and efficient.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-3 mt-md-5 pt-3 pt-md-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="row align-items-center g-2 g-md-3">
                <div className="col-12 col-md-6 text-center text-md-start">
                  <p className="text-white-50 mb-0" style={{ fontSize: 'clamp(11px, 1.3vw, 13px)' }}>
                    © 2025 KS CODE. All rights reserved.
                  </p>
                </div>
                <div className="col-12 col-md-6 text-center text-md-end">
                  <div className="d-inline-flex align-items-center gap-2">
                    <span className="text-white-50" style={{ fontSize: 'clamp(11px, 1.3vw, 13px)' }}>
                      Made with
                    </span>
                    <Heart size={14} className="text-danger" fill="currentColor" />
                    <span className="text-white-50" style={{ fontSize: 'clamp(11px, 1.3vw, 13px)' }}>
                      by Krishna Srivastava
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ExtendedHomepage;