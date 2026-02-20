import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [visibleSections, setVisibleSections] = useState({});
  const [activePhase, setActivePhase] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-section').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const phases = [
    { id: 1, color: '#E74C3C', icon: '🔍' },
    { id: 2, color: '#3498DB', icon: '📐' },
    { id: 3, color: '#9B59B6', icon: '🏗️' },
    { id: 4, color: '#1ABC9C', icon: '🖥️' },
    { id: 5, color: '#F39C12', icon: '☁️' },
    { id: 6, color: '#2980B9', icon: '🐳' },
    { id: 7, color: '#E67E22', icon: '🔧' },
    { id: 8, color: '#27AE60', icon: '📜' },
    { id: 9, color: '#8E44AD', icon: '🧹' },
    { id: 10, color: '#16A085', icon: '⭐' },
    { id: 11, color: '#D35400', icon: '🌉' },
    { id: 12, color: '#2ECC71', icon: '✅' },
    { id: 13, color: '#3498DB', icon: '🔄' },
    { id: 14, color: '#F1C40F', icon: '📊' },
    { id: 15, color: '#E74C3C', icon: '🚀' }
  ];

  const techStack = [
    { name: 'AWS EC2', logo: '/movies-pipeline-portfolio/images/aws.svg', color: '#FF9900', description: 'Cloud Computing' },
    { name: 'Amazon S3', logo: '/movies-pipeline-portfolio/images/s3.svg', color: '#569A31', description: 'Data Lake Storage' },
    { name: 'Snowflake', logo: '/movies-pipeline-portfolio/images/snowflake.png', color: '#29B5E8', description: 'Data Warehouse' },
    { name: 'Apache Airflow', logo: '/movies-pipeline-portfolio/images/airflow.png', color: '#017CEE', description: 'Workflow Orchestration' },
    { name: 'dbt', logo: '/movies-pipeline-portfolio/images/dbt.png', color: '#FF694B', description: 'Data Transformation' },
    { name: 'Power BI', logo: '/movies-pipeline-portfolio/images/powerbi.svg', color: '#F2C811', description: 'Data Visualization' },
    { name: 'Docker', logo: '/movies-pipeline-portfolio/images/docker.svg', color: '#2496ED', description: 'Containerization' },
    { name: 'Python', logo: '/movies-pipeline-portfolio/images/python.svg', color: '#3776AB', description: 'Programming Language' }
  ];

  const architectureSteps = [
    { name: 'CSV', logo: null, label: 'Source Data', emoji: '📄' },
    { name: 'Amazon S3', logo: '/movies-pipeline-portfolio/images/s3.svg', label: t('architecture.dataLake') },
    { name: 'Snowflake', logo: '/movies-pipeline-portfolio/images/snowflake.png', label: t('architecture.rawLayer') },
    { name: 'dbt', logo: '/movies-pipeline-portfolio/images/dbt.png', label: t('architecture.transform') },
    { name: 'Power BI', logo: '/movies-pipeline-portfolio/images/powerbi.svg', label: t('architecture.dashboard') }
  ];

  const learningTopics = [
    { key: 'cloud', icon: '/movies-pipeline-portfolio/images/aws.svg', color: '#FF9900' },
    { key: 'orchestration', icon: '/movies-pipeline-portfolio/images/airflow.png', color: '#017CEE' },
    { key: 'warehouse', icon: '/movies-pipeline-portfolio/images/snowflake.png', color: '#29B5E8' },
    { key: 'transform', icon: '/movies-pipeline-portfolio/images/dbt.png', color: '#FF694B' },
    { key: 'modeling', icon: '/movies-pipeline-portfolio/images/snowflake.png', color: '#9B59B6' }
  ];

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroOverlay}>
          <div style={styles.heroContent}>
            <div style={styles.heroLogoWrapper}>
              <img
                src='/movies-pipeline-portfolio/logo.png'
                alt="Movies Data Pipeline"
                style={styles.heroLogo}
              />
            </div>
            <h1 style={styles.title}>{t('home.title')}</h1>
            <div style={styles.titleUnderline}></div>
            <p style={styles.subtitle}>{t('home.subtitle')}</p>
            <p style={styles.description}>{t('home.description')}</p>
            <div style={styles.heroStats}>
              <div style={styles.statItem}>
                <span style={styles.statNumber}>15</span>
                <span style={styles.statLabel}>Phases</span>
              </div>
              <div style={styles.statDivider}></div>
              <div style={styles.statItem}>
                <span style={styles.statNumber}>8+</span>
                <span style={styles.statLabel}>Technologies</span>
              </div>
              <div style={styles.statDivider}></div>
              <div style={styles.statItem}>
                <span style={styles.statNumber}>100</span>
                <span style={styles.statLabel}>Movies</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Objectives Section */}
      <div
        id="objectives"
        className="animate-section"
        style={{
          ...styles.section,
          opacity: visibleSections.objectives ? 1 : 0,
          transform: visibleSections.objectives ? 'translateY(0)' : 'translateY(50px)',
          transition: 'all 0.8s ease-out'
        }}
      >
        <h2 style={styles.sectionTitle}>
          <span style={styles.sectionIcon}>🎯</span>
          {t('objectives.title')}
        </h2>
        <div style={styles.objectivesContainer}>
          <div style={styles.objectiveCard}>
            <div style={styles.objectiveIconWrapper}>
              <span style={styles.objectiveEmoji}>👨‍💻</span>
            </div>
            <p style={styles.objectiveText}>{t('objectives.item1')}</p>
          </div>
          <div style={styles.objectiveCard}>
            <div style={styles.objectiveIconWrapper}>
              <span style={styles.objectiveEmoji}>🛠️</span>
            </div>
            <p style={styles.objectiveText}>{t('objectives.item2')}</p>
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div
        id="techstack"
        className="animate-section"
        style={{
          ...styles.section,
          ...styles.techSection,
          opacity: visibleSections.techstack ? 1 : 0,
          transform: visibleSections.techstack ? 'translateY(0)' : 'translateY(50px)',
          transition: 'all 0.8s ease-out'
        }}
      >
        <h2 style={{...styles.sectionTitle, color: 'white'}}>
          <span style={styles.sectionIcon}>🛠️</span>
          {t('techStack.title')}
        </h2>
        <div style={styles.techGrid}>
          {techStack.map((tech, index) => (
            <div
              key={index}
              style={{
                ...styles.techCard,
                animationDelay: `${index * 0.1}s`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
                e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.2)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
              }}
            >
              <div style={{...styles.techLogoWrapper, borderColor: tech.color}}>
                <img src={tech.logo} alt={tech.name} style={styles.techLogo} />
              </div>
              <h3 style={styles.techName}>{tech.name}</h3>
              <p style={styles.techDescription}>{tech.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture Section */}
      <div
        id="architecture"
        className="animate-section"
        style={{
          ...styles.section,
          opacity: visibleSections.architecture ? 1 : 0,
          transform: visibleSections.architecture ? 'translateY(0)' : 'translateY(50px)',
          transition: 'all 0.8s ease-out'
        }}
      >
        <h2 style={styles.sectionTitle}>
          <span style={styles.sectionIcon}>🏗️</span>
          {t('architecture.title')}
        </h2>
        <div style={styles.architectureContainer}>
          <div style={styles.architectureFlow}>
            {architectureSteps.map((step, index) => (
              <React.Fragment key={index}>
                <div
                  style={styles.archStep}
                  onMouseEnter={(e) => {
                    e.currentTarget.querySelector('.arch-box').style.transform = 'translateY(-5px)';
                    e.currentTarget.querySelector('.arch-box').style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.querySelector('.arch-box').style.transform = 'translateY(0)';
                    e.currentTarget.querySelector('.arch-box').style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
                  }}
                >
                  <div className="arch-box" style={styles.archBox}>
                    {step.emoji ? (
                      <span style={{fontSize: '2.5rem'}}>{step.emoji}</span>
                    ) : (
                      <img src={step.logo} alt={step.name} style={styles.archLogo} />
                    )}
                  </div>
                  <span style={styles.archName}>{step.name}</span>
                  <span style={styles.archLabel}>{step.label}</span>
                </div>
                {index < architectureSteps.length - 1 && (
                  <div style={styles.archArrowContainer}>
                    <svg width="40" height="20" viewBox="0 0 40 20" style={{marginTop: '35px'}}>
                      <defs>
                        <linearGradient id={`arrowGrad${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#667eea" />
                          <stop offset="100%" stopColor="#764ba2" />
                        </linearGradient>
                      </defs>
                      <line x1="0" y1="10" x2="30" y2="10" stroke={`url(#arrowGrad${index})`} strokeWidth="2" />
                      <polygon points="28,5 38,10 28,15" fill="#764ba2" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div style={styles.orchestrationBanner}>
            <div style={styles.airflowLogoWrapper}>
              <img
                src={'/movies-pipeline-portfolio/images/airflow.png'}
                alt="Airflow"
                style={styles.airflowLogo}
              />
            </div>
            <span>{t('architecture.orchestration')}</span>
          </div>
        </div>
      </div>

      {/* Learning Topics Section */}
      <div
        id="learning"
        className="animate-section"
        style={{
          ...styles.section,
          opacity: visibleSections.learning ? 1 : 0,
          transform: visibleSections.learning ? 'translateY(0)' : 'translateY(50px)',
          transition: 'all 0.8s ease-out'
        }}
      >
        <h2 style={styles.sectionTitle}>
          <span style={styles.sectionIcon}>📚</span>
          {t('learning.title')}
        </h2>
        <div style={styles.learningGrid}>
          {learningTopics.map((topic, index) => (
            <div
              key={index}
              style={styles.learningCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderLeftColor = topic.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderLeftColor = '#e0e0e0';
              }}
            >
              <div style={styles.learningHeader}>
                <div style={{...styles.learningIconWrapper, backgroundColor: `${topic.color}15`}}>
                  <img src={topic.icon} alt={topic.key} style={styles.learningIcon} />
                </div>
                <h3 style={{...styles.learningTitle, color: topic.color}}>{t(`learning.${topic.key}.title`)}</h3>
              </div>
              <ul style={styles.learningList}>
                <li>{t(`learning.${topic.key}.item1`)}</li>
                {t(`learning.${topic.key}.item2`, '') && <li>{t(`learning.${topic.key}.item2`)}</li>}
                {t(`learning.${topic.key}.item3`, '') && <li>{t(`learning.${topic.key}.item3`)}</li>}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Prerequisites Section */}
      <div
        id="prerequisites"
        className="animate-section"
        style={{
          ...styles.section,
          ...styles.prereqSection,
          opacity: visibleSections.prerequisites ? 1 : 0,
          transform: visibleSections.prerequisites ? 'translateY(0)' : 'translateY(50px)',
          transition: 'all 0.8s ease-out'
        }}
      >
        <h2 style={{...styles.sectionTitle, color: 'white'}}>
          <span style={styles.sectionIcon}>📋</span>
          {t('prerequisites.title')}
        </h2>
        <div style={styles.prerequisitesList}>
          {[
            { icon: '/movies-pipeline-portfolio/images/aws.svg', text: t('prerequisites.item1') },
            { icon: '/movies-pipeline-portfolio/images/snowflake.png', text: t('prerequisites.item2') },
            { emoji: '💻', text: t('prerequisites.item3') },
            { icon: '/movies-pipeline-portfolio/images/python.svg', text: t('prerequisites.item4') }
          ].map((item, index) => (
            <div key={index} style={styles.prereqItem}>
              <div style={styles.prereqIconWrapper}>
                {item.emoji ? (
                  <span style={{fontSize: '1.5rem'}}>{item.emoji}</span>
                ) : (
                  <img src={item.icon} alt="" style={styles.prereqIcon} />
                )}
              </div>
              <span style={styles.prereqText}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Phases Section */}
      <div
        id="phases"
        className="animate-section"
        style={{
          ...styles.section,
          opacity: visibleSections.phases ? 1 : 0,
          transform: visibleSections.phases ? 'translateY(0)' : 'translateY(50px)',
          transition: 'all 0.8s ease-out'
        }}
      >
        <h2 style={styles.sectionTitle}>
          <span style={styles.sectionIcon}>📑</span>
          {t('phases.title')}
        </h2>
        <div style={styles.phasesGrid}>
          {phases.map((phase) => (
            <div
              key={phase.id}
              style={{
                ...styles.phaseCard,
                borderTopColor: phase.color,
                transform: activePhase === phase.id ? 'scale(1.02)' : 'scale(1)',
                boxShadow: activePhase === phase.id
                  ? `0 15px 35px rgba(0,0,0,0.15), 0 0 0 2px ${phase.color}`
                  : '0 5px 20px rgba(0,0,0,0.08)'
              }}
              onMouseEnter={() => setActivePhase(phase.id)}
              onMouseLeave={() => setActivePhase(null)}
              onClick={() => {
                if (phase.id <= 15) {
                  navigate(`/phase/${phase.id}`);
                }
              }}
            >
              <div style={styles.phaseHeader}>
                <div style={{...styles.phaseNumber, backgroundColor: phase.color}}>
                  {phase.id}
                </div>
                <span style={styles.phaseIcon}>{phase.icon}</span>
              </div>
              <h3 style={styles.phaseName}>{t(`phases.phase${phase.id}.name`)}</h3>
              <p style={styles.phaseDescription}>{t(`phases.phase${phase.id}.description`)}</p>
              <div style={{...styles.phaseProgress, backgroundColor: `${phase.color}20`}}>
                <div style={{...styles.phaseProgressBar, backgroundColor: phase.color, width: activePhase === phase.id ? '100%' : '0%'}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>IMDb Top 100 Movies Data Pipeline Portfolio</p>
        <p style={styles.footerSub}>Built with React | Data Engineering Project</p>
        <div style={styles.footerLinks}>
          <a
            href="https://github.com/SKSunisa/movies-pipeline"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.githubLink}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0366d6';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(3, 102, 214, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#24292e';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <svg style={styles.githubIcon} viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            View Source Code on GitHub
          </a>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '100%',
    margin: '0 auto',
    backgroundColor: '#f8f9fa'
  },
  hero: {
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    minHeight: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  heroOverlay: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    padding: '60px 20px'
  },
  heroContent: {
    maxWidth: '900px',
    margin: '0 auto'
  },
  heroLogoWrapper: {
    width: '160px',
    height: '160px',
    backgroundColor: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15px',
    margin: '0 auto 25px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
    animation: 'fadeInUp 0.8s ease-out'
  },
  heroLogo: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  },
  title: {
    fontSize: '3rem',
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: '10px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
    letterSpacing: '-1px'
  },
  titleUnderline: {
    width: '100px',
    height: '4px',
    background: 'linear-gradient(90deg, #667eea, #764ba2)',
    margin: '0 auto 20px',
    borderRadius: '2px'
  },
  subtitle: {
    fontSize: '1.5rem',
    color: '#a0a0a0',
    marginBottom: '20px',
    fontWeight: '300'
  },
  description: {
    fontSize: '1.1rem',
    color: '#c0c0c0',
    lineHeight: '1.8',
    maxWidth: '700px',
    margin: '0 auto 40px'
  },
  heroStats: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '40px',
    flexWrap: 'wrap'
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  statNumber: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#667eea',
    lineHeight: '1'
  },
  statLabel: {
    fontSize: '0.9rem',
    color: '#a0a0a0',
    marginTop: '5px',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  statDivider: {
    width: '1px',
    height: '50px',
    backgroundColor: '#404040'
  },
  section: {
    padding: '80px 20px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1a1a2e',
    textAlign: 'center',
    marginBottom: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px'
  },
  sectionIcon: {
    fontSize: '1.5rem'
  },
  techSection: {
    backgroundColor: '#1a1a2e',
    maxWidth: '100%',
    padding: '80px 20px'
  },
  techGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '25px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  techCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '30px 20px',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  techLogoWrapper: {
    width: '80px',
    height: '80px',
    margin: '0 auto 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    border: '3px solid',
    padding: '15px',
    backgroundColor: '#f8f9fa'
  },
  techLogo: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  },
  techName: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: '8px'
  },
  techDescription: {
    fontSize: '0.85rem',
    color: '#666',
    margin: 0
  },
  objectivesContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    maxWidth: '900px',
    margin: '0 auto'
  },
  objectiveCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '40px 30px',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease'
  },
  objectiveIconWrapper: {
    width: '100px',
    height: '100px',
    margin: '0 auto 25px',
    backgroundColor: '#f0f4ff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  objectiveEmoji: {
    fontSize: '3rem'
  },
  objectiveText: {
    fontSize: '1.1rem',
    color: '#333',
    lineHeight: '1.6',
    margin: 0
  },
  architectureContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    padding: '60px 40px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
    border: '1px solid #eee'
  },
  architectureFlow: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '50px'
  },
  archStep: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    padding: '10px'
  },
  archBox: {
    width: '100px',
    height: '100px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    border: '1px solid #f0f0f0',
    transition: 'all 0.3s ease',
    padding: '15px'
  },
  archLogo: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  },
  archName: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: '#1a1a2e',
    marginTop: '5px'
  },
  archLabel: {
    fontSize: '0.8rem',
    color: '#888',
    textAlign: 'center',
    maxWidth: '110px',
    lineHeight: '1.4'
  },
  archArrowContainer: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center'
  },
  orchestrationBanner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    padding: '24px 40px',
    background: 'linear-gradient(135deg, #00C9B7 0%, #00A99D 100%)',
    borderRadius: '16px',
    color: '#ffffff',
    fontWeight: '600',
    fontSize: '1.15rem',
    boxShadow: '0 8px 25px rgba(0,201,183,0.3)'
  },
  airflowLogoWrapper: {
    width: '50px',
    height: '50px',
    backgroundColor: 'white',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  airflowLogo: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  },
  learningGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '25px'
  },
  learningCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
    borderLeft: '4px solid #e0e0e0',
    transition: 'all 0.3s ease',
    textAlign: 'left'
  },
  learningHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '20px',
    justifyContent: 'flex-start'
  },
  learningIconWrapper: {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px'
  },
  learningIcon: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  },
  learningTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    margin: 0
  },
  learningList: {
    margin: 0,
    paddingLeft: '20px',
    color: '#555',
    lineHeight: '2',
    textAlign: 'left',
    listStylePosition: 'outside'
  },
  prereqSection: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    maxWidth: '100%',
    padding: '80px 20px'
  },
  prerequisitesList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    maxWidth: '1000px',
    margin: '0 auto'
  },
  prereqItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '20px 25px',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: '12px',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease'
  },
  prereqIconWrapper: {
    width: '50px',
    height: '50px',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    flexShrink: 0
  },
  prereqIcon: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  },
  prereqText: {
    color: '#ffffff',
    fontSize: '1rem',
    fontWeight: '500'
  },
  phasesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px'
  },
  phaseCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '25px',
    borderTop: '4px solid',
    boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  phaseHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '15px'
  },
  phaseNumber: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontWeight: '700',
    fontSize: '1.1rem'
  },
  phaseIcon: {
    fontSize: '1.5rem'
  },
  phaseName: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: '10px'
  },
  phaseDescription: {
    fontSize: '0.9rem',
    color: '#666',
    lineHeight: '1.5',
    marginBottom: '15px'
  },
  phaseProgress: {
    height: '4px',
    borderRadius: '2px',
    overflow: 'hidden'
  },
  phaseProgressBar: {
    height: '100%',
    transition: 'width 0.5s ease'
  },
  footer: {
    backgroundColor: '#1a1a2e',
    color: '#ffffff',
    textAlign: 'center',
    padding: '40px 20px'
  },
  footerSub: {
    color: '#666',
    fontSize: '0.9rem',
    marginTop: '10px'
  },
  footerLinks: {
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid #333'
  },
  githubLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '1rem',
    padding: '10px 20px',
    borderRadius: '8px',
    backgroundColor: '#24292e',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  githubIcon: {
    width: '20px',
    height: '20px'
  }
};

export default Home;
