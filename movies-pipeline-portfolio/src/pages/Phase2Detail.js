import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PhaseNavigator from '../components/PhaseNavigator';

const Phase2Detail = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Get image path based on current language
  const getLocalizedImage = (baseName) => {
    const lang = i18n.language;
    const langSuffix = lang === 'zh' ? 'zh' : lang === 'en' ? 'en' : 'th';
    return `/images/${baseName}_${langSuffix}.svg`;
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sections = [
    { id: 'problems', number: '1', color: '#E74C3C' },
    { id: 'division', number: '2', color: '#3498DB' },
    { id: 'erdiagram', number: '3', color: '#9B59B6' },
    { id: 'schema', number: '4', color: '#1ABC9C' }
  ];

  const dimensionTables = [
    { name: 'dim_movies', color: '#3498DB' },
    { name: 'dim_genres', color: '#E74C3C' },
    { name: 'dim_directors', color: '#9B59B6' },
    { name: 'dim_actors', color: '#F39C12' },
    { name: 'dim_countries', color: '#1ABC9C' },
    { name: 'dim_languages', color: '#E67E22' },
    { name: 'dim_time', color: '#34495E' }
  ];

  const bridgeTables = [
    'bridge_movie_genre',
    'bridge_movie_director',
    'bridge_movie_actor',
    'bridge_movie_country',
    'bridge_movie_language'
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <button onClick={() => navigate('/')} style={styles.backButton}>
            ← {t('common.back')}
          </button>
          <div style={styles.phaseNumber}>
            <span style={styles.phaseLabel}>{t('phases.phase')} 2</span>
            <h1 style={styles.phaseTitle}>{t('phase2.title')}</h1>
            <p style={styles.phaseSubtitle}>{t('phase2.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div style={styles.section}>
        <h3 style={styles.navSectionTitle}>{t('phase2.navigation.title')}</h3>
        <div style={styles.navGrid}>
          {sections.map((section) => (
            <div
              key={section.id}
              style={{
                ...styles.navCard,
                borderLeftColor: section.color,
                transform: activeSection === section.id ? 'translateY(-5px)' : 'translateY(0)'
              }}
              onMouseEnter={() => setActiveSection(section.id)}
              onMouseLeave={() => setActiveSection(null)}
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span style={{...styles.navNumber, backgroundColor: section.color}}>
                {section.number}
              </span>
              <span style={styles.navText}>{t(`phase2.sections.${section.id}`)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Introduction */}
      <div style={styles.section}>
        <div style={styles.introCard}>
          <h2 style={styles.sectionTitle}>
            <span style={styles.sectionIcon}>💡</span>
            {t('phase2.intro.title')}
          </h2>
          <p style={styles.introText}>{t('phase2.intro.description')}</p>
          <div style={styles.purposeBox}>
            <h3 style={styles.purposeTitle}>{t('phase2.intro.purposeTitle')}</h3>
            <p style={styles.purposeText}>{t('phase2.intro.purpose')}</p>
          </div>
        </div>
      </div>

      {/* 1. Understanding Problems */}
      <div id="problems" style={styles.section}>
        <div style={styles.contentCard}>
          <h2 style={{...styles.cardTitle, color: '#E74C3C'}}>
            <span style={{...styles.numberBadge, backgroundColor: '#E74C3C'}}>1</span>
            {t('phase2.problems.title')}
          </h2>
          <p style={styles.description}>{t('phase2.problems.description')}</p>

          {/* Phase 1 to Phase 2 Connection Image */}
          <div style={styles.imageContainer}>
            <img
              src={getLocalizedImage('phase1_to_phase2')}
              alt="Phase 1 to Phase 2 Connection"
              style={{...styles.diagramImage, maxWidth: '50%'}}
            />
          </div>
        </div>
      </div>

      {/* 2. Data Division */}
      <div id="division" style={styles.section}>
        <div style={styles.contentCard}>
          <h2 style={{...styles.cardTitle, color: '#3498DB'}}>
            <span style={{...styles.numberBadge, backgroundColor: '#3498DB'}}>2</span>
            {t('phase2.division.title')}
          </h2>
          <p style={styles.description}>{t('phase2.division.description')}</p>

          {/* 3 Questions */}
          <div style={styles.questionsContainer}>
            <div style={styles.questionCard}>
              <div style={styles.questionNumber}>Q1</div>
              <h4 style={styles.questionTitle}>{t('phase2.division.q1')}</h4>
              <p style={styles.questionDesc}>{t('phase2.division.q1Desc')}</p>
              <div style={styles.answerBox}>
                <span style={styles.answerLabel}>Fact Table</span>
                <span style={styles.answerValue}>movies</span>
              </div>
            </div>

            <div style={styles.questionCard}>
              <div style={styles.questionNumber}>Q2</div>
              <h4 style={styles.questionTitle}>{t('phase2.division.q2')}</h4>
              <p style={styles.questionDesc}>{t('phase2.division.q2Desc')}</p>
            </div>

            <div style={styles.questionCard}>
              <div style={styles.questionNumber}>Q3</div>
              <h4 style={styles.questionTitle}>{t('phase2.division.q3')}</h4>
              <p style={styles.questionDesc}>{t('phase2.division.q3Desc')}</p>
            </div>
          </div>

          {/* Dimension Tables */}
          <h3 style={styles.subTitle}>{t('phase2.division.dimensionTitle')}</h3>
          <div style={styles.tablesGrid}>
            {dimensionTables.map((table, index) => (
              <div key={index} style={{...styles.tableCard, borderLeftColor: table.color}}>
                <span style={{...styles.tableNumber, backgroundColor: table.color}}>{index + 1}</span>
                <span style={styles.tableName}>{table.name}</span>
              </div>
            ))}
          </div>
          <p style={styles.description}>{t('phase2.division.closing')}</p>
        </div>
      </div>

      {/* 3. ER-Diagram */}
      <div id="erdiagram" style={styles.section}>
        <div style={styles.contentCard}>
          <h2 style={{...styles.cardTitle, color: '#9B59B6'}}>
            <span style={{...styles.numberBadge, backgroundColor: '#9B59B6'}}>3</span>
            {t('phase2.erdiagram.title')}
          </h2>
          <p style={styles.description}>{t('phase2.erdiagram.description')}</p>

          {/* ER Diagram Image */}
          <div style={styles.imageContainer}>
            <img
              src="/images/er_diagram_chen.svg"
              alt="ER Diagram (Chen)"
              style={{...styles.diagramImage, maxWidth: '50%'}}
            />
          </div>

          <div style={styles.infoBox}>
            <p style={styles.infoText}>{t('phase2.erdiagram.manyToManyDesc')}</p>
          </div>

          {/* Bridge Tables */}
          <div style={styles.bridgeList}>
            {bridgeTables.map((table, index) => (
              <div key={index} style={styles.bridgeItem}>
                <span style={styles.bridgeNumber}>{index + 1}</span>
                <code style={styles.bridgeCode}>{table}</code>
              </div>
            ))}
          </div>

          <p style={styles.description}>{t('phase2.erdiagram.bridgeDesc')}</p>

          {/* Bridge Tables Diagram */}
          <div style={styles.imageContainer}>
            <img
              src={getLocalizedImage('bridge_tables')}
              alt="Bridge Tables Diagram"
              style={{...styles.diagramImage, maxWidth: '50%'}}
            />
          </div>
        </div>
      </div>

      {/* 4. Star Schema */}
      <div id="schema" style={styles.section}>
        <div style={styles.contentCard}>
          <h2 style={{...styles.cardTitle, color: '#1ABC9C'}}>
            <span style={{...styles.numberBadge, backgroundColor: '#1ABC9C'}}>4</span>
            {t('phase2.schema.title')}
          </h2>
          <p style={styles.description} dangerouslySetInnerHTML={{__html: t('phase2.schema.description')}} />

          {/* Star vs Snowflake Comparison */}
          <div style={styles.comparisonGrid}>
            <div style={{...styles.comparisonCard, borderColor: '#1ABC9C'}}>
              <h4 style={{...styles.comparisonTitle, color: '#1ABC9C'}}>Star Schema</h4>
              <span style={styles.recommendBadge}>{t('phase2.schema.recommended')}</span>
              <ul style={styles.comparisonList}>
                <li>{t('phase2.schema.star1')}</li>
                <li>{t('phase2.schema.star2')}</li>
                <li>{t('phase2.schema.star3')}</li>
              </ul>
            </div>
            <div style={{...styles.comparisonCard, borderColor: '#95A5A6'}}>
              <h4 style={{...styles.comparisonTitle, color: '#95A5A6'}}>Snowflake Schema</h4>
              <ul style={styles.comparisonList}>
                <li>{t('phase2.schema.snowflake1')}</li>
                <li>{t('phase2.schema.snowflake2')}</li>
                <li>{t('phase2.schema.snowflake3')}</li>
              </ul>
            </div>
          </div>

          <p style={styles.description} dangerouslySetInnerHTML={{__html: t('phase2.schema.projectChoice')}} />

          <p style={styles.description}>{t('phase2.schema.finalDesc')}</p>

          {/* Final Schema Image */}
          <div style={styles.imageContainer}>
            <img
              src="/images/star_schema.png"
              alt="Star Schema"
              style={styles.schemaImage}
            />
          </div>

          <div style={styles.noteBox}>
            <h4 style={styles.noteTitle}>{t('phase2.schema.noteTitle')}</h4>
            <p style={styles.noteText}>{t('phase2.schema.noteText')}</p>
          </div>

          <p style={styles.description}>{t('phase2.schema.modernNote')}</p>
        </div>
      </div>

      {/* Summary */}
      <div style={styles.section}>
        <div style={{...styles.contentCard, ...styles.summaryCard}}>
          <h2 style={styles.summaryCardTitle}>
            <span style={styles.summaryIcon}>✅</span>
            {t('phase2.summary.title')}
          </h2>
          <p style={styles.summaryDescription}>{t('phase2.summary.description')}</p>

          <div style={styles.keyFindingsGrid}>
            <div style={styles.keyFinding}>
              <div style={styles.keyFindingIcon}>📊</div>
              <h3 style={styles.keyFindingTitle}>{t('phase2.summary.finding1Title')}</h3>
              <p style={styles.keyFindingText}>{t('phase2.summary.finding1')}</p>
            </div>
            <div style={styles.keyFinding}>
              <div style={styles.keyFindingIcon}>🔗</div>
              <h3 style={styles.keyFindingTitle}>{t('phase2.summary.finding2Title')}</h3>
              <p style={styles.keyFindingText}>{t('phase2.summary.finding2')}</p>
            </div>
            <div style={styles.keyFinding}>
              <div style={styles.keyFindingIcon}>⭐</div>
              <h3 style={styles.keyFindingTitle}>{t('phase2.summary.finding3Title')}</h3>
              <p style={styles.keyFindingText}>{t('phase2.summary.finding3')}</p>
            </div>
          </div>

          <div style={styles.nextStepsBox}>
            <h3 style={styles.nextStepsTitle}>{t('phase2.summary.nextSteps')}</h3>
            <p style={styles.nextStepsText}>{t('phase2.summary.nextStepsDescription')}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={styles.section}>
        <div style={styles.navigationButtons}>
          <button onClick={() => navigate('/phase/1')} style={styles.navButton}>
            ← Phase 1: {t('phases.phase1.name')}
          </button>
          <button onClick={() => navigate('/phase/3')} style={{...styles.navButton, ...styles.navButtonNext}}>
            Phase 3: {t('phases.phase3.name')} →
          </button>
        </div>
      </div>

      <PhaseNavigator currentPhase={2} totalPhases={15} />

      {showScrollTop && (
        <button onClick={scrollToTop} style={styles.scrollTopButton} title="Scroll to top">
          ↑
        </button>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '100%',
    margin: '0 auto',
    backgroundColor: '#f8f9fa'
  },
  header: {
    background: 'linear-gradient(135deg, #3498DB 0%, #2980B9 100%)',
    padding: '60px 20px',
    color: 'white',
    position: 'relative'
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  backButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginBottom: '20px',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)'
  },
  phaseNumber: {
    textAlign: 'center'
  },
  phaseLabel: {
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    opacity: 0.9
  },
  phaseTitle: {
    fontSize: '3rem',
    fontWeight: '700',
    margin: '10px 0',
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
  },
  phaseSubtitle: {
    fontSize: '1.2rem',
    opacity: 0.9,
    maxWidth: '600px',
    margin: '0 auto'
  },
  section: {
    padding: '40px 20px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  navSectionTitle: {
    fontSize: '1.4rem',
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: '20px',
    textAlign: 'left'
  },
  navGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px'
  },
  navCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    borderLeft: '4px solid',
    boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  navNumber: {
    fontSize: '1rem',
    fontWeight: '700',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    flexShrink: 0
  },
  navText: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1a1a2e'
  },
  introCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
  },
  sectionTitle: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textAlign: 'left'
  },
  sectionIcon: {
    fontSize: '1.5rem'
  },
  introText: {
    fontSize: '1.1rem',
    color: '#555',
    lineHeight: '1.8',
    marginBottom: '30px',
    textAlign: 'left',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word'
  },
  purposeBox: {
    backgroundColor: '#f0f4ff',
    borderLeft: '4px solid #3498DB',
    borderRadius: '8px',
    padding: '20px',
    marginTop: '20px'
  },
  purposeTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: '10px'
  },
  purposeText: {
    fontSize: '1rem',
    color: '#555',
    lineHeight: '2',
    margin: 0,
    textAlign: 'left',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word'
  },
  contentCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
  },
  cardTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    textAlign: 'left'
  },
  numberBadge: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'currentColor',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    fontWeight: '700'
  },
  description: {
    fontSize: '1.1rem',
    color: '#555',
    lineHeight: '2',
    marginBottom: '30px',
    textAlign: 'left',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word'
  },
  subTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: '20px',
    marginTop: '30px',
    textAlign: 'left'
  },
  imageContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '30px',
    textAlign: 'center',
    overflow: 'auto'
  },
  diagramImage: {
    maxWidth: '70%',
    height: 'auto',
    borderRadius: '8px'
  },
  schemaImage: {
    maxWidth: '70%',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
  },
  problemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '30px'
  },
  problemItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px'
  },
  problemBadge: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.9rem',
    fontWeight: '700',
    flexShrink: 0
  },
  problemContent: {
    flex: 1
  },
  problemTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1a1a2e',
    margin: 0
  },
  problemDesc: {
    fontSize: '0.95rem',
    color: '#666',
    marginTop: '8px',
    lineHeight: '1.6'
  },
  highlightBox: {
    backgroundColor: '#fff3cd',
    borderLeft: '4px solid #F39C12',
    borderRadius: '8px',
    padding: '20px'
  },
  highlightText: {
    fontSize: '1rem',
    color: '#856404',
    margin: 0,
    fontWeight: '500',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word'
  },
  questionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '30px'
  },
  questionCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    padding: '25px',
    position: 'relative'
  },
  questionNumber: {
    position: 'absolute',
    top: '-10px',
    left: '20px',
    backgroundColor: '#3498DB',
    color: 'white',
    padding: '5px 15px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '700'
  },
  questionTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1a1a2e',
    marginTop: '10px',
    marginBottom: '10px'
  },
  questionDesc: {
    fontSize: '0.95rem',
    color: '#666',
    lineHeight: '1.8',
    margin: 0,
    wordBreak: 'keep-all',
    overflowWrap: 'break-word'
  },
  answerBox: {
    marginTop: '15px',
    padding: '15px',
    backgroundColor: '#d4edda',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  answerLabel: {
    fontSize: '0.85rem',
    color: '#155724',
    fontWeight: '600'
  },
  answerValue: {
    fontSize: '1rem',
    color: '#155724',
    fontWeight: '700'
  },
  tablesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '15px'
  },
  tableCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    padding: '15px',
    borderLeft: '4px solid',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  tableNumber: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.85rem',
    fontWeight: '700'
  },
  tableName: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#1a1a2e',
    fontFamily: 'monospace'
  },
  infoBox: {
    backgroundColor: '#e8f4fd',
    borderLeft: '4px solid #3498DB',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '30px'
  },
  infoTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: '10px'
  },
  infoText: {
    fontSize: '1rem',
    color: '#555',
    margin: 0,
    lineHeight: '1.8',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word'
  },
  bridgeList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '15px',
    marginBottom: '30px'
  },
  bridgeItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px'
  },
  bridgeNumber: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: '#9B59B6',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.85rem',
    fontWeight: '700'
  },
  bridgeCode: {
    fontSize: '0.95rem',
    fontFamily: 'monospace',
    color: '#9B59B6',
    fontWeight: '600'
  },
  comparisonGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  comparisonCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    padding: '25px',
    border: '2px solid',
    position: 'relative'
  },
  comparisonTitle: {
    fontSize: '1.2rem',
    fontWeight: '700',
    marginBottom: '15px'
  },
  recommendBadge: {
    position: 'absolute',
    top: '-10px',
    right: '20px',
    backgroundColor: '#1ABC9C',
    color: 'white',
    padding: '5px 12px',
    borderRadius: '15px',
    fontSize: '0.75rem',
    fontWeight: '600'
  },
  comparisonList: {
    margin: 0,
    paddingLeft: '20px',
    listStyleType: 'disc'
  },
  noteBox: {
    backgroundColor: '#fef3e2',
    borderLeft: '4px solid #E67E22',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '30px'
  },
  noteTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: '10px'
  },
  noteText: {
    fontSize: '1rem',
    color: '#555',
    margin: 0,
    lineHeight: '1.8',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word'
  },
  summaryCard: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white'
  },
  summaryCardTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: 'white',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  summaryIcon: {
    fontSize: '2rem'
  },
  summaryDescription: {
    fontSize: '1.1rem',
    lineHeight: '2',
    marginBottom: '30px',
    opacity: 0.95,
    textAlign: 'left',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word'
  },
  keyFindingsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  keyFinding: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: '12px',
    padding: '25px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.2)',
    textAlign: 'center'
  },
  keyFindingIcon: {
    fontSize: '2rem',
    marginBottom: '15px'
  },
  keyFindingTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '10px'
  },
  keyFindingText: {
    fontSize: '1rem',
    lineHeight: '2',
    opacity: 0.9,
    textAlign: 'left',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word'
  },
  nextStepsBox: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: '12px',
    padding: '25px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.3)'
  },
  nextStepsTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '10px'
  },
  nextStepsText: {
    fontSize: '1.05rem',
    lineHeight: '2',
    opacity: 0.9,
    margin: 0,
    textAlign: 'left',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word'
  },
  navigationButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    flexWrap: 'wrap'
  },
  navButton: {
    padding: '15px 30px',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    border: '2px solid #1a1a2e',
    backgroundColor: 'white',
    color: '#1a1a2e',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    flex: '1',
    minWidth: '200px'
  },
  navButtonNext: {
    backgroundColor: '#1a1a2e',
    color: 'white'
  },
  scrollTopButton: {
    position: 'fixed',
    bottom: '30px',
    left: '30px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',
    fontSize: '1.5rem',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 998
  }
};

export default Phase2Detail;
