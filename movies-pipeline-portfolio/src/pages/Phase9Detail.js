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

const COLOR = '#8E44AD';

/* ════════════════════════════════════════════════════════════════════════════
   Phase 9 Detail Page
════════════════════════════════════════════════════════════════════════════ */
const Phase9Detail = () => {
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
    { id: 'purpose',      label: t('phase9.nav.purpose'),      bold: true  },
    { id: 'overview',     label: t('phase9.nav.overview'),      bold: true  },
    { id: 'step1',        label: t('phase9.nav.step1'),         bold: true  },
    { id: 'step1-verify', label: t('phase9.nav.step1Verify'),   bold: false },
    { id: 'step2',        label: t('phase9.nav.step2'),         bold: true  },
    { id: 'step2-verify', label: t('phase9.nav.step2Verify'),   bold: false },
    { id: 'step3',        label: t('phase9.nav.step3'),         bold: true  },
    { id: 'step4',        label: t('phase9.nav.step4'),         bold: true  },
    { id: 'step5',        label: t('phase9.nav.step5'),         bold: true  },
    { id: 'summary',      label: t('phase9.nav.summary'),       bold: true  },
  ];

  return (
    <div style={styles.container}>

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <button onClick={() => navigate('/')} style={styles.backButton}>{t('phase9.backBtn')}</button>
          <div style={styles.phaseNumber}>
            <span style={styles.phaseLabel}>Phase 9</span>
            <h1 style={styles.phaseTitle}>{t('phase9.title')}</h1>
            <p style={styles.phaseSubtitle}>{t('phase9.subtitle')}</p>
            <div style={styles.headerBadges}>
              <span style={styles.badge}>🔧 dbt</span>
              <span style={styles.badge}>❄️ Snowflake</span>
              <span style={styles.badge}>🧹 Data Cleansing</span>
              <span style={styles.badge}>📊 Data Quality</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── TWO-COLUMN LAYOUT ──────────────────────────────────────────── */}
      <div style={styles.pageLayout}>

        {/* ── SIDEBAR (LEFT) ─────────────────────────────────────────── */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarCard}>
            <h3 style={styles.sidebarTitle}>{t('phase9.navTitle')}</h3>
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
            <h3 style={styles.sidebarTitle}>{t('phase9.info.title')}</h3>
            {[
              [t('phase9.info.models'), '3 models'],
              [t('phase9.info.inputRows'), '100 rows'],
              [t('phase9.info.outputRows'), '95 rows'],
              [t('phase9.info.duplicatesRemoved'), '5 pairs'],
              [t('phase9.info.newColumns'), '6 derived'],
              [t('phase9.info.tool'), 'dbt + Snowflake'],
            ].map(([label, val]) => (
              <div key={label} style={styles.infoRow}>
                <span style={styles.infoLabel}>{label}</span>
                <span style={styles.infoBadge}>{val}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* ── MAIN CONTENT (RIGHT) ───────────────────────────────────── */}
        <main style={styles.mainContent}>

          {/* ── จุดประสงค์ ─────────────────────────────────────────────── */}
          <section id="purpose" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: COLOR }}>🎯</span>
                {t('phase9.purpose.heading')}
              </h2>
              <p style={styles.bodyText}>
                {t('phase9.purpose.desc')} <strong>Staging Layer</strong>
              </p>
              <ol style={styles.orderedList}>
                <li style={styles.listItem}>{t('phase9.purpose.o1')} <code style={styles.inlineCode}>RAW</code> schema</li>
                <li style={styles.listItem}>{t('phase9.purpose.o2')}</li>
                <li style={styles.listItem}>{t('phase9.purpose.o3')}</li>
                <li style={styles.listItem}>{t('phase9.purpose.o4')}</li>
              </ol>
              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase9/objective.svg" alt="Phase 9 Architecture" style={styles.screenshot} />
              </div>
            </div>
          </section>

          {/* ── Overview ───────────────────────────────────────────────── */}
          <section id="overview" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: COLOR }}>📋</span>
                {t('phase9.overview.heading')}
              </h2>

              <h3 style={{ ...styles.subHeading, borderLeftColor: COLOR }}>{t('phase9.overview.subh1')}</h3>
              <p style={styles.bodyText}>{t('phase9.overview.desc1')}</p>

              <p style={{ ...styles.bodyText, fontWeight: '700' }}>{t('phase9.overview.problem1')}</p>
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr style={{ backgroundColor: COLOR + '22' }}>
                      <th style={styles.th}>{t('phase9.overview.thCol')}</th>
                      <th style={styles.th}>{t('phase9.overview.thCount')}</th>
                      <th style={styles.th}>{t('phase9.overview.thPct')}</th>
                      <th style={styles.th}>{t('phase9.overview.thNote')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Metacritic Score', 50, '50%', '#e74c3c', t('phase9.overview.note1')],
                      ['Box Office ($M)', 17, '17%', '#e67e22', t('phase9.overview.note2')],
                      ['Rotten Tomatoes %', 3, '3%', '#27ae60', t('phase9.overview.note3')],
                      ['IMDb Rating', 1, '1%', '#27ae60', t('phase9.overview.note4')],
                      ['Runtime (mins)', 1, '1%', '#27ae60', t('phase9.overview.note5')],
                    ].map(([col, cnt, pct, pctColor, note], i) => (
                      <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#fafafa' : '#fff' }}>
                        <td style={{ ...styles.td, fontWeight: i === 0 ? '700' : '400' }}>{col}</td>
                        <td style={styles.td}>{cnt}</td>
                        <td style={{ ...styles.td, color: pctColor, fontWeight: '700' }}>{pct}</td>
                        <td style={{ ...styles.td, fontSize: '0.82rem' }}>{note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p style={{ ...styles.bodyText, fontWeight: '700', marginTop: '20px' }}>{t('phase9.overview.problem2')}</p>
              <p style={styles.bodyText}>{t('phase9.overview.problem2Desc')}</p>
              <CopyableCode code={`rank    title                          year
76      Paths of Glory                 1957
92      Paths of Glory                 1957
45      Rashomon                       1950
79      Rashomon                       1950
73      The Bridge on the River Kwai   1957
97      The Bridge on the River Kwai   1957
43      The Great Dictator             1940
75      The Great Dictator             1940
47      The Third Man                  1949
71      The Third Man                  1949`} />

              <h3 style={{ ...styles.subHeading, borderLeftColor: COLOR, marginTop: '28px' }}>{t('phase9.overview.subh2')}</h3>
              <p style={styles.bodyText}>{t('phase9.overview.subh2Desc')} <code style={styles.inlineCode}>models/staging/</code></p>
              <CopyableCode code={`models/staging/
│
├── sources.yml               ✅ มีแล้ว (Phase 7)
├── schema.yml                ▶️ ทำในเฟสนี้ (Phase 9)
│
├── stg_movies_cleaned.sql    ▶️ STEP 1: STAGING Layer 1 Basic Cleaning
├── stg_movies_enriched.sql   ▶️ STEP 2: STAGING Layer 2 Business Logic
└── data_quality_report.sql   ▶️ STEP 3: Quality Metrics`} />

              <div style={styles.threeCards}>
                {[
                  { num: '1', title: 'stg_movies_cleaned.sql',  desc: t('phase9.overview.m1Desc'), color: '#3498db' },
                  { num: '2', title: 'stg_movies_enriched.sql', desc: t('phase9.overview.m2Desc'), color: '#27ae60' },
                  { num: '3', title: 'data_quality_report.sql', desc: t('phase9.overview.m3Desc'), color: COLOR },
                ].map((c) => (
                  <div key={c.num} style={{ ...styles.modelCard, borderTopColor: c.color }}>
                    <div style={{ ...styles.modelNum, backgroundColor: c.color }}>{c.num}</div>
                    <p style={{ ...styles.modelTitle, color: c.color }}>{c.title}</p>
                    <p style={styles.modelDesc}>{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Step 1: stg_movies_cleaned.sql ─────────────────────────── */}
          <section id="step1" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#3498db' }}>1️⃣</span>
                {t('phase9.step1.heading')}
              </h2>

              <InfoBox color="#3498db">
                <strong>{t('phase9.step1.infoHeading')}</strong>
                <p style={{ margin: '8px 0 0' }}>{t('phase9.step1.infoDesc')}</p>
                <ol style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
                  <li>{t('phase9.step1.i1')}</li>
                  <li>{t('phase9.step1.i2')}</li>
                  <li>{t('phase9.step1.i3')}</li>
                  <li>{t('phase9.step1.i4')} <code style={styles.inlineCode}>nullif()</code></li>
                  <li>{t('phase9.step1.i5')} <code style={styles.inlineCode}>QUALIFY</code></li>
                </ol>
              </InfoBox>

              <h4 style={{ ...styles.subHeading2, borderLeftColor: '#3498db' }}>{t('phase9.step1.subh')}</h4>

              <p style={styles.bodyText}><strong>{t('phase9.step1.s1')}</strong></p>
              <CopyableCode code={`cd D:\\movies_pipeline\\movies_dbt
code models\\staging\\stg_movies_cleaned.sql`} />

              <p style={styles.bodyText}><strong>{t('phase9.step1.s2')}</strong></p>
              <CopyableCode code={`{{
    config(
        materialized='view',
        schema='staging'
    )
}}

-- =============================================================================
-- MODEL: stg_movies_cleaned
-- PURPOSE: Layer 1 - Basic data cleaning + Remove duplicates
-- INPUT: {{ source('raw', 'movies_raw') }}
-- OUTPUT: Clean columns, trimmed strings, NULL preserved, NO duplicates
-- ROWS: 95 (removed 5 duplicate pairs = 10 rows)
-- =============================================================================

with source as (
    select * from {{ source('raw', 'movies_raw') }}
),

basic_cleaning as (
    select
        -- PRIMARY KEY
        rank as movie_id,

        -- MOVIE INFORMATION
        trim(regexp_replace(title, ' \\(dup\\d*\\)', '')) as movie_title,
        year as release_year,

        -- RATINGS & PERFORMANCE (Keep NULL as-is, don't convert to 0)
        imdb_rating,
        rotten_tomatoes_pct,
        metacritic_score,

        -- MOVIE DETAILS
        runtime_mins,
        oscars_won,
        box_office_millions,

        -- MULTI-VALUE FIELDS (Trim + Convert empty strings to NULL)
        nullif(trim(genres), '')      as genres_raw,
        nullif(trim(director), '')    as director_raw,
        nullif(trim(main_actors), '') as actors_raw,
        nullif(trim(country), '')     as country_raw,
        nullif(trim(language), '')    as language_raw,

        -- METADATA
        loaded_at,
        current_timestamp() as dbt_updated_at

    from source

    -- DATA QUALITY FILTER
    where rank is not null
      and title is not null
      and year is not null

    -- REMOVE DUPLICATES using QUALIFY + ROW_NUMBER()
    qualify row_number() over (
        partition by trim(regexp_replace(title, ' \\(dup\\d*\\)', '')), year
        order by rank
    ) = 1
    -- Result: 100 rows → 95 rows (removed 5 duplicate pairs = 10 rows)
)

select * from basic_cleaning`} />

              <p style={styles.bodyText}><strong>{t('phase9.step1.s3')}</strong></p>
              <CopyableCode code={`dbt compile --select stg_movies_cleaned
# การ Compile คือ การแปลงจาก Jinja ให้เป็น SQL
# ไม่รันใน Snowflake! (แค่ check syntax)`} />

              <p style={styles.bodyText}><strong>{t('phase9.step1.s4')}</strong></p>
              <CopyableCode code={`dbt run --select stg_movies_cleaned`} />

              <p style={styles.bodyText}><strong>{t('phase9.step1.result')}</strong></p>
              <CopyableCode code={`09:10:37  Running with dbt=1.8.7
09:10:38  Registered adapter: snowflake=1.8.4
09:10:38  Found 5 data tests, 2 models, 1 source, 522 macros
09:10:38  Concurrency: 10 threads (target='prod')
09:10:40  1 of 1 START sql view model analytics_staging.stg_movies_cleaned ... [RUN]
09:10:40  1 of 1 OK created sql view model analytics_staging.stg_movies_cleaned [SUCCESS 1 in 0.83s]
09:10:41  Completed successfully
09:10:41  Done. PASS=1 WARN=0 ERROR=0 SKIP=0 NO-OP=0 TOTAL=1`} />

              <InfoBox color="#f39c12">
                <strong>{t('phase9.step1.warning')}</strong>
              </InfoBox>
            </div>
          </section>

          {/* ── Verify Step 1 ───────────────────────────────────────────── */}
          <section id="step1-verify" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#3498db' }}>✅</span>
                {t('phase9.step1Verify.heading')}
              </h2>
              <p style={styles.bodyText}>
                <strong>{t('phase9.step1Verify.goal')}</strong>
              </p>

              <InfoBox color={COLOR}>
                <strong>{t('phase9.step1Verify.infoTitle')}</strong><br />
                {t('phase9.step1Verify.infoDesc')}
              </InfoBox>

              <h4 style={{ ...styles.subHeading2, borderLeftColor: '#3498db' }}>{t('phase9.step1Verify.subh1')}</h4>

              <p style={styles.bodyText}><strong>{t('phase9.step1Verify.v1')}</strong></p>
              <CopyableCode code={`USE DATABASE movies_db;
USE SCHEMA raw;
SELECT COUNT(*) FROM movies_raw;
-- Expected: 100`} />
              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase9/Part1_raw_schema_validation.png" alt="Total Rows = 100" style={styles.screenshot} />
                <p style={styles.imgCaption}>{t('phase9.step1Verify.cap1')}</p>
              </div>

              <p style={styles.bodyText}><strong>{t('phase9.step1Verify.v2')}</strong></p>
              <CopyableCode code={`SELECT * FROM movies_raw LIMIT 5;`} />
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr style={{ backgroundColor: '#3498db22' }}>
                      {['RANK','TITLE','YEAR','GENRES','DIRECTOR','MAIN_ACTORS','COUNTRY'].map(h => <th key={h} style={styles.th}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [1,'The Shawshank Redemption',1994,'Drama','Frank Darabont','Tim Robbins|Morgan Freeman','United States'],
                      [2,'The Godfather',1972,'Crime|Drama','Francis Ford Coppola','Marlon Brando|Al Pacino','United States'],
                      [3,'The Dark Knight',2008,'Action|Crime|Drama','Christopher Nolan','Christian Bale|Heath Ledger','United States|United Kingdom'],
                      [4,'The Godfather: Part II',1974,'Crime|Drama','Francis Ford Coppola','Al Pacino|Robert De Niro','United States'],
                      [5,'12 Angry Men',1957,'Crime|Drama','Sidney Lumet','Henry Fonda|Lee J. Cobb','United States'],
                    ].map((r, i) => (
                      <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#f9f9ff' : '#fff' }}>
                        {r.map((c, j) => <td key={j} style={styles.td}>{c}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p style={styles.bodyText}><strong>{t('phase9.step1Verify.v3')}</strong></p>
              <CopyableCode code={`SELECT
    COUNT(*) as total_rows,
    COUNT(metacritic_score) as has_metacritic,
    COUNT(*) - COUNT(metacritic_score) as missing_metacritic,
    COUNT(box_office_millions) as has_box_office,
    COUNT(*) - COUNT(box_office_millions) as missing_box_office,
    COUNT(rotten_tomatoes_pct) as has_rt,
    COUNT(*) - COUNT(rotten_tomatoes_pct) as missing_rt,
    COUNT(imdb_rating) as has_imdb,
    COUNT(*) - COUNT(imdb_rating) as missing_imdb,
    COUNT(runtime_mins) as has_runtime,
    COUNT(*) - COUNT(runtime_mins) as missing_runtime
FROM movies_raw;`} />
              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase9/Check_for_NULL_values.png" alt="NULL Check Results" style={styles.screenshot} />
                <p style={styles.imgCaption}>{t('phase9.step1Verify.cap2')}</p>
              </div>

              <p style={styles.bodyText}><strong>{t('phase9.step1Verify.v4')}</strong></p>
              <CopyableCode code={`SELECT
    trim(regexp_replace(title, ' \\(dup\\d*\\)', '')) as clean_title,
    year,
    COUNT(*) as duplicate_count,
    LISTAGG(rank, ', ') WITHIN GROUP (ORDER BY rank) as ranks,
    LISTAGG(title, ' | ') WITHIN GROUP (ORDER BY rank) as titles
FROM movies_raw
GROUP BY clean_title, year
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC, clean_title;`} />
              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase9/Duplicate_Analysis.png" alt="Duplicate Analysis" style={styles.screenshot} />
                <p style={styles.imgCaption}>{t('phase9.step1Verify.cap3')}</p>
              </div>

              <p style={styles.bodyText}><strong>{t('phase9.step1Verify.v5')}</strong></p>
              <CopyableCode code={`SELECT COUNT(DISTINCT trim(regexp_replace(title, ' \\(dup\\d*\\)', ''))) as unique_titles
FROM movies_raw;
-- Expected: 95`} />
              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase9/Unique_Titles.png" alt="Unique Titles = 95" style={styles.screenshot} />
              </div>

              <h4 style={{ ...styles.subHeading2, borderLeftColor: '#3498db', marginTop: '28px' }}>{t('phase9.step1Verify.subh2')}</h4>

              <p style={styles.bodyText}><strong>{t('phase9.step1Verify.a1')}</strong></p>
              <CopyableCode code={`USE SCHEMA analytics_staging;
SELECT COUNT(*) as total_rows FROM stg_movies_cleaned;
-- Expected: 95`} />
              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase9/analytics_staging_Total_Rows.png" alt="analytics_staging Total Rows = 95" style={styles.screenshot} />
              </div>

              <p style={styles.bodyText}><strong>{t('phase9.step1Verify.a3')}</strong></p>
              <CopyableCode code={`SELECT
    COUNT(*) as total_rows,
    COUNT(movie_id) as has_id,      COUNT(*) - COUNT(movie_id) as missing_id,
    COUNT(movie_title) as has_title, COUNT(*) - COUNT(movie_title) as missing_title,
    COUNT(release_year) as has_year, COUNT(*) - COUNT(release_year) as missing_year
FROM stg_movies_cleaned;`} />

              <p style={styles.bodyText}><strong>{t('phase9.step1Verify.a4')}</strong></p>
              <CopyableCode code={`SELECT movie_title, release_year, COUNT(*) as count
FROM stg_movies_cleaned
GROUP BY movie_title, release_year
HAVING COUNT(*) > 1;
-- Expected: Query produced no results`} />

              <p style={styles.bodyText}><strong>{t('phase9.step1Verify.a5')}</strong></p>
              <CopyableCode code={`SELECT COUNT(DISTINCT movie_title) as unique_titles
FROM stg_movies_cleaned;
-- Expected: 95`} />
              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase9/analytics_staging_Unique_Titles.png" alt="analytics_staging Unique Titles = 95" style={styles.screenshot} />
              </div>
            </div>
          </section>

          {/* ── Step 2: stg_movies_enriched.sql ────────────────────────── */}
          <section id="step2" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#27ae60' }}>2️⃣</span>
                {t('phase9.step2.heading')}
              </h2>

              <InfoBox color="#27ae60">
                <strong>{t('phase9.step2.infoHeading')}</strong>
                <p style={{ margin: '8px 0 0' }}>{t('phase9.step2.infoDesc')}</p>
                <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
                  <li>{t('phase9.step2.ib1')} <code style={styles.inlineCode}>'Unknown'</code></li>
                  <li>{t('phase9.step2.ib2')} <code style={styles.inlineCode}>0</code></li>
                  <li>{t('phase9.step2.ib3')}</li>
                </ul>
              </InfoBox>

              <h4 style={{ ...styles.subHeading2, borderLeftColor: '#27ae60' }}>{t('phase9.step2.subh')}</h4>
              <p style={styles.bodyText}><strong>{t('phase9.step2.s1')}</strong></p>
              <CopyableCode code={`cd D:\\movies_pipeline\\movies_dbt
code models\\staging\\stg_movies_enriched.sql`} />

              <p style={styles.bodyText}><strong>{t('phase9.step2.s2')}</strong></p>
              <CopyableCode code={`{{
    config(
        materialized='view',
        schema='staging'
    )
}}

-- =============================================================================
-- MODEL: stg_movies_enriched
-- PURPOSE: Layer 2 - Handle NULL values and create business logic columns
-- INPUT: {{ ref('stg_movies_cleaned') }}
-- OUTPUT: Ready-to-use data with defaults and derived categories
-- ROWS: 95 (same as input)
-- =============================================================================

with base as (
    select * from {{ ref('stg_movies_cleaned') }}
),

enriched as (
    select
        movie_id, movie_title, release_year,

        -- TEXT FIELDS - Replace NULL with 'Unknown'
        coalesce(director_raw, 'Unknown') as director,
        coalesce(country_raw,  'Unknown') as country,
        coalesce(language_raw, 'Unknown') as language,

        -- MULTI-VALUE FIELDS (keep _raw for Phase 10 splitting)
        genres_raw,
        actors_raw,
        country_raw  as country_list,
        language_raw as language_list,

        -- NUMERIC FIELDS - Replace NULL with 0
        coalesce(runtime_mins, 0)        as runtime_mins,
        coalesce(oscars_won, 0)          as oscars_won,

        -- RATINGS - Keep NULL (no data ≠ score of 0)
        imdb_rating, rotten_tomatoes_pct, metacritic_score,

        -- FINANCIAL - Replace NULL with 0
        coalesce(box_office_millions, 0) as box_office_millions,

        -- DERIVED: Rating Category
        case
            when imdb_rating >= 9.0 then 'Masterpiece'
            when imdb_rating >= 8.5 then 'Excellent'
            when imdb_rating >= 8.0 then 'Very Good'
            when imdb_rating >= 7.5 then 'Good'
            when imdb_rating is not null then 'Average'
            else 'No Rating'
        end as rating_category,

        -- DERIVED: Box Office Category
        case
            when box_office_millions >= 1000 then 'Blockbuster'
            when box_office_millions >= 500  then 'Major Hit'
            when box_office_millions >= 100  then 'Hit'
            when box_office_millions > 0     then 'Modest'
            else 'Unknown'
        end as box_office_category,

        -- DERIVED: Awards Category
        case
            when oscars_won >= 5 then 'Oscar Winner (5+)'
            when oscars_won >= 3 then 'Oscar Winner (3-4)'
            when oscars_won >= 1 then 'Oscar Winner (1-2)'
            else 'No Oscar'
        end as oscar_category,

        -- DERIVED: Decade
        floor(release_year / 10) * 10 as decade,

        -- DERIVED: Era Classification
        case
            when release_year >= 2010 then 'Modern Era (2010s+)'
            when release_year >= 2000 then '2000s'
            when release_year >= 1990 then '1990s'
            when release_year >= 1980 then '1980s'
            when release_year >= 1970 then '1970s'
            when release_year >= 1960 then '1960s'
            when release_year >= 1950 then '1950s'
            when release_year >= 1940 then '1940s'
            when release_year >= 1930 then '1930s'
            else 'Classic Era (<1930)'
        end as era,

        -- DERIVED: Runtime Category
        case
            when runtime_mins >= 180 then 'Epic (3+ hours)'
            when runtime_mins >= 150 then 'Long (2.5-3 hours)'
            when runtime_mins >= 120 then 'Standard (2-2.5 hours)'
            when runtime_mins >= 90  then 'Short (1.5-2 hours)'
            when runtime_mins > 0    then 'Very Short (<1.5 hours)'
            else 'Unknown'
        end as runtime_category,

        loaded_at, dbt_updated_at

    from base
)

select * from enriched`} />

              <p style={styles.bodyText}><strong>{t('phase9.step2.s3')}</strong></p>
              <CopyableCode code={`dbt compile --select stg_movies_enriched`} />
              <p style={styles.bodyText}><strong>{t('phase9.step2.s4')}</strong></p>
              <CopyableCode code={`dbt run --select stg_movies_enriched`} />

              <h4 style={{ ...styles.subHeading2, borderLeftColor: '#27ae60', marginTop: '20px' }}>{t('phase9.step2.derivedTitle')}</h4>
              <div style={styles.derivedGrid}>
                {[
                  { name: 'rating_category',    basis: t('phase9.step2.d1Basis'), values: 'Masterpiece · Excellent · Very Good · Good · Average · No Rating' },
                  { name: 'box_office_category', basis: t('phase9.step2.d2Basis'), values: 'Blockbuster · Major Hit · Hit · Modest · Unknown' },
                  { name: 'oscar_category',      basis: t('phase9.step2.d3Basis'), values: 'Oscar Winner (5+) · (3-4) · (1-2) · No Oscar' },
                  { name: 'decade',              basis: t('phase9.step2.d4Basis'), values: '1930, 1940, 1950, ..., 2010' },
                  { name: 'era',                 basis: t('phase9.step2.d5Basis'), values: 'Modern Era (2010s+), 2000s, 1990s, ...' },
                  { name: 'runtime_category',    basis: t('phase9.step2.d6Basis'), values: 'Epic · Long · Standard · Short · Very Short · Unknown' },
                ].map((d, i) => (
                  <div key={i} style={styles.derivedCard}>
                    <code style={{ color: COLOR, fontWeight: '700', fontSize: '0.85rem', fontFamily: 'monospace' }}>{d.name}</code>
                    <p style={{ margin: '6px 0 2px', fontSize: '0.8rem', color: '#555' }}><strong>Basis:</strong> {d.basis}</p>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: '#777' }}>{d.values}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Verify Step 2 ───────────────────────────────────────────── */}
          <section id="step2-verify" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#27ae60' }}>✅</span>
                {t('phase9.step2Verify.heading')}
              </h2>
              <CopyableCode code={`USE DATABASE movies_db;
USE SCHEMA analytics_staging;

-- 1. Total Row Count (should be 95)
SELECT COUNT(*) as total_rows FROM stg_movies_enriched;

-- 2. NULL Check for Text Fields (should all be 0)
SELECT
    COUNT(*) - COUNT(director) as null_director,
    COUNT(*) - COUNT(country)  as null_country,
    COUNT(*) - COUNT(language) as null_language
FROM stg_movies_enriched;

-- 3. Rating Categories Distribution
SELECT rating_category, COUNT(*) as movie_count, ROUND(AVG(imdb_rating),2) as avg_imdb
FROM stg_movies_enriched
GROUP BY rating_category ORDER BY avg_imdb DESC;`} />

              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr style={{ backgroundColor: '#27ae6022' }}>
                      <th style={styles.th}>rating_category</th>
                      <th style={styles.th}>movie_count</th>
                      <th style={styles.th}>avg_imdb_rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[['Masterpiece',5,'9.1'],['Excellent',36,'8.62'],['Very Good',51,'8.2'],['Good',2,'7.75'],['No Rating',1,'null']].map((r,i)=>(
                      <tr key={i} style={{ backgroundColor: i%2===0?'#f9fff9':'#fff' }}>
                        {r.map((c,j)=><td key={j} style={styles.td}>{c}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p style={styles.bodyText}><strong>{t('phase9.step2Verify.topMovies')}</strong></p>
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr style={{ backgroundColor: '#27ae6022' }}>
                      {['movie_title','imdb_rating','box_office_millions','oscar_category'].map(h=><th key={h} style={styles.th}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['The Shawshank Redemption',9.3,58.0,'No Oscar'],
                      ['The Godfather',9.2,246.1,'Oscar Winner (3-4)'],
                      ['The Dark Knight',9.0,1004.9,'Oscar Winner (1-2)'],
                      ['The Godfather: Part II',9.0,48.5,'Oscar Winner (5+)'],
                      ['12 Angry Men',9.0,1.0,'No Oscar'],
                    ].map((r,i)=>(
                      <tr key={i} style={{ backgroundColor: i%2===0?'#f9fff9':'#fff' }}>
                        {r.map((c,j)=><td key={j} style={styles.td}>{c}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ── Step 3: data_quality_report.sql ────────────────────────── */}
          <section id="step3" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: COLOR }}>3️⃣</span>
                {t('phase9.step3.heading')}
              </h2>

              <p style={styles.bodyText}><strong>{t('phase9.step3.s1')}</strong></p>
              <CopyableCode code={`cd D:\\movies_pipeline\\movies_dbt
code models\\staging\\data_quality_report.sql`} />

              <p style={styles.bodyText}><strong>{t('phase9.step3.s2')}</strong></p>
              <CopyableCode code={`{{ config(materialized='view', schema='staging') }}

with cleaned  as (select * from {{ ref('stg_movies_cleaned') }}),
     enriched as (select * from {{ ref('stg_movies_enriched') }}),

row_checks as (
    select 'Row Counts' as category, 'Total Rows (Cleaned)' as check_name,
           count(*) as value, 95 as expected,
           case when count(*) = 95 then 'PASS' else 'FAIL' end as status
    from cleaned
    union all
    select 'Row Counts', 'Total Rows (Enriched)', count(*), 95,
           case when count(*) = 95 then 'PASS' else 'FAIL' end
    from enriched
),
null_checks as (
    select 'NULL Checks', 'NULL movie_id',     count(*), 0,
           case when count(*) = 0 then 'PASS' else 'FAIL' end from cleaned where movie_id is null
    union all
    select 'NULL Checks', 'NULL movie_title',  count(*), 0,
           case when count(*) = 0 then 'PASS' else 'FAIL' end from cleaned where movie_title is null
    union all
    select 'NULL Checks', 'NULL release_year', count(*), 0,
           case when count(*) = 0 then 'PASS' else 'FAIL' end from cleaned where release_year is null
),
duplicate_checks as (
    select 'Duplicates', 'Duplicate movie_id',
           count(*) - count(distinct movie_id), 0,
           case when count(*) = count(distinct movie_id) then 'PASS' else 'FAIL' end
    from cleaned
),
range_checks as (
    select 'Range Checks', 'IMDb Range (0-10)', count(*), 0,
           case when count(*) = 0 then 'PASS' else 'FAIL' end
    from cleaned where imdb_rating is not null and (imdb_rating < 0 or imdb_rating > 10)
    union all
    select 'Range Checks', 'RT Range (0-100)', count(*), 0,
           case when count(*) = 0 then 'PASS' else 'FAIL' end
    from cleaned where rotten_tomatoes_pct is not null
      and (rotten_tomatoes_pct < 0 or rotten_tomatoes_pct > 100)
),
stats as (
    select 'Statistics', 'Min IMDb', round(min(imdb_rating),2), 7.0, 'INFO' from cleaned where imdb_rating is not null
    union all
    select 'Statistics', 'Max IMDb', round(max(imdb_rating),2), 10.0,'INFO' from cleaned where imdb_rating is not null
    union all
    select 'Statistics', 'Avg IMDb', round(avg(imdb_rating),2),  8.0,'INFO' from cleaned where imdb_rating is not null
),
enrichment_checks as (
    select 'Enrichment', 'Rating Category', count(*), 95,
           case when count(*) = 95 then 'PASS' else 'FAIL' end
    from enriched where rating_category is not null
    union all
    select 'Enrichment', 'Decade Populated', count(*), 95,
           case when count(*) = 95 then 'PASS' else 'FAIL' end
    from enriched where decade is not null
)

select * from row_checks
union all select * from null_checks
union all select * from duplicate_checks
union all select * from range_checks
union all select * from stats
union all select * from enrichment_checks
order by case category
    when 'Row Counts'   then 1 when 'NULL Checks'  then 2
    when 'Duplicates'   then 3 when 'Range Checks' then 4
    when 'Statistics'   then 5 when 'Enrichment'   then 6
end`} />

              <p style={styles.bodyText}><strong>{t('phase9.step3.s3')}</strong></p>
              <CopyableCode code={`dbt run --select data_quality_report`} />

              <p style={styles.bodyText}><strong>{t('phase9.step3.s4')}</strong></p>
              <CopyableCode code={`SELECT * FROM data_quality_report;`} />
              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase9/Verify_data_quality_report.png" alt="Data Quality Report Results" style={styles.screenshot} />
                <p style={styles.imgCaption}>{t('phase9.step3.caption')}</p>
              </div>

              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr style={{ backgroundColor: COLOR + '22' }}>
                      {['#','CATEGORY','CHECK_NAME','VALUE','EXPECTED','STATUS'].map(h=><th key={h} style={styles.th}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [1,'Row Counts','Total Rows (Cleaned)',95,95,'PASS'],
                      [2,'Row Counts','Total Rows (Enriched)',95,95,'PASS'],
                      [3,'NULL Checks','NULL movie_id',0,0,'PASS'],
                      [4,'NULL Checks','NULL movie_title',0,0,'PASS'],
                      [5,'NULL Checks','NULL release_year',0,0,'PASS'],
                      [6,'Duplicates','Duplicate movie_id',0,0,'PASS'],
                      [7,'Range Checks','IMDb Range (0-10)',0,0,'PASS'],
                      [8,'Range Checks','RT Range (0-100)',0,0,'PASS'],
                      [9,'Statistics','Min IMDb',7.7,7,'INFO'],
                      [10,'Statistics','Max IMDb',9.3,10,'INFO'],
                      [11,'Statistics','Avg IMDb',8.4,8,'INFO'],
                      [12,'Enrichment','Rating Category',95,95,'PASS'],
                      [13,'Enrichment','Decade Populated',95,95,'PASS'],
                    ].map((r,i)=>(
                      <tr key={i} style={{ backgroundColor: i%2===0?'#faf9ff':'#fff' }}>
                        <td style={styles.td}>{r[0]}</td>
                        <td style={styles.td}>{r[1]}</td>
                        <td style={styles.td}>{r[2]}</td>
                        <td style={styles.td}>{r[3]}</td>
                        <td style={styles.td}>{r[4]}</td>
                        <td style={{ ...styles.td, fontWeight:'700', color: r[5]==='PASS'?'#27ae60':r[5]==='FAIL'?'#e74c3c':'#e67e22' }}>{r[5]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ── Step 4: schema.yml ──────────────────────────────────────── */}
          <section id="step4" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: COLOR }}>4️⃣</span>
                {t('phase9.step4.heading')}
              </h2>

              <p style={styles.bodyText}>{t('phase9.step4.desc')}</p>

              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr style={{ backgroundColor: COLOR + '22' }}>
                      <th style={styles.th}>{t('phase9.step4.thFile')}</th>
                      <th style={styles.th}>{t('phase9.step4.thUsedFor')}</th>
                      <th style={styles.th}>{t('phase9.step4.thGoal')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={styles.td}><code style={styles.inlineCode}>sources.yml</code></td>
                      <td style={styles.td}>{t('phase9.step4.sourceDesc')}</td>
                      <td style={styles.td}>{t('phase9.step4.sourceGoal')}</td>
                    </tr>
                    <tr style={{ backgroundColor: '#faf9ff' }}>
                      <td style={styles.td}><code style={styles.inlineCode}>schema.yml</code></td>
                      <td style={styles.td}>{t('phase9.step4.schemaDesc')}</td>
                      <td style={styles.td}>{t('phase9.step4.schemaGoal')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p style={styles.bodyText}><strong>{t('phase9.step4.s1')}</strong></p>
              <CopyableCode code={`cd D:\\movies_pipeline\\movies_dbt\\models
code staging\\schema.yml`} />

              <p style={styles.bodyText}><strong>{t('phase9.step4.s2')}</strong></p>
              <CopyableCode code={`version: 2

models:
  # MODEL: stg_movies_cleaned
  - name: stg_movies_cleaned
    description: |
      Layer 1: Basic Data Cleaning
      - Rename columns to snake_case | Trim whitespace
      - Remove duplicate movies (keeping best rank)
      - Convert empty strings to NULL | Preserve NULL values
      Input: movies_raw (100 rows) → Output: 95 rows
    columns:
      - name: movie_id
        description: "Primary key (from rank 1-100)"
        tests: [not_null, unique]
      - name: movie_title
        tests: [not_null]
      - name: release_year
        tests: [not_null]
      - name: loaded_at
        tests: [not_null]
      - name: dbt_updated_at
        tests: [not_null]

  # MODEL: stg_movies_enriched
  - name: stg_movies_enriched
    description: |
      Layer 2: Handle NULLs + Business Logic
      - Replace NULL text fields with 'Unknown'
      - Replace NULL numeric fields with 0 (where appropriate)
      - Create 6 derived business categories
      Input: stg_movies_cleaned (95 rows) → Output: 95 rows
    columns:
      - name: movie_id
        tests: [not_null, unique]
      - name: director
        tests: [not_null]
      - name: rating_category
        tests:
          - not_null
          - accepted_values:
              values: ['Masterpiece','Excellent','Very Good','Good','Average','No Rating']
      - name: box_office_category
        tests:
          - not_null
          - accepted_values:
              values: ['Blockbuster','Major Hit','Hit','Modest','Unknown']
      - name: oscar_category
        tests:
          - not_null
          - accepted_values:
              values: ['Oscar Winner (5+)','Oscar Winner (3-4)','Oscar Winner (1-2)','No Oscar']

  # MODEL: data_quality_report
  - name: data_quality_report
    description: |
      Data Quality Monitoring — 13 checks across 6 categories:
      Row Counts, NULL Checks, Duplicates, Range Checks, Statistics, Enrichment
    columns:
      - name: category
        tests:
          - not_null
          - accepted_values:
              values: ['Row Counts','NULL Checks','Duplicates','Range Checks','Statistics','Enrichment']
      - name: status
        tests:
          - not_null
          - accepted_values:
              values: ['PASS','FAIL','INFO']`} />

              <p style={styles.bodyText}><strong>{t('phase9.step4.s3')}</strong></p>
              <CopyableCode code={`dbt test --select staging`} />
            </div>
          </section>

          {/* ── Step 5: Generate Documentation ─────────────────────────── */}
          <section id="step5" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: COLOR }}>5️⃣</span>
                {t('phase9.step5.heading')}
              </h2>
              <CopyableCode code={`dbt docs generate
dbt docs serve --port 8001
# จริงๆ แค่ใช้คำสั่ง dbt docs serve ก็ได้ แต่กลัวพอร์ทชนกับ Airflow
# เลยกำหนดให้เป็น port 8001 แทน
# Open: http://localhost:8001`} />
              <InfoBox color={COLOR}>
                {t('phase9.step5.infoBox')}
              </InfoBox>
              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase9/Generate_Documentation.png" alt="dbt Documentation UI" style={styles.screenshot} />
                <p style={styles.imgCaption}>{t('phase9.step5.caption')}</p>
              </div>
            </div>
          </section>

          {/* ── Summary ─────────────────────────────────────────────────── */}
          <section id="summary" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: COLOR }}>🎉</span>
                {t('phase9.summary.heading')}
              </h2>
              <p style={{ ...styles.bodyText, fontWeight: '700' }}>{t('phase9.summary.subtext')}</p>

              <InfoBox color="#27ae60">
                <strong>{t('phase9.summary.modelsTitle')}</strong>
                <ol style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
                  <li><code style={styles.inlineCode}>stg_movies_cleaned</code> — {t('phase9.summary.m1')}</li>
                  <li><code style={styles.inlineCode}>stg_movies_enriched</code> — {t('phase9.summary.m2')}</li>
                  <li><code style={styles.inlineCode}>data_quality_report</code> — {t('phase9.summary.m3')}</li>
                </ol>
              </InfoBox>

              <h4 style={{ ...styles.subHeading2, borderLeftColor: COLOR }}>{t('phase9.summary.fixedTitle')}</h4>
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr style={{ backgroundColor: COLOR + '22' }}>
                      <th style={styles.th}>{t('phase9.summary.thCol')}</th>
                      <th style={styles.th}>{t('phase9.summary.thCount')}</th>
                      <th style={styles.th}>{t('phase9.summary.thPct')}</th>
                      <th style={styles.th}>{t('phase9.summary.thHandling')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['metacritic_score',50,'50%',t('phase9.summary.h1')],
                      ['box_office_millions',17,'17%',t('phase9.summary.h2')],
                      ['rotten_tomatoes_pct',3,'3%',t('phase9.summary.h3')],
                      ['imdb_rating',1,'1%',t('phase9.summary.h4')],
                      ['runtime_mins',1,'1%',t('phase9.summary.h5')],
                    ].map((r,i)=>(
                      <tr key={i} style={{ backgroundColor: i%2===0?'#faf9ff':'#fff' }}>
                        <td style={styles.td}><code style={styles.inlineCode}>{r[0]}</code></td>
                        <td style={styles.td}>{r[1]}</td><td style={styles.td}>{r[2]}</td><td style={styles.td}>{r[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <InfoBox color="#3498db">
                <strong>{t('phase9.summary.dupTitle')}</strong>
                <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
                  <li>{t('phase9.summary.d1')}</li>
                  <li>{t('phase9.summary.d2')}</li>
                  <li>{t('phase9.summary.d3')}</li>
                  <li>{t('phase9.summary.d4')}</li>
                  <li>{t('phase9.summary.d5')}</li>
                </ul>
              </InfoBox>

              <h4 style={{ ...styles.subHeading2, borderLeftColor: COLOR }}>{t('phase9.summary.newColsTitle')}</h4>
              <ol style={styles.orderedList}>
                <li style={styles.listItem}><code style={styles.inlineCode}>rating_category</code>: {t('phase9.summary.nc1')}</li>
                <li style={styles.listItem}><code style={styles.inlineCode}>box_office_category</code>: {t('phase9.summary.nc2')}</li>
                <li style={styles.listItem}><code style={styles.inlineCode}>oscar_category</code>: {t('phase9.summary.nc3')}</li>
                <li style={styles.listItem}><code style={styles.inlineCode}>decade</code>: {t('phase9.summary.nc4')}</li>
                <li style={styles.listItem}><code style={styles.inlineCode}>era</code>: {t('phase9.summary.nc5')}</li>
                <li style={styles.listItem}><code style={styles.inlineCode}>runtime_category</code>: {t('phase9.summary.nc6')}</li>
              </ol>

              <InfoBox color="#27ae60">
                <strong>{t('phase9.summary.finalBox')}</strong>
              </InfoBox>
            </div>
          </section>

          <PhaseNavigator currentPhase={9} totalPhases={15} />
        </main>
      </div>

      {showScrollTop && (
        <button onClick={scrollToTop} style={styles.scrollTopBtn} title="Back to top">↑</button>
      )}
    </div>
  );
};

/* ── STYLES (matches Phase 8 pattern) ─────────────────────────────────────── */
const styles = {
  container:    { maxWidth: '100%', margin: '0 auto', backgroundColor: '#f8f9fa' },
  header:       { background: 'linear-gradient(135deg, #6c3483 0%, #8E44AD 60%, #9b59b6 100%)', padding: '60px 20px', color: 'white' },
  headerContent:{ maxWidth: '1400px', margin: '0 auto' },
  backButton:   { backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', marginBottom: '20px', backdropFilter: 'blur(10px)' },
  phaseNumber:  { textAlign: 'center' },
  phaseLabel:   { fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.9 },
  phaseTitle:   { fontSize: '3rem', fontWeight: '700', margin: '10px 0', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' },
  phaseSubtitle:{ fontSize: '1.2rem', opacity: 0.9, margin: '0 auto 16px', maxWidth: '600px' },
  headerBadges: { display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' },
  badge:        { backgroundColor: 'rgba(255,255,255,0.2)', padding: '6px 16px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '600', backdropFilter: 'blur(10px)' },

  pageLayout:   { display: 'flex', alignItems: 'flex-start', maxWidth: '1400px', margin: '0 auto', padding: '40px 20px', gap: '30px' },
  sidebar:      { width: '260px', flexShrink: 0, position: 'sticky', top: '20px', maxHeight: 'calc(100vh - 40px)', overflowY: 'auto' },
  sidebarCard:  { backgroundColor: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
  sidebarTitle: { fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: COLOR, marginBottom: '16px', borderBottom: `2px solid ${COLOR}`, paddingBottom: '8px', margin: '0 0 16px' },
  navItem:      { display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', padding: '8px 12px', border: 'none', borderRadius: '8px', cursor: 'pointer', backgroundColor: 'transparent', color: '#555', transition: 'all 0.2s ease', marginBottom: '2px', lineHeight: '1.4' },
  navItemActive:{ backgroundColor: '#F5EEF8', color: COLOR, fontWeight: '600' },
  infoRow:      { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #f0f0f0' },
  infoLabel:    { fontSize: '0.78rem', color: '#666' },
  infoBadge:    { fontSize: '0.75rem', backgroundColor: COLOR + '18', color: COLOR, padding: '2px 8px', borderRadius: '10px', fontWeight: '600' },

  mainContent:  { flex: 1, minWidth: 0 },
  section:      { marginBottom: '8px' },
  contentCard:  { backgroundColor: 'white', borderRadius: '16px', padding: '36px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', textAlign: 'left' },
  sectionHeading:{ fontSize: '1.6rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', textAlign: 'left', color: '#1a1a2e' },
  sectionBadge: { width: '40px', height: '40px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 },
  subHeading:   { fontSize: '1.15rem', fontWeight: '700', borderLeft: '4px solid', paddingLeft: '14px', margin: '0 0 16px', color: '#1a1a2e', textAlign: 'left' },
  subHeading2:  { fontSize: '1.05rem', fontWeight: '700', borderLeft: '3px solid', paddingLeft: '12px', margin: '0 0 14px', color: '#1a1a2e', textAlign: 'left' },
  bodyText:     { fontSize: '1rem', color: '#444', lineHeight: '1.9', marginBottom: '12px', textAlign: 'left', wordBreak: 'keep-all', overflowWrap: 'break-word' },
  inlineCode:   { backgroundColor: '#f0eeff', padding: '2px 6px', borderRadius: '4px', fontSize: '0.88em', fontFamily: "'Courier New', monospace", color: '#6c3483' },
  orderedList:  { paddingLeft: '24px', margin: '0 0 14px', display: 'flex', flexDirection: 'column', gap: '8px' },
  bulletList:   { paddingLeft: '20px', margin: '8px 0 10px', display: 'flex', flexDirection: 'column', gap: '6px', listStyleType: 'disc' },
  listItem:     { fontSize: '0.97rem', color: '#444', lineHeight: '1.8', textAlign: 'left', wordBreak: 'keep-all', overflowWrap: 'break-word' },

  tableWrapper: { overflowX: 'auto', marginBottom: '16px', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' },
  table:        { width: '100%', borderCollapse: 'collapse', fontSize: '0.87rem', backgroundColor: '#fff' },
  th:           { padding: '10px 14px', textAlign: 'left', fontWeight: '700', color: '#333', borderBottom: '2px solid #e0e0e0', whiteSpace: 'nowrap' },
  td:           { padding: '9px 14px', color: '#444', borderBottom: '1px solid #f0f0f0', verticalAlign: 'top' },

  imageWrapper: { margin: '16px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  screenshot:   { maxWidth: '100%', borderRadius: '10px', border: '1px solid #e0e0e0', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  imgCaption:   { margin: '8px 0 0', fontSize: '0.82rem', color: '#666', fontStyle: 'italic', textAlign: 'center' },

  threeCards:   { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', margin: '20px 0' },
  modelCard:    { backgroundColor: '#f8f9fa', borderRadius: '10px', padding: '18px', borderTop: '4px solid', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', textAlign: 'center' },
  modelNum:     { width: '32px', height: '32px', borderRadius: '50%', color: '#fff', fontWeight: '800', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' },
  modelTitle:   { fontWeight: '700', fontSize: '0.82rem', margin: '0 0 6px', fontFamily: 'monospace' },
  modelDesc:    { fontSize: '0.8rem', color: '#666', margin: 0, lineHeight: '1.5' },

  derivedGrid:  { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', margin: '16px 0' },
  derivedCard:  { backgroundColor: '#faf9ff', border: '1px solid #e8e4ff', borderRadius: '8px', padding: '14px', textAlign: 'left' },

  scrollTopBtn: { position: 'fixed', bottom: '115px', right: '30px', backgroundColor: COLOR, color: 'white', border: 'none', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem', fontWeight: '700', boxShadow: `0 4px 15px ${COLOR}66`, zIndex: 1000 },
};

export default Phase9Detail;
