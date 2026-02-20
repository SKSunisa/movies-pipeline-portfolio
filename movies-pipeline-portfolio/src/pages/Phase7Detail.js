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

/* ── Highlight specific words in translated text ── */
const highlightWords = (text, words) => {
  if (!text) return text;
  const sorted = [...words].sort((a, b) => b.length - a.length);
  const escaped = sorted.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const parts = text.split(new RegExp(`(${escaped.join('|')})`, 'g'));
  return parts.map((part, i) =>
    words.includes(part) ? <code key={i} style={{ backgroundColor: '#f0f0f0', padding: '2px 6px', borderRadius: '4px', fontSize: '0.88em', fontFamily: "'Courier New', monospace", color: '#e67e22', fontWeight: '700' }}>{part}</code> : part
  );
};

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const Phase7Detail = () => {
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
    { id: 'purpose',          label: t('phase7.nav.purpose'),          bold: true },
    { id: 'concepts',         label: t('phase7.nav.concepts'),         bold: true },
    { id: 'workflow',         label: t('phase7.nav.workflow'),         bold: true },
    { id: 'projectStructure', label: t('phase7.nav.projectStructure'), bold: true },
    { id: 'sqlModel',         label: t('phase7.nav.sqlModel'),         bold: true },
    { id: 'step1',            label: t('phase7.nav.step1'),            bold: true },
    { id: 'step2',            label: t('phase7.nav.step2'),            bold: true },
    { id: 'step3',            label: t('phase7.nav.step3'),            bold: true },
    { id: 'step4',            label: t('phase7.nav.step4'),            bold: true },
    { id: 'step5',            label: t('phase7.nav.step5'),            bold: true },
    { id: 'step6',            label: t('phase7.nav.step6'),            bold: true },
    { id: 'step7',            label: t('phase7.nav.step7'),            bold: true },
    { id: 'step8',            label: t('phase7.nav.step8'),            bold: true },
    { id: 'summary',          label: t('phase7.nav.summary'),          bold: true }
  ];

  const SubHeading = ({ id, title, color }) => (
    <h3 id={id} style={{ ...styles.subHeading, borderLeftColor: color }}>{title}</h3>
  );

  const COLOR = '#E67E22';

  return (
    <div style={styles.container}>

      {/* ── HEADER ── */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <button onClick={() => navigate('/')} style={styles.backButton}>{t('phase7.backBtn')}</button>
          <div style={styles.phaseNumber}>
            <span style={styles.phaseLabel}>Phase 7</span>
            <h1 style={styles.phaseTitle}>{t('phase7.title')}</h1>
            <p style={styles.phaseSubtitle}>{t('phase7.subtitle')}</p>
            <div style={styles.headerBadges}>
              <span style={styles.badge}>🔧 dbt</span>
              <span style={styles.badge}>❄️ Snowflake</span>
              <span style={styles.badge}>📦 dbt-snowflake</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── TWO-COLUMN LAYOUT ── */}
      <div style={styles.pageLayout}>

        {/* ── LEFT SIDEBAR ── */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarCard}>
            <h3 style={styles.sidebarTitle}>{t('phase7.navTitle')}</h3>
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
                {t('phase7.purpose.heading')}
              </h2>
              <p style={styles.bodyText}>{t('phase7.purpose.desc')}</p>
              <p style={styles.bodyText}><strong>{t('phase7.purpose.overviewTitle')}</strong></p>
              <ul style={styles.bulletList}>
                <li style={styles.listItem}>{t('phase7.purpose.o1')}</li>
                <li style={styles.listItem}>{t('phase7.purpose.o2')}</li>
                <li style={styles.listItem}>{t('phase7.purpose.o3')}</li>
                <li style={styles.listItem}>{t('phase7.purpose.o4')}</li>
                <li style={styles.listItem}>{t('phase7.purpose.o5')}</li>
                <li style={styles.listItem}>{t('phase7.purpose.o6')}</li>
                <li style={styles.listItem}>{t('phase7.purpose.o7')}</li>
              </ul>
            </div>
          </section>

          {/* CONCEPTS */}
          <section id="concepts" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="concepts-h" title={t('phase7.concepts.title')} color={COLOR} />
              <p style={styles.bodyText}>{t('phase7.concepts.desc')}</p>
            </div>
          </section>

          {/* WORKFLOW */}
          <section id="workflow" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="workflow-h" title={t('phase7.workflow.title')} color={COLOR} />
              <p style={styles.bodyText}>{t('phase7.workflow.desc')}</p>
              <CopyableCode code={t('phase7.workflow.flow')} />
              <p style={styles.bodyText}><strong>{t('phase7.workflow.layersTitle')}</strong></p>
              <ul style={styles.bulletList}>
                <li style={styles.listItem}>{t('phase7.workflow.raw')}</li>
                <li style={styles.listItem}>{t('phase7.workflow.staging')}</li>
                <li style={styles.listItem}>{t('phase7.workflow.marts')}</li>
              </ul>
              <InfoBox color={COLOR}>
                <p style={styles.infoText}>{t('phase7.workflow.note')}</p>
              </InfoBox>
            </div>
          </section>

          {/* PROJECT STRUCTURE */}
          <section id="projectStructure" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="projectStructure-h" title={t('phase7.projectStructure.title')} color={COLOR} />
              <p style={styles.bodyText}>{t('phase7.projectStructure.desc')}</p>
              <CopyableCode code={`movies_dbt/
├── analyses/
├── dbt_project.yml    ← Main config
├── macros/
├── models/
│   ├── marts/         ← Gold Layer
│   └── staging/       ← Silver Layer
│       └── sources.yml ← Raw data reference
├── seeds/
├── snapshots/
└── tests/`} />
              <p style={styles.bodyText}><strong>{highlightWords(t('phase7.projectStructure.modelsTitle'), ['models/'])}</strong></p>
              <p style={styles.bodyText}>{highlightWords(t('phase7.projectStructure.modelsDesc'), ['models/'])}</p>
              <p style={styles.bodyText}>{highlightWords(t('phase7.projectStructure.stagingDesc'), ['models/staging/'])}</p>
              <p style={styles.bodyText}>{highlightWords(t('phase7.projectStructure.martsDesc'), ['models/marts/'])}</p>
            </div>
          </section>

          {/* SQL MODEL */}
          <section id="sqlModel" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="sqlModel-h" title={t('phase7.sqlModel.title')} color={COLOR} />
              <p style={styles.bodyText}>{t('phase7.sqlModel.desc')}</p>
              <p style={styles.bodyText}><strong>{t('phase7.sqlModel.jinjaTitle')}</strong></p>
              <p style={styles.bodyText}>{t('phase7.sqlModel.jinjaDesc')}</p>
              <p style={styles.bodyText}><strong>{t('phase7.sqlModel.syntaxTitle')}</strong></p>
              <ul style={styles.bulletList}>
                <li style={styles.listItem}><code style={styles.inlineCode}>{'{{ ... }}'}</code> — {t('phase7.sqlModel.s1')}</li>
                <li style={styles.listItem}><code style={styles.inlineCode}>{'{% ... %}'}</code> — {t('phase7.sqlModel.s2')}</li>
                <li style={styles.listItem}><code style={styles.inlineCode}>{'{# ... #}'}</code> — {t('phase7.sqlModel.s3')}</li>
              </ul>
              <p style={styles.bodyText}><strong>{t('phase7.sqlModel.examplesTitle')}</strong></p>
              <CopyableCode code={`-- Example 1: {{ ref() }} - reference another dbt model
SELECT *
FROM {{ ref('stg_movies') }}
-- dbt resolves this to: movies_db.staging.stg_movies

-- Example 2: {{ source() }} - reference raw source data
SELECT *
FROM {{ source('raw', 'movies_raw') }}
-- dbt resolves this to: movies_db.raw.movies_raw

-- Example 3: {{ config() }} - set materialization per model
{{ config(materialized='view') }}

SELECT
    movie_id,
    title,
    year
FROM {{ source('raw', 'movies_raw') }}

-- Example 4: {# comment #} - dbt comment (not sent to Snowflake)
{# This model cleans the raw movies table #}
SELECT *
FROM {{ ref('stg_movies') }}`} />
            </div>
          </section>

          {/* STEP 1 */}
          <section id="step1" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="step1-h" title={t('phase7.step1.title')} color={COLOR} />
              <p style={styles.bodyText}>{t('phase7.step1.desc')}</p>
              <ul style={styles.bulletList}>
                <li style={styles.listItem}>{t('phase7.step1.p1')}</li>
                <li style={styles.listItem}>{t('phase7.step1.p2')}</li>
                <li style={styles.listItem}>{t('phase7.step1.p3')}</li>
                <li style={styles.listItem}>{t('phase7.step1.p4')}</li>
              </ul>
              <p style={styles.bodyText}><strong>{t('phase7.step1.verifyTitle')}</strong></p>
              <CopyableCode code={`-- Verify movies_raw table has data
SELECT COUNT(*) AS row_count
FROM movies_db.raw.movies_raw;
-- Expected: 100 rows`} />
            </div>
          </section>

          {/* STEP 2 */}
          <section id="step2" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="step2-h" title={t('phase7.step2.title')} color={COLOR} />
              <ol style={styles.orderedList}>
                <li style={styles.listItem}>{t('phase7.step2.s1')}</li>
                <li style={styles.listItem}>
                  {t('phase7.step2.s2')}
                  <CopyableCode code={`# Navigate to the project directory
D:
cd movies_pipeline`} />
                </li>
                <li style={styles.listItem}>
                  {t('phase7.step2.s3')}
                  <CopyableCode code={`dir`} />
                </li>
                <li style={styles.listItem}>
                  {t('phase7.step2.s4')}
                  <CopyableCode code={`venv\\Scripts\\activate`} />
                </li>
                <li style={styles.listItem}>
                  {t('phase7.step2.s5')}
                  <CopyableCode code={`python -m pip install --upgrade pip`} />
                </li>
              </ol>
            </div>
          </section>

          {/* STEP 3 */}
          <section id="step3" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="step3-h" title={t('phase7.step3.title')} color={COLOR} />
              <ol style={styles.orderedList}>
                <li style={styles.listItem}>
                  {t('phase7.step3.s1')}
                  <CopyableCode code={`pip show dbt-snowflake`} />
                </li>
                <li style={styles.listItem}>
                  {t('phase7.step3.s2')}
                  <CopyableCode code={`pip install dbt-snowflake==1.8.4`} />
                </li>
                <li style={styles.listItem}>
                  {t('phase7.step3.s3')}
                  <CopyableCode code={`dbt --version`} />
                </li>
              </ol>
            </div>
          </section>

          {/* STEP 4 */}
          <section id="step4" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="step4-h" title={t('phase7.step4.title')} color={COLOR} />
              <p style={styles.bodyText}>{t('phase7.step4.desc')}</p>
              <ol style={styles.orderedList}>
                <li style={styles.listItem}>
                  {t('phase7.step4.s1')}
                  <CopyableCode code={`dbt init movies_dbt`} />
                  <p style={styles.bodyText}><strong>{t('phase7.step4.cmdDesc')}</strong></p>
                  <ul style={styles.bulletList}>
                    <li style={styles.listItem}>{t('phase7.step4.c1')}</li>
                    <li style={styles.listItem}>{t('phase7.step4.c2')}</li>
                    <li style={styles.listItem}>{t('phase7.step4.c3')}</li>
                  </ul>
                  <p style={styles.bodyText}><strong>{t('phase7.step4.questionsTitle')}</strong></p>
                  <ul style={styles.bulletList}>
                    <li style={styles.listItem}>{t('phase7.step4.q1')}</li>
                    <li style={styles.listItem}>{t('phase7.step4.q2')}</li>
                    <li style={styles.listItem}>{t('phase7.step4.q3')}</li>
                    <li style={styles.listItem}>{t('phase7.step4.q4')}</li>
                    <li style={styles.listItem}>{t('phase7.step4.q5')}</li>
                    <li style={styles.listItem}>{t('phase7.step4.q6')}</li>
                    <li style={styles.listItem}>{t('phase7.step4.q7')}</li>
                    <li style={styles.listItem}>{t('phase7.step4.q8')}</li>
                    <li style={styles.listItem}>{t('phase7.step4.q9')}</li>
                    <li style={styles.listItem}>{t('phase7.step4.q10')}</li>
                  </ul>
                  <p style={styles.noteText}>{t('phase7.step4.resultTitle')}</p>
                  <CopyableCode code={t('phase7.step4.result')} />
                </li>
                <li style={styles.listItem}>
                  {t('phase7.step4.s2')}
                  <CopyableCode code={`dbt debug --project-dir movies_dbt`} />
                  <InfoBox color={COLOR}>
                    <p style={styles.infoText}>{t('phase7.step4.successMsg')}</p>
                  </InfoBox>
                </li>
                <li style={styles.listItem}>
                  {t('phase7.step4.s3')}
                  <CopyableCode code={`dir movies_dbt`} />
                </li>
              </ol>
            </div>
          </section>

          {/* STEP 5 */}
          <section id="step5" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="step5-h" title={t('phase7.step5.title')} color={COLOR} />
              <p style={styles.bodyText}>{t('phase7.step5.desc')}</p>
              <p style={styles.bodyText}><strong>{t('phase7.step5.whatTitle')}</strong></p>
              <p style={styles.bodyText}>{t('phase7.step5.whatDesc')}</p>
              <InfoBox color="#E74C3C">
                <p style={styles.infoText}>{t('phase7.step5.securityNote')}</p>
              </InfoBox>
              <p style={styles.bodyText}><strong>{t('phase7.step5.location')}</strong></p>
              <ol style={styles.orderedList}>
                <li style={styles.listItem}>{t('phase7.step5.s1')}</li>
                <li style={styles.listItem}>
                  {t('phase7.step5.s2')}
                  <CopyableCode code={`movies_dbt:
  outputs:
    dev:
      type: snowflake
      account: YOUR_ACCOUNT
      user: YOUR_USER
      password: YOUR_PASSWORD
      role: ACCOUNTADMIN
      database: movies_db
      warehouse: movies_wh
      schema: analytics
      threads: 10
  target: dev`} />
                </li>
                <li style={styles.listItem}>
                  {t('phase7.step5.s3')}
                  <CopyableCode code={`movies_dbt:
  outputs:
    dev:
      type: snowflake
      account: "{{ env_var('SNOWFLAKE_ACCOUNT') }}"
      user: "{{ env_var('SNOWFLAKE_USER') }}"
      password: "{{ env_var('SNOWFLAKE_PASSWORD') }}"
      role: "{{ env_var('SNOWFLAKE_ROLE', 'ACCOUNTADMIN') }}"
      database: "{{ env_var('SNOWFLAKE_DATABASE', 'movies_db') }}"
      warehouse: "{{ env_var('SNOWFLAKE_WAREHOUSE', 'movies_wh') }}"
      schema: staging
      threads: 10
    prod:
      type: snowflake
      account: "{{ env_var('SNOWFLAKE_ACCOUNT') }}"
      user: "{{ env_var('SNOWFLAKE_USER') }}"
      password: "{{ env_var('SNOWFLAKE_PASSWORD') }}"
      role: "{{ env_var('SNOWFLAKE_ROLE', 'ACCOUNTADMIN') }}"
      database: "{{ env_var('SNOWFLAKE_DATABASE', 'movies_db') }}"
      warehouse: "{{ env_var('SNOWFLAKE_WAREHOUSE', 'movies_wh') }}"
      schema: analytics
      threads: 10
  target: dev`} />
                </li>
              </ol>
              <p style={styles.bodyText}><strong>{t('phase7.step5.envTitle')}</strong></p>
              <ul style={styles.bulletList}>
                <li style={styles.listItem}><strong>{t('phase7.step5.devTitle')}</strong> {t('phase7.step5.devDesc')}</li>
                <li style={styles.listItem}><strong>{t('phase7.step5.prodTitle')}</strong> {t('phase7.step5.prodDesc')}</li>
              </ul>
              <InfoBox color={COLOR}>
                <p style={styles.infoText}>{t('phase7.step5.targetNote')}</p>
              </InfoBox>
              <ol style={{ ...styles.orderedList, counterReset: 'none' }}>
                <li style={styles.listItem}>{t('phase7.step5.s4')}</li>
                <li style={styles.listItem}>
                  {t('phase7.step5.s5')}
                  <CopyableCode code={`type C:\\Users\\YourName\\.dbt\\profiles.yml`} />
                </li>
                <li style={styles.listItem}>
                  {t('phase7.step5.s6')}
                  <CopyableCode code={`dbt debug --project-dir movies_dbt`} />
                </li>
              </ol>
            </div>
          </section>

          {/* STEP 6 */}
          <section id="step6" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="step6-h" title={t('phase7.step6.title')} color={COLOR} />
              <p style={styles.bodyText}>{t('phase7.step6.desc')}</p>
              <ol style={styles.orderedList}>
                <li style={styles.listItem}>{t('phase7.step6.s1')}</li>
                <li style={styles.listItem}>
                  {t('phase7.step6.s2')}
                  <p style={styles.noteText}>{t('phase7.step6.s2Before')}</p>
                  <CopyableCode code={`models:
  movies_dbt:
    # Add your model-level configs here
    # Example:
    #   +materialized: table`} />
                  <p style={styles.noteText}>{t('phase7.step6.s2After')}</p>
                  <CopyableCode code={`models:
  movies_dbt:
    staging:
      +materialized: view
      +schema: staging
    marts:
      +materialized: table
      +schema: marts`} />
                </li>
                <li style={styles.listItem}>
                  {t('phase7.step6.s3')}
                  <p style={styles.noteText}>{t('phase7.step6.s3Before')}</p>
                  <CopyableCode code={`name: 'movies_dbt'
version: '1.0.0'

profile: 'movies_dbt'

model-paths: ["models"]
analysis-paths: ["analyses"]
test-paths: ["tests"]
seed-paths: ["seeds"]
macro-paths: ["macros"]
snapshot-paths: ["snapshots"]

clean-targets:
  - "target"
  - "dbt_packages"`} />
                  <p style={styles.noteText}>{t('phase7.step6.s3After')}</p>
                  <CopyableCode code={`name: 'movies_dbt'       # ← must match profile name
version: '1.0.0'

profile: 'movies_dbt'

model-paths: ["models"]
analysis-paths: ["analyses"]
test-paths: ["tests"]
seed-paths: ["seeds"]
macro-paths: ["macros"]
snapshot-paths: ["snapshots"]

clean-targets:
  - "target"
  - "dbt_packages"

models:
  movies_dbt:
    staging:
      +materialized: view    # ← VIEW (no data stored)
      +schema: staging
    marts:
      +materialized: table   # ← TABLE (data stored)
      +schema: marts`} />
                </li>
              </ol>
              <InfoBox color={COLOR}>
                <p style={styles.infoText}>{t('phase7.step6.configNote1')}</p>
                <p style={styles.infoText}>{t('phase7.step6.configNote2')}</p>
                <p style={styles.infoText}>{t('phase7.step6.configNote3')}</p>
                <p style={styles.infoText}>{t('phase7.step6.configNote4')}</p>
                <p style={styles.infoText}>{t('phase7.step6.configNote5')}</p>
              </InfoBox>
            </div>
          </section>

          {/* STEP 7 */}
          <section id="step7" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="step7-h" title={t('phase7.step7.title')} color={COLOR} />
              <p style={styles.bodyText}>{t('phase7.step7.desc')}</p>
              <p style={styles.bodyText}><strong>{t('phase7.step7.benefitTitle')}</strong></p>
              <p style={styles.bodyText}>{t('phase7.step7.benefitDesc')}</p>
              <CopyableCode code={`-- Without sources.yml (long):
SELECT * FROM movies_db.raw.movies_raw

-- With sources.yml (short alias):
SELECT * FROM {{ source('raw', 'movies_raw') }}`} />
              <ol style={styles.orderedList}>
                <li style={styles.listItem}>
                  {t('phase7.step7.s1')}
                  <CopyableCode code={`cd movies_dbt\\models\\staging`} />
                </li>
                <li style={styles.listItem}>
                  {t('phase7.step7.s2')}
                  <CopyableCode code={`# models/staging/sources.yml
version: 2

sources:
  - name: raw
    database: movies_db
    schema: raw
    tables:
      - name: movies_raw
        description: "Raw movies data from IMDb Top 100"
        columns:
          - name: rank
            description: "Movie ranking"
            tests:
              - not_null
              - unique
          - name: title
            description: "Movie title"
            tests:
              - not_null
          - name: year
            description: "Release year"
          - name: rating
            description: "IMDb rating"
          - name: duration
            description: "Movie duration in minutes"
          - name: genre
            description: "Movie genre(s), pipe-separated"
          - name: metascore
            description: "Metacritic score"
          - name: description
            description: "Movie description"
          - name: director
            description: "Director name(s)"
          - name: star1
            description: "Lead actor 1"
          - name: star2
            description: "Lead actor 2"
          - name: star3
            description: "Lead actor 3"
          - name: star4
            description: "Lead actor 4"
          - name: votes
            description: "Number of votes"
          - name: gross
            description: "Box office revenue"`} />
                </li>
                <li style={styles.listItem}>{t('phase7.step7.s3')}</li>
              </ol>
            </div>
          </section>

          {/* STEP 8 */}
          <section id="step8" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="step8-h" title={t('phase7.step8.title')} color={COLOR} />
              <p style={styles.bodyText}>{t('phase7.step8.desc')}</p>
              <ol style={styles.orderedList}>
                <li style={styles.listItem}>
                  {t('phase7.step8.s1')}
                  <CopyableCode code={`dbt compile --project-dir movies_dbt`} />
                </li>
              </ol>
              <p style={styles.bodyText}><strong>{t('phase7.step8.resultTitle')}</strong></p>
              <p style={styles.bodyText}>{t('phase7.step8.resultDesc')}</p>
              <InfoBox color={COLOR}>
                <p style={styles.infoText}>{t('phase7.step8.successNote')}</p>
              </InfoBox>
            </div>
          </section>

          {/* SUMMARY */}
          <section id="summary" style={styles.section}>
            <div style={{ ...styles.contentCard, background: 'linear-gradient(135deg, #E67E22 0%, #ca6c17 50%, #a85810 100%)', color: 'white' }}>
              <h2 style={{ ...styles.sectionHeading, color: 'white', marginBottom: '8px' }}>
                ✅ {t('phase7.summary.title')}
              </h2>
              <p style={{ ...styles.bodyText, color: 'rgba(255,255,255,0.9)', marginBottom: '24px' }}>
                {t('phase7.summary.subtitle')}
              </p>
              <div style={styles.summaryGrid}>
                {[
                  { icon: '📦', ti: 'item1Title', di: 'item1Desc' },
                  { icon: '🚀', ti: 'item2Title', di: 'item2Desc' },
                  { icon: '🔗', ti: 'item3Title', di: 'item3Desc' },
                  { icon: '🔧', ti: 'item4Title', di: 'item4Desc' },
                  { icon: '📝', ti: 'item5Title', di: 'item5Desc' },
                  { icon: '📋', ti: 'item6Title', di: 'item6Desc' },
                  { icon: '✅', ti: 'item7Title', di: 'item7Desc' },
                  { icon: '🧪', ti: 'item8Title', di: 'item8Desc' }
                ].map((item, i) => (
                  <div key={i} style={styles.summaryItem}>
                    <span style={styles.summaryIcon}>{item.icon}</span>
                    <div>
                      <div style={styles.summaryItemTitle}>{t(`phase7.summary.${item.ti}`)}</div>
                      <div style={styles.summaryItemDesc}>{t(`phase7.summary.${item.di}`)}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={styles.nextBox}>
                <h3 style={styles.nextTitle}>{t('phase7.summary.nextTitle')}</h3>
                <p style={styles.nextDesc}>{t('phase7.summary.nextDesc')}</p>
              </div>
            </div>
          </section>

          {/* NAV BUTTONS */}
          <div style={styles.section}>
            <div style={styles.navButtons}>
              <button onClick={() => navigate('/phase/6')} style={styles.navBtn}>{t('phase7.navBtn.prev')}</button>
              <button onClick={() => navigate('/phase/8')} style={{ ...styles.navBtn, ...styles.navBtnNext }}>{t('phase7.navBtn.next')}</button>
            </div>
          </div>

          <PhaseNavigator currentPhase={7} totalPhases={15} />
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
  header: { background: 'linear-gradient(135deg, #E67E22 0%, #ca6c17 60%, #a85810 100%)', padding: '60px 20px', color: 'white' },
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
  sidebarTitle: { fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#E67E22', marginBottom: '16px', borderBottom: '2px solid #E67E22', paddingBottom: '8px' },
  navItem: { display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', padding: '8px 12px', border: 'none', borderRadius: '8px', cursor: 'pointer', backgroundColor: 'transparent', color: '#555', transition: 'all 0.2s ease', marginBottom: '2px', lineHeight: '1.4' },
  navItemActive: { backgroundColor: '#FEF0E4', color: '#E67E22', fontWeight: '600' },
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
  imageWrapper: { margin: '16px 0', textAlign: 'center' },
  screenshot: { maxWidth: '100%', borderRadius: '10px', border: '1px solid #e0e0e0', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  imageCaption: { fontSize: '0.85rem', color: '#888', marginTop: '8px', textAlign: 'center', fontStyle: 'italic' },
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
  navBtnNext: { backgroundColor: '#E67E22', color: 'white', border: '2px solid #E67E22' },
  scrollTopBtn: { position: 'fixed', bottom: '115px', right: '30px', backgroundColor: '#E67E22', color: 'white', border: 'none', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem', fontWeight: '700', boxShadow: '0 4px 15px rgba(230,126,34,0.4)', zIndex: 1000 }
};

export default Phase7Detail;
