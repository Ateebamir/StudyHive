import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const MainScreen = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallMobile(window.innerWidth <= 480);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Get student data from navigation state or use defaults
  const studentData = (location.state && (location.state.rollNo || location.state.studentData))
    ? (location.state.studentData || location.state)
    : {
      rollNo: 'GUEST',
      name: 'Guest',
      program: 'BSCS'
    };

  const cardsData = [
    {
      id: 1,
      title: 'Functional English',
      description: 'Communication & Literature',
      fundType: 'english',
      icon: '📚',
      color: '#06b6d4',
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)'
    },
    {
      id: 2,
      title: 'ITC',
      description: 'Introduction to Computing',
      fundType: 'itc',
      icon: '💻',
      color: '#0ea5e9',
      gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)'
    },
    {
      id: 3,
      title: 'Ideology',
      description: 'Ideology and Constitution of Pakistan',
      fundType: 'ideology',
      icon: '🏛️',
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
    },
    {
      id: 4,
      title: 'Discrete Structures',
      description: 'Discrete Mathematics',
      fundType: 'discrete',
      icon: '🔢',
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
    },
    {
      id: 5,
      title: 'Basic Electronics',
      description: 'Electronic Fundamentals',
      fundType: 'electronics',
      icon: '🔌',
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
    },
    {
      id: 6,
      title: 'Labs',
      description: 'Practical Work',
      fundType: 'labs',
      icon: '🧪',
      color: '#ec4899',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
    }
  ];

  const handleCardClick = (card) => {
    navigate('/home', {
      state: {
        studentData: studentData,
        subjectData: card
      }
    });
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      background: '#000000'
    }}>

      {/* Enhanced Background Layers */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(circle at 20% 30%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(14, 165, 233, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 40% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
        `,
        animation: 'pulse 8s ease-in-out infinite alternate'
      }} />

      {/* Twinkling Stars Background - Layer 1 */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(2px 2px at 20% 30%, white, transparent), radial-gradient(2px 2px at 60% 70%, white, transparent), radial-gradient(1px 1px at 50% 50%, white, transparent), radial-gradient(1px 1px at 80% 10%, white, transparent), radial-gradient(2px 2px at 90% 60%, white, transparent), radial-gradient(1px 1px at 33% 85%, white, transparent), radial-gradient(1px 1px at 15% 45%, white, transparent)',
        backgroundSize: '200px 200px, 250px 250px, 300px 300px, 280px 280px, 220px 220px, 240px 240px, 260px 260px',
        opacity: 0.6,
        animation: 'twinkle 3s ease-in-out infinite alternate'
      }} />

      {/* Twinkling Stars Background - Layer 2 */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(1px 1px at 10% 20%, white, transparent), radial-gradient(1px 1px at 70% 40%, white, transparent), radial-gradient(1px 1px at 40% 60%, white, transparent), radial-gradient(1px 1px at 25% 75%, white, transparent), radial-gradient(1px 1px at 85% 85%, white, transparent), radial-gradient(1px 1px at 45% 15%, white, transparent), radial-gradient(1px 1px at 65% 25%, white, transparent)',
        backgroundSize: '180px 180px, 210px 210px, 270px 270px, 230px 230px, 190px 190px, 250px 250px, 220px 220px',
        opacity: 0.4,
        animation: 'twinkle 2s ease-in-out infinite alternate'
      }} />

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-5px) scale(1.02); }
        }
        .card-item {
          opacity: 0;
          animation: slideUp 0.5s ease forwards;
        }
        .card-item:nth-child(1) { animation-delay: 0.1s; }
        .card-item:nth-child(2) { animation-delay: 0.2s; }
        .card-item:nth-child(3) { animation-delay: 0.3s; }
        .card-item:nth-child(4) { animation-delay: 0.4s; }
        .card-item:nth-child(5) { animation-delay: 0.5s; }
        .card-item:nth-child(6) { animation-delay: 0.6s; }
      `}</style>

      {/* Header */}
      <header style={{
        padding: isSmallMobile ? '0.75rem 1rem' : isMobile ? '1rem' : '1rem 2rem',
        background: 'rgba(10, 10, 10, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        zIndex: 100,
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1400px',
          margin: '0 auto',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '1rem' : '0',
          width: '100%'
        }}>
          {/* Left */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: isSmallMobile ? '0.75rem' : '1rem',
            flexDirection: isMobile ? 'column' : 'row',
            width: isMobile ? '100%' : 'auto',
            justifyContent: isMobile ? 'center' : 'flex-start'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: isSmallMobile ? '0.4rem 0.75rem' : '0.5rem 1.25rem',
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(14, 165, 233, 0.2))',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              borderRadius: '12px',
              fontSize: isSmallMobile ? '0.8rem' : '0.9rem',
              fontWeight: '600',
              color: '#67e8f9',
              boxShadow: '0 4px 15px rgba(6, 182, 212, 0.2)'
            }}>
              <span style={{ fontSize: isSmallMobile ? '0.9rem' : '1.1rem' }}>📚</span>
              <span>StudyHive</span>
            </div>

            {/* Display user info */}
            <div style={{
              padding: isSmallMobile ? '0.4rem 0.75rem' : '0.5rem 1rem',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: isSmallMobile ? '0.75rem' : '0.85rem',
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: isMobile ? 'center' : 'flex-start'
            }}>
              <span style={{
                color: '#67e8f9',
                fontWeight: '500'
              }}>
                {studentData.name}
              </span>
              <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>•</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {studentData.rollNo}
              </span>
              <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>•</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {studentData.program}
              </span>
            </div>
          </div>

          {/* Right */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: isSmallMobile ? '0.5rem' : '0.75rem',
            justifyContent: isMobile ? 'center' : 'flex-end',
            width: isMobile ? '100%' : 'auto'
          }}>
            <button
              style={{
                padding: isSmallMobile ? '0.5rem 0.75rem' : '0.6rem 1.25rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                color: '#cbd5e1',
                fontSize: isSmallMobile ? '0.75rem' : '0.85rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                minHeight: '44px',
                minWidth: '44px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(6, 182, 212, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                e.currentTarget.style.color = '#67e8f9';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = '#cbd5e1';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>📊</span>
              Analytics
            </button>

            <button
              onClick={handleLogout}
              style={{
                padding: isSmallMobile ? '0.5rem 0.75rem' : '0.6rem 1.25rem',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '10px',
                color: '#f87171',
                fontSize: isSmallMobile ? '0.75rem' : '0.85rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                minHeight: '44px',
                minWidth: '44px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>🚪</span>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        padding: isSmallMobile ? '1rem' : isMobile ? '1.5rem' : '1.5rem',
        position: 'relative',
        zIndex: 1,
        height: isMobile ? 'auto' : 'calc(100vh - 72px)',
        overflowY: isMobile ? 'visible' : 'auto'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          height: isMobile ? 'auto' : '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Personalized Welcome Section */}
          <div style={{
            textAlign: 'center',
            marginBottom: isSmallMobile ? '1.5rem' : isMobile ? '2rem' : '2rem',
            animation: 'fadeIn 0.8s ease',
            padding: isSmallMobile ? '0 1rem' : '0'
          }}>
            <h1 style={{
              fontSize: isSmallMobile ? '1.75rem' : isMobile ? '2.2rem' : 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '800',
              lineHeight: '1.2',
              marginBottom: '0.5rem',
              color: 'white'
            }}>
              Welcome,
              <span style={{
                display: 'block',
                background: 'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 50%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                backgroundSize: '200% 200%',
                animation: 'gradient 3s ease infinite'
              }}>
                {studentData.name}!
              </span>
            </h1>
            <p style={{
              fontSize: isSmallMobile ? '0.9rem' : isMobile ? '1rem' : '1rem',
              color: 'rgba(255, 255, 255, 0.6)',
              maxWidth: '500px',
              margin: '0 auto',
              lineHeight: '1.5'
            }}>
              Ready to ace your {studentData.program} subjects? Select a subject to begin.
            </p>
          </div>

          {/* Cards Grid - Responsive */}
          <div style={{
            flex: isMobile ? '0 1 auto' : 1,
            display: 'grid',
            gridTemplateColumns: isSmallMobile ? '1fr' :
              isMobile ? 'repeat(2, 1fr)' :
                'repeat(3, 370px)',
            gap: isSmallMobile ? '1rem' : isMobile ? '1.5rem' : '1.75rem',
            padding: isSmallMobile ? '0.25rem' : '0.5rem',
            alignContent: 'start',
            justifyContent: 'center'
          }}>
            {cardsData.map((card, idx) => (
              <div
                key={card.id}
                className="card-item"
                style={{
                  background: 'rgba(20, 20, 20, 0.8)',
                  backdropFilter: 'blur(20px)',
                  padding: isSmallMobile ? '1.5rem 1.25rem' : isMobile ? '1.75rem 1.5rem' : '2.25rem 2rem',
                  borderRadius: '20px',
                  border: `1px solid ${hoveredCard === card.id ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  animationDelay: `${idx * 0.1}s`,
                  textAlign: 'center',
                  boxShadow: hoveredCard === card.id
                    ? `0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px ${card.color}40`
                    : '0 10px 25px rgba(0, 0, 0, 0.3)',
                  transform: hoveredCard === card.id ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
                  height: isSmallMobile ? '250px' : isMobile ? '280px' : '320px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
                onClick={() => handleCardClick(card)}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Gradient Border Top */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: card.gradient,
                  opacity: hoveredCard === card.id ? 1 : 0.8
                }} />

                <div>
                  {/* Icon */}
                  <div style={{
                    width: isSmallMobile ? '60px' : isMobile ? '65px' : '70px',
                    height: isSmallMobile ? '60px' : isMobile ? '65px' : '70px',
                    background: card.gradient,
                    borderRadius: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    fontSize: isSmallMobile ? '1.8rem' : isMobile ? '2rem' : '2rem',
                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    boxShadow: `0 12px 28px ${card.color}40`,
                    transform: hoveredCard === card.id ? 'scale(1.1) translateY(-8px)' : 'scale(1)'
                  }}>
                    {card.icon}
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: isSmallMobile ? '1.3rem' : isMobile ? '1.4rem' : '1.5rem',
                    fontWeight: '700',
                    color: 'white',
                    marginBottom: '0.75rem',
                    letterSpacing: '-0.02em',
                    transition: 'all 0.3s ease',
                    transform: hoveredCard === card.id ? 'scale(1.05)' : 'scale(1)'
                  }}>
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    color: hoveredCard === card.id ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.5)',
                    fontSize: isSmallMobile ? '0.9rem' : isMobile ? '0.95rem' : '0.95rem',
                    lineHeight: '1.6',
                    marginBottom: '0',
                    padding: '0 0.5rem',
                    transition: 'all 0.3s ease'
                  }}>
                    {card.description}
                  </p>
                </div>

                {/* CTA Button */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  padding: isSmallMobile ? '0.7rem 1.2rem' : '0.8rem 1.6rem',
                  background: hoveredCard === card.id ? `${card.color}20` : 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  border: `2px solid ${hoveredCard === card.id ? card.color : 'rgba(255, 255, 255, 0.1)'}`,
                  fontSize: isSmallMobile ? '0.9rem' : '0.95rem',
                  color: hoveredCard === card.id ? card.color : 'rgba(255, 255, 255, 0.7)',
                  fontWeight: '600',
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transform: hoveredCard === card.id ? 'scale(1.08) translateY(-4px)' : 'scale(1)',
                  margin: '0 auto',
                  boxShadow: hoveredCard === card.id ? `0 4px 12px ${card.color}25` : 'none',
                  minHeight: '44px',
                  minWidth: '44px'
                }}>
                  <span style={{
                    fontSize: '1rem',
                    transition: 'transform 0.3s ease',
                    display: 'inline-block',
                    transform: hoveredCard === card.id ? 'translateX(4px)' : 'translateX(0)'
                  }}>→</span>
                  Explore
                </div>

                {/* Hover Overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: `radial-gradient(circle at center, ${card.color}15, transparent 70%)`,
                  opacity: hoveredCard === card.id ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                  pointerEvents: 'none'
                }} />
              </div>
            ))}
          </div>

          {/* Enhanced Footer */}
          <div style={{
            marginTop: isSmallMobile ? '2rem' : isMobile ? '2.5rem' : '2.5rem',
            padding: isSmallMobile ? '1rem' : '1.5rem',
            textAlign: 'center',
            position: 'relative'
          }}>
            {/* Decorative Line */}
            <div style={{
              width: isSmallMobile ? '150px' : '200px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.5), transparent)',
              margin: '0 auto 1.5rem'
            }} />

            {/* Stylish Copyright */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: isSmallMobile ? '0.5rem' : '0.75rem',
              padding: isSmallMobile ? '0.5rem 1rem' : '0.75rem 1.5rem',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                borderRadius: '50%',
                animation: 'pulse 2s ease-in-out infinite'
              }} />

              <span style={{
                fontSize: isSmallMobile ? '0.75rem' : '0.85rem',
                fontWeight: '500',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                © 2025 StudyHive
              </span>

              <span style={{
                fontSize: isSmallMobile ? '0.75rem' : '0.85rem',
                color: 'rgba(255, 255, 255, 0.4)',
                fontWeight: '400'
              }}>
                All rights reserved
              </span>

              <div style={{
                width: '8px',
                height: '8px',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                borderRadius: '50%',
                animation: 'pulse 2s ease-in-out infinite 0.5s'
              }} />
            </div>

            {/* Small Tagline */}
            <p style={{
              marginTop: '0.75rem',
              fontSize: isSmallMobile ? '0.7rem' : '0.75rem',
              color: 'rgba(255, 255, 255, 0.2)',
              letterSpacing: '0.05em'
            }}>
              Empowering Students • Driving Excellence
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainScreen;
