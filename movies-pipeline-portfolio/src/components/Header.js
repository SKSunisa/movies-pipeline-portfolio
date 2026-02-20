import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  // Check if we're on a phase page
  const phaseMatch = location.pathname.match(/^\/phase\/(\d+)$/);
  const currentPhase = phaseMatch ? parseInt(phaseMatch[1]) : null;

  // List of available phases
  const availablePhases = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const handlePhaseChange = (e) => {
    const phaseId = parseInt(e.target.value);
    if (availablePhases.includes(phaseId)) {
      navigate(`/phase/${phaseId}`);
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          <div style={styles.logoWrapper}>
            <img src="/movies-pipeline-portfolio/logo.png" alt="Logo" style={styles.logoImage} />
          </div>
          <span style={styles.logoText}>Movies Pipeline</span>
        </Link>

        {/* Breadcrumb Navigation */}
        {currentPhase && (
          <div style={styles.breadcrumb}>
            <Link to="/" style={styles.breadcrumbLink}>
              {t('nav.home')}
            </Link>
            <span style={styles.breadcrumbSeparator}>/</span>
            <select
              value={currentPhase}
              onChange={handlePhaseChange}
              style={styles.phaseDropdown}
            >
              {Array.from({ length: 15 }, (_, i) => i + 1).map(phaseId => (
                <option
                  key={phaseId}
                  value={phaseId}
                  disabled={!availablePhases.includes(phaseId)}
                >
                  {t('phases.phase')} {phaseId}: {t(`phases.phase${phaseId}.name`)} {!availablePhases.includes(phaseId) ? '(Coming Soon)' : ''}
                </option>
              ))}
            </select>
            <span style={styles.phaseProgress}>
              ({currentPhase} / 15)
            </span>
          </div>
        )}

        {!currentPhase && (
          <nav style={styles.nav}>
            <Link to="/" style={styles.navLink}>
              {t('nav.home')}
            </Link>
          </nav>
        )}

        <LanguageSwitcher />
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#2c3e50',
    padding: '15px 0',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: 'white',
    textDecoration: 'none',
    flexShrink: 0
  },
  logoText: {
    whiteSpace: 'nowrap'
  },
  logoWrapper: {
    width: '45px',
    height: '45px',
    backgroundColor: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
  },
  logoImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  },
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flex: 1,
    marginLeft: '20px',
    fontSize: '0.95rem',
    overflow: 'hidden'
  },
  breadcrumbLink: {
    color: '#3498db',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    whiteSpace: 'nowrap'
  },
  breadcrumbSeparator: {
    color: '#7f8c8d',
    margin: '0 5px'
  },
  breadcrumbCurrent: {
    color: 'white',
    fontWeight: '600',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  phaseDropdown: {
    backgroundColor: '#34495e',
    color: 'white',
    border: '1px solid #4a5f7f',
    borderRadius: '6px',
    padding: '6px 12px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    outline: 'none',
    maxWidth: '400px',
    transition: 'all 0.3s ease'
  },
  phaseProgress: {
    color: '#95a5a6',
    fontSize: '0.85rem',
    marginLeft: '5px',
    whiteSpace: 'nowrap'
  },
  nav: {
    display: 'flex',
    gap: '20px',
    flex: 1,
    marginLeft: '40px'
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'color 0.3s ease'
  }
};

export default Header;