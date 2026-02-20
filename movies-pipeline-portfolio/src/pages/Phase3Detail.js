import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PhaseNavigator from '../components/PhaseNavigator';

const Phase3Detail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.pageYOffset > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const renderLayerContent = (layerNumber) => {
    switch (layerNumber) {
      case 1:
        return (
          <>
            <p style={styles.layerDesc}>{t('phase3.workflow.layer1Problem')}</p>
            <p style={styles.layerDesc}>{t('phase3.workflow.layer1SolutionIntro')}</p>
            <ul style={styles.layerList}>
              <li style={styles.layerListItem}>{t('phase3.workflow.layer1Benefit1')}</li>
              <li style={styles.layerListItem}>{t('phase3.workflow.layer1Benefit2')}</li>
            </ul>
            <p style={styles.layerDesc}>{t('phase3.workflow.layer1ExtractIntro')}</p>
            <div style={styles.layerCodeBlock}>
              <span style={styles.layerCodeLabel}>{t('phase3.workflow.layer1ExtractLabel')}</span>
              <ol style={{ ...styles.layerList, paddingLeft: '24px' }}>
                <li style={styles.layerListItem}>{t('phase3.workflow.layer1Extract1')}</li>
                <li style={styles.layerListItem}>{t('phase3.workflow.layer1Extract2')}</li>
              </ol>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <p style={styles.layerDesc}>{t('phase3.workflow.layer2Desc')}</p>
            <p style={styles.layerQuestion}>{t('phase3.workflow.layer2Question')}</p>
            <p style={styles.layerDesc}>{t('phase3.workflow.layer2Answer')}</p>
            <ul style={styles.layerList}>
              <li style={styles.layerListItem}>{t('phase3.workflow.layer2Reason1')}</li>
              <li style={styles.layerListItem}>{t('phase3.workflow.layer2Reason2')}</li>
            </ul>
          </>
        );
      case 3:
        return (
          <>
            <p style={styles.layerDesc}>{t('phase3.workflow.layer3Desc')}</p>
            <p style={styles.layerDesc}>{t('phase3.workflow.layer3SchemaIntro')}</p>
            <ul style={styles.layerList}>
              <li style={styles.layerListItem}>{t('phase3.workflow.layer3Schema1')}</li>
              <li style={styles.layerListItem}>{t('phase3.workflow.layer3Schema2')}</li>
              <li style={styles.layerListItem}>{t('phase3.workflow.layer3Schema3')}</li>
            </ul>
            <p style={styles.layerNote}>{t('phase3.workflow.layer3Note')}</p>
            <p style={styles.layerDesc}>{t('phase3.workflow.layer3LoadIntro')}</p>
            <ul style={styles.layerList}>
              <li style={styles.layerListItem}>{t('phase3.workflow.layer3Load')}</li>
            </ul>
            <p style={styles.layerDesc}>{t('phase3.workflow.layer3Raw')}</p>
            <p style={styles.layerQuestion}>{t('phase3.workflow.layer3WhyTitle')}</p>
            <p style={styles.layerDesc}>{t('phase3.workflow.layer3WhyAnswer')}</p>
          </>
        );
      default:
        return <p style={styles.layerDesc}>{t(`phase3.workflow.layer${layerNumber}Desc`)}</p>;
    }
  };

  const sections = [
    { id: 'purpose',   number: '1', color: '#E67E22' },
    { id: 'concept',   number: '2', color: '#3498DB' },
    { id: 'workflow',  number: '3', color: '#9B59B6' },
    { id: 'techstack', number: '4', color: '#1ABC9C' }
  ];

  const layers = [
    { number: 1, color: '#0db7ed', icon: '🐳', tag: 'EXTRACT' },
    { number: 2, color: '#FF9900', icon: '🗄️', tag: 'LOAD'    },
    { number: 3, color: '#29B5E8', icon: '❄️', tag: 'RAW'     },
    { number: 4, color: '#FF6B35', icon: '⚙️', tag: 'TRANSFORM'},
    { number: 5, color: '#29B5E8', icon: '📊', tag: 'MARTS'   },
    { number: 6, color: '#F2C811', icon: '📈', tag: 'DASHBOARD'},
    { number: 7, color: '#017CEE', icon: '🌊', tag: 'ORCHESTRATE'}
  ];

  const techStack = [
    { key: 'docker',    icon: '/movies-pipeline-portfolio/images/docker.svg',    color: '#0db7ed', number: 1, isImg: true  },
    { key: 's3',        icon: '/movies-pipeline-portfolio/images/s3.svg',        color: '#FF9900', number: 2, isImg: true  },
    { key: 'snowflake', icon: '/movies-pipeline-portfolio/images/snowflake.png', color: '#29B5E8', number: 3, isImg: true  },
    { key: 'ec2',       icon: '/movies-pipeline-portfolio/images/aws.svg',       color: '#FF9900', number: 4, isImg: true  },
    { key: 'airflow',   icon: '/movies-pipeline-portfolio/images/airflow.png',   color: '#017CEE', number: 5, isImg: true  }
  ];

  return (
    <div style={styles.container}>

      {/* ── Header ── */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <button onClick={() => navigate('/')} style={styles.backButton}>
            ← {t('common.back')}
          </button>
          <div style={styles.phaseNumber}>
            <span style={styles.phaseLabel}>{t('phases.phase')} 3</span>
            <h1 style={styles.phaseTitle}>{t('phase3.title')}</h1>
            <p style={styles.phaseSubtitle}>{t('phase3.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* ── Quick Navigation ── */}
      <div style={styles.section}>
        <h3 style={styles.navSectionTitle}>{t('phase3.navigation.title')}</h3>
        <div style={styles.navGrid}>
          {sections.map((sec) => (
            <div
              key={sec.id}
              style={{ ...styles.navCard, borderLeftColor: sec.color }}
              onClick={() => document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth' })}
            >
              <div style={{ ...styles.navNumber, backgroundColor: sec.color }}>{sec.number}</div>
              <span style={styles.navText}>{t(`phase3.sections.${sec.id}`)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 1. Purpose ── */}
      <div id="purpose" style={styles.section}>
        <div style={styles.contentCard}>
          <h2 style={{ ...styles.cardTitle, color: '#E67E22' }}>
            <span style={{ ...styles.numberBadge, backgroundColor: '#E67E22' }}>1</span>
            {t('phase3.sections.purpose')}
          </h2>
          <p style={styles.description}>{t('phase3.purpose.description')}</p>
          <div style={styles.outputBox}>
            <h4 style={styles.outputTitle}>{t('phase3.purpose.outputTitle')}</h4>
            <div style={styles.outputList}>
              <div style={styles.outputItem}>
                <span style={{ ...styles.outputDot, color: '#E67E22' }}>●</span>
                <span style={styles.outputText}>{t('phase3.purpose.output1')}</span>
              </div>
              <div style={styles.outputItem}>
                <span style={{ ...styles.outputDot, color: '#E67E22' }}>●</span>
                <span style={styles.outputText}>{t('phase3.purpose.output2')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. Origin of Concept ── */}
      <div id="concept" style={styles.section}>
        <div style={styles.contentCard}>
          <h2 style={{ ...styles.cardTitle, color: '#3498DB' }}>
            <span style={{ ...styles.numberBadge, backgroundColor: '#3498DB' }}>2</span>
            {t('phase3.sections.concept')}
          </h2>
          <p style={styles.description}>{t('phase3.concept.description')}</p>

          {/* Tool comparison table */}
          <h3 style={styles.subTitle}>{t('phase3.concept.toolCompareTitle')}</h3>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeaderRow}>
                  <th style={styles.tableHeader}>{t('phase3.concept.tool')}</th>
                  <th style={styles.tableHeader}>{t('phase3.concept.cloudBased')}</th>
                  <th style={styles.tableHeader}>{t('phase3.concept.freeTrial')}</th>
                  <th style={styles.tableHeader}>{t('phase3.concept.easeOfUse')}</th>
                  <th style={styles.tableHeader}>{t('phase3.concept.definition')}</th>
                </tr>
              </thead>
              <tbody>
                <tr style={styles.tableRowHighlight}>
                  <td style={{ ...styles.tableCell, fontWeight: '700', color: '#29B5E8' }}>Snowflake ✅</td>
                  <td style={styles.tableCell}>{t('phase3.concept.snowflakeCloud')}</td>
                  <td style={styles.tableCell}>{t('phase3.concept.snowflakeTrial')}</td>
                  <td style={styles.tableCell}>{t('phase3.concept.snowflakeEase')}</td>
                  <td style={{ ...styles.tableCell, fontStyle: 'italic', color: '#555' }}>{t('phase3.concept.snowflakeDef')}</td>
                </tr>
                <tr>
                  <td style={{ ...styles.tableCell, fontWeight: '700', color: '#4285F4' }}>BigQuery</td>
                  <td style={styles.tableCell}>{t('phase3.concept.bigqueryCloud')}</td>
                  <td style={styles.tableCell}>{t('phase3.concept.bigqueryTrial')}</td>
                  <td style={styles.tableCell}>{t('phase3.concept.bigqueryEase')}</td>
                  <td style={{ ...styles.tableCell, fontStyle: 'italic', color: '#555' }}>{t('phase3.concept.bigqueryDef')}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Decision */}
          <div style={styles.decisionBox}>
            <p style={styles.decisionText}>{t('phase3.concept.decision')}</p>
          </div>

          {/* S3 concept + flow */}
          <p style={styles.description}>{t('phase3.concept.s3Concept')}</p>
          <div style={styles.conceptFlow}>
            <code style={styles.conceptCode}>S3 (Data Lake)  →  Snowflake (Data Warehouse)</code>
          </div>
          <p style={styles.description}>{t('phase3.concept.s3Result')}</p>
          <p style={styles.description} dangerouslySetInnerHTML={{ __html: t('phase3.concept.kaggleDesc') }} />

          {/* ELT workflow steps */}
          <div style={styles.workflowSteps}>
            {[
              { label: 'CSV → S3',          badge: 'EXTRACT',   color: '#E67E22' },
              { label: 'S3 → Snowflake',    badge: 'LOAD',      color: '#3498DB' },
              { label: 'Snowflake',         badge: 'TRANSFORM', color: '#9B59B6' }
            ].map((step) => (
              <div key={step.badge} style={styles.workflowStep}>
                <code style={styles.stepCode}>{step.label}</code>
                <span style={{ ...styles.stepBadge, backgroundColor: step.color }}>{step.badge}</span>
              </div>
            ))}
          </div>

          <div style={styles.infoBox}>
            <p style={styles.infoText}>{t('phase3.concept.eltIntro')}</p>
          </div>

          {/* ETL vs ELT comparison */}
          <h3 style={styles.subTitle}>{t('phase3.concept.eltCompareTitle')}</h3>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeaderRow}>
                  <th style={styles.tableHeader}>{t('phase3.concept.paradigm')}</th>
                  <th style={styles.tableHeader}>{t('phase3.concept.order')}</th>
                  <th style={styles.tableHeader}>{t('phase3.concept.transformLocation')}</th>
                  <th style={styles.tableHeader}>{t('phase3.concept.transformTool')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ ...styles.tableCell, fontWeight: '700', color: '#E74C3C' }}>ETL</td>
                  <td style={{ ...styles.tableCell, fontFamily: 'monospace' }}>E → T → L</td>
                  <td style={styles.tableCell}>{t('phase3.concept.etlLocation')}</td>
                  <td style={styles.tableCell}>{t('phase3.concept.etlTool')}</td>
                </tr>
                <tr style={styles.tableRowHighlight}>
                  <td style={{ ...styles.tableCell, fontWeight: '700', color: '#1ABC9C' }}>ELT</td>
                  <td style={{ ...styles.tableCell, fontFamily: 'monospace' }}>E → L → T</td>
                  <td style={styles.tableCell}>{t('phase3.concept.eltLocation')}</td>
                  <td style={styles.tableCell}>{t('phase3.concept.eltTool')}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* dbt note */}
          <div style={styles.noteBox}>
            <h4 style={styles.noteTitle}>dbt — data build tool</h4>
            <p style={styles.noteText}>{t('phase3.concept.dbtReason')}</p>
          </div>
        </div>
      </div>

      {/* ── 3. Workflow ── */}
      <div id="workflow" style={styles.section}>
        <div style={styles.contentCard}>
          <h2 style={{ ...styles.cardTitle, color: '#9B59B6' }}>
            <span style={{ ...styles.numberBadge, backgroundColor: '#9B59B6' }}>3</span>
            {t('phase3.sections.workflow')}
          </h2>
          <p style={styles.description}>{t('phase3.workflow.description')}</p>

          {/* Workflow diagram */}
          <div style={styles.imageContainer}>
            <img
              src="/movies-pipeline-portfolio/images/workflow.svg"
              alt="Workflow Diagram"
              style={styles.workflowImage}
            />
          </div>

          {/* 7 layers */}
          <div style={styles.layersContainer}>
            {layers.map((layer) => (
              <div key={layer.number} style={{ ...styles.layerCard, borderLeftColor: layer.color }}>
                <div style={styles.layerMeta}>
                  <div style={{ ...styles.layerBadge, backgroundColor: layer.color }}>
                    <span style={styles.layerIcon}>{layer.icon}</span>
                    <span style={styles.layerNum}>{t('phase3.workflow.layer')} {layer.number}</span>
                  </div>
                  <span style={{ ...styles.layerTag, color: layer.color, borderColor: layer.color }}>
                    {layer.tag}
                  </span>
                </div>
                <div style={styles.layerContent}>
                  <h4 style={styles.layerTitle}>{t(`phase3.workflow.layer${layer.number}Title`)}</h4>
                  {renderLayerContent(layer.number)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. Tech Stack ── */}
      <div id="techstack" style={styles.section}>
        <div style={styles.contentCard}>
          <h2 style={{ ...styles.cardTitle, color: '#1ABC9C' }}>
            <span style={{ ...styles.numberBadge, backgroundColor: '#1ABC9C' }}>4</span>
            {t('phase3.sections.techstack')}
          </h2>
          <p style={styles.description}>{t('phase3.techstack.description')}</p>

          <div style={styles.techGrid}>
            {techStack.map((tech) => (
              <div key={tech.key} style={{ ...styles.techCard, borderTopColor: tech.color }}>
                <div style={styles.techHeader}>
                  <div style={{ ...styles.techIconWrapper, borderColor: tech.color }}>
                    <img src={tech.icon} alt={tech.key} style={styles.techIcon} />
                  </div>
                  <div style={styles.techMeta}>
                    <span style={{ ...styles.techNumber, backgroundColor: tech.color }}>{tech.number}</span>
                    <h4 style={styles.techTitle}>{t(`phase3.techstack.${tech.key}Title`)}</h4>
                  </div>
                </div>
                <p style={styles.techDesc}>{t(`phase3.techstack.${tech.key}Desc`)}</p>
                {tech.key === 's3' && (
                  <ul style={styles.techRoleList}>
                    {[1, 2, 3, 4].map((i) => (
                      <li key={i} style={styles.techRoleItem}>
                        <span style={{ color: tech.color, marginRight: '8px' }}>▸</span>
                        {t(`phase3.techstack.s3Role${i}`)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Summary ── */}
      <div style={styles.section}>
        <div style={{ ...styles.contentCard, ...styles.summaryCard }}>
          <h2 style={styles.summaryTitle}>
            <span>✅</span>
            {t('phase3.summary.title')}
          </h2>
          <p style={styles.summaryDescription}>{t('phase3.summary.description')}</p>

          <div style={styles.keyFindingsGrid}>
            {[
              { num: 1, icon: '🔄' },
              { num: 2, icon: '🏗️' },
              { num: 3, icon: '☁️' }
            ].map(({ num, icon }) => (
              <div key={num} style={styles.keyFinding}>
                <div style={styles.keyFindingIcon}>{icon}</div>
                <h3 style={styles.keyFindingTitle}>{t(`phase3.summary.finding${num}Title`)}</h3>
                <p style={styles.keyFindingText}>{t(`phase3.summary.finding${num}`)}</p>
              </div>
            ))}
          </div>

          <div style={styles.nextStepsBox}>
            <h3 style={styles.nextStepsTitle}>{t('phase3.summary.nextSteps')}</h3>
            <p style={styles.nextStepsText}>{t('phase3.summary.nextStepsDescription')}</p>
          </div>
        </div>
      </div>

      {/* ── Navigation ── */}
      <div style={styles.section}>
        <div style={styles.navigationButtons}>
          <button onClick={() => navigate('/phase/2')} style={styles.navButton}>
            ← Phase 2: {t('phases.phase2.name')}
          </button>
          <button onClick={() => navigate('/phase/4')} style={{ ...styles.navButton, ...styles.navButtonNext }}>
            Phase 4: {t('phases.phase4.name')} →
          </button>
        </div>
      </div>

      <PhaseNavigator currentPhase={3} totalPhases={15} />

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
    background: 'linear-gradient(135deg, #9B59B6 0%, #7D3C98 100%)',
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
  subTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: '20px',
    marginTop: '30px',
    textAlign: 'left'
  },

  /* Output box */
  outputBox: {
    backgroundColor: '#f0f4ff',
    borderLeft: '4px solid #E67E22',
    borderRadius: '8px',
    padding: '20px'
  },
  outputTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: '12px'
  },
  outputList: { display: 'flex', flexDirection: 'column', gap: '8px' },
  outputItem: { display: 'flex', alignItems: 'center', gap: '10px' },
  outputDot: { fontSize: '1.2rem', flexShrink: 0 },
  outputText: { fontSize: '1rem', color: '#444', fontWeight: '500' },

  /* Table */
  tableWrapper: {
    overflowX: 'auto',
    marginBottom: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.07)'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.95rem'
  },
  tableHeaderRow: {
    backgroundColor: '#1a1a2e',
    color: 'white'
  },
  tableHeader: {
    padding: '14px 16px',
    textAlign: 'left',
    fontWeight: '600',
    whiteSpace: 'nowrap'
  },
  tableCell: {
    padding: '14px 16px',
    borderBottom: '1px solid #eee',
    color: '#444',
    lineHeight: '1.6',
    verticalAlign: 'top'
  },
  tableRowHighlight: {
    backgroundColor: '#f0faf7'
  },

  /* Decision box */
  decisionBox: {
    backgroundColor: '#e8f5e9',
    borderLeft: '4px solid #2ECC71',
    borderRadius: '8px',
    padding: '18px 20px',
    marginBottom: '30px',
    width: 'fit-content'
  },
  decisionText: {
    fontSize: '1rem',
    color: '#1a5c30',
    fontWeight: '500',
    margin: 0,
    lineHeight: '1.7'
  },

  /* Concept flow */
  conceptFlow: {
    backgroundColor: '#1a1a2e',
    borderRadius: '10px',
    padding: '14px 24px',
    width: 'fit-content',
    margin: '0 auto 20px auto'
  },
  conceptCode: {
    fontSize: '1.2rem',
    color: '#4ecca3',
    fontFamily: 'monospace',
    letterSpacing: '1px'
  },

  /* ELT workflow steps */
  workflowSteps: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    backgroundColor: '#1a1a2e',
    borderRadius: '10px',
    padding: '18px 28px',
    width: 'fit-content',
    margin: '0 auto 20px auto'
  },
  workflowStep: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  stepCode: {
    fontSize: '1rem',
    color: '#a8d8ea',
    fontFamily: 'monospace',
    minWidth: '160px',
    textAlign: 'left'
  },
  stepBadge: {
    fontSize: '0.8rem',
    fontWeight: '700',
    color: 'white',
    padding: '3px 10px',
    borderRadius: '20px',
    letterSpacing: '1px'
  },

  /* Info / note boxes */
  infoBox: {
    backgroundColor: '#e8f4fd',
    borderLeft: '4px solid #3498DB',
    borderRadius: '8px',
    padding: '18px 20px',
    marginBottom: '30px',
    width: 'fit-content'
  },
  infoText: {
    fontSize: '1rem',
    color: '#1a5276',
    margin: 0,
    lineHeight: '1.7'
  },
  noteBox: {
    backgroundColor: '#fdf9f0',
    borderLeft: '4px solid #F39C12',
    borderRadius: '8px',
    padding: '20px',
    marginTop: '20px'
  },
  noteTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: '10px',
    textAlign: 'left'
  },
  noteText: {
    fontSize: '0.95rem',
    color: '#555',
    margin: 0,
    lineHeight: '1.8',
    textAlign: 'left',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word'
  },

  /* Workflow image */
  imageContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '30px',
    textAlign: 'center',
    overflow: 'auto'
  },
  workflowImage: {
    maxWidth: '70%',
    height: 'auto',
    borderRadius: '8px'
  },

  /* 7 layers */
  layersContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  layerCard: {
    backgroundColor: '#fafafa',
    borderLeft: '5px solid',
    borderRadius: '12px',
    padding: '20px 24px',
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
  },
  layerMeta: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    flexShrink: 0
  },
  layerBadge: {
    borderRadius: '10px',
    padding: '8px 12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    minWidth: '70px'
  },
  layerIcon: {
    fontSize: '1.4rem'
  },
  layerNum: {
    fontSize: '0.75rem',
    color: 'white',
    fontWeight: '700',
    whiteSpace: 'nowrap'
  },
  layerTag: {
    fontSize: '0.7rem',
    fontWeight: '700',
    border: '1.5px solid',
    borderRadius: '4px',
    padding: '2px 6px',
    letterSpacing: '0.5px'
  },
  layerContent: { flex: 1 },
  layerTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: '8px',
    textAlign: 'left'
  },
  layerDesc: {
    fontSize: '0.95rem',
    color: '#555',
    lineHeight: '1.8',
    margin: '0 0 8px 0',
    textAlign: 'left',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word'
  },
  layerList: {
    margin: '4px 0 10px 0',
    paddingLeft: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    textAlign: 'left'
  },
  layerListItem: {
    fontSize: '0.95rem',
    color: '#555',
    lineHeight: '1.8',
    textAlign: 'left',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word'
  },
  layerQuestion: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#333',
    lineHeight: '1.8',
    margin: '10px 0 4px 0',
    textAlign: 'left',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word'
  },
  layerNote: {
    fontSize: '0.9rem',
    fontStyle: 'italic',
    color: '#777',
    lineHeight: '1.7',
    margin: '4px 0 10px 0',
    textAlign: 'left',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word'
  },
  layerCodeBlock: {
    backgroundColor: '#f4f4f4',
    borderLeft: '3px solid #aaa',
    borderRadius: '6px',
    padding: '10px 14px',
    margin: '6px 0 10px 0'
  },
  layerCodeLabel: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: '#444',
    letterSpacing: '0.5px',
    display: 'block',
    marginBottom: '6px'
  },

  /* Tech stack */
  techGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px'
  },
  techCard: {
    backgroundColor: '#fafafa',
    borderRadius: '12px',
    padding: '24px',
    borderTop: '4px solid',
    boxShadow: '0 4px 15px rgba(0,0,0,0.07)'
  },
  techHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '16px'
  },
  techIconWrapper: {
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    border: '2px solid',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    padding: '6px'
  },
  techIcon: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  },
  techMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  techNumber: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'white',
    padding: '2px 8px',
    borderRadius: '12px',
    display: 'inline-block',
    width: 'fit-content'
  },
  techTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#1a1a2e',
    margin: 0,
    textAlign: 'left'
  },
  techDesc: {
    fontSize: '0.95rem',
    color: '#555',
    lineHeight: '1.8',
    marginBottom: '12px',
    textAlign: 'left',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word'
  },
  techRoleList: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  techRoleItem: {
    fontSize: '0.9rem',
    color: '#444',
    lineHeight: '1.6',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'flex-start'
  },

  /* Summary */
  summaryCard: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
    marginBottom: '30px',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word'
  },
  keyFindingsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  keyFinding: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: '12px',
    padding: '20px',
    backdropFilter: 'blur(10px)'
  },
  keyFindingIcon: {
    fontSize: '2rem',
    marginBottom: '10px'
  },
  keyFindingTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: 'white',
    marginBottom: '8px'
  },
  keyFindingText: {
    fontSize: '0.95rem',
    color: 'rgba(255,255,255,0.85)',
    lineHeight: '1.6',
    margin: 0,
    wordBreak: 'keep-all',
    overflowWrap: 'break-word'
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
    backgroundColor: '#9B59B6',
    color: 'white',
    border: '2px solid #9B59B6'
  },

  /* Scroll to top */
  scrollTopButton: {
    position: 'fixed',
    bottom: '115px',
    right: '30px',
    backgroundColor: '#9B59B6',
    color: 'white',
    border: 'none',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '1.2rem',
    fontWeight: '700',
    boxShadow: '0 4px 15px rgba(155,89,182,0.4)',
    zIndex: 1000
  }
};

export default Phase3Detail;
