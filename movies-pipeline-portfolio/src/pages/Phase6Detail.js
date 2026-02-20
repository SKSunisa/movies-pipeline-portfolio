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
const Phase6Detail = () => {
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
    { id: 'purpose',   label: t('phase6.nav.purpose'),  bold: true },
    { id: 'docker',    label: t('phase6.nav.docker'),   bold: true },
    { id: 'step1',     label: t('phase6.nav.step1'),    bold: true },
    { id: 'step2',     label: t('phase6.nav.step2'),    bold: true },
    { id: 'step3',     label: t('phase6.nav.step3'),    bold: true },
    { id: 'step4',     label: t('phase6.nav.step4'),    bold: true },
    { id: 'step5',     label: t('phase6.nav.step5'),    bold: true },
    { id: 'step6',     label: t('phase6.nav.step6'),    bold: true },
    { id: 'step6-p1',  label: t('phase6.nav.step6p1'), bold: false },
    { id: 'step6-p2',  label: t('phase6.nav.step6p2'), bold: false },
    { id: 'summary',   label: t('phase6.nav.summary'),  bold: true }
  ];

  const SubHeading = ({ id, title, color }) => (
    <h3 id={id} style={{ ...styles.subHeading, borderLeftColor: color }}>{title}</h3>
  );

  const SERVICES = [
    { name: 'postgres',             key: 'postgresDesc' },
    { name: 'redis',                key: 'redisDesc' },
    { name: 'airflow-webserver',    key: 'webserverDesc' },
    { name: 'airflow-scheduler',    key: 'schedulerDesc' },
    { name: 'airflow-dag-processor',key: 'dagProcessorDesc' },
    { name: 'airflow-worker',       key: 'workerDesc' },
    { name: 'airflow-triggerer',    key: 'triggererDesc' },
    { name: 'airflow-init',         key: 'initDesc' },
    { name: 'flower',               key: 'flowerDesc' }
  ];

  const COLOR = '#2980B9';

  return (
    <div style={styles.container}>

      {/* ── HEADER ── */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <button onClick={() => navigate('/')} style={styles.backButton}>{t('phase6.backBtn')}</button>
          <div style={styles.phaseNumber}>
            <span style={styles.phaseLabel}>Phase 6</span>
            <h1 style={styles.phaseTitle}>{t('phase6.title')}</h1>
            <p style={styles.phaseSubtitle}>{t('phase6.subtitle')}</p>
            <div style={styles.headerBadges}>
              <span style={styles.badge}>🐳 Docker</span>
              <span style={styles.badge}>🌀 Apache Airflow</span>
              <span style={styles.badge}>🗂️ docker-compose</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── TWO-COLUMN LAYOUT ── */}
      <div style={styles.pageLayout}>

        {/* ── LEFT SIDEBAR ── */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarCard}>
            <h3 style={styles.sidebarTitle}>{t('phase6.navTitle')}</h3>
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
              <h2 style={{ ...styles.sectionHeading, color: COLOR }}>
                <span style={{ ...styles.sectionBadge, backgroundColor: COLOR }}>🎯</span>
                {t('phase6.purpose.heading')}
              </h2>
              <p style={styles.bodyText}>{t('phase6.purpose.desc')}</p>
              <div style={styles.imageWrapper}>
                <img src="/images/phase6/objective.png" alt="Phase 6 Objective" style={styles.screenshot} />
              </div>
            </div>
          </section>

          {/* WHAT IS DOCKER */}
          <section id="docker" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="docker-h" title={t('phase6.docker.title')} color={COLOR} />
              <p style={styles.bodyText}>{t('phase6.docker.desc1')}</p>
              <p style={styles.bodyText}>{t('phase6.docker.desc2')}</p>
              <p style={styles.bodyText}><strong>{t('phase6.docker.vocabTitle')}</strong></p>
              <ul style={styles.bulletList}>
                <li style={styles.listItem}><strong>{t('phase6.docker.imageTitle')}</strong> — {t('phase6.docker.imageDesc')}</li>
                <li style={styles.listItem}><strong>{t('phase6.docker.containerTitle')}</strong> — {t('phase6.docker.containerDesc')}</li>
              </ul>
            </div>
          </section>

          {/* STEP 1 */}
          <section id="step1" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="step1-h" title={t('phase6.step1.title')} color={COLOR} />
              <p style={styles.bodyText}>{t('phase6.step1.desc')}</p>
              <CopyableCode code={`AIRFLOW_UID=
AIRFLOW_GID=`} />
              <ul style={styles.bulletList}>
                <li style={styles.listItem}>{t('phase6.step1.uidDesc')}</li>
                <li style={styles.listItem}>{t('phase6.step1.gidDesc')}</li>
              </ul>
              <InfoBox color="#888888">
                <p style={styles.infoText}>{t('phase6.step1.gidNote')}</p>
              </InfoBox>
              <p style={styles.bodyText}><strong>{t('phase6.step1.osTitle')}</strong></p>
              <p style={styles.bodyText}><strong>{t('phase6.step1.linuxTitle')}</strong> {t('phase6.step1.linuxDesc')}</p>
              <p style={styles.bodyText}><strong>{t('phase6.step1.windowsTitle')}</strong> {t('phase6.step1.windowsDesc')}</p>
              <p style={styles.bodyText}><strong>{t('phase6.step1.stepsTitle')}</strong></p>
              <ol style={styles.orderedList}>
                <li style={styles.listItem}>{t('phase6.step1.s1')}</li>
                <li style={styles.listItem}>
                  {t('phase6.step1.s2')}
                  <CopyableCode code={`# ====================================
# AIRFLOW SETTINGS
# ====================================
AIRFLOW_UID=50000
AIRFLOW_GID=0

# AWS Credentials
AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_KEY
AWS_REGION=us-east-1
S3_BUCKET_NAME=your-bucket-name

# Snowflake Credentials
SNOWFLAKE_ACCOUNT=YOUR_ACCOUNT
SNOWFLAKE_USER=YOUR_USER
SNOWFLAKE_PASSWORD=YOUR_PASSWORD
SNOWFLAKE_DATABASE=movies_db
SNOWFLAKE_WAREHOUSE=movies_wh
SNOWFLAKE_SCHEMA=RAW
SNOWFLAKE_ROLE=ACCOUNTADMIN`} />
                </li>
              </ol>
            </div>
          </section>

          {/* STEP 2 */}
          <section id="step2" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="step2-h" title={t('phase6.step2.title')} color={COLOR} />
              <p style={styles.bodyText}>{t('phase6.step2.desc')}</p>
              <CopyableCode code={`mkdir dags
mkdir logs
mkdir config
mkdir plugins
# or
mkdir dags logs config plugins`} />
              <div style={styles.imageWrapper}>
                <img src="/images/phase6/step5-3.png" alt="Folder Structure" style={styles.screenshot} />
                <p style={styles.imageCaption}>{t('phase6.step2.imageCaption')}</p>
              </div>
            </div>
          </section>

          {/* STEP 3 */}
          <section id="step3" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="step3-h" title={t('phase6.step3.title')} color={COLOR} />
              <p style={styles.bodyText}>{t('phase6.step3.desc')}</p>
              <ol style={styles.orderedList}>
                <li style={styles.listItem}>{t('phase6.step3.s1')}</li>
                <li style={styles.listItem}>
                  {t('phase6.step3.s2')}
                  <CopyableCode code={`# ====================================
# PYTHON CACHE FILES
# ====================================
__pycache__/
*.pyc
*.pyo
*.pyd
.Python
*.so
*.egg
*.egg-info/

# ====================================
# VIRTUAL ENVIRONMENT
# ====================================
venv/
env/
ENV/

# ====================================
# AIRFLOW
# ====================================
logs/
*.log

# ====================================
# IDE FILES
# ====================================
.vscode/
.idea/
*.swp
*.swo
.DS_Store

# ====================================
# GIT
# ====================================
.git/
.gitignore

# ====================================
# ENVIRONMENT FILES
# ====================================
.env

# ====================================
# OS FILES
# ====================================
Thumbs.db`} />
                </li>
              </ol>
            </div>
          </section>

          {/* STEP 4 */}
          <section id="step4" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="step4-h" title={t('phase6.step4.title')} color={COLOR} />
              <p style={styles.bodyText}>{t('phase6.step4.desc')}</p>
              <ol style={styles.orderedList}>
                <li style={styles.listItem}>{t('phase6.step4.s1')}</li>
                <li style={styles.listItem}>
                  {t('phase6.step4.s2')}
                  <CopyableCode code={`# ========================================
# Base Image - Airflow 2.10.4
# ========================================
FROM apache/airflow:2.10.4-python3.11

# Set working directory
WORKDIR /opt/airflow

# ========================================
# Install System Dependencies
# ========================================
# Switch to root user
USER root

# Install system packages
RUN apt-get update \\
&& apt-get install -y --no-install-recommends \\
    git \\
    vim \\
&& apt-get autoremove -yqq --purge \\
&& apt-get clean \\
&& rm -rf /var/lib/apt/lists/*

# Switch back to airflow user
USER airflow

# ====================================
# Install Python Packages
# ====================================
COPY --chown=airflow:0 requirements.txt /tmp/requirements.txt
RUN pip install --no-cache-dir --upgrade pip \\
&& pip install --no-cache-dir -r /tmp/requirements.txt

# ====================================
# Environment Variables
# ====================================
ENV PYTHONPATH=/opt/airflow

# ====================================
# Create Directories
# ====================================
RUN mkdir -p /opt/airflow/logs \\
&& mkdir -p /opt/airflow/dags \\
&& mkdir -p /opt/airflow/plugins \\
&& mkdir -p /opt/airflow/data \\
&& mkdir -p /opt/airflow/movies_dbt

# ====================================
# Metadata
# ====================================
LABEL description="Airflow 2.10.4 with dbt-snowflake for Movies Pipeline"
LABEL version="1.0"
LABEL python.version="3.11"
LABEL airflow.version="2.10.4"`} />
                </li>
              </ol>
              <p style={styles.bodyText}>
                {t('phase6.step4.learnMore')}{' '}
                <a href="https://airflow.apache.org/docs/docker-stack/build.html#adding-new-pypi-packages-individually" target="_blank" rel="noreferrer" style={styles.link}>
                  airflow.apache.org/docs/docker-stack/build.html
                </a>
              </p>
            </div>
          </section>

          {/* STEP 5 */}
          <section id="step5" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="step5-h" title={t('phase6.step5.title')} color={COLOR} />
              <p style={styles.bodyText}>{t('phase6.step5.desc')}</p>
              <ol style={styles.orderedList}>
                <li style={styles.listItem}>
                  {t('phase6.step5.s1')}
                  <CopyableCode code="https://airflow.apache.org/docs/apache-airflow/2.10.4/howto/docker-compose/index.html" />
                  <div style={styles.imageWrapper}>
                    <img src="/images/phase6/step5-2.png" alt="Airflow docker-compose download" style={styles.screenshot} />
                  </div>
                </li>
                <li style={styles.listItem}>
                  {t('phase6.step5.s2')}
                  <p style={styles.bodyText}><strong>{t('phase6.step5.s2cmd')}</strong></p>
                  <CopyableCode code={`curl -LfO 'https://airflow.apache.org/docs/apache-airflow/2.10.4/docker-compose.yaml'`} />
                </li>
                <li style={styles.listItem}>{t('phase6.step5.s3')}</li>
              </ol>
            </div>
          </section>

          {/* STEP 6 */}
          <section id="step6" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="step6-h" title={t('phase6.step6.title')} color={COLOR} />
              <p style={styles.bodyText}>{t('phase6.step6.desc')}</p>
            </div>
          </section>

          {/* STEP 6 PART 1 */}
          <section id="step6-p1" style={styles.section}>
            <div style={styles.contentCard}>
              <h3 id="step6-p1-h" style={{ ...styles.subHeading, borderLeftColor: COLOR }}>{t('phase6.step6.part1Title')}</h3>

              {/* Change 1 */}
              <p style={styles.bodyText}><strong>{t('phase6.step6.c1Title')}</strong></p>
              <p style={styles.noteText}>{t('phase6.step6.before')}</p>
              <CopyableCode code={`image: \${AIRFLOW_IMAGE_NAME:-apache/airflow:2.10.4}
# build: .`} />
              <p style={styles.noteText}>{t('phase6.step6.changeTo')}</p>
              <CopyableCode code={`# image: \${AIRFLOW_IMAGE_NAME:-apache/airflow:2.10.4}
build: .
env_file:
  - .env`} />
              <p style={styles.bodyText}><strong>{t('phase6.step6.pointsTitle')}</strong></p>
              <ul style={styles.bulletList}>
                <li style={styles.listItem}>{t('phase6.step6.c1n1')}</li>
                <li style={styles.listItem}>{t('phase6.step6.c1n2')}</li>
                <li style={styles.listItem}>{t('phase6.step6.c1n3')}</li>
              </ul>

              {/* Change 2 */}
              <p style={{ ...styles.bodyText, marginTop: '24px' }}><strong>{t('phase6.step6.c2Title')}</strong></p>
              <p style={styles.noteText}>{t('phase6.step6.before')}</p>
              <CopyableCode code={`AIRFLOW__CORE__EXECUTOR: CeleryExecutor`} />
              <p style={styles.noteText}>{t('phase6.step6.changeTo')}</p>
              <CopyableCode code={`AIRFLOW__CORE__EXECUTOR: LocalExecutor`} />
              <InfoBox color={COLOR}>
                <p style={styles.infoText}>{t('phase6.step6.c2Note')}</p>
              </InfoBox>

              {/* Change 3 */}
              <p style={{ ...styles.bodyText, marginTop: '24px' }}><strong>{t('phase6.step6.c3Title')}</strong></p>
              <CopyableCode code={`AIRFLOW__CELERY__RESULT_BACKEND: db+postgresql://airflow:airflow@postgres/airflow
AIRFLOW__CELERY__BROKER_URL: redis://:@redis:6379/0`} />
              <InfoBox color={COLOR}>
                <p style={styles.infoText}>{t('phase6.step6.c3Note')}</p>
              </InfoBox>

              {/* Change 4 */}
              <p style={{ ...styles.bodyText, marginTop: '24px' }}><strong>{t('phase6.step6.c4Title')}</strong></p>
              <p style={styles.noteText}>{t('phase6.step6.before')}</p>
              <CopyableCode code={`AIRFLOW__CORE__LOAD_EXAMPLES: 'true'`} />
              <p style={styles.noteText}>{t('phase6.step6.changeTo')}</p>
              <CopyableCode code={`AIRFLOW__CORE__LOAD_EXAMPLES: 'false'`} />
              <InfoBox color={COLOR}>
                <p style={styles.infoText}>{t('phase6.step6.c4Note')}</p>
              </InfoBox>

              {/* Change 5 */}
              <p style={{ ...styles.bodyText, marginTop: '24px' }}><strong>{t('phase6.step6.c5Title')}</strong></p>
              <p style={styles.noteText}>{t('phase6.step6.before')}</p>
              <CopyableCode code={`depends_on:
  &airflow-common-depends-on
  redis:
    condition: service_healthy
  postgres:
    condition: service_healthy`} />
              <p style={styles.noteText}>{t('phase6.step6.changeTo')}</p>
              <CopyableCode code={`depends_on:
  postgres:
    condition: service_healthy`} />
              <InfoBox color={COLOR}>
                <p style={styles.infoText}>{t('phase6.step6.c5Note')}</p>
              </InfoBox>

              {/* Change 6 */}
              <p style={{ ...styles.bodyText, marginTop: '24px' }}><strong>{t('phase6.step6.c6Title')}</strong></p>
              <p style={styles.noteText}>{t('phase6.step6.before')}</p>
              <CopyableCode code={`AIRFLOW__CORE__DAGS_ARE_PAUSED_AT_CREATION: 'true'`} />
              <p style={styles.noteText}>{t('phase6.step6.changeTo')}</p>
              <CopyableCode code={`AIRFLOW__CORE__DAGS_ARE_PAUSED_AT_CREATION: 'false'`} />
              <InfoBox color={COLOR}>
                <p style={styles.infoText}>{t('phase6.step6.c6Note')}</p>
              </InfoBox>

              {/* Change 7 */}
              <p style={{ ...styles.bodyText, marginTop: '24px' }}><strong>{t('phase6.step6.c7Title')}</strong></p>
              <CopyableCode code={`# AWS Credentials
AWS_ACCESS_KEY_ID: \${AWS_ACCESS_KEY_ID}
AWS_SECRET_ACCESS_KEY: \${AWS_SECRET_ACCESS_KEY}
AWS_DEFAULT_REGION: \${AWS_DEFAULT_REGION}
S3_BUCKET_NAME: \${S3_BUCKET_NAME}

# Snowflake Credentials
SNOWFLAKE_ACCOUNT: \${SNOWFLAKE_ACCOUNT}
SNOWFLAKE_USER: \${SNOWFLAKE_USER}
SNOWFLAKE_PASSWORD: \${SNOWFLAKE_PASSWORD}
SNOWFLAKE_ROLE: \${SNOWFLAKE_ROLE}
SNOWFLAKE_WAREHOUSE: \${SNOWFLAKE_WAREHOUSE}
SNOWFLAKE_DATABASE: \${SNOWFLAKE_DATABASE}
SNOWFLAKE_SCHEMA: \${SNOWFLAKE_SCHEMA}

# dbt Configuration
DBT_PROFILES_DIR: /opt/airflow/movies_dbt`} />
              <InfoBox color={COLOR}>
                <p style={styles.infoText}>{t('phase6.step6.c7Note')}</p>
              </InfoBox>
            </div>
          </section>

          {/* STEP 6 PART 2 */}
          <section id="step6-p2" style={styles.section}>
            <div style={styles.contentCard}>
              <h3 id="step6-p2-h" style={{ ...styles.subHeading, borderLeftColor: COLOR }}>{t('phase6.step6.part2Title')}</h3>
              <p style={styles.bodyText}>{t('phase6.step6.p2Intro')}</p>

              {/* Services table */}
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>{t('phase6.step6.tableH1')}</th>
                      <th style={styles.th}>{t('phase6.step6.tableH2')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SERVICES.map((s) => (
                      <tr key={s.name}>
                        <td style={{ ...styles.td, fontWeight: '600', whiteSpace: 'nowrap' }}>{s.name}</td>
                        <td style={{ ...styles.td, fontFamily: 'inherit', fontSize: '0.92rem' }}>{t(`phase6.services.${s.key}`)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Services decision */}
              <p style={{ ...styles.bodyText, marginTop: '24px' }}><strong>{t('phase6.step6.keepTitle')}</strong></p>
              <ul style={styles.bulletList}>
                <li style={styles.listItem}><code style={styles.inlineCode}>postgres</code> ← ✅ Required</li>
                <li style={styles.listItem}><code style={styles.inlineCode}>redis</code> ← ❌ Not needed (CeleryExecutor)</li>
                <li style={styles.listItem}><code style={styles.inlineCode}>airflow-scheduler</code> ← ✅ Required</li>
                <li style={styles.listItem}><code style={styles.inlineCode}>airflow-worker</code> ← ❌ Not needed (LocalExecutor)</li>
                <li style={styles.listItem}><code style={styles.inlineCode}>airflow-triggerer</code> ← ✅ Required</li>
                <li style={styles.listItem}><code style={styles.inlineCode}>airflow-init</code> ← ✅ Required</li>
                <li style={styles.listItem}><code style={styles.inlineCode}>flower</code> ← ❌ Not needed (Celery monitoring)</li>
              </ul>

              {/* Edit 1: postgres */}
              <p style={{ ...styles.bodyText, marginTop: '24px' }}><strong>{t('phase6.step6.e1Title')}</strong></p>
              <p style={styles.noteText}>{t('phase6.step6.before')}</p>
              <CopyableCode code={`  postgres:
    image: postgres:16
    environment:
      POSTGRES_USER: airflow
      POSTGRES_PASSWORD: airflow
      POSTGRES_DB: airflow
    volumes:
      - postgres-db-volume:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD", "pg_isready", "-U", "airflow"]
      interval: 10s
      retries: 5
      start_period: 5s
    restart: always`} />
              <p style={styles.noteText}>{t('phase6.step6.changeTo')}</p>
              <CopyableCode code={`  postgres:
    image: postgres:16
    container_name: movies_postgres  # ← add this line
    environment:
      POSTGRES_USER: airflow
      POSTGRES_PASSWORD: airflow
      POSTGRES_DB: airflow
    volumes:
      - postgres-db-volume:/var/lib/postgresql/data
    ports:          # ← add this line
      - "5432:5432" # ← add this line
    healthcheck:
      test: ["CMD", "pg_isready", "-U", "airflow"]
      interval: 10s
      retries: 5
      start_period: 5s
    restart: always`} />
              <InfoBox color={COLOR}>
                <p style={styles.infoText}>{t('phase6.step6.e1Note')}</p>
              </InfoBox>

              {/* Edit 2: webserver */}
              <p style={{ ...styles.bodyText, marginTop: '24px' }}><strong>{t('phase6.step6.e2Title')}</strong></p>
              <CopyableCode code={`  airflow-webserver:
    <<: *airflow-common
    container_name: movies_airflow_webserver  # ← add this line
    command: webserver
    ports:
      - "8080:8080"
    ...`} />
              <InfoBox color={COLOR}>
                <p style={styles.infoText}>{t('phase6.step6.e2Note')}</p>
              </InfoBox>

              {/* Edit 3: delete services */}
              <p style={{ ...styles.bodyText, marginTop: '24px' }}><strong>{t('phase6.step6.e3Title')}</strong></p>
              <InfoBox color="#E74C3C">
                <p style={styles.infoText}>{t('phase6.step6.e3Note')}</p>
              </InfoBox>

              {/* Edit 4: scheduler */}
              <p style={{ ...styles.bodyText, marginTop: '24px' }}><strong>{t('phase6.step6.e4Title')}</strong></p>
              <p style={styles.noteText}>{t('phase6.step6.changeTo')}</p>
              <CopyableCode code={`  airflow-scheduler:
    <<: *airflow-common
    container_name: movies_airflow_scheduler  # ← add this line
    command: scheduler
    healthcheck:
      test: ["CMD", "curl", "--fail", "http://localhost:8974/health"]
      interval: 30s
      timeout: 10s
      retries: 5
      start_period: 30s
    restart: always
    depends_on:
      postgres:            # ← specify only postgres
        condition: service_healthy
      airflow-init:
        condition: service_completed_successfully`} />
              <InfoBox color={COLOR}>
                <p style={styles.infoText}>{t('phase6.step6.e4Note')}</p>
              </InfoBox>

              {/* Edit 5: init */}
              <p style={{ ...styles.bodyText, marginTop: '24px' }}><strong>{t('phase6.step6.e5Title')}</strong></p>
              <CopyableCode code={`  airflow-init:
    <<: *airflow-common
    container_name: movies_airflow_init  # ← add this line
    entrypoint: /bin/bash
    command:
      - -c
      - |
        ...`} />
              <InfoBox color={COLOR}>
                <p style={styles.infoText}>{t('phase6.step6.e5Note')}</p>
              </InfoBox>

              {/* Edit 6: volumes */}
              <p style={{ ...styles.bodyText, marginTop: '24px' }}><strong>{t('phase6.step6.e6Title')}</strong></p>
              <p style={styles.noteText}>{t('phase6.step6.before')}</p>
              <CopyableCode code={`volumes:
  postgres-db-volume:`} />
              <p style={styles.noteText}>{t('phase6.step6.changeTo')}</p>
              <CopyableCode code={`# ==========================================
# VOLUMES
# ==========================================
volumes:
  postgres-db-volume:
    name: movies_postgres_data`} />
              <InfoBox color={COLOR}>
                <p style={styles.infoText}>{t('phase6.step6.e6Note')}</p>
              </InfoBox>
            </div>
          </section>

          {/* SUMMARY */}
          <section id="summary" style={styles.section}>
            <div style={{ ...styles.contentCard, background: 'linear-gradient(135deg, #2980B9 0%, #1a6fa0 50%, #154f7a 100%)', color: 'white' }}>
              <h2 style={{ ...styles.sectionHeading, color: 'white', marginBottom: '8px' }}>
                ✅ {t('phase6.summary.title')}
              </h2>
              <p style={{ ...styles.bodyText, color: 'rgba(255,255,255,0.9)', marginBottom: '24px' }}>
                {t('phase6.summary.subtitle')}
              </p>
              <div style={styles.summaryGrid}>
                {[
                  { icon: '🐳', ti: 'item1Title', di: 'item1Desc' },
                  { icon: '🌀', ti: 'item2Title', di: 'item2Desc' },
                  { icon: '📁', ti: 'item3Title', di: 'item3Desc' },
                  { icon: '🚫', ti: 'item4Title', di: 'item4Desc' },
                  { icon: '📄', ti: 'item5Title', di: 'item5Desc' },
                  { icon: '🗂️', ti: 'item6Title', di: 'item6Desc' },
                  { icon: '⚙️', ti: 'item7Title', di: 'item7Desc' },
                  { icon: '🔑', ti: 'item8Title', di: 'item8Desc' }
                ].map((item, i) => (
                  <div key={i} style={styles.summaryItem}>
                    <span style={styles.summaryIcon}>{item.icon}</span>
                    <div>
                      <div style={styles.summaryItemTitle}>{t(`phase6.summary.${item.ti}`)}</div>
                      <div style={styles.summaryItemDesc}>{t(`phase6.summary.${item.di}`)}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={styles.nextBox}>
                <h3 style={styles.nextTitle}>{t('phase6.summary.nextTitle')}</h3>
                <p style={styles.nextDesc}>{t('phase6.summary.nextDesc')}</p>
              </div>
            </div>
          </section>

          {/* NAV BUTTONS */}
          <div style={styles.section}>
            <div style={styles.navButtons}>
              <button onClick={() => navigate('/phase/5')} style={styles.navBtn}>{t('phase6.navBtn.prev')}</button>
              <button onClick={() => navigate('/phase/7')} style={{ ...styles.navBtn, ...styles.navBtnNext }}>{t('phase6.navBtn.next')}</button>
            </div>
          </div>

          <PhaseNavigator currentPhase={6} totalPhases={15} />
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
  header: { background: 'linear-gradient(135deg, #2980B9 0%, #1a6fa0 60%, #154f7a 100%)', padding: '60px 20px', color: 'white' },
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
  sidebarTitle: { fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#2980B9', marginBottom: '16px', borderBottom: '2px solid #2980B9', paddingBottom: '8px' },
  navItem: { display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', padding: '8px 12px', border: 'none', borderRadius: '8px', cursor: 'pointer', backgroundColor: 'transparent', color: '#555', transition: 'all 0.2s ease', marginBottom: '2px', lineHeight: '1.4' },
  navItemActive: { backgroundColor: '#EBF5FB', color: '#2980B9', fontWeight: '600' },
  mainContent: { flex: 1, minWidth: 0 },
  section: { marginBottom: '8px' },
  contentCard: { backgroundColor: 'white', borderRadius: '16px', padding: '36px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', textAlign: 'left' },
  sectionHeading: { fontSize: '1.6rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', textAlign: 'left' },
  sectionBadge: { width: '40px', height: '40px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 },
  subHeading: { fontSize: '1.25rem', fontWeight: '700', borderLeft: '4px solid', paddingLeft: '14px', margin: '0 0 20px 0', color: '#1a1a2e', textAlign: 'left' },
  bodyText: { fontSize: '1rem', color: '#444', lineHeight: '1.9', marginBottom: '12px', textAlign: 'left', wordBreak: 'keep-all', overflowWrap: 'break-word' },
  noteText: { fontSize: '0.9rem', color: '#777', lineHeight: '1.7', margin: '4px 0 6px 0', textAlign: 'left', fontStyle: 'italic' },
  inlineCode: { backgroundColor: '#f0f0f0', padding: '2px 6px', borderRadius: '4px', fontSize: '0.88em', fontFamily: "'Courier New', monospace", color: '#e74c3c' },
  orderedList: { paddingLeft: '24px', margin: '0 0 14px 0', display: 'flex', flexDirection: 'column', gap: '10px' },
  bulletList: { paddingLeft: '20px', margin: '8px 0 10px 0', display: 'flex', flexDirection: 'column', gap: '6px', listStyleType: 'disc' },
  listItem: { fontSize: '0.97rem', color: '#444', lineHeight: '1.8', textAlign: 'left', wordBreak: 'keep-all', overflowWrap: 'break-word' },
  infoBox: { borderLeft: '4px solid', borderRadius: '8px', padding: '14px 18px', marginBottom: '16px' },
  infoText: { fontSize: '0.95rem', color: '#333', lineHeight: '1.8', margin: 0, textAlign: 'left', wordBreak: 'keep-all' },
  warningBox: { backgroundColor: '#fff8e6', borderLeft: '4px solid #F39C12', borderRadius: '8px', padding: '12px 16px', marginBottom: '14px' },
  warningText: { fontSize: '0.95rem', fontWeight: '600', color: '#8a4b00', margin: 0, lineHeight: '1.7' },
  imageWrapper: { margin: '16px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  screenshot: { maxWidth: '100%', borderRadius: '10px', border: '1px solid #e0e0e0', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  imageCaption: { fontSize: '0.85rem', color: '#888', marginTop: '8px', textAlign: 'center', fontStyle: 'italic' },
  tableWrapper: { overflowX: 'auto', marginBottom: '12px' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' },
  th: { backgroundColor: '#f4f4f5', padding: '10px 16px', textAlign: 'left', fontWeight: '700', color: '#333', borderBottom: '2px solid #ddd' },
  td: { padding: '10px 16px', borderBottom: '1px solid #eee', color: '#444', fontFamily: "'Courier New', monospace", fontSize: '0.9rem', verticalAlign: 'top' },
  link: { color: '#2980B9', textDecoration: 'underline' },
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
  navBtnNext: { backgroundColor: '#2980B9', color: 'white', border: '2px solid #2980B9' },
  scrollTopBtn: { position: 'fixed', bottom: '115px', right: '30px', backgroundColor: '#2980B9', color: 'white', border: 'none', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem', fontWeight: '700', boxShadow: '0 4px 15px rgba(41,128,185,0.4)', zIndex: 1000 }
};

export default Phase6Detail;
