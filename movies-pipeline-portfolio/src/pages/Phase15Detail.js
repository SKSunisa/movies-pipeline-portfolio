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

const COLOR = '#E74C3C';
const COLOR_DARK = '#C0392B';

/* ════════════════════════════════════════════════════════════════════════════
   Phase 15 Detail Page
════════════════════════════════════════════════════════════════════════════ */
const Phase15Detail = () => {
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
    { id: 'purpose', label: t('phase15.purpose.heading'), bold: true },
    { id: 'step1', label: t('phase15.step1.heading'), bold: true },
    { id: 'step2', label: t('phase15.step2.heading'), bold: true },
    { id: 'step3', label: t('phase15.step3.heading'), bold: true },
    { id: 'step4', label: t('phase15.step4.heading'), bold: true },
    { id: 'step5', label: t('phase15.step5.heading'), bold: true },
    { id: 'step6', label: t('phase15.step6.heading'), bold: true },
    { id: 'step7', label: t('phase15.step7.heading'), bold: true },
    { id: 'step8', label: t('phase15.step8.heading'), bold: true },
    { id: 'step9', label: t('phase15.step9.heading'), bold: true },
    { id: 'step10', label: t('phase15.step10.heading'), bold: true },
    { id: 'step11', label: t('phase15.step11.heading'), bold: true },
    { id: 'step12', label: t('phase15.step12.heading'), bold: true },
    { id: 'step13', label: t('phase15.step13.heading'), bold: true },
    { id: 'step14', label: t('phase15.step14.heading'), bold: true },
    { id: 'step15', label: t('phase15.step15.heading'), bold: true },
    { id: 'step16', label: t('phase15.step16.heading'), bold: true },
    { id: 'summary', label: t('phase15.summary.heading'), bold: true },
  ];

  const PROFILES_YML_CODE = `movies_dbt:
  target: prod
  outputs:
    dev:
      type: snowflake
      account: "{{ env_var('SNOWFLAKE_ACCOUNT') }}"
      user: "{{ env_var('SNOWFLAKE_USER') }}"
      password: "{{ env_var('SNOWFLAKE_PASSWORD') }}"
      role: "{{ env_var('SNOWFLAKE_ROLE') }}"
      warehouse: "{{ env_var('SNOWFLAKE_WAREHOUSE') }}"
      database: "{{ env_var('SNOWFLAKE_DATABASE') }}"
      schema: staging
      threads: 10
      client_session_keep_alive: False

    prod:
      type: snowflake
      account: "{{ env_var('SNOWFLAKE_ACCOUNT') }}"
      user: "{{ env_var('SNOWFLAKE_USER') }}"
      password: "{{ env_var('SNOWFLAKE_PASSWORD') }}"
      role: "{{ env_var('SNOWFLAKE_ROLE') }}"
      warehouse: "{{ env_var('SNOWFLAKE_WAREHOUSE') }}"
      database: "{{ env_var('SNOWFLAKE_DATABASE') }}"
      schema: analytics
      threads: 10
      client_session_keep_alive: False`;

  const ENV_FILE_CODE = `# ====================================
# AIRFLOW SETTINGS
# ====================================
AIRFLOW_UID=50000
AIRFLOW_GID=0

# AWS Credentials
AWS_ACCESS_KEY_ID=<YOUR_AWS_ACCESS_KEY>
AWS_SECRET_ACCESS_KEY=<YOUR_AWS_SECRET_KEY>
AWS_REGION=us-east-1
AWS_DEFAULT_REGION=us-east-1
S3_BUCKET_NAME=<YOUR_S3_BUCKET_NAME>

# Snowflake Credentials
SNOWFLAKE_ACCOUNT=<YOUR_ACCOUNT>
SNOWFLAKE_USER=<YOUR_USER>
SNOWFLAKE_PASSWORD=<YOUR_PASSWORD>
SNOWFLAKE_DATABASE=movies_db
SNOWFLAKE_WAREHOUSE=movies_wh
SNOWFLAKE_SCHEMA=RAW
SNOWFLAKE_ROLE=ACCOUNTADMIN`;

  const SNOWFLAKE_EXTRA_JSON = `{
  "account": "<SNOWFLAKE_ACCOUNT>",
  "warehouse": "<SNOWFLAKE_WAREHOUSE>",
  "database": "<SNOWFLAKE_DATABASE>",
  "role": "ACCOUNTADMIN"
}`;

  return (
    <div style={styles.container}>

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <button onClick={() => navigate('/')} style={styles.backButton}>{t('phase15.backBtn')}</button>
          <div style={styles.phaseCenter}>
            <span style={styles.phaseLabel}>Phase 15</span>
            <h1 style={styles.phaseTitle}>{t('phase15.title')}</h1>
            <p style={styles.phaseSubtitle}>{t('phase15.subtitle')}</p>
            <div style={styles.headerBadges}>
              <span style={styles.badge}>🚀 AWS EC2</span>
              <span style={styles.badge}>🐳 Docker</span>
              <span style={styles.badge}>🔄 Deployment</span>
              <span style={styles.badge}>☁️ Cloud</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── TWO-COLUMN LAYOUT ──────────────────────────────────────────── */}
      <div style={styles.pageLayout}>

        {/* ── SIDEBAR ────────────────────────────────────────────────── */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarCard}>
            <h3 style={styles.sidebarTitle}>{t('phase15.navTitle')}</h3>
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
            <h3 style={styles.sidebarTitle}>{t('phase15.sidebar.quickInfo')}</h3>
            {[
              [t('phase15.sidebar.platform'), 'AWS EC2'],
              [t('phase15.sidebar.instance'), 'm7i-flex.large'],
              [t('phase15.sidebar.os'), 'Ubuntu 22.04 LTS'],
              [t('phase15.sidebar.tool'), 'Docker Compose'],
              [t('phase15.sidebar.services'), 'Airflow + Postgres + Redis'],
              [t('phase15.sidebar.deployment'), 'GitHub + SSH'],
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
                {t('phase15.purpose.heading')}
              </h2>
              <p style={styles.bodyText}>
                {t('phase15.purpose.description')}
              </p>

              <InfoBox color={COLOR}>
                <strong>{t('phase15.purpose.infoboxTitle')}</strong>
                <ul style={styles.bulletList}>
                  {t('phase15.purpose.benefits', { returnObjects: true }).map((item, idx) => (
                    <li key={idx} style={styles.listItem}>{item}</li>
                  ))}
                </ul>
              </InfoBox>
            </div>
          </section>

          {/* ── STEP 1: Create profiles.yml ───────────────────────── */}
          <section id="step1" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#27AE60' }}>1</span>
                {t('phase15.step1.heading')}
              </h2>
              <p style={styles.bodyText}>
                {t('phase15.step1.description')}
              </p>

              <h3 style={styles.subHeading}>{t('phase15.step1.roleTitle')}</h3>
              <p style={styles.bodyText}>{t('phase15.step1.roleDesc')}</p>
              <ul style={styles.bulletList}>
                {t('phase15.step1.details', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>

              <h3 style={styles.subHeading}>{t('phase15.step1.twoFiles')}</h3>
              <p style={styles.bodyText}><strong>{t('phase15.step1.globalFile')}</strong></p>
              <p style={styles.bodyText}>{t('phase15.step1.globalLocation')}</p>
              <p style={styles.bodyText}>{t('phase15.step1.globalPurpose')}</p>

              <p style={styles.bodyText}><strong>{t('phase15.step1.projectFile')}</strong></p>
              <p style={styles.bodyText}>{t('phase15.step1.projectLocation')}</p>
              <p style={styles.bodyText}>{t('phase15.step1.projectPurpose')}</p>

              <h3 style={styles.subHeading}>{t('phase15.step1.createTitle')}</h3>
              <p style={styles.bodyText}>{t('phase15.step1.createStep1')}</p>
              <CopyableCode code="cd movies_dbt\ncode profiles.yml" />

              <p style={styles.bodyText}>{t('phase15.step1.createStep2')}</p>
              <CopyableCode code={PROFILES_YML_CODE} />

              <h3 style={styles.subHeading}>{t('phase15.step1.testConnection')}</h3>
              <p style={styles.bodyText}>{t('phase15.step1.testDesc')}</p>
              <ul style={styles.bulletList}>
                {t('phase15.step1.testSteps', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── STEP 2: Create EC2 Instance ──────────────────────── */}
          <section id="step2" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#8E44AD' }}>2</span>
                {t('phase15.step2.heading')}
              </h2>

              <h3 style={styles.subHeading}>{t('phase15.step2.console')}</h3>
              <ul style={styles.bulletList}>
                {t('phase15.step2.consoleSteps', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>

              <h3 style={styles.subHeading}>{t('phase15.step2.configure')}</h3>
              <p style={styles.bodyText}><strong>{t('phase15.step2.nameTag')}</strong></p>

              <p style={styles.bodyText}><strong>{t('phase15.step2.ami')}</strong></p>
              <ul style={styles.bulletList}>
                {t('phase15.step2.amiDetails', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>

              <p style={styles.bodyText}><strong>{t('phase15.step2.instanceType')}</strong></p>
              <p style={styles.bodyText}>{t('phase15.step2.instanceTypeDesc')}</p>

              <p style={styles.bodyText}><strong>{t('phase15.step2.keyPair')}</strong></p>
              <p style={styles.bodyText}>{t('phase15.step2.keyPairNew')}</p>
              <ul style={styles.bulletList}>
                {t('phase15.step2.keyPairSteps', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>

              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase15/Step2-Rule-SSH.png" alt="Security Group Rules" style={styles.screenshot} />
              </div>

              <p style={styles.bodyText}><strong>{t('phase15.step2.networkSettings')}</strong></p>
              <ul style={styles.bulletList}>
                {t('phase15.step2.networkSteps', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>

              <p style={styles.bodyText}><strong>{t('phase15.step2.securityGroup')}</strong></p>
              <p style={styles.bodyText}>{t('phase15.step2.sgName')}</p>
              <p style={styles.bodyText}>{t('phase15.step2.sgDesc')}</p>
              <p style={styles.bodyText}><strong>{t('phase15.step2.sgRules')}</strong></p>
              <ul style={styles.bulletList}>
                <li style={styles.listItem}>{t('phase15.step2.rule1')}</li>
                <li style={styles.listItem}>{t('phase15.step2.rule2')}</li>
                <li style={styles.listItem}>{t('phase15.step2.rule3')}</li>
                <li style={styles.listItem}>{t('phase15.step2.rule4')}</li>
              </ul>

              <h3 style={styles.subHeading}>{t('phase15.step2.launch')}</h3>
              <ul style={styles.bulletList}>
                {t('phase15.step2.launchSteps', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>

              <h3 style={styles.subHeading}>{t('phase15.step2.verify')}</h3>
              <p style={styles.bodyText}>{t('phase15.step2.verifyDesc')}</p>
            </div>
          </section>

          {/* ── STEP 3: Connect to EC2 ─────────────────────────────────── */}
          <section id="step3" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#E67E22' }}>3</span>
                {t('phase15.step3.heading')}
              </h2>

              <h3 style={styles.subHeading}>{t('phase15.step3.prepareKey')}</h3>
              <ul style={styles.bulletList}>
                {t('phase15.step3.keySteps', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>

              <h3 style={styles.subHeading}>{t('phase15.step3.permissions')}</h3>
              <ul style={styles.bulletList}>
                {t('phase15.step3.permSteps', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>

              <h3 style={styles.subHeading}>{t('phase15.step3.connect')}</h3>
              <CopyableCode code='ssh -i "movies-pipeline-key.pem" ubuntu@<EC2_IP>' />
              <p style={styles.bodyText}>{t('phase15.step3.firstConnect')}</p>
              <p style={styles.bodyText}>{t('phase15.step3.firstConnectAction')}</p>
              <p style={styles.bodyText}>{t('phase15.step3.successMsg')}</p>
            </div>
          </section>

          {/* ── STEP 4: Install Software ─────────────────────────────────── */}
          <section id="step4" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: COLOR }}>4</span>
                {t('phase15.step4.heading')}
              </h2>

              <h3 style={styles.subHeading}>{t('phase15.step4.update')}</h3>
              <CopyableCode code={t('phase15.step4.updateCmd')} />

              <h3 style={styles.subHeading}>{t('phase15.step4.docker')}</h3>
              <ul style={styles.bulletList}>
                {t('phase15.step4.dockerSteps', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>

              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase15/install-docker.png" alt="Install Docker" style={styles.screenshot} />
              </div>

              <p style={styles.bodyText}><strong>{t('phase15.step4.dockerVerify')}</strong></p>
              <ul style={styles.bulletList}>
                {t('phase15.step4.dockerCmds', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>

              <h3 style={styles.subHeading}>{t('phase15.step4.projectDir')}</h3>
              <CopyableCode code={t('phase15.step4.projectDirCmd')} />

              <h3 style={styles.subHeading}>{t('phase15.step4.git')}</h3>
              <CopyableCode code={t('phase15.step4.gitCmd')} />
            </div>
          </section>

          {/* ── STEP 5: Move Code to EC2 ───────────────────────────── */}
          <section id="step5" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#3498DB' }}>5</span>
                {t('phase15.step5.heading')}
              </h2>

              <h3 style={styles.subHeading}>{t('phase15.step5.github')}</h3>
              <ul style={styles.bulletList}>
                {t('phase15.step5.githubSteps', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>

              <h3 style={styles.subHeading}>{t('phase15.step5.push')}</h3>
              <p style={styles.bodyText}>{t('phase15.step5.pushDesc')}</p>
              <CopyableCode code={`git init
git add .
git commit -m "Prepare for EC2 Deployment"
git branch -M main
git remote add origin https://github.com/yourusername/movies-pipeline.git
git push -u origin main`} />
            </div>
          </section>

          {/* ── STEP 6: Clone Project ───────────────────────────── */}
          <section id="step6" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#9B59B6' }}>6</span>
                {t('phase15.step6.heading')}
              </h2>

              <p style={styles.bodyText}>{t('phase15.step6.description')}</p>
              <CopyableCode code={t('phase15.step6.cmd')} />
              <InfoBox color="#9B59B6">
                <strong>{t('phase15.step6.note')}</strong>
              </InfoBox>
            </div>
          </section>

          {/* ── STEP 7: Check Files ───────────────────────────── */}
          <section id="step7" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#1ABC9C' }}>7</span>
                {t('phase15.step7.heading')}
              </h2>

              <ul style={styles.bulletList}>
                {t('phase15.step7.checks', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── STEP 8: Create .env File ───────────────────────────── */}
          <section id="step8" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#F39C12' }}>8</span>
                {t('phase15.step8.heading')}
              </h2>

              <h3 style={styles.subHeading}>{t('phase15.step8.create')}</h3>
              <CopyableCode code={t('phase15.step8.createCmd')} />

              <h3 style={styles.subHeading}>{t('phase15.step8.content')}</h3>
              <CopyableCode code={ENV_FILE_CODE} />

              <p style={styles.bodyText}><strong>{t('phase15.step8.save')}</strong></p>

              <h3 style={styles.subHeading}>{t('phase15.step8.verify')}</h3>
              <ul style={styles.bulletList}>
                {t('phase15.step8.verifyCmds', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>

              <InfoBox color="#E67E22">
                <strong>{t('phase15.step8.warning')}</strong>
              </InfoBox>
            </div>
          </section>

          {/* ── STEP 9: Setup Permissions ───────────────────────────── */}
          <section id="step9" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#2980B9' }}>9</span>
                {t('phase15.step9.heading')}
              </h2>

              <CopyableCode code={`export AIRFLOW_UID=50000

mkdir -p logs plugins

sudo chown -R 50000:0 logs dags plugins data movies_dbt

chmod -R 775 logs dags plugins data movies_dbt

ls -la`} />
            </div>
          </section>

          {/* ── STEP 10: Build Docker Images ───────────────────────────── */}
          <section id="step10" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#8E44AD' }}>10</span>
                {t('phase15.step10.heading')}
              </h2>

              <CopyableCode code={t('phase15.step10.cmd')} />

              <p style={styles.bodyText}><strong>{t('phase15.step10.verify')}</strong></p>
              <p style={styles.bodyText}>{t('phase15.step10.expected')}</p>
            </div>
          </section>

          {/* ── STEP 11: Initialize Airflow Database ──────────────────────────── */}
          <section id="step11" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#E74C3C' }}>11</span>
                {t('phase15.step11.heading')}
              </h2>

              <CopyableCode code={t('phase15.step11.cmd')} />
              <p style={styles.bodyText}>{t('phase15.step11.description')}</p>
            </div>
          </section>

          {/* ── STEP 12: Start All Services ──────────────────────────── */}
          <section id="step12" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#27AE60' }}>12</span>
                {t('phase15.step12.heading')}
              </h2>

              <CopyableCode code={t('phase15.step12.cmd')} />
              <p style={styles.bodyText}>{t('phase15.step12.description')}</p>
            </div>
          </section>

          {/* ── STEP 13: Check Services Status ────────────────────────────── */}
          <section id="step13" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#3498DB' }}>13</span>
                {t('phase15.step13.heading')}
              </h2>

              <CopyableCode code={t('phase15.step13.cmd')} />
              <p style={styles.bodyText}>{t('phase15.step13.description')}</p>
            </div>
          </section>

          {/* ── STEP 14: Access Airflow UI ────────────────────────────── */}
          <section id="step14" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#F39C12' }}>14</span>
                {t('phase15.step14.heading')}
              </h2>

              <p style={styles.bodyText}><strong>{t('phase15.step14.url')}</strong></p>
              <p style={styles.bodyText}><strong>{t('phase15.step14.login')}</strong></p>
              <ul style={styles.bulletList}>
                <li style={styles.listItem}>{t('phase15.step14.username')}</li>
                <li style={styles.listItem}>{t('phase15.step14.password')}</li>
              </ul>
            </div>
          </section>

          {/* ── STEP 15: Create Snowflake Connection ─────────────────────────── */}
          <section id="step15" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#E67E22' }}>15</span>
                {t('phase15.step15.heading')}
              </h2>

              <h3 style={styles.subHeading}>15.1 {t('phase15.step15.sub1.title')}</h3>
              <ul style={styles.bulletList}>
                {t('phase15.step15.steps', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>

              <h3 style={styles.subHeading}>15.2 {t('phase15.step15.sub2.title')}</h3>
              <p style={styles.bodyText}><strong>{t('phase15.step15.fields')}</strong></p>
              <ul style={styles.bulletList}>
                <li style={styles.listItem}>{t('phase15.step15.connectionId')}</li>
                <li style={styles.listItem}>{t('phase15.step15.connectionType')}</li>
                <li style={styles.listItem}>{t('phase15.step15.schema')}</li>
                <li style={styles.listItem}>{t('phase15.step15.login')}</li>
                <li style={styles.listItem}>{t('phase15.step15.passwordField')}</li>
              </ul>

              <h3 style={styles.subHeading}>15.3 {t('phase15.step15.sub3.title')}</h3>
              <p style={styles.bodyText}><strong>{t('phase15.step15.extraFields')}</strong></p>
              <CopyableCode code={SNOWFLAKE_EXTRA_JSON} />
              <p style={styles.bodyText}>{t('phase15.step15.save')}</p>

              <h3 style={styles.subHeading}>15.4 {t('phase15.step15.sub5.title')}</h3>
              <p style={styles.bodyText}>{t('phase15.step15.enableDag')}</p>
              <p style={styles.bodyText}>{t('phase15.step15.viewProgress')}</p>

              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase15/Step 15-1.png" alt="Airflow DAGs List" style={styles.screenshot} />
              </div>

              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase15/Step 15-2.png" alt="Test DAG Execution" style={styles.screenshot} />
              </div>

              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase15/Step 15-3.png" alt="Movies Pipeline DAG Running" style={styles.screenshot} />
              </div>
            </div>
          </section>

          {/* ── STEP 16: Verify in Snowflake ──────────────────────────────── */}
          <section id="step16" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#2980B9' }}>16</span>
                {t('phase15.step16.heading')}
              </h2>

              <h3 style={styles.subHeading}>{t('phase15.step16.checkRaw')}</h3>
              <CopyableCode code={`USE DATABASE movies_db;
USE SCHEMA raw;
SELECT COUNT(*) as total_movies FROM movies_raw;
-- Should get 100 rows
SELECT * FROM movies_raw LIMIT 10;`} />

              <h3 style={styles.subHeading}>{t('phase15.step16.checkMarts')}</h3>
              <CopyableCode code={`USE SCHEMA ANALYTICS_MARTS;
SHOW TABLES;
-- Should see 13 tables`} />

              <p style={styles.bodyText}><strong>{t('phase15.step16.tables')}</strong></p>
              <ul style={styles.bulletList}>
                {t('phase15.step16.tableList', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>

              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase15/Step 16.png" alt="Verify in Snowflake" style={styles.screenshot} />
              </div>

              <InfoBox color="#27AE60">
                <strong>{t('phase15.step16.result')}</strong>
                <ul style={styles.bulletList}>
                  {t('phase15.step16.resultItems', { returnObjects: true }).map((item, idx) => (
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
                {t('phase15.summary.heading')}
              </h2>

              <InfoBox color={COLOR}>
                <strong>{t('phase15.summary.complete')}</strong>
              </InfoBox>

              <p style={styles.bodyText}><strong>{t('phase15.summary.accomplishments')}</strong></p>
              <ul style={styles.bulletList}>
                {t('phase15.summary.items', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>

              <p style={styles.bodyText}><strong>{t('phase15.summary.benefits')}</strong></p>
              <ul style={styles.bulletList}>
                {t('phase15.summary.benefitsList', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>

              <p style={styles.bodyText}><strong>{t('phase15.summary.nextSteps')}</strong></p>
              <ul style={styles.bulletList}>
                {t('phase15.summary.nextStepsList', { returnObjects: true }).map((item, idx) => (
                  <li key={idx} style={styles.listItem}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <PhaseNavigator currentPhase={15} totalPhases={15} />
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
  header:       { background: 'linear-gradient(135deg, #E74C3C 0%, #C0392B 60%, #F1948A 100%)', padding: '60px 20px', color: 'white' },
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
  navItemActive:{ backgroundColor: '#ffeaea', color: COLOR_DARK, fontWeight: '600' },
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

  imageWrapper: { margin: '16px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  screenshot:   { width: '100%', maxWidth: '500px', height: 'auto', borderRadius: '10px', border: '1px solid #e0e0e0', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', objectFit: 'contain' },

  scrollTopBtn: { position: 'fixed', bottom: '115px', right: '30px', backgroundColor: COLOR, color: 'white', border: 'none', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem', fontWeight: '700', boxShadow: `0 4px 15px ${COLOR}66`, zIndex: 1000 },
};

export default Phase15Detail;
