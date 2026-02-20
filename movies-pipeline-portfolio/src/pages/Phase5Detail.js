import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PhaseNavigator from '../components/PhaseNavigator';

/* ── Copyable code block ── */
const CopyableCode = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div style={codeStyles.wrapper}>
      <button onClick={handleCopy} style={{ ...codeStyles.copyBtn, backgroundColor: copied ? '#c8f7c5' : '#e0e0e0', color: copied ? '#1a5c30' : '#444' }}>
        {copied ? '✓ Copied!' : 'Copy'}
      </button>
      <pre style={codeStyles.pre}>{code}</pre>
    </div>
  );
};
const codeStyles = {
  wrapper: { position: 'relative', backgroundColor: '#f4f4f5', borderRadius: '8px', padding: '14px 18px', marginBottom: '10px', overflowX: 'auto' },
  copyBtn: { position: 'absolute', top: '8px', right: '8px', border: 'none', borderRadius: '4px', padding: '3px 10px', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s ease', zIndex: 1 },
  pre: { fontSize: '0.88rem', fontFamily: "'Courier New', Courier, monospace", color: '#2d2d2d', margin: 0, lineHeight: '1.7', whiteSpace: 'pre', textAlign: 'left', paddingRight: '70px' }
};

/* ── Dark result block ── */
const ResultBlock = ({ children }) => (
  <div style={styles.resultBlock}><pre style={styles.resultText}>{children}</pre></div>
);

/* ── Info box ── */
const InfoBox = ({ color, children }) => (
  <div style={{ ...styles.infoBox, borderLeftColor: color, backgroundColor: color + '12' }}>{children}</div>
);

/* ── Warning box ── */
const WarningBox = ({ text }) => (
  <div style={styles.warningBox}><p style={styles.warningText}>⚠️ {text}</p></div>
);

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const Phase5Detail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('purpose');

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.pageYOffset > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollTo = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const NAV_SECTIONS = [
    { id: 'purpose',  label: t('phase5.nav.purpose'),   bold: true },
    { id: 'step1',    label: t('phase5.nav.step1'),      bold: true },
    { id: 'step1-1',  label: t('phase5.nav.step1_1'),   bold: false },
    { id: 'step1-2',  label: t('phase5.nav.step1_2'),   bold: false },
    { id: 'step1-3',  label: t('phase5.nav.step1_3'),   bold: false },
    { id: 'step1-4',  label: t('phase5.nav.step1_4'),   bold: false },
    { id: 'step1-5',  label: t('phase5.nav.step1_5'),   bold: false },
    { id: 'step1-6',  label: t('phase5.nav.step1_6'),   bold: false },
    { id: 'step2',    label: t('phase5.nav.step2'),      bold: true },
    { id: 'step2-1',  label: t('phase5.nav.step2_1'),   bold: false },
    { id: 'step2-2',  label: t('phase5.nav.step2_2'),   bold: false },
    { id: 'step2-3',  label: t('phase5.nav.step2_3'),   bold: false },
    { id: 'step2-4',  label: t('phase5.nav.step2_4'),   bold: false },
    { id: 'step2-5',  label: t('phase5.nav.step2_5'),   bold: false },
    { id: 'step2-6',  label: t('phase5.nav.step2_6'),   bold: false },
    { id: 'step2-7',  label: t('phase5.nav.step2_7'),   bold: false },
    { id: 'step2-8',  label: t('phase5.nav.step2_8'),   bold: false },
    { id: 'step2-9',  label: t('phase5.nav.step2_9'),   bold: false },
    { id: 'step2-10', label: t('phase5.nav.step2_10'),  bold: false },
    { id: 'step2-11', label: t('phase5.nav.step2_11'),  bold: false },
    { id: 'summary',  label: t('phase5.nav.summary'),    bold: true }
  ];

  const SubHeading = ({ id, title, color }) => (
    <h3 id={id} style={{ ...styles.subHeading, borderLeftColor: color }}>{title}</h3>
  );

  return (
    <div style={styles.container}>

      {/* ── HEADER ── */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <button onClick={() => navigate('/')} style={styles.backButton}>{t('phase5.backBtn')}</button>
          <div style={styles.phaseNumber}>
            <span style={styles.phaseLabel}>Phase 5</span>
            <h1 style={styles.phaseTitle}>{t('phase5.title')}</h1>
            <p style={styles.phaseSubtitle}>{t('phase5.subtitle')}</p>
            <div style={styles.headerBadges}>
              <span style={styles.badge}>☁️ AWS S3</span>
              <span style={styles.badge}>❄️ Snowflake</span>
              <span style={styles.badge}>🔑 IAM</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── TWO-COLUMN LAYOUT ── */}
      <div style={styles.pageLayout}>

        {/* ── LEFT SIDEBAR ── */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarCard}>
            <h3 style={styles.sidebarTitle}>{t('phase5.navTitle')}</h3>
            <nav>
              {NAV_SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollTo(sec.id)}
                  style={{
                    ...styles.navItem,
                    ...(activeSection === sec.id ? styles.navItemActive : {}),
                    paddingLeft: sec.bold ? '12px' : '24px',
                    fontSize: sec.bold ? '0.875rem' : '0.8rem',
                    fontWeight: sec.bold ? '700' : '400'
                  }}
                >
                  {sec.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main style={styles.mainContent}>

          {/* PURPOSE */}
          <section id="purpose" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={{ ...styles.sectionHeading, color: '#F39C12' }}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#F39C12' }}>🎯</span>
                {t('phase5.purpose.heading')}
              </h2>
              <p style={styles.bodyText}>{t('phase5.purpose.desc1')}</p>
              <p style={styles.bodyText}>{t('phase5.purpose.desc2')}</p>
              <div style={styles.goalGrid}>
                <div style={{ ...styles.goalCard, borderColor: '#FF9900' }}>
                  <div style={styles.goalIcon}>☁️</div>
                  <h4 style={styles.goalTitle}>{t('phase5.purpose.goal1Title')}</h4>
                  <ul style={styles.goalList}>
                    {[1,2,3,4,5].map(i => <li key={i}>{t(`phase5.purpose.goal1_${i}`)}</li>)}
                  </ul>
                </div>
                <div style={{ ...styles.goalCard, borderColor: '#29B5E8' }}>
                  <div style={styles.goalIcon}>❄️</div>
                  <h4 style={styles.goalTitle}>{t('phase5.purpose.goal2Title')}</h4>
                  <ul style={styles.goalList}>
                    {[1,2,3,4,5,6].map(i => <li key={i}>{t(`phase5.purpose.goal2_${i}`)}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* STEP 1 BANNER */}
          <section id="step1" style={styles.section}>
            <div style={{ ...styles.stepHeader, background: 'linear-gradient(135deg, #FF9900 0%, #F39C12 100%)' }}>
              <h2 style={styles.stepHeaderTitle}>{t('phase5.step1Header.title')}</h2>
              <p style={styles.stepHeaderDesc}>{t('phase5.step1Header.desc')}</p>
            </div>
          </section>

          {/* STEP 1.1 */}
          <section id="step1-1" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="s1-1h" title={t('phase5.step1_1.title')} color="#FF9900" />
              <ol style={styles.orderedList}>
                <li style={styles.listItem}>{t('phase5.step1_1.goToAws')}</li>
              </ol>
              <CopyableCode code="https://aws.amazon.com/" />
              <ol style={styles.orderedList} start="2">
                <li style={styles.listItem}>{t('phase5.purpose.goal1_1')}</li>
              </ol>
              <InfoBox color="#FF9900">
                <p style={styles.infoText}>{t('phase5.step1_1.note')}</p>
              </InfoBox>
            </div>
          </section>

          {/* STEP 1.2 */}
          <section id="step1-2" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="s1-2h" title={t('phase5.step1_2.title')} color="#FF9900" />
              <p style={styles.bodyText}>{t('phase5.step1_2.desc')}</p>
              <ol style={styles.orderedList}>
                <li style={styles.listItem}>
                  <strong>{t('phase5.step1_2.s1Label')}</strong>
                  <ul style={styles.bulletList}>
                    <li style={styles.listItem}>{t('phase5.step1_2.s1a')}</li>
                    <li style={styles.listItem}>{t('phase5.step1_2.s1b')}</li>
                  </ul>
                </li>
                <li style={styles.listItem}>
                  <strong>{t('phase5.step1_2.s2Label')}</strong>
                  <ul style={styles.bulletList}>
                    <li style={styles.listItem}>{t('phase5.step1_2.s2a')}</li>
                    <li style={styles.listItem}><strong>{t('phase5.step1_2.s2b')}</strong></li>
                  </ul>
                  <CopyableCode code={`# ${t('phase5.step1_2.bucketNameComment')}\nmovies-pipeline-data-22`} />
                </li>
                <li style={styles.listItem}>
                  <strong>{t('phase5.step1_2.s3Label')}</strong>
                  <p style={styles.bodyText}>{t('phase5.step1_2.s3Desc')}</p>
                  <CopyableCode code="AWS Region: US East (N. Virginia) us-east-1" />
                </li>
                <li style={styles.listItem}>{t('phase5.step1_2.s4Label')}</li>
                <li style={styles.listItem}>
                  <strong>{t('phase5.step1_2.s5Label')}</strong>
                  <ul style={styles.bulletList}>
                    <li style={styles.listItem}>{t('phase5.step1_2.s5a')}</li>
                    <li style={styles.listItem}>{t('phase5.step1_2.s5b')}</li>
                  </ul>
                </li>
                <li style={styles.listItem}>
                  <strong>{t('phase5.step1_2.s6Label')}</strong>
                  <p style={styles.noteText}>{t('phase5.step1_2.s6Note')}</p>
                </li>
                <li style={styles.listItem}>
                  <strong>{t('phase5.step1_2.s7Label')}</strong>
                  <ul style={styles.bulletList}>
                    <li style={styles.listItem}>{t('phase5.step1_2.s7a')}</li>
                    <li style={styles.listItem}>{t('phase5.step1_2.s7b')}</li>
                  </ul>
                </li>
                <li style={styles.listItem}>{t('phase5.step1_2.s8Label')}</li>
                <li style={styles.listItem}><strong>{t('phase5.step1_2.s9Label')}</strong></li>
              </ol>
              <p style={styles.bodyText}>{t('phase5.step1_2.resultDesc')}</p>
              <ResultBlock>{'Successfully created bucket "name_of_your_bucket"'}</ResultBlock>
            </div>
          </section>

          {/* STEP 1.3 */}
          <section id="step1-3" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="s1-3h" title={t('phase5.step1_3.title')} color="#FF9900" />
              <p style={styles.bodyText}>{t('phase5.step1_3.desc')}</p>
              <ol style={styles.orderedList}>
                <li style={styles.listItem}>{t('phase5.step1_3.item1')}</li>
                <li style={styles.listItem}>
                  {t('phase5.step1_3.item2')}
                  <CopyableCode code="raw" />
                </li>
                <li style={styles.listItem}>{t('phase5.step1_3.item3')}</li>
                <li style={styles.listItem}>{t('phase5.step1_3.item4')}</li>
              </ol>
            </div>
          </section>

          {/* STEP 1.4 */}
          <section id="step1-4" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="s1-4h" title={t('phase5.step1_4.title')} color="#FF9900" />
              <InfoBox color="#3498DB">
                <p style={styles.infoText}>{t('phase5.step1_4.iamDesc')}</p>
              </InfoBox>
              <p style={styles.bodyText}>{t('phase5.step1_4.choiceDesc')}</p>
              <p style={styles.bodyText}><strong>{t('phase5.step1_4.stepsTitle')}</strong></p>
              <ol style={styles.orderedList}>
                <li style={styles.listItem}>
                  <strong>{t('phase5.step1_4.s1Label')}</strong>
                  <ul style={styles.bulletList}>
                    <li style={styles.listItem}>{t('phase5.step1_4.s1a')}</li>
                    <li style={styles.listItem}>{t('phase5.step1_4.s1b')}</li>
                  </ul>
                </li>
                <li style={styles.listItem}>
                  <strong>{t('phase5.step1_4.s2Label')}</strong>
                  <ul style={styles.bulletList}>
                    <li style={styles.listItem}>{t('phase5.step1_4.s2a')}</li>
                    <li style={styles.listItem}>{t('phase5.step1_4.s2b')}</li>
                    <li style={styles.listItem}>{t('phase5.step1_4.s2Note')}</li>
                  </ul>
                </li>
                <li style={styles.listItem}>
                  <strong>{t('phase5.step1_4.s3Label')}</strong>
                  <p style={styles.bodyText}>{t('phase5.step1_4.s3Desc')}</p>
                  <CopyableCode code="movies-pipeline-user" />
                </li>
                <li style={styles.listItem}>
                  <strong>{t('phase5.step1_4.s4Label')}</strong>
                  <ul style={styles.bulletList}>
                    <li style={styles.listItem}>{t('phase5.step1_4.s4a')}</li>
                    <li style={styles.listItem}>{t('phase5.step1_4.s4b')}</li>
                  </ul>
                </li>
                <li style={styles.listItem}>{t('phase5.step1_4.s5Label')}</li>
                <li style={styles.listItem}>
                  <strong>{t('phase5.step1_4.s6Label')}</strong>
                  <ul style={styles.bulletList}>
                    <li style={styles.listItem}>{t('phase5.step1_4.s6a')}</li>
                    <li style={styles.listItem}>{t('phase5.step1_4.s6b')}</li>
                    <li style={styles.listItem}>{t('phase5.step1_4.s6c')}</li>
                    <li style={styles.listItem}>{t('phase5.step1_4.s6d')}</li>
                    <li style={styles.listItem}>{t('phase5.step1_4.s6e')}</li>
                    <li style={styles.listItem}>{t('phase5.step1_4.s6f')}</li>
                    <li style={styles.listItem}>{t('phase5.step1_4.s6g')}</li>
                    <li style={styles.listItem}>{t('phase5.step1_4.s6h')}</li>
                    <li style={styles.listItem}>{t('phase5.step1_4.s6i')}</li>
                  </ul>
                  <CopyableCode code="For movies pipeline project" />
                  <ul style={styles.bulletList}>
                    <li style={styles.listItem}>{t('phase5.step1_4.s6j')}</li>
                  </ul>
                </li>
                <li style={styles.listItem}>
                  <strong>{t('phase5.step1_4.s7Label')}</strong>
                  <p style={styles.bodyText}>{t('phase5.step1_4.s7Desc')}</p>
                  <CopyableCode code={`Access key ID     (example: AKIAIOSFODNN7EXAMPLE)\nSecret access key (example: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY)`} />
                  <ul style={styles.bulletList}>
                    <li style={styles.listItem}>{t('phase5.step1_4.s7a')}</li>
                    <li style={styles.listItem}>{t('phase5.step1_4.s7b')}</li>
                  </ul>
                </li>
              </ol>
              <WarningBox text={t('phase5.step1_4.warnText')} />
            </div>
          </section>

          {/* STEP 1.5 */}
          <section id="step1-5" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="s1-5h" title={t('phase5.step1_5.title')} color="#FF9900" />
              <p style={styles.bodyText}>{t('phase5.step1_5.credDesc')}</p>
              <p style={styles.bodyText}><strong>{t('phase5.step1_5.goalLabel')}</strong></p>
              <ol style={styles.orderedList}>
                <li style={styles.listItem}>
                  {t('phase5.step1_5.item1')}
                  <CopyableCode code=".env" />
                </li>
                <li style={styles.listItem}>
                  {t('phase5.step1_5.item2')}
                  <CopyableCode code={`# AWS Credentials
AWS_ACCESS_KEY_ID=<your Access Key ID>
AWS_SECRET_ACCESS_KEY=<your Secret Access Key>
AWS_REGION=us-east-1
S3_BUCKET_NAME=<your bucket name>

# Snowflake Credentials (fill in at Step 2)
SNOWFLAKE_ACCOUNT=
SNOWFLAKE_USER=
SNOWFLAKE_PASSWORD=
SNOWFLAKE_DATABASE=
SNOWFLAKE_WAREHOUSE=
SNOWFLAKE_SCHEMA=
SNOWFLAKE_ROLE=`} />
                </li>
                <li style={styles.listItem}>{t('phase5.step1_5.item3')}</li>
              </ol>
            </div>
          </section>

          {/* STEP 1.6 */}
          <section id="step1-6" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="s1-6h" title={t('phase5.step1_6.title')} color="#FF9900" />
              <InfoBox color="#9B59B6">
                <p style={styles.infoText}>{t('phase5.step1_6.roleDesc')}</p>
              </InfoBox>
              <ol style={styles.orderedList}>
                <li style={styles.listItem}>
                  <strong>{t('phase5.step1_6.s1Label')}</strong>
                  <ul style={styles.bulletList}><li style={styles.listItem}>{t('phase5.step1_6.s1a')}</li></ul>
                </li>
                <li style={styles.listItem}>
                  <strong>{t('phase5.step1_6.s2Label')}</strong>
                  <ul style={styles.bulletList}><li style={styles.listItem}>{t('phase5.step1_6.s2a')}</li></ul>
                  <div style={styles.imageWrapper}>
                    <img src="/movies-pipeline-portfolio/images/step-1-6.png" alt="IAM Roles - Create role" style={styles.screenshot} />
                    <p style={styles.imageCaption}>{t('phase5.step1_6.imgCaption')}</p>
                  </div>
                </li>
                <li style={styles.listItem}>
                  <strong>{t('phase5.step1_6.s3Label')}</strong>
                  <ul style={styles.bulletList}>
                    <li style={styles.listItem}>{t('phase5.step1_6.s3a')}</li>
                    <li style={styles.listItem}>{t('phase5.step1_6.s3b')}</li>
                    <li style={styles.listItem}>{t('phase5.step1_6.s3c')}</li>
                    <li style={styles.listItem}>{t('phase5.step1_6.s3d')}</li>
                    <li style={styles.listItem}>{t('phase5.step1_6.s3e')}</li>
                  </ul>
                </li>
                <li style={styles.listItem}>
                  <strong>{t('phase5.step1_6.s4Label')}</strong>
                  <ul style={styles.bulletList}>
                    <li style={styles.listItem}>{t('phase5.step1_6.s4a')}</li>
                    <li style={styles.listItem}>{t('phase5.step1_6.s4b')}</li>
                    <li style={styles.listItem}>{t('phase5.step1_6.s4c')}</li>
                  </ul>
                </li>
                <li style={styles.listItem}>
                  <strong>{t('phase5.step1_6.s5Label')}</strong>
                  <CopyableCode code="movies-pipeline-data-22-role" />
                  <ul style={styles.bulletList}>
                    <li style={styles.listItem}>{t('phase5.step1_6.s5a')}</li>
                    <li style={styles.listItem}>{t('phase5.step1_6.s5b')}</li>
                  </ul>
                </li>
                <li style={styles.listItem}>
                  <strong>{t('phase5.step1_6.s6Label')}</strong>
                  <ul style={styles.bulletList}>
                    <li style={styles.listItem}>{t('phase5.step1_6.s6a')}</li>
                    <li style={styles.listItem}>{t('phase5.step1_6.s6b')}</li>
                  </ul>
                </li>
              </ol>
              <div style={styles.completeBox}>
                <h3 style={styles.completeTitle}>{t('phase5.step1_6.completeTitle')}</h3>
                <p style={styles.completeSubtitle}>{t('phase5.step1_6.completeSubtitle')}</p>
                <div style={styles.checkList}>
                  {[1,2,3,4,5].map(i => (
                    <div key={i} style={styles.checkItem}>
                      <span>✅</span><span>{t(`phase5.step1_6.complete${i}`)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* STEP 2 BANNER */}
          <section id="step2" style={styles.section}>
            <div style={{ ...styles.stepHeader, background: 'linear-gradient(135deg, #29B5E8 0%, #1A8FC8 100%)' }}>
              <h2 style={styles.stepHeaderTitle}>{t('phase5.step2Header.title')}</h2>
              <p style={styles.stepHeaderDesc}>{t('phase5.step2Header.desc')}</p>
            </div>
          </section>

          {/* STEP 2.1 */}
          <section id="step2-1" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="s2-1h" title={t('phase5.step2_1.title')} color="#29B5E8" />
              <p style={styles.bodyText}>{t('phase5.step2_1.desc')}</p>
              <CopyableCode code="https://signup.snowflake.com/" />
            </div>
          </section>

          {/* STEP 2.2 */}
          <section id="step2-2" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="s2-2h" title={t('phase5.step2_2.title')} color="#29B5E8" />
              <InfoBox color="#29B5E8">
                <p style={styles.infoText}>{t('phase5.step2_2.whDesc')}</p>
              </InfoBox>
              <p style={styles.bodyText}><strong>{t('phase5.step2_2.whyTitle')}</strong></p>
              <p style={styles.bodyText}>{t('phase5.step2_2.whyDesc')}</p>
              <p style={styles.bodyText}><strong>{t('phase5.step2_2.rolesTitle')}</strong></p>
              <ul style={styles.bulletList}>
                <li style={styles.listItem}>{t('phase5.step2_2.role1')}</li>
                <li style={styles.listItem}>{t('phase5.step2_2.role2')}</li>
                <li style={styles.listItem}>{t('phase5.step2_2.role3')}</li>
              </ul>
              <CopyableCode code={`-- =====================================================
-- SECTION 1: Create Infrastructure
-- =====================================================

-- Create Warehouse
CREATE WAREHOUSE IF NOT EXISTS movies_wh WITH
    WAREHOUSE_SIZE = 'X-SMALL'
    AUTO_SUSPEND = 180
    AUTO_RESUME = TRUE
    INITIALLY_SUSPENDED = TRUE
    COMMENT = 'Warehouse for Movies Pipeline';`} />
              <p style={styles.bodyText}><strong>{t('phase5.step2_2.codeTitle')}</strong></p>
              <ul style={styles.bulletList}>
                {[1,2,3,4,5].map(i => <li key={i} style={styles.listItem}><code style={styles.inlineCode}>{['CREATE WAREHOUSE IF NOT EXISTS movies_wh','WAREHOUSE_SIZE','AUTO_SUSPEND','AUTO_RESUME','INITIALLY_SUSPENDED'][i-1]}</code>: {t(`phase5.step2_2.code${i}`)}</li>)}
              </ul>
            </div>
          </section>

          {/* STEP 2.3 */}
          <section id="step2-3" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="s2-3h" title={t('phase5.step2_3.title')} color="#29B5E8" />
              <h4 style={styles.subSubHeading}>{t('phase5.step2_3.dbTitle')}</h4>
              <InfoBox color="#27AE60">
                <p style={styles.infoText}>{t('phase5.step2_3.dbDesc')}</p>
              </InfoBox>
              <p style={styles.bodyText}><strong>{t('phase5.step2_3.whyDbTitle')}</strong> {t('phase5.step2_3.whyDbDesc')}</p>
              <p style={styles.bodyText}><strong>{t('phase5.step2_3.dbRolesTitle')}</strong></p>
              <ul style={styles.bulletList}>
                <li style={styles.listItem}>{t('phase5.step2_3.dbRole1')}</li>
                <li style={styles.listItem}>{t('phase5.step2_3.dbRole2')}</li>
                <li style={styles.listItem}>{t('phase5.step2_3.dbRole3')}</li>
              </ul>
              <CopyableCode code={`-- Create Database
CREATE DATABASE IF NOT EXISTS movies_db
    COMMENT = 'Movies Analytics Database';

-- ⚠️ IMPORTANT: Set database context BEFORE creating schemas
USE DATABASE movies_db;`} />
              <h4 style={styles.subSubHeading}>{t('phase5.step2_3.schemaTitle')}</h4>
              <InfoBox color="#E67E22">
                <p style={styles.infoText}>{t('phase5.step2_3.schemaDesc')}</p>
                <ul style={styles.bulletList}>
                  <li style={styles.listItem}>{t('phase5.step2_3.schemaItem1')}</li>
                  <li style={styles.listItem}>{t('phase5.step2_3.schemaItem2')}</li>
                  <li style={styles.listItem}>{t('phase5.step2_3.schemaItem3')}</li>
                </ul>
              </InfoBox>
              <CopyableCode code={`-- Create raw schema
CREATE SCHEMA IF NOT EXISTS raw
    COMMENT = 'Raw data from S3';

-- Create staging schema
CREATE SCHEMA IF NOT EXISTS staging
    COMMENT = 'Staging layer for data cleansing and standardization';

-- Create analytics schema
CREATE SCHEMA IF NOT EXISTS analytics
    COMMENT = 'Transformed data (dbt models)';`} />
            </div>
          </section>

          {/* STEP 2.4 */}
          <section id="step2-4" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="s2-4h" title={t('phase5.step2_4.title')} color="#29B5E8" />
              <CopyableCode code={`-- =====================================================
-- SECTION 2: Set Context (CRITICAL!)
-- =====================================================
USE WAREHOUSE movies_wh;
USE DATABASE movies_db;
USE SCHEMA raw;  -- ⭐ This prevents "Stage not found" errors!`} />
            </div>
          </section>

          {/* STEP 2.5 */}
          <section id="step2-5" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="s2-5h" title={t('phase5.step2_5.title')} color="#29B5E8" />
              <CopyableCode code={`-- Show current context
SELECT
    CURRENT_WAREHOUSE() AS WAREHOUSE,
    CURRENT_DATABASE()  AS DATABASE,
    CURRENT_SCHEMA()    AS SCHEMA,
    CURRENT_ROLE()      AS ROLE,
    CURRENT_USER()      AS USER;`} />
              <p style={styles.bodyText}><strong>{t('phase5.step2_5.resultLabel')}</strong></p>
              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/images/step-2-5.png" alt="Snowflake query result" style={styles.screenshot} />
                <p style={styles.imageCaption}>{t('phase5.step2_5.imgCaption')}</p>
              </div>
              <CopyableCode code={`-- Verify created objects
SHOW WAREHOUSES LIKE 'movies_wh';
SHOW DATABASES LIKE 'movies_db';
SHOW SCHEMAS IN DATABASE movies_db;`} />
            </div>
          </section>

          {/* STEP 2.6 */}
          <section id="step2-6" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="s2-6h" title={t('phase5.step2_6.title')} color="#29B5E8" />
              <InfoBox color="#9B59B6">
                <p style={styles.infoText}>{t('phase5.step2_6.desc')}</p>
              </InfoBox>
              <ol style={styles.orderedList}>
                <li style={styles.listItem}>
                  <strong>{t('phase5.step2_6.s1Label')}</strong>
                  <p style={styles.noteText}>{t('phase5.step2_6.s1Note')}</p>
                  <CopyableCode code={`-- =====================================================
-- SECTION 4: Create Storage Integration
-- =====================================================
CREATE STORAGE INTEGRATION IF NOT EXISTS s3_integration
    TYPE = EXTERNAL_STAGE
    STORAGE_PROVIDER = 'S3'
    ENABLED = TRUE
    STORAGE_AWS_ROLE_ARN = 'arn:aws:iam::<ACCOUNT_ID>:role/movies-pipeline-data-22-role'
    STORAGE_ALLOWED_LOCATIONS = ('s3://movies-pipeline-data-22/raw/')
    COMMENT = 'S3 Integration for Movies Data';`} />
                </li>
                <li style={styles.listItem}>
                  <strong>{t('phase5.step2_6.s2Label')}</strong>
                  <CopyableCode code="DESC STORAGE INTEGRATION s3_integration;" />
                </li>
                <li style={styles.listItem}>
                  <strong>{t('phase5.step2_6.s3Label')}</strong>
                  <p style={styles.bodyText}>{t('phase5.step2_6.s3Desc')}</p>
                  <ResultBlock>{`STORAGE_AWS_IAM_USER_ARN | arn:aws:iam::123456789012:user/abc...\nSTORAGE_AWS_EXTERNAL_ID  | ABC123_SFCRole=1_xxxx...`}</ResultBlock>
                  <p style={styles.bodyText}>{t('phase5.step2_6.s3Note')}</p>
                </li>
              </ol>
            </div>
          </section>

          {/* STEP 2.7 */}
          <section id="step2-7" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="s2-7h" title={t('phase5.step2_7.title')} color="#29B5E8" />
              <ul style={styles.bulletList}>
                <li style={styles.listItem}>{t('phase5.step2_7.item1')}</li>
                <li style={styles.listItem}>{t('phase5.step2_7.item2')}</li>
                <li style={styles.listItem}>{t('phase5.step2_7.item3')}</li>
              </ul>
              <CopyableCode code={`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "<STORAGE_AWS_IAM_USER_ARN>"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "<STORAGE_AWS_EXTERNAL_ID>"
        }
      }
    }
  ]
}`} />
              <ul style={styles.bulletList}>
                <li style={styles.listItem}>{t('phase5.step2_7.item4')}</li>
              </ul>
            </div>
          </section>

          {/* STEP 2.8 */}
          <section id="step2-8" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="s2-8h" title={t('phase5.step2_8.title')} color="#29B5E8" />
              <InfoBox color="#1ABC9C">
                <p style={styles.infoText}>{t('phase5.step2_8.stageDesc')}</p>
                <ul style={styles.bulletList}>
                  <li style={styles.listItem}>{t('phase5.step2_8.item1')}</li>
                  <li style={styles.listItem}>{t('phase5.step2_8.item2')}</li>
                </ul>
                <p style={styles.infoText}>{t('phase5.step2_8.stageSummary')}</p>
              </InfoBox>
              <CopyableCode code={`-- Create External Stage
CREATE STAGE IF NOT EXISTS movies_s3_stage
    STORAGE_INTEGRATION = s3_integration
    URL = 's3://movies-pipeline-data-22/raw/'
    FILE_FORMAT = csv_format
    COMMENT = 'Stage pointing to S3 raw folder';

SHOW STAGES;
LIST @movies_s3_stage;`} />
              <p style={styles.bodyText}><strong>{t('phase5.step2_8.resultLabel')}</strong></p>
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead><tr><th style={styles.th}>name</th><th style={styles.th}>size</th></tr></thead>
                  <tbody><tr><td style={styles.td}>raw/top_100_movies_full_best_effort.csv</td><td style={styles.td}>13406</td></tr></tbody>
                </table>
              </div>
              <div style={styles.successBox}>{t('phase5.step2_8.successMsg')}</div>
            </div>
          </section>

          {/* STEP 2.9 */}
          <section id="step2-9" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="s2-9h" title={t('phase5.step2_9.title')} color="#29B5E8" />
              <InfoBox color="#E67E22">
                <p style={styles.infoText}>{t('phase5.step2_9.ffDesc')}</p>
              </InfoBox>
              <CopyableCode code={`-- ⚠️ CRITICAL: Re-confirm context before creating objects
USE DATABASE movies_db;
USE SCHEMA raw;

-- Create File Format
CREATE FILE FORMAT IF NOT EXISTS csv_format
    TYPE = 'CSV'
    FIELD_DELIMITER = ','
    SKIP_HEADER = 1
    FIELD_OPTIONALLY_ENCLOSED_BY = '"'
    TRIM_SPACE = TRUE
    ERROR_ON_COLUMN_COUNT_MISMATCH = FALSE
    COMMENT = 'CSV format for movies data';`} />
              <p style={styles.bodyText}><strong>{t('phase5.step2_9.codeTitle')}</strong></p>
              <ul style={styles.bulletList}>
                {[1,2,3,4,5,6].map(i => (
                  <li key={i} style={styles.listItem}>{t(`phase5.step2_9.code${i}`)}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* STEP 2.10 */}
          <section id="step2-10" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="s2-10h" title={t('phase5.step2_10.title')} color="#29B5E8" />
              <p style={styles.bodyText}>{t('phase5.step2_10.desc')}</p>
              <CopyableCode code={`USE DATABASE movies_db;
USE SCHEMA raw;

CREATE TABLE IF NOT EXISTS movies_raw (
    rank                INTEGER,
    title               VARCHAR(500),
    year                INTEGER,
    genres              VARCHAR(500),
    director            VARCHAR(500),
    main_actors         VARCHAR(1000),
    country             VARCHAR(200),
    imdb_rating         FLOAT,
    rotten_tomatoes_pct FLOAT,
    runtime_mins        FLOAT,
    language            VARCHAR(200),
    oscars_won          INTEGER,
    box_office_millions FLOAT,
    metacritic_score    FLOAT,
    loaded_at           TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP()
)
COMMENT = 'Raw movies data from S3';

DESC TABLE movies_raw;`} />
            </div>
          </section>

          {/* STEP 2.11 */}
          <section id="step2-11" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="s2-11h" title={t('phase5.step2_11.title')} color="#29B5E8" />
              <ol style={styles.orderedList}>
                <li style={styles.listItem}>{t('phase5.step2_11.item1')}</li>
                <li style={styles.listItem}>
                  {t('phase5.step2_11.item2')}
                  <CopyableCode code={`# AWS Credentials
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_REGION=us-east-1
S3_BUCKET_NAME=movies-pipeline-data-22

# Snowflake Credentials
SNOWFLAKE_ACCOUNT=your_account_id
SNOWFLAKE_USER=your_username
SNOWFLAKE_PASSWORD=your_password
SNOWFLAKE_DATABASE=movies_db
SNOWFLAKE_WAREHOUSE=movies_wh
SNOWFLAKE_SCHEMA=RAW
SNOWFLAKE_ROLE=ACCOUNTADMIN`} />
                </li>
              </ol>
            </div>
          </section>

          {/* SUMMARY */}
          <section id="summary" style={styles.section}>
            <div style={{ ...styles.contentCard, background: 'linear-gradient(135deg, #F39C12 0%, #E67E22 50%, #D35400 100%)', color: 'white' }}>
              <h2 style={{ ...styles.sectionHeading, color: 'white', marginBottom: '8px' }}>
                ✅ {t('phase5.summary.title')}
              </h2>
              <p style={{ ...styles.bodyText, color: 'rgba(255,255,255,0.9)', marginBottom: '24px' }}>
                {t('phase5.summary.subtitle')}
              </p>
              <div style={styles.summaryGrid}>
                {[
                  { icon: '❄️', ti: 'item1Title', di: 'item1Desc' },
                  { icon: '⚡', ti: 'item2Title', di: 'item2Desc' },
                  { icon: '🗄️', ti: 'item3Title', di: 'item3Desc' },
                  { icon: '📂', ti: 'item4Title', di: 'item4Desc' },
                  { icon: '🔗', ti: 'item5Title', di: 'item5Desc' },
                  { icon: '🎭', ti: 'item6Title', di: 'item6Desc' },
                  { icon: '📄', ti: 'item7Title', di: 'item7Desc' },
                  { icon: '📊', ti: 'item8Title', di: 'item8Desc' }
                ].map((item, i) => (
                  <div key={i} style={styles.summaryItem}>
                    <span style={styles.summaryIcon}>{item.icon}</span>
                    <div>
                      <div style={styles.summaryItemTitle}>{t(`phase5.summary.${item.ti}`)}</div>
                      <div style={styles.summaryItemDesc}>{t(`phase5.summary.${item.di}`)}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={styles.nextBox}>
                <h3 style={styles.nextTitle}>{t('phase5.summary.nextTitle')}</h3>
                <p style={styles.nextDesc}>{t('phase5.summary.nextDesc')}</p>
              </div>
            </div>
          </section>

          {/* NAV BUTTONS */}
          <div style={styles.section}>
            <div style={styles.navButtons}>
              <button onClick={() => navigate('/phase/4')} style={styles.navBtn}>{t('phase5.navBtn.prev')}</button>
              <button onClick={() => navigate('/phase/6')} style={{ ...styles.navBtn, ...styles.navBtnNext }}>{t('phase5.navBtn.next')}</button>
            </div>
          </div>

          <PhaseNavigator currentPhase={5} totalPhases={15} />
        </main>
      </div>

      {showScrollTop && (
        <button onClick={scrollToTop} style={styles.scrollTopBtn} title="Scroll to top">↑</button>
      )}
    </div>
  );
};

/* ── Styles ── */
const styles = {
  container: { maxWidth: '100%', margin: '0 auto', backgroundColor: '#f8f9fa' },
  header: { background: 'linear-gradient(135deg, #F39C12 0%, #E67E22 60%, #D35400 100%)', padding: '60px 20px', color: 'white' },
  headerContent: { maxWidth: '1400px', margin: '0 auto' },
  backButton: { backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', marginBottom: '20px', backdropFilter: 'blur(10px)' },
  phaseNumber: { textAlign: 'center' },
  phaseLabel: { fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.9 },
  phaseTitle: { fontSize: '3rem', fontWeight: '700', margin: '10px 0', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' },
  phaseSubtitle: { fontSize: '1.2rem', opacity: 0.9, margin: '0 auto 16px', maxWidth: '600px' },
  headerBadges: { display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' },
  badge: { backgroundColor: 'rgba(255,255,255,0.2)', padding: '6px 16px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '600', backdropFilter: 'blur(10px)' },
  pageLayout: { display: 'flex', alignItems: 'flex-start', maxWidth: '1400px', margin: '0 auto', padding: '40px 20px', gap: '30px' },
  sidebar: { width: '260px', flexShrink: 0, position: 'sticky', top: '20px', maxHeight: 'calc(100vh - 40px)', overflowY: 'auto' },
  sidebarCard: { backgroundColor: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
  sidebarTitle: { fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#F39C12', marginBottom: '16px', borderBottom: '2px solid #F39C12', paddingBottom: '8px' },
  navItem: { display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', padding: '8px 12px', border: 'none', borderRadius: '8px', cursor: 'pointer', backgroundColor: 'transparent', color: '#555', transition: 'all 0.2s ease', marginBottom: '2px', lineHeight: '1.4' },
  navItemActive: { backgroundColor: '#FEF3E2', color: '#E67E22', fontWeight: '600' },
  mainContent: { flex: 1, minWidth: 0 },
  section: { marginBottom: '8px' },
  contentCard: { backgroundColor: 'white', borderRadius: '16px', padding: '36px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', textAlign: 'left' },
  stepHeader: { borderRadius: '16px', padding: '28px 36px', color: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' },
  stepHeaderTitle: { fontSize: '1.8rem', fontWeight: '700', margin: '0 0 8px 0' },
  stepHeaderDesc: { fontSize: '1rem', opacity: 0.9, margin: 0 },
  sectionHeading: { fontSize: '1.6rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', textAlign: 'left' },
  sectionBadge: { width: '40px', height: '40px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 },
  subHeading: { fontSize: '1.25rem', fontWeight: '700', borderLeft: '4px solid', paddingLeft: '14px', margin: '0 0 20px 0', color: '#1a1a2e', textAlign: 'left' },
  subSubHeading: { fontSize: '1.05rem', fontWeight: '700', color: '#333', margin: '20px 0 10px 0', textAlign: 'left' },
  bodyText: { fontSize: '1rem', color: '#444', lineHeight: '1.9', marginBottom: '12px', textAlign: 'left', wordBreak: 'keep-all', overflowWrap: 'break-word' },
  noteText: { fontSize: '0.9rem', color: '#777', lineHeight: '1.7', margin: '4px 0 10px 0', textAlign: 'left', fontStyle: 'italic' },
  inlineCode: { backgroundColor: '#f0f0f0', padding: '2px 6px', borderRadius: '4px', fontSize: '0.88em', fontFamily: "'Courier New', monospace", color: '#e74c3c' },
  orderedList: { paddingLeft: '24px', margin: '0 0 14px 0', display: 'flex', flexDirection: 'column', gap: '10px' },
  bulletList: { paddingLeft: '20px', margin: '8px 0 10px 0', display: 'flex', flexDirection: 'column', gap: '6px', listStyleType: 'disc' },
  listItem: { fontSize: '0.97rem', color: '#444', lineHeight: '1.8', textAlign: 'left', wordBreak: 'keep-all', overflowWrap: 'break-word' },
  infoBox: { borderLeft: '4px solid', borderRadius: '8px', padding: '14px 18px', marginBottom: '16px' },
  infoText: { fontSize: '0.95rem', color: '#333', lineHeight: '1.8', margin: 0, textAlign: 'left', wordBreak: 'keep-all' },
  warningBox: { backgroundColor: '#fff8e6', borderLeft: '4px solid #F39C12', borderRadius: '8px', padding: '12px 16px', marginBottom: '14px' },
  warningText: { fontSize: '0.95rem', fontWeight: '600', color: '#8a4b00', margin: 0, lineHeight: '1.7' },
  resultBlock: { backgroundColor: '#1a1a2e', borderRadius: '8px', padding: '14px 18px', marginBottom: '12px', overflowX: 'auto' },
  resultText: { fontSize: '0.88rem', fontFamily: "'Courier New', monospace", color: '#4ecca3', margin: 0, lineHeight: '1.7', whiteSpace: 'pre', textAlign: 'left' },
  imageWrapper: { margin: '16px 0', textAlign: 'left' },
  screenshot: { maxWidth: '100%', borderRadius: '10px', border: '1px solid #e0e0e0', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  imageCaption: { fontSize: '0.85rem', color: '#888', marginTop: '8px', textAlign: 'center', fontStyle: 'italic' },
  tableWrapper: { overflowX: 'auto', marginBottom: '12px' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' },
  th: { backgroundColor: '#f4f4f5', padding: '10px 16px', textAlign: 'left', fontWeight: '700', color: '#333', borderBottom: '2px solid #ddd' },
  td: { padding: '10px 16px', borderBottom: '1px solid #eee', color: '#444', fontFamily: "'Courier New', monospace", fontSize: '0.9rem' },
  goalGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginTop: '20px' },
  goalCard: { backgroundColor: '#fafafa', border: '2px solid', borderRadius: '12px', padding: '20px', textAlign: 'left' },
  goalIcon: { fontSize: '2rem', marginBottom: '10px' },
  goalTitle: { fontSize: '1.05rem', fontWeight: '700', color: '#1a1a2e', marginBottom: '12px' },
  goalList: { paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px', listStyleType: 'disc', color: '#555', fontSize: '0.9rem', lineHeight: '1.7' },
  completeBox: { backgroundColor: '#e8f8f0', borderRadius: '12px', padding: '20px 24px', marginTop: '24px', border: '2px solid #2ECC71' },
  completeTitle: { fontSize: '1.3rem', fontWeight: '700', color: '#1a5c30', marginBottom: '6px' },
  completeSubtitle: { fontSize: '0.95rem', color: '#2d6a4f', marginBottom: '12px' },
  checkList: { display: 'flex', flexDirection: 'column', gap: '8px' },
  checkItem: { display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: '#1a5c30', lineHeight: '1.6' },
  successBox: { backgroundColor: '#e8f8f0', border: '2px solid #2ECC71', borderRadius: '8px', padding: '12px 18px', fontSize: '1rem', fontWeight: '700', color: '#1a5c30', marginTop: '8px' },
  summaryGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '24px' },
  summaryItem: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '10px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', backdropFilter: 'blur(10px)' },
  summaryIcon: { fontSize: '1.5rem', flexShrink: 0 },
  summaryItemTitle: { fontSize: '0.9rem', fontWeight: '700', color: 'white', lineHeight: '1.3' },
  summaryItemDesc: { fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', marginTop: '2px' },
  nextBox: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '18px 22px', backdropFilter: 'blur(10px)' },
  nextTitle: { fontSize: '1.1rem', fontWeight: '700', color: 'white', marginBottom: '8px' },
  nextDesc: { fontSize: '1rem', color: 'rgba(255,255,255,0.9)', margin: 0, lineHeight: '1.6' },
  navButtons: { display: 'flex', justifyContent: 'space-between', gap: '15px', flexWrap: 'wrap' },
  navBtn: { backgroundColor: 'white', color: '#1a1a2e', border: '2px solid #e0e0e0', padding: '12px 24px', borderRadius: '10px', cursor: 'pointer', fontSize: '1rem', fontWeight: '600', transition: 'all 0.3s ease' },
  navBtnNext: { backgroundColor: '#F39C12', color: 'white', border: '2px solid #F39C12' },
  scrollTopBtn: { position: 'fixed', bottom: '115px', right: '30px', backgroundColor: '#F39C12', color: 'white', border: 'none', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem', fontWeight: '700', boxShadow: '0 4px 15px rgba(243,156,18,0.4)', zIndex: 1000 }
};

export default Phase5Detail;
