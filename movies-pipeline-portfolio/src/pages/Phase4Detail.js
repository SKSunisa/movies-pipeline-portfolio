import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PhaseNavigator from '../components/PhaseNavigator';

const pipListResult =
  `apache-airflow                          3.1.6
apache-airflow-core                     3.1.6
apache-airflow-providers-common-compat  1.12.0
apache-airflow-providers-common-io      1.7.1
apache-airflow-providers-common-sql     1.30.3
apache-airflow-providers-smtp           2.4.2
apache-airflow-providers-snowflake      5.6.0
apache-airflow-providers-standard       1.10.3
apache-airflow-task-sdk                 1.1.6
boto3                                   1.42.34
dbt-adapters                            1.22.5
dbt-common                              1.37.2
dbt-core                                1.8.7
dbt-extractor                           0.6.0
dbt-protos                              1.0.422
dbt-semantic-interfaces                 0.9.0
dbt-snowflake                           1.8.4
numpy                                   2.4.1
pandas                                  3.0.0
python-dotenv                           1.2.1
snowflake-connector-python              3.12.2`;

const CopyableCode = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={copyableStyles.wrapper}>
      <button
        onClick={handleCopy}
        style={{
          ...copyableStyles.copyBtn,
          backgroundColor: copied ? '#c8f7c5' : '#e0e0e0',
          color: copied ? '#1a5c30' : '#444'
        }}
      >
        {copied ? '✓ Copied!' : 'Copy'}
      </button>
      <pre style={copyableStyles.pre}>{code}</pre>
    </div>
  );
};

const copyableStyles = {
  wrapper: {
    position: 'relative',
    backgroundColor: '#f4f4f5',
    borderRadius: '8px',
    padding: '14px 18px',
    marginBottom: '10px',
    overflowX: 'auto'
  },
  copyBtn: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    border: 'none',
    borderRadius: '4px',
    padding: '3px 10px',
    fontSize: '0.75rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    zIndex: 1
  },
  pre: {
    fontSize: '0.88rem',
    fontFamily: "'Courier New', Courier, monospace",
    color: '#2d2d2d',
    margin: 0,
    lineHeight: '1.7',
    whiteSpace: 'pre',
    textAlign: 'left',
    paddingRight: '70px'
  }
};

const Phase4Detail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.pageYOffset > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const sections = [
    { id: 'purpose', number: '1', color: '#E67E22' },
    { id: 'steps',   number: '2', color: '#1ABC9C' },
    { id: 'summary', number: '3', color: '#2ECC71' }
  ];

  const steps = [
    { num: 1, icon: '🐳', color: '#0db7ed' },
    { num: 2, icon: '🐍', color: '#3776AB' },
    { num: 3, icon: '🔀', color: '#F05032' },
    { num: 4, icon: '📁', color: '#1ABC9C' },
    { num: 5, icon: '⚙️', color: '#9B59B6' },
    { num: 6, icon: '📦', color: '#E67E22' },
    { num: 7, icon: '📄', color: '#27AE60' }
  ];

  const renderStepContent = (num) => {
    const s = `phase4.steps.step${num}`;
    switch (num) {
      case 1:
        return (
          <>
            <div style={styles.subStepWrapper}>
              <p style={styles.subStepTitle}>1. {t(`${s}.sub1Title`)}</p>
              <CopyableCode code={t(`${s}.sub1Code`)} />
            </div>

            <div style={styles.subStepWrapper}>
              <p style={styles.subStepTitle}>2. {t(`${s}.sub2Title`)}</p>
              <div style={styles.warningBox}>
                <p style={styles.warningText}>⚠️ {t(`${s}.sub2Warning`)}</p>
              </div>
              <ul style={styles.stepList}>
                <li style={styles.checkItem}>✅ <strong>{t(`${s}.sub2Check`)}</strong></li>
                <li style={styles.stepListItem}>{t(`${s}.sub2Click`)}</li>
              </ul>
            </div>

            <div style={styles.subStepWrapper}>
              <p style={styles.subStepTitle}>3. {t(`${s}.sub3Title`)}</p>
              <ul style={styles.stepList}>
                <li style={styles.warnItem}>⚠️ <strong>{t(`${s}.sub3Warn`)}</strong></li>
              </ul>
            </div>

            <div style={styles.subStepWrapper}>
              <p style={styles.subStepTitle}>4. {t(`${s}.sub4Title`)}</p>
              <ul style={styles.stepList}>
                <li style={styles.stepListItem}>{t(`${s}.sub4Step1`)}</li>
                <li style={styles.stepListItem}>{t(`${s}.sub4Step2`)}</li>
                <li style={styles.stepListItem}>{t(`${s}.sub4Step3`)}</li>
              </ul>
            </div>

            <div style={styles.subStepWrapper}>
              <p style={styles.subStepTitle}>5. {t(`${s}.sub5Title`)}</p>
              <p style={styles.stepDesc}>{t(`${s}.sub5Intro`)}</p>
              <CopyableCode code={t(`${s}.sub5Code`)} />
              <p style={styles.resultLabel}>{t(`${s}.sub5ResultLabel`)}</p>
              <div style={styles.resultBlock}><pre style={styles.resultText}>{t(`${s}.sub5Result`)}</pre></div>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <div style={styles.subStepWrapper}>
              <p style={styles.subStepTitle}>1. {t(`${s}.sub1Title`)}</p>
              <CopyableCode code={t(`${s}.sub1Code`)} />
              <p style={styles.noteText}>{t(`${s}.sub1Note`)}</p>
            </div>

            <div style={styles.subStepWrapper}>
              <p style={styles.subStepTitle}>2. {t(`${s}.sub2Title`)}</p>
              <div style={styles.warningBox}>
                <p style={styles.warningText}>⚠️ {t(`${s}.sub2Warning`)}</p>
              </div>
              <ul style={styles.stepList}>
                <li style={styles.checkItem}>✅ <strong>{t(`${s}.sub2Check`)}</strong></li>
                <li style={styles.warnItem}>{t(`${s}.sub2Note`)}</li>
              </ul>
              <p style={styles.stepDesc}>{t(`${s}.sub2Then`)}</p>
              <ul style={styles.stepList}>
                <li style={styles.stepListItem}>{t(`${s}.sub2Click1`)}</li>
                <li style={styles.stepListItem}>{t(`${s}.sub2Click2`)}</li>
              </ul>
            </div>

            <div style={styles.subStepWrapper}>
              <p style={styles.subStepTitle}>3. {t(`${s}.sub3Title`)}</p>
              <p style={styles.stepDesc}>{t(`${s}.sub3Intro`)}</p>
              <CopyableCode code={t(`${s}.sub3Code`)} />
              <p style={styles.resultLabel}>{t(`${s}.sub3ResultLabel`)}</p>
              <div style={styles.resultBlock}><pre style={styles.resultText}>{t(`${s}.sub3Result`)}</pre></div>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <p style={styles.stepDesc}>{t(`${s}.description`)}</p>
            <p style={styles.subStepTitle}>{t(`${s}.testLabel`)}</p>
            <CopyableCode code={t(`${s}.testCode`)} />
          </>
        );

      case 4:
        return (
          <>
            <div style={styles.subStepWrapper}>
              <p style={styles.subStepTitle}>1. {t(`${s}.sub1Title`)}</p>
              <CopyableCode code={t(`${s}.sub1Code`)} />
            </div>
            <div style={styles.subStepWrapper}>
              <p style={styles.subStepTitle}>2. {t(`${s}.sub2Title`)}</p>
              <ul style={styles.stepList}>
                <li style={styles.stepListItem}>{t(`${s}.sub2Note`)}</li>
              </ul>
            </div>
          </>
        );

      case 5:
        return (
          <>
            <p style={styles.stepDesc}>{t(`${s}.description`)}</p>
            <CopyableCode code={t(`${s}.code`)} />
            <p style={styles.resultLabel}>{t(`${s}.successLabel`)}</p>
            <div style={styles.resultBlock}><pre style={styles.resultText}>{t(`${s}.successResult`)}</pre></div>
          </>
        );

      case 6:
        return (
          <>
            <p style={styles.stepDesc}>{t(`${s}.description`)}</p>
            <CopyableCode code={t(`${s}.code`)} />
            <CopyableCode code={t(`${s}.checkCode`)} />
            <p style={styles.resultLabel}>{t(`${s}.resultLabel`)}</p>
            <div style={styles.resultBlock}><pre style={styles.resultText}>{pipListResult}</pre></div>
          </>
        );

      case 7:
        return (
          <>
            <p style={styles.stepDesc}>{t(`${s}.description`)}</p>
            <ol style={styles.numberedList}>
              <li style={styles.numberedItem}>
                <p style={styles.stepDesc}>{t(`${s}.sub1`)}</p>
                <CopyableCode code="requirements.txt" />
              </li>
              <li style={styles.numberedItem}>
                <p style={styles.stepDesc}>{t(`${s}.sub2`)}</p>
                <CopyableCode code={t(`${s}.code`)} />
              </li>
            </ol>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>

      {/* ── Header ── */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <button onClick={() => navigate('/')} style={styles.backButton}>
            ← {t('common.back')}
          </button>
          <div style={styles.phaseNumber}>
            <span style={styles.phaseLabel}>{t('phases.phase')} 4</span>
            <h1 style={styles.phaseTitle}>{t('phase4.title')}</h1>
            <p style={styles.phaseSubtitle}>{t('phase4.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* ── Quick Navigation ── */}
      <div style={styles.section}>
        <h3 style={styles.navSectionTitle}>{t('phase4.navigation.title')}</h3>
        <div style={styles.navGrid}>
          {sections.map((sec) => (
            <div
              key={sec.id}
              style={{ ...styles.navCard, borderLeftColor: sec.color }}
              onClick={() => document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth' })}
            >
              <div style={{ ...styles.navNumber, backgroundColor: sec.color }}>{sec.number}</div>
              <span style={styles.navText}>{t(`phase4.sections.${sec.id}`)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 1. Purpose ── */}
      <div id="purpose" style={styles.section}>
        <div style={styles.contentCard}>
          <h2 style={{ ...styles.cardTitle, color: '#E67E22' }}>
            <span style={{ ...styles.numberBadge, backgroundColor: '#E67E22' }}>1</span>
            {t('phase4.sections.purpose')}
          </h2>
          <p style={styles.description}>{t('phase4.purpose.description')}</p>
        </div>
      </div>

      {/* ── 2. Steps ── */}
      <div id="steps" style={styles.section}>
        <div style={styles.contentCard}>
          <h2 style={{ ...styles.cardTitle, color: '#1ABC9C' }}>
            <span style={{ ...styles.numberBadge, backgroundColor: '#1ABC9C' }}>2</span>
            {t('phase4.sections.steps')}
          </h2>

          <div style={styles.stepsContainer}>
            {steps.map((step) => (
              <div key={step.num} style={{ ...styles.stepCard, borderLeftColor: step.color }}>
                <div style={styles.stepMeta}>
                  <div style={{ ...styles.stepBadge, backgroundColor: step.color }}>
                    <span style={styles.stepIcon}>{step.icon}</span>
                    <span style={styles.stepNum}>Step {step.num}</span>
                  </div>
                </div>
                <div style={styles.stepContent}>
                  <h4 style={{ ...styles.stepTitle, color: step.color }}>
                    {t(`phase4.steps.step${step.num}.title`)}
                  </h4>
                  {renderStepContent(step.num)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Summary ── */}
      <div id="summary" style={styles.section}>
        <div style={{ ...styles.contentCard, ...styles.summaryCard }}>
          <h2 style={styles.summaryTitle}>
            ✅ {t('phase4.summary.title')}
          </h2>
          <p style={styles.summaryDescription}>{t('phase4.summary.description')}</p>
          <div style={styles.summaryList}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={styles.summaryItem}>
                <span style={styles.summaryCheck}>✅</span>
                <span style={styles.summaryText}>{t(`phase4.summary.item${i}`)}</span>
              </div>
            ))}
          </div>
          <div style={styles.nextStepsBox}>
            <h3 style={styles.nextStepsTitle}>{t('phase4.summary.nextSteps')}</h3>
            <p style={styles.nextStepsText}>{t('phase4.summary.nextStepsDescription')}</p>
          </div>
        </div>
      </div>

      {/* ── Navigation ── */}
      <div style={styles.section}>
        <div style={styles.navigationButtons}>
          <button onClick={() => navigate('/phase/3')} style={styles.navButton}>
            ← Phase 3: {t('phases.phase3.name')}
          </button>
          <button onClick={() => navigate('/phase/5')} style={{ ...styles.navButton, ...styles.navButtonNext }}>
            Phase 5: {t('phases.phase5.name')} →
          </button>
        </div>
      </div>

      <PhaseNavigator currentPhase={4} totalPhases={15} />

      {showScrollTop && (
        <button onClick={scrollToTop} style={styles.scrollTopButton} title="Scroll to top">↑</button>
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
    background: 'linear-gradient(135deg, #1ABC9C 0%, #16A085 100%)',
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
  phaseNumber: { textAlign: 'center' },
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
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    transition: 'transform 0.2s ease'
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
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    fontWeight: '700',
    flexShrink: 0
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

  /* Steps */
  stepsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  stepCard: {
    backgroundColor: '#fafafa',
    borderLeft: '5px solid',
    borderRadius: '12px',
    padding: '24px',
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
  },
  stepMeta: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexShrink: 0
  },
  stepBadge: {
    borderRadius: '10px',
    padding: '10px 14px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    minWidth: '70px'
  },
  stepIcon: { fontSize: '1.6rem' },
  stepNum: {
    fontSize: '0.75rem',
    color: 'white',
    fontWeight: '700',
    whiteSpace: 'nowrap'
  },
  stepContent: { flex: 1 },
  stepTitle: {
    fontSize: '1.2rem',
    fontWeight: '700',
    marginBottom: '16px',
    textAlign: 'left'
  },
  subStepWrapper: {
    marginBottom: '16px'
  },
  subStepTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#333',
    marginBottom: '8px',
    textAlign: 'left'
  },
  stepDesc: {
    fontSize: '0.95rem',
    color: '#555',
    lineHeight: '1.8',
    margin: '0 0 8px 0',
    textAlign: 'left',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word'
  },
  stepList: {
    margin: '4px 0 10px 0',
    paddingLeft: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    textAlign: 'left'
  },
  stepListItem: {
    fontSize: '0.95rem',
    color: '#555',
    lineHeight: '1.8',
    textAlign: 'left',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word'
  },
  checkItem: {
    fontSize: '0.95rem',
    color: '#1a5c30',
    lineHeight: '1.8',
    textAlign: 'left'
  },
  warnItem: {
    fontSize: '0.95rem',
    color: '#8a4b00',
    lineHeight: '1.8',
    textAlign: 'left',
    fontWeight: '500'
  },
  noteText: {
    fontSize: '0.9rem',
    color: '#666',
    lineHeight: '1.7',
    margin: '6px 0',
    textAlign: 'left',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word'
  },

  /* Code blocks */
  resultLabel: {
    fontSize: '0.9rem',
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: '6px',
    textAlign: 'left'
  },
  resultBlock: {
    backgroundColor: '#1a1a2e',
    borderRadius: '8px',
    padding: '14px 18px',
    marginBottom: '10px',
    overflowX: 'auto'
  },
  resultText: {
    fontSize: '0.88rem',
    fontFamily: "'Courier New', Courier, monospace",
    color: '#4ecca3',
    margin: 0,
    lineHeight: '1.7',
    whiteSpace: 'pre',
    textAlign: 'left'
  },
  warningBox: {
    backgroundColor: '#fff8e6',
    borderLeft: '4px solid #F39C12',
    borderRadius: '6px',
    padding: '12px 16px',
    marginBottom: '10px'
  },
  warningText: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#8a4b00',
    margin: 0,
    lineHeight: '1.7'
  },
  numberedList: {
    paddingLeft: '20px',
    margin: '0 0 10px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  numberedItem: {
    fontSize: '0.95rem',
    color: '#444',
    lineHeight: '1.8',
    textAlign: 'left'
  },

  /* Summary */
  summaryCard: {
    background: 'linear-gradient(135deg, #1ABC9C 0%, #16A085 100%)',
    color: 'white'
  },
  summaryTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: 'white'
  },
  summaryDescription: {
    fontSize: '1.1rem',
    opacity: 0.9,
    lineHeight: '1.8',
    marginBottom: '24px',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word'
  },
  summaryList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '30px'
  },
  summaryItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: '10px',
    padding: '14px 18px',
    backdropFilter: 'blur(10px)'
  },
  summaryCheck: { fontSize: '1.3rem' },
  summaryText: {
    fontSize: '1.05rem',
    fontWeight: '600',
    color: 'white'
  },
  nextStepsBox: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: '12px',
    padding: '20px',
    backdropFilter: 'blur(10px)'
  },
  nextStepsTitle: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: 'white',
    marginBottom: '10px'
  },
  nextStepsText: {
    fontSize: '1rem',
    color: 'rgba(255,255,255,0.9)',
    margin: 0,
    lineHeight: '1.7',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word'
  },

  /* Navigation buttons */
  navigationButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '15px',
    flexWrap: 'wrap'
  },
  navButton: {
    backgroundColor: 'white',
    color: '#1a1a2e',
    border: '2px solid #e0e0e0',
    padding: '12px 24px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  },
  navButtonNext: {
    backgroundColor: '#1ABC9C',
    color: 'white',
    border: '2px solid #1ABC9C'
  },

  /* Scroll to top */
  scrollTopButton: {
    position: 'fixed',
    bottom: '115px',
    right: '30px',
    backgroundColor: '#1ABC9C',
    color: 'white',
    border: 'none',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '1.2rem',
    fontWeight: '700',
    boxShadow: '0 4px 15px rgba(26,188,156,0.4)',
    zIndex: 1000
  }
};

export default Phase4Detail;
