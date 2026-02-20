import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
      <button
        onClick={handleCopy}
        style={{
          ...codeStyles.copyBtn,
          backgroundColor: copied ? '#c8f7c5' : '#e0e0e0',
          color: copied ? '#1a5c30' : '#444',
        }}
      >
        {copied ? '✓ Copied!' : 'Copy'}
      </button>
      <pre style={codeStyles.pre}>{code}</pre>
    </div>
  );
};
const codeStyles = {
  wrapper: { position: 'relative', backgroundColor: '#1e1e2e', borderRadius: '8px', padding: '14px 18px', marginBottom: '12px', overflowX: 'auto' },
  copyBtn: { position: 'absolute', top: '8px', right: '8px', border: 'none', borderRadius: '4px', padding: '3px 10px', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s ease', zIndex: 1 },
  pre: { fontSize: '0.85rem', fontFamily: "'Courier New', Courier, monospace", color: '#cdd6f4', margin: 0, lineHeight: '1.7', whiteSpace: 'pre', textAlign: 'left', paddingRight: '70px' },
};

/* ── Coloured info box ── */
const InfoBox = ({ color, children }) => (
  <div style={{ borderLeft: `4px solid ${color}`, backgroundColor: color + '15', borderRadius: '0 8px 8px 0', padding: '14px 18px', marginBottom: '16px', fontSize: '0.95rem', lineHeight: '1.8', color: '#333', textAlign: 'left' }}>
    {children}
  </div>
);

const COLOR = '#F1C40F';
const COLOR_DARK = '#F39C12';

/* ════════════════════════════════════════════════════════════════════════════
   Phase 14 Detail Page
════════════════════════════════════════════════════════════════════════════ */
const Phase14Detail = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
    { id: 'purpose', label: t('phase14.purpose.heading'), bold: true },
    { id: 'step1', label: t('phase14.step1.heading'), bold: true },
    { id: 'step2', label: t('phase14.step2.heading'), bold: true },
    { id: 'step3', label: t('phase14.step3.heading'), bold: true },
    { id: 'step4', label: t('phase14.step4.heading'), bold: true },
    { id: 'step5', label: t('phase14.step5.heading'), bold: true },
    { id: 'kpi', label: '  └ ' + t('phase14.kpi.heading'), bold: false },
    { id: 'visual1', label: '  └ ' + t('phase14.visual1.heading'), bold: false },
    { id: 'visual2', label: '  └ ' + t('phase14.visual2.heading'), bold: false },
    { id: 'visual3', label: '  └ ' + t('phase14.visual3.heading'), bold: false },
    { id: 'visual4', label: '  └ ' + t('phase14.visual4.heading'), bold: false },
    { id: 'visual5', label: '  └ ' + t('phase14.visual5.heading'), bold: false },
    { id: 'visual6', label: '  └ ' + t('phase14.visual6.heading'), bold: false },
    { id: 'visual7', label: '  └ ' + t('phase14.visual7.heading'), bold: false },
    { id: 'dashboards', label: t('phase14.dashboards.heading'), bold: true },
    { id: 'summary', label: t('phase14.summary.heading'), bold: true },
  ];

  const SNOWFLAKE_CONN_CODE = `Account: <YOUR_SNOWFLAKE_ACCOUNT>
Username: <YOUR_SNOWFLAKE_USERNAME>
Password: <YOUR_SNOWFLAKE_PASSWORD>
Warehouse: movies_wh
Database: movies_db
Schema: analytics_marts
Role: ACCOUNTADMIN`;

  const MEASURES_DAX = `Total Movies = COUNT(FACT_MOVIE_PERFORMANCE[MOVIE_ID])

Total Revenue = SUM(FACT_MOVIE_PERFORMANCE[BOX_OFFICE_MILLIONS])

Total Oscars = SUM(FACT_MOVIE_PERFORMANCE[OSCARS_WON])

Avg IMDb Rating = AVERAGE(FACT_MOVIE_PERFORMANCE[IMDB_RATING])`;

  return (
    <div style={styles.container}>

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <button onClick={() => navigate('/')} style={styles.backButton}>{t('phase14.backBtn')}</button>
          <div style={styles.phaseCenter}>
            <span style={styles.phaseLabel}>Phase 14</span>
            <h1 style={styles.phaseTitle}>{t('phase14.title')}</h1>
            <p style={styles.phaseSubtitle}>{t('phase14.subtitle')}</p>
            <div style={styles.headerBadges}>
              <span style={styles.badge}>📊 Power BI</span>
              <span style={styles.badge}>❄️ Snowflake</span>
              <span style={styles.badge}>📈 Data Visualization</span>
              <span style={styles.badge}>🎨 Dashboard</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── TWO-COLUMN LAYOUT ──────────────────────────────────────────── */}
      <div style={styles.pageLayout}>

        {/* ── SIDEBAR ────────────────────────────────────────────────── */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarCard}>
            <h3 style={styles.sidebarTitle}>{t('phase14.navTitle')}</h3>
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
                    fontWeight: sec.bold ? '700' : '400',
                  }}
                >
                  {sec.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Quick-info card */}
          <div style={{ ...styles.sidebarCard, marginTop: '16px' }}>
            <h3 style={styles.sidebarTitle}>{t('phase14.sidebar.quickInfo')}</h3>
            {[
              [t('phase14.sidebar.tool'), 'Power BI Desktop'],
              [t('phase14.sidebar.dataSource'), 'Snowflake'],
              [t('phase14.sidebar.schema'), 'analytics_marts'],
              [t('phase14.sidebar.tables'), '13 Tables'],
              [t('phase14.sidebar.dashboardPages'), '2 Pages'],
              [t('phase14.sidebar.visuals'), '7+ Visuals'],
            ].map(([label, val]) => (
              <div key={label} style={styles.infoRow}>
                <span style={styles.infoLabel}>{label}</span>
                <span style={styles.infoBadge}>{val}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* ── MAIN CONTENT ───────────────────────────────────────────── */}
        <main style={styles.mainContent}>

          {/* ── PURPOSE ─────────────────────────────────────────────── */}
          <section id="purpose" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: COLOR }}>🎯</span>
                {t('phase14.purpose.heading')}
              </h2>
              <p style={styles.bodyText}>
                {t('phase14.purpose.description')}
              </p>

              <div style={styles.imageWrapper}>
                <img src="/phase14/objective.svg" alt="Phase 14 Architecture" style={styles.diagram} />
              </div>

              <InfoBox color={COLOR}>
                <strong>{t('phase14.purpose.infoboxTitle')}</strong>
                <ul style={styles.bulletList}>
                  {t('phase14.purpose.coverage', { returnObjects: true }).map((item, idx) => (
                    <li key={idx} style={styles.listItem}>{item}</li>
                  ))}
                </ul>
              </InfoBox>
            </div>
          </section>

          {/* ── STEP 1: Install Power BI ───────────────────────── */}
          <section id="step1" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#27AE60' }}>1️⃣</span>
                {t('phase14.step1.heading')}
              </h2>
              <p style={styles.bodyText}>
                {t('phase14.step1.description')}
              </p>
              <InfoBox color="#27AE60">
                <strong>{t('phase14.step1.note')}</strong> {t('phase14.step1.noteText')}
              </InfoBox>
            </div>
          </section>

          {/* ── STEP 2: Connect to Snowflake ──────────────────────── */}
          <section id="step2" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#8E44AD' }}>2️⃣</span>
                {t('phase14.step2.heading')}
              </h2>

              <p style={styles.bodyText}><strong>{t('phase14.step2.goal')}</strong> {t('phase14.step2.goalText')}</p>

              <h3 style={styles.subHeading}>{t('phase14.step2.subsection1.title')}</h3>
              <p style={styles.bodyText}>{t('phase14.step2.subsection1.description')}</p>
              <CopyableCode code={SNOWFLAKE_CONN_CODE} />

              <h3 style={styles.subHeading}>{t('phase14.step2.subsection2.title')}</h3>

              <p style={styles.bodyText}><strong>{t('phase14.step2.subsection2.step1Title')}</strong></p>
              <ul style={styles.bulletList}>
                {t('phase14.step2.subsection2.step1Items', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>

              <p style={styles.bodyText}><strong>{t('phase14.step2.subsection2.step2Title')}</strong></p>
              <p style={styles.bodyText}>{t('phase14.step2.subsection2.step2Description')}</p>
              <ul style={styles.bulletList}>
                {t('phase14.step2.subsection2.step2Items', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>

              <p style={styles.bodyText}><strong>{t('phase14.step2.subsection2.step3Title')}</strong></p>
              <p style={styles.bodyText}>{t('phase14.step2.subsection2.step3Description')}</p>
              <CopyableCode code={`Server: your_account.snowflakecomputing.com
Warehouse: movies_wh`} />
              <InfoBox color="#E67E22">
                <strong>{t('phase14.step2.subsection2.warningTitle')}</strong>
                <ul style={styles.bulletList}>
                  {t('phase14.step2.subsection2.warningItems', { returnObjects: true }).map((item, idx) => (
                    <li key={idx} style={styles.listItem}>{item}</li>
                  ))}
                </ul>
              </InfoBox>

              <p style={styles.bodyText}><strong>{t('phase14.step2.subsection2.step4Title')}</strong></p>
              <p style={styles.bodyText}>{t('phase14.step2.subsection2.step4Description')}</p>
              <ul style={styles.bulletList}>
                {t('phase14.step2.subsection2.step4Items', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>

              <p style={styles.bodyText}><strong>{t('phase14.step2.subsection2.step5Title')}</strong></p>
              <p style={styles.bodyText}>{t('phase14.step2.subsection2.step5Description')}</p>
              <CopyableCode code={`MOVIES_DB
 └─ ANALYTICS_MARTS
     └─ Tables`} />
              <p style={styles.bodyText}>{t('phase14.step2.subsection2.step5Info')}</p>
              <ul style={styles.bulletList}>
                {t('phase14.step2.subsection2.tables', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>

              <h3 style={styles.subHeading}>{t('phase14.step2.subsection3.title')}</h3>
              <ul style={styles.bulletList}>
                {t('phase14.step2.subsection3.items', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── STEP 3: Import Data ─────────────────────────────────── */}
          <section id="step3" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#E67E22' }}>3️⃣</span>
{t('phase14.step3.heading')}
              </h2>

              <p style={styles.bodyText}><strong>{t('phase14.step3.goal')}</strong> {t('phase14.step3.goalText')}</p>

              <h3 style={styles.subHeading}>{t('phase14.step3.subsection1.title')}</h3>
              <p style={styles.bodyText}>{t('phase14.step3.subsection1.description')}</p>
              <ul style={styles.bulletList}>
                {t('phase14.step3.subsection1.items', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>

              <p style={styles.bodyText}>{t('phase14.step3.subsection1.info')}</p>

              <h3 style={styles.subHeading}>{t('phase14.step3.subsection2.title')}</h3>
              <ul style={styles.bulletList}>
                {t('phase14.step3.subsection2.items', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>

              <h3 style={styles.subHeading}>{t('phase14.step3.subsection3.title')}</h3>
              <p style={styles.bodyText}>{t('phase14.step3.subsection3.description')}</p>
              <InfoBox color="#27AE60">
                <strong>{t('phase14.step3.subsection3.successTitle')}</strong> {t('phase14.step3.subsection3.successText')}
                <ul style={styles.bulletList}>
                  {t('phase14.step3.subsection3.successItems', { returnObjects: true }).map((item, idx) => (
                    <li key={idx} style={styles.listItem}>{item}</li>
                  ))}
                </ul>
              </InfoBox>
            </div>
          </section>

          {/* ── STEP 4: Data Model ─────────────────────────────────── */}
          <section id="step4" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: COLOR }}>4️⃣</span>
{t('phase14.step4.heading')}
              </h2>

              <h3 style={styles.subHeading}>{t('phase14.step4.subsection1.title')}</h3>
              <p style={styles.bodyText}>
                {t('phase14.step4.subsection1.description')}
              </p>
              <InfoBox color={COLOR}>
                <strong>{t('phase14.step4.subsection1.infoTitle')}</strong> {t('phase14.step4.subsection1.infoText')}
                <ul style={styles.bulletList}>
                  {t('phase14.step4.subsection1.infoItems', { returnObjects: true }).map((item, idx) => (
                    <li key={idx} style={styles.listItem}>{item}</li>
                  ))}
                </ul>
              </InfoBox>
            </div>
          </section>

          {/* ── STEP 5: Build Dashboards ───────────────────────────── */}
          <section id="step5" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#3498DB' }}>5️⃣</span>
{t('phase14.step5.heading')}
              </h2>

              <h3 style={styles.subHeading}>{t('phase14.step5.subsection1.title')}</h3>
              <p style={styles.bodyText}>{t('phase14.step5.subsection1.description')}</p>
              <ul style={styles.bulletList}>
                {t('phase14.step5.subsection1.items', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>
              <p style={styles.bodyText}>{t('phase14.step5.subsection1.canvasTitle')}</p>
              <CopyableCode code={`Type: Custom
Width: 1600 px
Height: 1200 px
อัตราส่วน: 4:3`} />

              <h3 style={styles.subHeading}>{t('phase14.step5.subsection2.title')}</h3>
              <p style={styles.bodyText}>{t('phase14.step5.subsection2.description')}</p>
              <ul style={styles.bulletList}>
                {t('phase14.step5.subsection2.steps', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>

              <p style={styles.bodyText}><strong>{t('phase14.step5.subsection2.daxTitle')}</strong></p>
              <CopyableCode code={MEASURES_DAX} />
            </div>
          </section>

          {/* ── KPI CARDS ───────────────────────────────── */}
          <section id="kpi" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#E74C3C' }}>📊</span>
{t('phase14.kpi.heading')}
              </h2>

              <p style={styles.bodyText}><strong>{t('phase14.kpi.goal')}</strong> {t('phase14.kpi.goalText')}</p>

              <ul style={styles.bulletList}>
                {t('phase14.kpi.steps', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>

              <div style={styles.imageWrapper}>
                <img src="/phase14/KPI-Cards.png" alt="KPI Cards" style={styles.screenshot} />
              </div>

              <h3 style={styles.subHeading}>{t('phase14.kpi.resultsTitle')}</h3>
              <InfoBox color="#E74C3C">
                <strong>{t('phase14.kpi.results.movies')}</strong> - {t('phase14.kpi.results.moviesDesc')}<br/>
                <strong>{t('phase14.kpi.results.revenue')}</strong> - {t('phase14.kpi.results.revenueDesc')}<br/>
                <strong>{t('phase14.kpi.results.oscars')}</strong> - {t('phase14.kpi.results.oscarsDesc')}<br/>
                <strong>{t('phase14.kpi.results.rating')}</strong> - {t('phase14.kpi.results.ratingDesc')}
              </InfoBox>
            </div>
          </section>

          {/* ── VISUAL 1: Top 10 Movies ───────────────────────────────── */}
          <section id="visual1" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#9B59B6' }}>1️⃣</span>
{t('phase14.visual1.heading')}
              </h2>

              <p style={styles.bodyText}><strong>{t('phase14.visual1.goal')}</strong> {t('phase14.visual1.goalText')}</p>

              <ul style={styles.bulletList}>
                {t('phase14.visual1.steps', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>

              <div style={styles.imageWrapper}>
                <img src="/phase14/Visual1.png" alt="Top 10 Movies by Revenue" style={styles.screenshot} />
              </div>

              <h3 style={styles.subHeading}>{t('phase14.visual1.resultsTitle')}</h3>
              <InfoBox color="#9B59B6">
                <strong>{t('phase14.visual1.topMoviesTitle')}</strong><br/>
                {t('phase14.visual1.topMovies', { returnObjects: true }).map((item, idx) => (
                  <span key={idx}>{item}<br/></span>
                ))}<br/>
                <strong>{t('phase14.visual1.observation')}</strong> {t('phase14.visual1.observationText')}
              </InfoBox>
            </div>
          </section>

          {/* ── VISUAL 2: Revenue by Decade ───────────────────────────── */}
          <section id="visual2" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#1ABC9C' }}>2️⃣</span>
{t('phase14.visual2.heading')}
              </h2>

              <p style={styles.bodyText}><strong>{t('phase14.visual2.goal')}</strong> {t('phase14.visual2.goalText')}</p>

              <ul style={styles.bulletList}>
                {t('phase14.visual2.steps', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>

              <div style={styles.imageWrapper}>
                <img src="/phase14/Visual2.png" alt="Revenue by Decade" style={styles.screenshot} />
              </div>

              <h3 style={styles.subHeading}>{t('phase14.visual2.resultsTitle')}</h3>
              <InfoBox color="#1ABC9C">
                <strong>{t('phase14.visual2.goldenEra')}</strong> {t('phase14.visual2.goldenEraText')}<br/>
                <strong>{t('phase14.visual2.growth')}</strong> {t('phase14.visual2.growthText')}<br/>
                <strong>{t('phase14.visual2.decline')}</strong> {t('phase14.visual2.declineText')}
              </InfoBox>
            </div>
          </section>

          {/* ── VISUAL 3: Movies by Genre ──────────────────────────────── */}
          <section id="visual3" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#F39C12' }}>3️⃣</span>
                {t('phase14.visual3.heading')}
              </h2>

              <p style={styles.bodyText}><strong>{t('phase14.visual3.goal')}</strong> {t('phase14.visual3.goalText')}</p>

              <ul style={styles.bulletList}>
                {t('phase14.visual3.steps', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>

              <div style={styles.imageWrapper}>
                <img src="/phase14/Visual3.png" alt="Movies by Genre" style={styles.screenshot} />
              </div>

              <h3 style={styles.subHeading}>{t('phase14.visual3.resultsTitle')}</h3>
              <InfoBox color="#F39C12">
                <strong>{t('phase14.visual3.drama')}</strong> {t('phase14.visual3.dramaText')}<br/>
                <strong>{t('phase14.visual3.middle')}</strong> {t('phase14.visual3.middleText')}<br/>
                <strong>{t('phase14.visual3.bottom')}</strong> {t('phase14.visual3.bottomText')}<br/>
                <strong>{t('phase14.visual3.note')}</strong> {t('phase14.visual3.noteText')}
              </InfoBox>
            </div>
          </section>

          {/* ── VISUAL 4: Global Production ────────────────────────────── */}
          <section id="visual4" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#E67E22' }}>4️⃣</span>
                {t('phase14.visual4.heading')}
              </h2>

              <p style={styles.bodyText}><strong>{t('phase14.visual4.goal')}</strong> {t('phase14.visual4.goalText')}</p>

              <ul style={styles.bulletList}>
                {t('phase14.visual4.steps', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>

              <div style={styles.imageWrapper}>
                <img src="/phase14/Visual4.png" alt="Global Movie Production" style={styles.screenshot} />
              </div>

              <h3 style={styles.subHeading}>{t('phase14.visual4.resultsTitle')}</h3>
              <InfoBox color="#E67E22">
                <strong>{t('phase14.visual4.us')}</strong> {t('phase14.visual4.usText')}<br/>
                <strong>{t('phase14.visual4.uk')}</strong> {t('phase14.visual4.ukText')}<br/>
                <strong>{t('phase14.visual4.others')}</strong> {t('phase14.visual4.othersText')}<br/>
                <strong>{t('phase14.visual4.takeaway')}</strong> {t('phase14.visual4.takeawayText')}
              </InfoBox>
            </div>
          </section>

          {/* ── VISUAL 5: Rating Distribution ──────────────────────────── */}
          <section id="visual5" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#2980B9' }}>5️⃣</span>
                {t('phase14.visual5.heading')}
              </h2>

              <p style={styles.bodyText}><strong>{t('phase14.visual5.goal')}</strong> {t('phase14.visual5.goalText')}</p>

              <ul style={styles.bulletList}>
                {t('phase14.visual5.steps', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>

              <div style={styles.imageWrapper}>
                <img src="/phase14/Visual5.png" alt="Rating Distribution" style={styles.screenshot} />
              </div>

              <h3 style={styles.subHeading}>{t('phase14.visual5.resultsTitle')}</h3>
              <InfoBox color="#2980B9">
                <strong>{t('phase14.visual5.great')}</strong> {t('phase14.visual5.greatText')}<br/>
                <strong>{t('phase14.visual5.excellent')}</strong> {t('phase14.visual5.excellentText')}<br/>
                <strong>{t('phase14.visual5.masterpiece')}</strong> {t('phase14.visual5.masterpieceText')}<br/>
                <strong>{t('phase14.visual5.good')}</strong> {t('phase14.visual5.goodText')}
              </InfoBox>
            </div>
          </section>

          {/* ── VISUAL 6: Oscar Winners ────────────────────────────────── */}
          <section id="visual6" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#8E44AD' }}>6️⃣</span>
                {t('phase14.visual6.heading')}
              </h2>

              <p style={styles.bodyText}><strong>{t('phase14.visual6.goal')}</strong> {t('phase14.visual6.goalText')}</p>

              <ul style={styles.bulletList}>
                {t('phase14.visual6.steps', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>

              <div style={styles.imageWrapper}>
                <img src="/phase14/Visual6.png" alt="Top 10 Oscar Winners" style={styles.screenshot} />
              </div>

              <h3 style={styles.subHeading}>{t('phase14.visual6.resultsTitle')}</h3>
              <InfoBox color="#8E44AD">
                <strong>{t('phase14.visual6.rank1')}</strong> {t('phase14.visual6.rank1Text')}<br/>
                <strong>{t('phase14.visual6.rank2')}</strong> {t('phase14.visual6.rank2Text')}<br/>
                <strong>{t('phase14.visual6.ranks36')}</strong> {t('phase14.visual6.ranks36Text')}<br/>
                <strong>{t('phase14.visual6.note')}</strong> {t('phase14.visual6.noteText')}
              </InfoBox>
            </div>
          </section>

          {/* ── VISUAL 7: Quality vs Commercial ─────────────────────────── */}
          <section id="visual7" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#E74C3C' }}>7️⃣</span>
                {t('phase14.visual7.heading')}
              </h2>

              <p style={styles.bodyText}><strong>{t('phase14.visual7.goal')}</strong> {t('phase14.visual7.goalText')}</p>

              <ul style={styles.bulletList}>
                {t('phase14.visual7.steps', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>

              <div style={styles.imageWrapper}>
                <img src="/phase14/Visual7.png" alt="Quality vs Commercial Success" style={styles.screenshot} />
              </div>

              <h3 style={styles.subHeading}>{t('phase14.visual7.resultsTitle')}</h3>
              <InfoBox color="#E74C3C">
                <strong>{t('phase14.visual7.trendline')}</strong> {t('phase14.visual7.trendlineText')}<br/><br/>
                <strong>{t('phase14.visual7.exceptionsTitle')}</strong><br/>
                {t('phase14.visual7.exceptions', { returnObjects: true }).map((item, idx) => (
                  <span key={idx}>• {item}<br/></span>
                ))}<br/>
                <strong>{t('phase14.visual7.conclusion')}</strong> {t('phase14.visual7.conclusionText')}
              </InfoBox>
            </div>
          </section>

          {/* ── DASHBOARD PAGES ────────────────────────────────────────── */}
          <section id="dashboards" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: COLOR }}>📊</span>
                {t('phase14.dashboards.heading')}
              </h2>

              <p style={styles.bodyText}>{t('phase14.dashboards.description')}</p>

              <h3 style={styles.subHeading}>{t('phase14.dashboards.page1Title')}</h3>
              <div style={styles.imageWrapper}>
                <img src="/phase14/PAGE1.png" alt="Dashboard Page 1" style={styles.screenshot} />
              </div>
              <InfoBox color="#27AE60">
                <strong>{t('phase14.dashboards.page1InfoTitle')}</strong>
                <ul style={styles.bulletList}>
                  {t('phase14.dashboards.page1Components', { returnObjects: true }).map((item, idx) => (
                    <li key={idx} style={styles.listItem}>{item}</li>
                  ))}
                </ul>
              </InfoBox>

              <h3 style={styles.subHeading}>{t('phase14.dashboards.page2Title')}</h3>
              <div style={styles.imageWrapper}>
                <img src="/phase14/PAGE2.png" alt="Dashboard Page 2" style={styles.screenshot} />
              </div>
              <InfoBox color="#3498DB">
                <strong>{t('phase14.dashboards.page2InfoTitle')}</strong>
                <ul style={styles.bulletList}>
                  {t('phase14.dashboards.page2Components', { returnObjects: true }).map((item, idx) => (
                    <li key={idx} style={styles.listItem}>{item}</li>
                  ))}
                </ul>
              </InfoBox>
            </div>
          </section>

          {/* ── SUMMARY ──────────────────────────────────────────────── */}
          <section id="summary" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: COLOR }}>🎉</span>
                {t('phase14.summary.heading')}
              </h2>

              <InfoBox color={COLOR}>
                <strong>{t('phase14.summary.completeTitle')}</strong>
                <br />
                {t('phase14.summary.completeText')}
              </InfoBox>

              <p style={styles.bodyText}><strong>{t('phase14.summary.accomplishedTitle')}</strong></p>
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr style={{ backgroundColor: COLOR + '20' }}>
                      <th style={{ ...styles.th, color: COLOR_DARK }}>{t('phase14.summary.tableHeaders.step')}</th>
                      <th style={{ ...styles.th, color: COLOR_DARK }}>{t('phase14.summary.tableHeaders.details')}</th>
                      <th style={{ ...styles.th, color: COLOR_DARK }}>{t('phase14.summary.tableHeaders.result')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t('phase14.summary.steps', { returnObjects: true }).map((r, i) => (
                      <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#fef9e7' : '#fff' }}>
                        <td style={{ ...styles.td, fontWeight: '700', color: COLOR_DARK }}>{r.step}</td>
                        <td style={styles.td}>{r.details}</td>
                        <td style={{ ...styles.td, fontSize: '0.85rem' }}>{r.result}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <InfoBox color="#27AE60">
                <strong>{t('phase14.summary.pipelineCompleteTitle')}</strong>
                <br />
                {t('phase14.summary.pipelineCompleteText')}
              </InfoBox>

              <h3 style={styles.subHeading}>{t('phase14.summary.insightsTitle')}</h3>
              <ul style={styles.bulletList}>
                {t('phase14.summary.insights', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>

              <h3 style={styles.subHeading}>{t('phase14.summary.learnedTitle')}</h3>
              <InfoBox color="#3498DB">
                <strong>{t('phase14.summary.learnedSubtitle')}</strong>
                <ul style={styles.bulletList}>
                  {t('phase14.summary.learned', { returnObjects: true }).map((item, idx) => (
                    <li key={idx} style={styles.listItem}>{item}</li>
                  ))}
                </ul>
              </InfoBox>

              <h3 style={styles.subHeading}>{t('phase14.summary.nextSteps')}</h3>
              <p style={styles.bodyText}>{t('phase14.summary.nextStepsDescription')}</p>
            </div>
          </section>

          <PhaseNavigator currentPhase={14} totalPhases={15} />
        </main>
      </div>

      {showScrollTop && (
        <button onClick={scrollToTop} style={styles.scrollTopBtn} title="Back to top">↑</button>
      )}
    </div>
  );
};

/* ── STYLES ───────────────────────────────────────────────────────────────── */
const styles = {
  container:    { maxWidth: '100%', margin: '0 auto', backgroundColor: '#f8f9fa' },
  header:       { background: 'linear-gradient(135deg, #F39C12 0%, #F1C40F 60%, #F9E79F 100%)', padding: '60px 20px', color: 'white' },
  headerContent:{ maxWidth: '1400px', margin: '0 auto' },
  backButton:   { backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', marginBottom: '20px', backdropFilter: 'blur(10px)' },
  phaseCenter:  { textAlign: 'center' },
  phaseLabel:   { fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.9 },
  phaseTitle:   { fontSize: '3rem', fontWeight: '700', margin: '10px 0', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' },
  phaseSubtitle:{ fontSize: '1.2rem', opacity: 0.9, margin: '0 auto 16px', maxWidth: '600px' },
  headerBadges: { display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' },
  badge:        { backgroundColor: 'rgba(255,255,255,0.2)', padding: '6px 16px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '600', backdropFilter: 'blur(10px)' },

  pageLayout:   { display: 'flex', alignItems: 'flex-start', maxWidth: '1400px', margin: '0 auto', padding: '40px 20px', gap: '30px' },
  sidebar:      { width: '260px', flexShrink: 0, position: 'sticky', top: '20px', maxHeight: 'calc(100vh - 40px)', overflowY: 'auto' },
  sidebarCard:  { backgroundColor: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
  sidebarTitle: { fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: COLOR_DARK, marginBottom: '16px', borderBottom: `2px solid ${COLOR}`, paddingBottom: '8px', margin: '0 0 16px' },
  navItem:      { display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', padding: '8px 12px', border: 'none', borderRadius: '8px', cursor: 'pointer', backgroundColor: 'transparent', color: '#555', transition: 'all 0.2s ease', marginBottom: '2px', lineHeight: '1.4' },
  navItemActive:{ backgroundColor: '#fef9e7', color: COLOR_DARK, fontWeight: '600' },
  infoRow:      { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #f0f0f0' },
  infoLabel:    { fontSize: '0.78rem', color: '#666' },
  infoBadge:    { fontSize: '0.75rem', backgroundColor: COLOR + '25', color: COLOR_DARK, padding: '2px 8px', borderRadius: '10px', fontWeight: '600' },

  mainContent:  { flex: 1, minWidth: 0 },
  section:      { marginBottom: '8px' },
  contentCard:  { backgroundColor: 'white', borderRadius: '16px', padding: '36px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', textAlign: 'left' },
  sectionHeading:{ fontSize: '1.6rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', textAlign: 'left', color: '#1a1a2e' },
  sectionBadge: { width: '40px', height: '40px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 },
  subHeading:   { fontSize: '1.2rem', fontWeight: '600', color: '#2c3e50', marginTop: '24px', marginBottom: '12px', textAlign: 'left' },
  bodyText:     { fontSize: '1rem', color: '#444', lineHeight: '1.9', marginBottom: '12px', textAlign: 'left', wordBreak: 'keep-all', overflowWrap: 'break-word' },
  bulletList:   { paddingLeft: '20px', margin: '8px 0 16px', display: 'flex', flexDirection: 'column', gap: '8px', listStyleType: 'disc' },
  listItem:     { fontSize: '0.97rem', color: '#444', lineHeight: '1.8', textAlign: 'left', wordBreak: 'keep-all', overflowWrap: 'break-word' },

  tableWrapper: { overflowX: 'auto', marginBottom: '16px', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' },
  table:        { width: '100%', borderCollapse: 'collapse', fontSize: '0.87rem', backgroundColor: '#fff' },
  th:           { padding: '10px 14px', textAlign: 'left', fontWeight: '700', borderBottom: '2px solid #e0e0e0', whiteSpace: 'nowrap' },
  td:           { padding: '9px 14px', color: '#444', borderBottom: '1px solid #f0f0f0', verticalAlign: 'top' },

  imageWrapper: { margin: '16px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  screenshot:   { width: '100%', maxWidth: '500px', height: 'auto', borderRadius: '10px', border: '1px solid #e0e0e0', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', objectFit: 'contain' },
  diagram:      { width: '100%', maxWidth: '500px', height: 'auto', borderRadius: '10px', border: '1px solid #e0e0e0', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', backgroundColor: 'white', padding: '20px', objectFit: 'contain' },

  scrollTopBtn: { position: 'fixed', bottom: '115px', right: '30px', backgroundColor: COLOR, color: 'white', border: 'none', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem', fontWeight: '700', boxShadow: `0 4px 15px ${COLOR}66`, zIndex: 1000 },
};

export default Phase14Detail;
