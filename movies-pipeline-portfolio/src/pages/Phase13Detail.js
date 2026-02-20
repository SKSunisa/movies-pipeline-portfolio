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

const COLOR = '#3498DB';
const COLOR_DARK = '#1565A0';

/* ════════════════════════════════════════════════════════════════════════════
   Phase 13 Detail Page
════════════════════════════════════════════════════════════════════════════ */
const Phase13Detail = () => {
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
    { id: 'purpose', label: t('phase13.nav.purpose'), bold: true },
    { id: 'step1',   label: t('phase13.nav.step1'),   bold: true },
    { id: 'step2',   label: t('phase13.nav.step2'),   bold: true },
    { id: 'step3',   label: t('phase13.nav.step3'),   bold: true },
    { id: 'step4',   label: t('phase13.nav.step4'),   bold: true },
    { id: 'summary', label: t('phase13.nav.summary'), bold: true },
  ];

  const TEST_DAG_CODE = `"""
Simple Test DAG
===============
ทดสอบว่า Airflow ทำงานได้ปกติ
"""

from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.operators.bash import BashOperator

default_args = {
    'owner': 'test',
    'retries': 1,
    'retry_delay': timedelta(minutes=1),
}

def print_hello():
    print("Hello from Airflow!")
    print("Python operator is working!")
    return "success"

def check_environment():
    import os
    print("Checking environment variables:")
    env_vars = [
        'AWS_ACCESS_KEY_ID',
        'S3_BUCKET_NAME',
        'SNOWFLAKE_ACCOUNT',
        'SNOWFLAKE_USER',
        'SNOWFLAKE_DATABASE',
    ]
    for var in env_vars:
        value = os.getenv(var, 'NOT_SET')
        masked = value[:4] + '***' if value != 'NOT_SET' and len(value) > 4 else value
        print(f"  {var}: {masked}")

with DAG(
    dag_id='test_airflow_setup',
    default_args=default_args,
    description='Test DAG to verify Airflow setup',
    schedule=None,  # Manual trigger only
    start_date=datetime(2024, 1, 1),
    catchup=False,
    tags=['test'],
) as dag:

    hello_task = PythonOperator(
        task_id='say_hello',
        python_callable=print_hello,
    )

    check_env = PythonOperator(
        task_id='check_environment',
        python_callable=check_environment,
    )

    bash_test = BashOperator(
        task_id='bash_test',
        bash_command='echo "Bash operator is working!" && date',
    )

    hello_task >> check_env >> bash_test`;

  const PIPELINE_DAG_CODE = `"""
Movies Data Pipeline DAG
========================
Orchestrates the complete data pipeline:
1. Upload CSV to S3
2. Load data from S3 to Snowflake RAW layer
3. Run dbt staging models
4. Run dbt marts models (Star Schema)
5. Run dbt tests

Schedule: Daily at 6 AM
"""

from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.operators.bash import BashOperator
from airflow.providers.snowflake.operators.snowflake import SnowflakeOperator
import os

# ====================================
# Default Arguments
# ====================================
default_args = {
    'owner': 'data_engineer',
    'depends_on_past': False,
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

# ====================================
# DAG Definition
# ====================================
with DAG(
    dag_id='movies_pipeline',
    default_args=default_args,
    description='Complete Movies Data Pipeline: CSV -> S3 -> Snowflake -> dbt',
    schedule='0 6 * * *',
    start_date=datetime(2024, 1, 1),
    catchup=False,
    tags=['movies', 'etl', 'snowflake', 'dbt'],
) as dag:

    # ====================================
    # Task 1: Upload CSV to S3
    # ====================================
    def upload_csv_to_s3_task():
        """Upload local CSV file to S3 bucket"""
        import sys
        sys.path.insert(0, '/opt/airflow/scripts')
        from upload_to_s3 import upload_to_s3

        print("Starting upload to S3...")
        result = upload_to_s3(add_timestamp=False)
        print(f"Upload completed: {result}")
        return result

    upload_to_s3 = PythonOperator(
        task_id='upload_csv_to_s3',
        python_callable=upload_csv_to_s3_task,
    )

    # ====================================
    # Task 2: Create Snowflake RAW Table
    # ====================================
    create_raw_table = SnowflakeOperator(
        task_id='create_raw_table',
        snowflake_conn_id='snowflake_default',
        sql="""
        CREATE TABLE IF NOT EXISTS movies_db.raw.movies_raw (
            rank NUMBER,
            title VARCHAR(500),
            year NUMBER,
            genres VARCHAR(200),
            director VARCHAR(200),
            main_actors VARCHAR(500),
            country VARCHAR(200),
            imdb_rating FLOAT,
            rotten_tomatoes_pct NUMBER,
            runtime_mins NUMBER,
            language VARCHAR(200),
            oscars_won NUMBER,
            box_office_millions FLOAT,
            metacritic_score NUMBER,
            loaded_at TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP()
        );
        """,
    )

    # ====================================
    # Task 3: Load S3 to Snowflake RAW
    # ====================================
    load_s3_to_snowflake = SnowflakeOperator(
        task_id='load_s3_to_snowflake',
        snowflake_conn_id='snowflake_default',
        sql="""
        TRUNCATE TABLE movies_db.raw.movies_raw;

        COPY INTO movies_db.raw.movies_raw (
            rank, title, year, genres, director,
            main_actors, country, imdb_rating,
            rotten_tomatoes_pct, runtime_mins,
            language, oscars_won, box_office_millions,
            metacritic_score
        )
        FROM @movies_s3_stage/top_100_movies_full_best_effort.csv
        FILE_FORMAT = (
            TYPE = 'CSV'
            FIELD_DELIMITER = ','
            SKIP_HEADER = 1
            FIELD_OPTIONALLY_ENCLOSED_BY = '"'
            NULL_IF = ('', 'NULL', 'null')
            EMPTY_FIELD_AS_NULL = TRUE
            TRIM_SPACE = TRUE
        )
        ON_ERROR = 'CONTINUE';

        SELECT COUNT(*) as total_records FROM movies_db.raw.movies_raw;
        """,
    )

    # ====================================
    # Task 4: dbt deps
    # ====================================
    install_dbt_packages = BashOperator(
        task_id='dbt_install_packages',
        bash_command='cd /opt/airflow/movies_dbt && dbt deps --profiles-dir .',
    )

    # ====================================
    # Task 5: dbt Run Staging Models
    # ====================================
    dbt_run_staging = BashOperator(
        task_id='dbt_run_staging',
        bash_command='cd /opt/airflow/movies_dbt && dbt run --select staging --target dev --profiles-dir .',
    )

    # ====================================
    # Task 6: dbt Run Marts Models
    # ====================================
    dbt_run_marts = BashOperator(
        task_id='dbt_run_marts',
        bash_command='cd /opt/airflow/movies_dbt && dbt run --select marts --target prod --profiles-dir .',
    )

    # ====================================
    # Task 7: dbt Test All Models
    # ====================================
    dbt_test = BashOperator(
        task_id='dbt_test',
        bash_command='cd /opt/airflow/movies_dbt && dbt test --profiles-dir .',
    )

    # ====================================
    # Task 8: Generate dbt Docs
    # ====================================
    dbt_docs_generate = BashOperator(
        task_id='dbt_docs_generate',
        bash_command='cd /opt/airflow/movies_dbt && dbt docs generate --profiles-dir .',
    )

    # ====================================
    # Define Task Dependencies
    # ====================================
    upload_to_s3 >> create_raw_table >> load_s3_to_snowflake >> install_dbt_packages
    install_dbt_packages >> dbt_run_staging >> dbt_run_marts >> dbt_test >> dbt_docs_generate`;

  const SNOWFLAKE_CONN_CODE = `Connection Id:     snowflake_default
Connection Type:   Snowflake
Schema:            RAW
Login:             YOUR_SNOWFLAKE_ACCOUNT
Password:          YOUR_SNOWFLAKE_PASSWORD
Extra Fields Json: {
    "account": "SNOWFLAKE_ACCOUNT",
    "warehouse": "SNOWFLAKE_WAREHOUSE",
    "database": "SNOWFLAKE_DATABASE",
    "role": "ACCOUNTADMIN"
}`;

  return (
    <div style={styles.container}>

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <button onClick={() => navigate('/')} style={styles.backButton}>{t('phase13.backBtn')}</button>
          <div style={styles.phaseCenter}>
            <span style={styles.phaseLabel}>Phase 13</span>
            <h1 style={styles.phaseTitle}>{t('phase13.title')}</h1>
            <p style={styles.phaseSubtitle}>{t('phase13.subtitle')}</p>
            <div style={styles.headerBadges}>
              <span style={styles.badge}>🔄 Airflow</span>
              <span style={styles.badge}>📋 DAG</span>
              <span style={styles.badge}>❄️ Snowflake</span>
              <span style={styles.badge}>⚙️ Orchestration</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── TWO-COLUMN LAYOUT ──────────────────────────────────────────── */}
      <div style={styles.pageLayout}>

        {/* ── SIDEBAR ────────────────────────────────────────────────── */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarCard}>
            <h3 style={styles.sidebarTitle}>{t('phase13.navTitle')}</h3>
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
            <h3 style={styles.sidebarTitle}>{t('phase13.info.title')}</h3>
            {[
              [t('phase13.info.dag1'),     'test_airflow_setup'],
              [t('phase13.info.dag2'),     'movies_pipeline'],
              [t('phase13.info.tasks'),    '8 Tasks'],
              [t('phase13.info.schedule'), 'Daily 6:00 AM'],
              [t('phase13.info.version'),  'v2.10.4'],
              [t('phase13.info.conn'),     'snowflake_default'],
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
                {t('phase13.purpose.heading')}
              </h2>
              <p style={styles.bodyText}>{t('phase13.purpose.desc')}</p>
            </div>
          </section>

          {/* ── STEP 1: test_airflow_setup.py ───────────────────────── */}
          <section id="step1" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#27AE60' }}>1️⃣</span>
                {t('phase13.step1.heading')}
              </h2>

              <InfoBox color="#27AE60">
                {t('phase13.step1.infoText')}
              </InfoBox>

              <p style={styles.bodyText}><strong>{t('phase13.labels.openCmd')}</strong></p>
              <CopyableCode code={`D:\\movies_pipeline> cd dags\ncode test_airflow_setup.py`} />

              <p style={styles.bodyText}><strong>{t('phase13.labels.paste')}</strong></p>
              <CopyableCode code={TEST_DAG_CODE} />
            </div>
          </section>

          {/* ── STEP 2: movies_pipeline_dag.py ──────────────────────── */}
          <section id="step2" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#8E44AD' }}>2️⃣</span>
                {t('phase13.step2.heading')}
              </h2>

              <InfoBox color="#8E44AD">
                {t('phase13.step2.infoText')}
              </InfoBox>

              <p style={styles.bodyText}><strong>{t('phase13.labels.openCmd')}</strong></p>
              <CopyableCode code={`code movies_pipeline_dag.py`} />

              <p style={styles.bodyText}><strong>{t('phase13.step2.tasksLabel')}</strong></p>
              <ul style={styles.bulletList}>
                {[
                  'Task 1: upload_csv_to_s3 — Upload CSV to S3',
                  'Task 2: create_raw_table — Create Snowflake RAW Table',
                  'Task 3: load_s3_to_snowflake — Load S3 to Snowflake RAW',
                  'Task 4: dbt_install_packages — Install dbt Packages (dbt deps)',
                  'Task 5: dbt_run_staging — Run dbt Staging Models',
                  'Task 6: dbt_run_marts — Run dbt Marts Models',
                  'Task 7: dbt_test — Run dbt Tests',
                  'Task 8: dbt_docs_generate — Generate dbt Docs',
                ].map((item, i) => (
                  <li key={i} style={styles.listItem}>{item}</li>
                ))}
              </ul>

              <p style={styles.bodyText}><strong>{t('phase13.step2.depsLabel')}</strong></p>
              <CopyableCode code={`upload_to_s3 >> create_raw_table >> load_s3_to_snowflake >> install_dbt_packages\ninstall_dbt_packages >> dbt_run_staging >> dbt_run_marts >> dbt_test >> dbt_docs_generate`} />

              <p style={styles.bodyText}><strong>{t('phase13.labels.paste')}</strong></p>
              <CopyableCode code={PIPELINE_DAG_CODE} />
            </div>
          </section>

          {/* ── STEP 3: Snowflake Connection ────────────────────────── */}
          <section id="step3" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#E67E22' }}>3️⃣</span>
                {t('phase13.step3.heading')}
              </h2>

              <p style={styles.bodyText}><strong>{t('phase13.step3.openAirflow')}</strong></p>
              <CopyableCode code={`docker compose up`} />

              <p style={styles.bodyText}><strong>{t('phase13.step3.openUI')}</strong></p>
              <CopyableCode code={`http://localhost:8080`} />

              <p style={styles.bodyText}><strong>{t('phase13.step3.loginLabel')}</strong></p>
              <CopyableCode code={`Username: airflow\nPassword: airflow`} />

              <p style={styles.bodyText}><strong>{t('phase13.step3.setupLabel')}</strong></p>
              <ul style={styles.bulletList}>
                <li style={styles.listItem}>{t('phase13.step3.goto')}</li>
                <li style={styles.listItem}>{t('phase13.step3.clickAdd')}</li>
                <li style={styles.listItem}>{t('phase13.step3.fillInfo')}</li>
              </ul>
              <CopyableCode code={SNOWFLAKE_CONN_CODE} />
              <p style={styles.bodyText}><strong>{t('phase13.step3.clickSave')}</strong></p>
            </div>
          </section>

          {/* ── STEP 4: Test DAG ─────────────────────────────────────── */}
          <section id="step4" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: COLOR }}>4️⃣</span>
                {t('phase13.step4.heading')}
              </h2>

              <p style={styles.bodyText}><strong>{t('phase13.step4.step1Label')}</strong></p>
              <p style={styles.bodyText}>{t('phase13.step4.step1Desc')}</p>
              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase13/test_dag_1.png" alt="Airflow DAGs List" style={styles.screenshot} />
              </div>

              <p style={styles.bodyText}><strong>{t('phase13.step4.step2Label')}</strong></p>

              <p style={styles.bodyText}><strong>{t('phase13.step4.step3Label')}</strong></p>
              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase13/test_dag_3_1.png" alt="test_airflow_setup DAG Progress" style={styles.screenshot} />
              </div>
              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase13/test_dag_3_2.png" alt="test_airflow_setup DAG Running" style={styles.screenshot} />
              </div>
              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase13/test_dag_3_3.png" alt="movies_pipeline DAG Complete" style={styles.screenshot} />
              </div>
            </div>
          </section>

          {/* ── SUMMARY ──────────────────────────────────────────────── */}
          <section id="summary" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: COLOR }}>🎉</span>
                {t('phase13.summary.heading')}
              </h2>

              <InfoBox color={COLOR}>
                <strong>✅ Phase 13: DAG Development &amp; Orchestration — COMPLETE!</strong>
                <br />
                {t('phase13.summary.desc')}
              </InfoBox>

              <p style={styles.bodyText}><strong>{t('phase13.summary.whatDone')}</strong></p>
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr style={{ backgroundColor: COLOR + '20' }}>
                      <th style={{ ...styles.th, color: COLOR_DARK }}>{t('phase13.summary.thStep')}</th>
                      <th style={{ ...styles.th, color: COLOR_DARK }}>{t('phase13.summary.thFile')}</th>
                      <th style={{ ...styles.th, color: COLOR_DARK }}>{t('phase13.summary.thDesc')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Step 1', 'dags/test_airflow_setup.py',   t('phase13.summary.row1')],
                      ['Step 2', 'dags/movies_pipeline_dag.py',  t('phase13.summary.row2')],
                      ['Step 3', 'Airflow Admin → Connections',  t('phase13.summary.row3')],
                      ['Step 4', 'Airflow Web UI',               t('phase13.summary.row4')],
                    ].map((r, i) => (
                      <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#eaf4fb' : '#fff' }}>
                        <td style={{ ...styles.td, fontWeight: '700', color: COLOR_DARK }}>{r[0]}</td>
                        <td style={styles.td}><code style={styles.inlineCode}>{r[1]}</code></td>
                        <td style={{ ...styles.td, fontSize: '0.85rem' }}>{r[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <PhaseNavigator currentPhase={13} totalPhases={15} />
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
  header:       { background: 'linear-gradient(135deg, #1565A0 0%, #3498DB 60%, #5DADE2 100%)', padding: '60px 20px', color: 'white' },
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
  navItemActive:{ backgroundColor: '#eaf4fb', color: COLOR_DARK, fontWeight: '600' },
  infoRow:      { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #f0f0f0' },
  infoLabel:    { fontSize: '0.78rem', color: '#666' },
  infoBadge:    { fontSize: '0.75rem', backgroundColor: COLOR + '25', color: COLOR_DARK, padding: '2px 8px', borderRadius: '10px', fontWeight: '600' },

  mainContent:  { flex: 1, minWidth: 0 },
  section:      { marginBottom: '8px' },
  contentCard:  { backgroundColor: 'white', borderRadius: '16px', padding: '36px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', textAlign: 'left' },
  sectionHeading:{ fontSize: '1.6rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', textAlign: 'left', color: '#1a1a2e' },
  sectionBadge: { width: '40px', height: '40px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 },
  bodyText:     { fontSize: '1rem', color: '#444', lineHeight: '1.9', marginBottom: '12px', textAlign: 'left', wordBreak: 'keep-all', overflowWrap: 'break-word' },
  inlineCode:   { backgroundColor: '#eaf4fb', padding: '2px 6px', borderRadius: '4px', fontSize: '0.88em', fontFamily: "'Courier New', monospace", color: '#1565A0' },
  bulletList:   { paddingLeft: '20px', margin: '8px 0 16px', display: 'flex', flexDirection: 'column', gap: '8px', listStyleType: 'disc' },
  listItem:     { fontSize: '0.97rem', color: '#444', lineHeight: '1.8', textAlign: 'left', wordBreak: 'keep-all', overflowWrap: 'break-word' },

  tableWrapper: { overflowX: 'auto', marginBottom: '16px', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' },
  table:        { width: '100%', borderCollapse: 'collapse', fontSize: '0.87rem', backgroundColor: '#fff' },
  th:           { padding: '10px 14px', textAlign: 'left', fontWeight: '700', borderBottom: '2px solid #e0e0e0', whiteSpace: 'nowrap' },
  td:           { padding: '9px 14px', color: '#444', borderBottom: '1px solid #f0f0f0', verticalAlign: 'top' },

  imageWrapper: { margin: '16px 0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
  screenshot:   { maxWidth: '100%', borderRadius: '10px', border: '1px solid #e0e0e0', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },

  scrollTopBtn: { position: 'fixed', bottom: '115px', right: '30px', backgroundColor: COLOR, color: 'white', border: 'none', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem', fontWeight: '700', boxShadow: `0 4px 15px ${COLOR}66`, zIndex: 1000 },
};

export default Phase13Detail;
