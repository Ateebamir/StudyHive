import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function InnerScreen() {
  const navigate = useNavigate();
  const [rollNo, setRollNo] = useState('');
  const [name, setName] = useState('');
  const [program, setProgram] = useState('');
  const [error, setError] = useState('');
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

  const programs = [
    { value: 'BSCS', label: 'BSCS' },
    { value: 'BSIT', label: 'BSIT' },
    { value: 'BSAI', label: 'BSAI' }
  ];

  const handleSubmit = () => {
    if (!rollNo.trim()) {
      setError('Please enter your roll number');
      return;
    }

    if (rollNo.trim().length < 10) {
      setError('Roll number must be at least 10 characters');
      return;
    }

    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!program) {
      setError('Please select your program');
      return;
    }

    navigate('/subjects', {
      state: {
        rollNo: rollNo.trim().toUpperCase(),
        name: name.trim(),
        program
      }
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      position: 'relative',
      overflow: 'hidden',
      background: '#000000',
      flexDirection: isMobile ? 'column' : 'row',
      padding: isSmallMobile ? '1rem' : isMobile ? '1.5rem' : '0'
    }}>
      {/* Background Elements */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(2px 2px at 20% 30%, white, transparent), radial-gradient(2px 2px at 60% 70%, white, transparent), radial-gradient(1px 1px at 50% 50%, white, transparent), radial-gradient(1px 1px at 80% 10%, white, transparent), radial-gradient(2px 2px at 90% 60%, white, transparent), radial-gradient(1px 1px at 33% 85%, white, transparent), radial-gradient(1px 1px at 15% 45%, white, transparent)',
        backgroundSize: '200px 200px, 250px 250px, 300px 300px, 280px 280px, 220px 220px, 240px 240px, 260px 260px',
        opacity: 0.6,
        animation: 'twinkle 3s ease-in-out infinite alternate'
      }} />

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(1px 1px at 10% 20%, white, transparent), radial-gradient(1px 1px at 70% 40%, white, transparent), radial-gradient(1px 1px at 40% 60%, white, transparent), radial-gradient(1px 1px at 25% 75%, white, transparent), radial-gradient(1px 1px at 85% 85%, white, transparent), radial-gradient(1px 1px at 45% 15%, white, transparent), radial-gradient(1px 1px at 65% 25%, white, transparent)',
        backgroundSize: '180px 180px, 210px 210px, 270px 270px, 230px 230px, 190px 190px, 250px 250px, 220px 220px',
        opacity: 0.4,
        animation: 'twinkle 2s ease-in-out infinite alternate'
      }} />

      {/* Responsive background circles */}
      <div style={{
        position: 'absolute',
        top: isSmallMobile ? '5%' : isMobile ? '10%' : '15%',
        right: isSmallMobile ? '5%' : isMobile ? '8%' : '10%',
        width: isSmallMobile ? '200px' : isMobile ? '300px' : '500px',
        height: isSmallMobile ? '200px' : isMobile ? '300px' : '500px',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        bottom: isSmallMobile ? '5%' : isMobile ? '8%' : '10%',
        left: isSmallMobile ? '5%' : isMobile ? '5%' : '5%',
        width: isSmallMobile ? '180px' : isMobile ? '250px' : '450px',
        height: isSmallMobile ? '180px' : isMobile ? '250px' : '450px',
        background: 'radial-gradient(circle, rgba(14, 165, 233, 0.18) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(90px)',
        pointerEvents: 'none'
      }} />

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 10px rgba(6, 182, 212, 0.1), 0 0 20px rgba(6, 182, 212, 0.05); }
          50% { box-shadow: 0 0 15px rgba(6, 182, 212, 0.15), 0 0 25px rgba(6, 182, 212, 0.08); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .feature-item {
          opacity: 0;
          animation: slideUp 0.6s ease forwards;
        }
        .feature-item:nth-child(1) { animation-delay: 0.2s; }
        .feature-item:nth-child(2) { animation-delay: 0.4s; }
        .feature-item:nth-child(3) { animation-delay: 0.6s; }
        .glow-card {
          animation: glow 3s ease-in-out infinite;
        }
      `}</style>

      {/* Left Content Section */}
      <div style={{
        flex: isMobile ? '0 1 auto' : '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: isSmallMobile ? '1rem' : isMobile ? '1.5rem' : '3rem',
        position: 'relative',
        zIndex: 1,
        width: '100%'
      }}>
        <div style={{
          animation: 'fadeIn 1s ease',
          width: '100%',
          maxWidth: isMobile ? '100%' : '580px',
          margin: isMobile ? '0 auto' : '0'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: isSmallMobile ? '0.4rem 0.75rem' : isMobile ? '0.5rem 1rem' : '0.5rem 1.25rem',
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(14, 165, 233, 0.15))',
            border: '1px solid rgba(6, 182, 212, 0.4)',
            borderRadius: '50px',
            fontSize: isSmallMobile ? '0.75rem' : isMobile ? '0.8rem' : '0.875rem',
            fontWeight: '600',
            marginBottom: isSmallMobile ? '1rem' : isMobile ? '1.5rem' : '2rem',
            backdropFilter: 'blur(10px)',
            color: '#67e8f9'
          }}>
            <span style={{ fontSize: isSmallMobile ? '1rem' : isMobile ? '1.1rem' : '1.25rem' }}>🚀</span>
            <span>Advanced Learning Platform</span>
          </div>

          <h1 style={{
            fontSize: isSmallMobile ? '1.75rem' : isMobile ? '2.2rem' : 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: '900',
            lineHeight: '1.1',
            marginBottom: isSmallMobile ? '0.75rem' : isMobile ? '1rem' : '1.5rem',
            color: 'white',
            textShadow: '0 0 80px rgba(6, 182, 212, 0.5)'
          }}>
            Welcome To<br />
            <span style={{
              background: 'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 50%, #67e8f9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              backgroundSize: '200% 200%',
              animation: 'gradient 3s ease infinite'
            }}>
              StudyHive
            </span>
          </h1>

          <p style={{
            fontSize: isSmallMobile ? '0.95rem' : isMobile ? '1.05rem' : '1.25rem',
            marginBottom: isSmallMobile ? '1.5rem' : isMobile ? '2rem' : '3rem',
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: '1.8',
            fontWeight: '400'
          }}>
            StudyHive enables students to seek and offer help based on subjects, lectures and specific academic topics.
          </p>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: isSmallMobile ? '0.75rem' : isMobile ? '1rem' : '1.25rem'
          }}>
            {[
              { icon: '🎯', title: 'Collaborative Learning', desc: 'Learn with peers, not tutors' },
              { icon: '📊', title: 'Ask Anything, Anytime', desc: 'Get help on any subject topic' },
              { icon: '⚡', title: 'Fast & Secure', desc: 'Your academic data stays protected' }
            ].map((feature, idx) => (
              <div key={idx} className="feature-item" style={{
                display: 'flex',
                alignItems: 'center',
                gap: isSmallMobile ? '0.75rem' : isMobile ? '1rem' : '1.25rem',
                padding: isSmallMobile ? '0.75rem' : isMobile ? '1rem 1.25rem' : '1.25rem 1.75rem',
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(14, 165, 233, 0.1))',
                borderRadius: '16px',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(6, 182, 212, 0.25)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(14, 165, 233, 0.15))';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.4)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(6, 182, 212, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(14, 165, 233, 0.1))';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.25)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                <div style={{
                  width: isSmallMobile ? '40px' : isMobile ? '45px' : '50px',
                  height: isSmallMobile ? '40px' : isMobile ? '45px' : '50px',
                  background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isSmallMobile ? '1.2rem' : isMobile ? '1.3rem' : '1.5rem',
                  flexShrink: 0,
                  boxShadow: '0 4px 15px rgba(6, 182, 212, 0.3)'
                }}>
                  {feature.icon}
                </div>
                <div>
                  <h3 style={{
                    color: 'white',
                    fontSize: isSmallMobile ? '0.95rem' : isMobile ? '1rem' : '1.1rem',
                    fontWeight: '700',
                    marginBottom: '0.25rem'
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: isSmallMobile ? '0.8rem' : isMobile ? '0.85rem' : '0.9rem'
                  }}>
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Form Section */}
      <div style={{
        flex: isMobile ? '0 1 auto' : '0 0 500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isSmallMobile ? '1rem' : isMobile ? '1.5rem' : '2rem',
        position: 'relative',
        zIndex: 1,
        width: '100%'
      }}>
        <div className="glow-card" style={{
          width: '100%',
          maxWidth: isSmallMobile ? '100%' : isMobile ? '400px' : '440px',
          background: 'rgba(20, 20, 20, 0.8)',
          backdropFilter: 'blur(20px)',
          padding: isSmallMobile ? '1.5rem' : isMobile ? '2rem' : '3rem 2.5rem',
          borderRadius: '28px',
          border: '1px solid rgba(6, 182, 212, 0.35)',
          animation: 'slideUp 0.8s ease',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: isSmallMobile ? '1.5rem' : isMobile ? '2rem' : '2.5rem'
          }}>
            <div style={{
              width: isSmallMobile ? '50px' : isMobile ? '60px' : '70px',
              height: isSmallMobile ? '50px' : isMobile ? '60px' : '70px',
              background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              fontSize: isSmallMobile ? '1.5rem' : isMobile ? '1.8rem' : '2rem',
              boxShadow: '0 8px 25px rgba(6, 182, 212, 0.35)'
            }}>
              📚
            </div>
            <h2 style={{
              fontSize: isSmallMobile ? '1.5rem' : isMobile ? '1.8rem' : '2rem',
              fontWeight: '900',
              color: 'white',
              marginBottom: '0.5rem'
            }}>
              Get Started
            </h2>
            <p style={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: isSmallMobile ? '0.9rem' : '1rem'
            }}>
              Enter your credentials to continue
            </p>
          </div>

          <div style={{ marginBottom: '1.75rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.75rem',
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: '600',
              fontSize: isSmallMobile ? '0.9rem' : '0.95rem'
            }}>
              Roll Number
            </label>
            <input
              type="text"
              placeholder="Enter your roll number"
              value={rollNo}
              onChange={(e) => {
                setRollNo(e.target.value);
                setError('');
              }}
              style={{
                width: '100%',
                padding: isSmallMobile ? '0.85rem 1rem' : '1rem 1.25rem',
                borderRadius: '14px',
                border: '1px solid rgba(6, 182, 212, 0.35)',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box',
                background: 'rgba(6, 182, 212, 0.05)',
                color: 'white'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#06b6d4';
                e.target.style.background = 'rgba(6, 182, 212, 0.1)';
                e.target.style.boxShadow = '0 0 0 4px rgba(6, 182, 212, 0.2), 0 0 20px rgba(6, 182, 212, 0.4)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(6, 182, 212, 0.35)';
                e.target.style.background = 'rgba(6, 182, 212, 0.05)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ marginBottom: '1.75rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.75rem',
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: '600',
              fontSize: isSmallMobile ? '0.9rem' : '0.95rem'
            }}>
              Your Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              style={{
                width: '100%',
                padding: isSmallMobile ? '0.85rem 1rem' : '1rem 1.25rem',
                borderRadius: '14px',
                border: '1px solid rgba(6, 182, 212, 0.35)',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box',
                background: 'rgba(6, 182, 212, 0.05)',
                color: 'white'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#06b6d4';
                e.target.style.background = 'rgba(6, 182, 212, 0.1)';
                e.target.style.boxShadow = '0 0 0 4px rgba(6, 182, 212, 0.2), 0 0 20px rgba(6, 182, 212, 0.4)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(6, 182, 212, 0.35)';
                e.target.style.background = 'rgba(6, 182, 212, 0.05)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ marginBottom: '1.75rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.75rem',
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: '600',
              fontSize: isSmallMobile ? '0.9rem' : '0.95rem'
            }}>
              Select Your Program
            </label>
            <select
              value={program}
              onChange={(e) => {
                setProgram(e.target.value);
                setError('');
              }}
              style={{
                width: '100%',
                padding: isSmallMobile ? '0.85rem 1rem' : '1rem 1.25rem',
                borderRadius: '14px',
                border: '1px solid rgba(6, 182, 212, 0.35)',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box',
                cursor: 'pointer',
                appearance: 'none',
                background: 'rgba(6, 182, 212, 0.05)',
                color: 'white',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cpath fill='%2306b6d4' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                paddingRight: '3rem'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#06b6d4';
                e.target.style.background = 'rgba(6, 182, 212, 0.1)';
                e.target.style.boxShadow = '0 0 0 4px rgba(6, 182, 212, 0.2), 0 0 20px rgba(6, 182, 212, 0.4)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(6, 182, 212, 0.35)';
                e.target.style.background = 'rgba(6, 182, 212, 0.05)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <option value="" style={{ background: '#0a0a0a', color: 'white' }}>Choose your program</option>
              {programs.map((prog) => (
                <option key={prog.value} value={prog.value} style={{ background: '#0a0a0a', color: 'white' }}>
                  {prog.label}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div style={{
              color: '#fca5a5',
              fontSize: '0.875rem',
              marginBottom: '1.5rem',
              padding: '1rem',
              background: 'rgba(239, 68, 68, 0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(239, 68, 68, 0.3)'
            }}>
              ⚠️ {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              padding: isSmallMobile ? '0.9rem' : '1.1rem',
              background: 'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)',
              color: '#000',
              border: 'none',
              borderRadius: '14px',
              fontSize: isSmallMobile ? '1rem' : '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(6, 182, 212, 0.25)',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '44px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(6, 182, 212, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(6, 182, 212, 0.25)';
            }}
          >
            Continue →
          </button>

          <p style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '0.875rem'
          }}>
            🔒 Your data is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  );
}

export default InnerScreen;
