import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PhaseNavigator = ({ currentPhase, totalPhases = 15 }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const phases = Array.from({ length: totalPhases }, (_, i) => i + 1);

  const availablePhases = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // List of phases that have detail pages

  const handlePhaseClick = (phaseId) => {
    if (availablePhases.includes(phaseId)) {
      navigate(`/phase/${phaseId}`);
    } else {
      // Phases without detail pages go to home
      navigate('/');
    }
    setIsOpen(false);
  };

  const handlePrevious = () => {
    if (currentPhase > 1) {
      const prevPhase = currentPhase - 1;
      if (availablePhases.includes(prevPhase)) {
        navigate(`/phase/${prevPhase}`);
      } else {
        // Find the nearest previous available phase
        const nearestPrev = availablePhases
          .filter(p => p < currentPhase)
          .sort((a, b) => b - a)[0];
        if (nearestPrev) {
          navigate(`/phase/${nearestPrev}`);
        } else {
          navigate('/');
        }
      }
    }
  };

  const handleNext = () => {
    if (currentPhase < totalPhases) {
      const nextPhase = currentPhase + 1;
      if (availablePhases.includes(nextPhase)) {
        navigate(`/phase/${nextPhase}`);
      } else {
        // Find the nearest next available phase
        const nearestNext = availablePhases
          .filter(p => p > currentPhase)
          .sort((a, b) => a - b)[0];
        if (nearestNext) {
          navigate(`/phase/${nearestNext}`);
        } else {
          navigate('/');
        }
      }
    }
  };

  return (
    <>
      {/* Floating Navigation Button */}
      <div style={styles.floatingContainer}>
        {/* Previous Button */}
        {currentPhase > 1 && (
          <button
            onClick={handlePrevious}
            style={styles.navButton}
            title={t('common.previous')}
          >
            ←
          </button>
        )}

        {/* Phase Selector */}
        <div style={styles.phaseSelector}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={styles.mainButton}
            title={t('nav.phases')}
          >
            <span style={styles.mainButtonIcon}>📑</span>
            <span style={styles.mainButtonText}>
              {currentPhase}/{totalPhases}
            </span>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div style={styles.dropdown}>
              <div style={styles.dropdownHeader}>
                <span>{t('phases.title')}</span>
                <button
                  onClick={() => setIsOpen(false)}
                  style={styles.closeButton}
                >
                  ✕
                </button>
              </div>
              <div style={styles.phaseGrid}>
                {phases.map((phaseId) => (
                  <button
                    key={phaseId}
                    onClick={() => handlePhaseClick(phaseId)}
                    style={{
                      ...styles.phaseButton,
                      ...(phaseId === currentPhase ? styles.phaseButtonActive : {}),
                      ...(availablePhases.includes(phaseId) ? styles.phaseButtonAvailable : styles.phaseButtonDisabled)
                    }}
                    disabled={!availablePhases.includes(phaseId)}
                    title={t(`phases.phase${phaseId}.name`)}
                  >
                    <div style={styles.phaseButtonNumber}>{phaseId}</div>
                    <div style={styles.phaseButtonName}>
                      {t(`phases.phase${phaseId}.name`)}
                    </div>
                  </button>
                ))}
              </div>
              <div style={styles.dropdownFooter}>
                <button
                  onClick={() => navigate('/')}
                  style={styles.homeButton}
                >
                  🏠 {t('nav.home')}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Next Button */}
        {currentPhase < totalPhases && (
          <button
            onClick={handleNext}
            style={styles.navButton}
            title={t('common.next')}
          >
            →
          </button>
        )}
      </div>

      {/* Overlay when dropdown is open */}
      {isOpen && (
        <div
          style={styles.overlay}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

const styles = {
  floatingContainer: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    zIndex: 999
  },
  phaseSelector: {
    position: 'relative'
  },
  mainButton: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    boxShadow: '0 4px 15px rgba(52, 152, 219, 0.4)',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2px',
    transition: 'all 0.3s ease',
    fontSize: '0.9rem',
    fontWeight: '600'
  },
  mainButtonIcon: {
    fontSize: '1.5rem'
  },
  mainButtonText: {
    fontSize: '0.75rem'
  },
  navButton: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#2c3e50',
    color: 'white',
    border: 'none',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',
    fontSize: '1.5rem',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dropdown: {
    position: 'absolute',
    bottom: '80px',
    right: '0',
    width: '400px',
    maxHeight: '500px',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  dropdownHeader: {
    padding: '20px',
    backgroundColor: '#2c3e50',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '1.1rem',
    fontWeight: '600'
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '1.3rem',
    cursor: 'pointer',
    padding: '5px',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s ease'
  },
  phaseGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    padding: '20px',
    maxHeight: '350px',
    overflowY: 'auto'
  },
  phaseButton: {
    padding: '12px 8px',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '5px'
  },
  phaseButtonAvailable: {
    borderColor: '#3498db',
    cursor: 'pointer'
  },
  phaseButtonActive: {
    backgroundColor: '#3498db',
    color: 'white',
    borderColor: '#3498db'
  },
  phaseButtonDisabled: {
    opacity: 0.4,
    cursor: 'not-allowed'
  },
  phaseButtonNumber: {
    fontSize: '1.2rem',
    fontWeight: '700'
  },
  phaseButtonName: {
    fontSize: '0.7rem',
    lineHeight: '1.2',
    minHeight: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dropdownFooter: {
    padding: '15px 20px',
    borderTop: '1px solid #e0e0e0',
    backgroundColor: '#f8f9fa'
  },
  homeButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#2c3e50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'background-color 0.3s ease'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 998
  }
};

export default PhaseNavigator;
