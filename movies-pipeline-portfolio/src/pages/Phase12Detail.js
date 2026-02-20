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

const COLOR = '#2ECC71';
const COLOR_DARK = '#1a8a4a';

/* ════════════════════════════════════════════════════════════════════════════
   Phase 12 Detail Page
════════════════════════════════════════════════════════════════════════════ */
const Phase12Detail = () => {
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
    { id: 'purpose', label: t('phase12.nav.purpose'), bold: true },
    { id: 'step1',   label: t('phase12.nav.step1'),   bold: true },
    { id: 'step1_dims',    label: t('phase12.nav.step1_dims'),    bold: false },
    { id: 'step1_bridges', label: t('phase12.nav.step1_bridges'), bold: false },
    { id: 'step1_fact',    label: t('phase12.nav.step1_fact'),    bold: false },
    { id: 'step2',  label: t('phase12.nav.step2'),  bold: true },
    { id: 'step3',  label: t('phase12.nav.step3'),  bold: true },
    { id: 'step4',  label: t('phase12.nav.step4'),  bold: true },
    { id: 'step5',  label: t('phase12.nav.step5'),  bold: true },
    { id: 'summary',label: t('phase12.nav.summary'),bold: true },
  ];

  return (
    <div style={styles.container}>

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <button onClick={() => navigate('/')} style={styles.backButton}>{t('phase12.backBtn')}</button>
          <div style={styles.phaseCenter}>
            <span style={styles.phaseLabel}>Phase 12</span>
            <h1 style={styles.phaseTitle}>{t('phase12.title')}</h1>
            <p style={styles.phaseSubtitle}>{t('phase12.subtitle')}</p>
            <div style={styles.headerBadges}>
              <span style={styles.badge}>🗄️ dbt</span>
              <span style={styles.badge}>✅ Testing</span>
              <span style={styles.badge}>📚 Documentation</span>
              <span style={styles.badge}>📦 dbt_utils</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── TWO-COLUMN LAYOUT ──────────────────────────────────────────── */}
      <div style={styles.pageLayout}>

        {/* ── SIDEBAR ────────────────────────────────────────────────── */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarCard}>
            <h3 style={styles.sidebarTitle}>{t('phase12.navTitle')}</h3>
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
            <h3 style={styles.sidebarTitle}>{t('phase12.info.title')}</h3>
            {[
              ['schema.yml',                    '1 file'],
              ['Dimension tests',               '7 models'],
              ['Bridge tests',                  '5 models'],
              ['Fact tests',                    '1 model'],
              ['assert_movie_count',            'singular test'],
              ['assert_no_orphan_bridges',      'singular test'],
              ['assert_rating_consistency',     'singular test'],
              ['dbt_utils',                     'v1.1.1'],
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
                {t('phase12.purpose.heading')}
              </h2>
              <p style={styles.bodyText}>{t('phase12.purpose.desc')}</p>
            </div>
          </section>

          {/* ── STEP 1: schema.yml ──────────────────────────────────── */}
          <section id="step1" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#3498DB' }}>1️⃣</span>
                {t('phase12.step1.heading')}
              </h2>

              <InfoBox color="#3498DB">
                {t('phase12.step1.infoText')}
              </InfoBox>

              <p style={styles.bodyText}><strong>{t('phase12.labels.createFile')}</strong></p>
              <CopyableCode code={`cd D:\\movies_pipeline\\movies_dbt
code models\\marts\\schema.yml`} />

              <p style={styles.bodyText}><strong>{t('phase12.labels.code')}</strong></p>

              {/* ── Dimension Tables section ── */}
              <div id="step1_dims" style={styles.subSection}>
                <h3 style={{ ...styles.subHeading, borderLeftColor: '#16A085' }}>{t('phase12.step1.dimsHeading')}</h3>
              </div>
              <CopyableCode code={`version: 2

# =====================================================
# DIMENSION TABLES
# =====================================================

models:

  # ---------------------------------------------------
  # dim_movies
  # ---------------------------------------------------
  - name: dim_movies
    description: "Movie dimension with all movie attributes"
    columns:
      - name: movie_id
        description: "Primary key - Movie rank (1-95)"
        tests:
          - not_null
          - unique

      - name: movie_title
        description: "Movie title"
        tests:
          - not_null

      - name: release_year
        description: "Year of release"
        tests:
          - not_null
          - relationships:
              to: ref('dim_time')
              field: time_id

  # ---------------------------------------------------
  # dim_genres
  # ---------------------------------------------------
  - name: dim_genres
    description: "Genre lookup dimension"
    columns:
      - name: genre_id
        description: "Primary key - Auto-generated ID"
        tests:
          - not_null
          - unique

      - name: genre_name
        description: "Genre name"
        tests:
          - not_null
          - unique

  # ---------------------------------------------------
  # dim_actors
  # ---------------------------------------------------
  - name: dim_actors
    description: "Actor lookup dimension"
    columns:
      - name: actor_id
        description: "Primary key - Auto-generated ID"
        tests:
          - not_null
          - unique

      - name: actor_name
        description: "Actor name"
        tests:
          - not_null
          - unique

  # ---------------------------------------------------
  # dim_directors
  # ---------------------------------------------------
  - name: dim_directors
    description: "Director lookup dimension"
    columns:
      - name: director_id
        description: "Primary key - Auto-generated ID"
        tests:
          - not_null
          - unique

      - name: director_name
        description: "Director name"
        tests:
          - not_null
          - unique

  # ---------------------------------------------------
  # dim_countries
  # ---------------------------------------------------
  - name: dim_countries
    description: "Country lookup dimension"
    columns:
      - name: country_id
        description: "Primary key - Auto-generated ID"
        tests:
          - not_null
          - unique

      - name: country_name
        description: "Country name"
        tests:
          - not_null
          - unique

  # ---------------------------------------------------
  # dim_languages
  # ---------------------------------------------------
  - name: dim_languages
    description: "Language lookup dimension"
    columns:
      - name: language_id
        description: "Primary key - Auto-generated ID"
        tests:
          - not_null
          - unique

      - name: language_name
        description: "Language name"
        tests:
          - not_null
          - unique

  # ---------------------------------------------------
  # dim_time
  # ---------------------------------------------------
  - name: dim_time
    description: "Time dimension (year-based)"
    columns:
      - name: time_id
        description: "Primary key - Year (1931-2019)"
        tests:
          - not_null
          - unique

      - name: year
        description: "Full year"
        tests:
          - not_null`} />

              {/* ── Bridge Tables section ── */}
              <div id="step1_bridges" style={styles.subSection}>
                <h3 style={{ ...styles.subHeading, borderLeftColor: '#D35400' }}>{t('phase12.step1.bridgesHeading')}</h3>
              </div>
              <CopyableCode code={`  # =====================================================
  # BRIDGE TABLES
  # =====================================================

  # ---------------------------------------------------
  # bridge_movie_genre
  # ---------------------------------------------------
  - name: bridge_movie_genre
    description: "Many-to-many relationship between movies and genres"
    columns:
      - name: movie_id
        description: "Foreign key to dim_movies"
        tests:
          - not_null
          - relationships:
              to: ref('dim_movies')
              field: movie_id

      - name: genre_id
        description: "Foreign key to dim_genres"
        tests:
          - not_null
          - relationships:
              to: ref('dim_genres')
              field: genre_id

  # ---------------------------------------------------
  # bridge_movie_actor
  # ---------------------------------------------------
  - name: bridge_movie_actor
    description: "Many-to-many relationship between movies and actors"
    columns:
      - name: movie_id
        description: "Foreign key to dim_movies"
        tests:
          - not_null
          - relationships:
              to: ref('dim_movies')
              field: movie_id

      - name: actor_id
        description: "Foreign key to dim_actors"
        tests:
          - not_null
          - relationships:
              to: ref('dim_actors')
              field: actor_id

  # ---------------------------------------------------
  # bridge_movie_director
  # ---------------------------------------------------
  - name: bridge_movie_director
    description: "Many-to-many relationship between movies and directors"
    columns:
      - name: movie_id
        description: "Foreign key to dim_movies"
        tests:
          - not_null
          - relationships:
              to: ref('dim_movies')
              field: movie_id

      - name: director_id
        description: "Foreign key to dim_directors"
        tests:
          - not_null
          - relationships:
              to: ref('dim_directors')
              field: director_id

  # ---------------------------------------------------
  # bridge_movie_country
  # ---------------------------------------------------
  - name: bridge_movie_country
    description: "Many-to-many relationship between movies and countries"
    columns:
      - name: movie_id
        description: "Foreign key to dim_movies"
        tests:
          - not_null
          - relationships:
              to: ref('dim_movies')
              field: movie_id

      - name: country_id
        description: "Foreign key to dim_countries"
        tests:
          - not_null
          - relationships:
              to: ref('dim_countries')
              field: country_id

  # ---------------------------------------------------
  # bridge_movie_language
  # ---------------------------------------------------
  - name: bridge_movie_language
    description: "Many-to-many relationship between movies and languages"
    columns:
      - name: movie_id
        description: "Foreign key to dim_movies"
        tests:
          - not_null
          - relationships:
              to: ref('dim_movies')
              field: movie_id

      - name: language_id
        description: "Foreign key to dim_languages"
        tests:
          - not_null
          - relationships:
              to: ref('dim_languages')
              field: language_id`} />

              {/* ── Fact Table section ── */}
              <div id="step1_fact" style={styles.subSection}>
                <h3 style={{ ...styles.subHeading, borderLeftColor: '#2980B9' }}>{t('phase12.step1.factHeading')}</h3>
              </div>
              <CopyableCode code={`  # =====================================================
  # FACT TABLE
  # =====================================================

  # ---------------------------------------------------
  # fact_movie_performance
  # ---------------------------------------------------
  - name: fact_movie_performance
    description: "Fact table with movie performance metrics"
    columns:
      - name: movie_id
        description: "Foreign key to dim_movies"
        tests:
          - not_null
          - unique
          - relationships:
              to: ref('dim_movies')
              field: movie_id

      - name: time_id
        description: "Foreign key to dim_time"
        tests:
          - not_null
          - relationships:
              to: ref('dim_time')
              field: time_id

      - name: box_office_millions
        description: "Box office revenue in millions USD"

      - name: oscars_won
        description: "Number of Oscars won"

      - name: is_masterpiece
        description: "Flag: 1 if IMDb >= 9.0"
        tests:
          - accepted_values:
              values: [0, 1]

      - name: is_blockbuster
        description: "Flag: 1 if box office >= 1000M"
        tests:
          - accepted_values:
              values: [0, 1]`} />

              <InfoBox color="#27AE60">
                <strong>{t('phase12.step1.saveNote')}</strong>
              </InfoBox>
            </div>
          </section>

          {/* ── STEP 2: Business Logic Tests ─────────────────────────── */}
          <section id="step2" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#9B59B6' }}>2️⃣</span>
                {t('phase12.step2.heading')}
              </h2>

              <p style={styles.bodyText}>{t('phase12.step2.desc')}</p>

              <ul style={styles.bulletList}>
                <li style={styles.listItem}>{t('phase12.step2.file1desc')}</li>
                <li style={styles.listItem}>{t('phase12.step2.file2desc')}</li>
                <li style={styles.listItem}>{t('phase12.step2.file3desc')}</li>
              </ul>

              {/* assert_movie_count */}
              <h3 style={{ ...styles.subHeading, borderLeftColor: '#9B59B6', marginTop: '24px' }}>
                1. {t('phase12.step2.file1')}
              </h3>
              <p style={styles.bodyText}><strong>{t('phase12.labels.createFile')}</strong></p>
              <CopyableCode code={`code tests\\assert_movie_count.sql`} />
              <p style={styles.bodyText}><strong>{t('phase12.labels.code')}</strong></p>
              <CopyableCode code={`-- =====================================================
-- TEST: assert_movie_count
-- PURPOSE: Verify we have exactly 95 movies (after removing duplicates)
-- =====================================================

SELECT COUNT(*) as movie_count
FROM {{ ref('dim_movies') }}
HAVING COUNT(*) != 95`} />

              {/* assert_no_orphan_bridges */}
              <h3 style={{ ...styles.subHeading, borderLeftColor: '#9B59B6', marginTop: '24px' }}>
                2. {t('phase12.step2.file2')}
              </h3>
              <p style={styles.bodyText}><strong>{t('phase12.labels.createFile')}</strong></p>
              <CopyableCode code={`code tests\\assert_no_orphan_bridges.sql`} />
              <p style={styles.bodyText}><strong>{t('phase12.labels.code')}</strong></p>
              <CopyableCode code={`-- =====================================================
-- TEST: assert_no_orphan_bridges
-- PURPOSE: Verify all bridge records have valid foreign keys
-- =====================================================

-- Check bridge_movie_genre
SELECT 'bridge_movie_genre' as bridge_table, COUNT(*) as orphan_count
FROM {{ ref('bridge_movie_genre') }} b
LEFT JOIN {{ ref('dim_movies') }} m ON b.movie_id = m.movie_id
WHERE m.movie_id IS NULL
HAVING COUNT(*) > 0

UNION ALL

-- Check bridge_movie_actor
SELECT 'bridge_movie_actor', COUNT(*)
FROM {{ ref('bridge_movie_actor') }} b
LEFT JOIN {{ ref('dim_movies') }} m ON b.movie_id = m.movie_id
WHERE m.movie_id IS NULL
HAVING COUNT(*) > 0

UNION ALL

-- Check bridge_movie_director
SELECT 'bridge_movie_director', COUNT(*)
FROM {{ ref('bridge_movie_director') }} b
LEFT JOIN {{ ref('dim_movies') }} m ON b.movie_id = m.movie_id
WHERE m.movie_id IS NULL
HAVING COUNT(*) > 0

UNION ALL

-- Check bridge_movie_country
SELECT 'bridge_movie_country', COUNT(*)
FROM {{ ref('bridge_movie_country') }} b
LEFT JOIN {{ ref('dim_movies') }} m ON b.movie_id = m.movie_id
WHERE m.movie_id IS NULL
HAVING COUNT(*) > 0

UNION ALL

-- Check bridge_movie_language
SELECT 'bridge_movie_language', COUNT(*)
FROM {{ ref('bridge_movie_language') }} b
LEFT JOIN {{ ref('dim_movies') }} m ON b.movie_id = m.movie_id
WHERE m.movie_id IS NULL
HAVING COUNT(*) > 0`} />

              {/* assert_rating_consistency */}
              <h3 style={{ ...styles.subHeading, borderLeftColor: '#9B59B6', marginTop: '24px' }}>
                3. {t('phase12.step2.file3')}
              </h3>
              <p style={styles.bodyText}><strong>{t('phase12.labels.createFile')}</strong></p>
              <CopyableCode code={`code tests\\assert_rating_consistency.sql`} />
              <p style={styles.bodyText}><strong>{t('phase12.labels.code')}</strong></p>
              <CopyableCode code={`-- =====================================================
-- TEST: assert_rating_consistency
-- PURPOSE: Verify is_masterpiece flag is consistent with IMDb rating
-- =====================================================

SELECT
    movie_id,
    movie_title,
    imdb_rating,
    is_masterpiece,
    'Rating >= 9.0 but flag = 0' as issue
FROM {{ ref('fact_movie_performance') }}
WHERE imdb_rating >= 9.0 AND is_masterpiece = 0

UNION ALL

SELECT
    movie_id,
    movie_title,
    imdb_rating,
    is_masterpiece,
    'Rating < 9.0 but flag = 1' as issue
FROM {{ ref('fact_movie_performance') }}
WHERE (imdb_rating < 9.0 OR imdb_rating IS NULL) AND is_masterpiece = 1`} />
            </div>
          </section>

          {/* ── STEP 3: Install dbt_utils ────────────────────────────── */}
          <section id="step3" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#F39C12' }}>3️⃣</span>
                {t('phase12.step3.heading')}
              </h2>

              <p style={styles.bodyText}><strong>{t('phase12.step3.createFile')}</strong></p>
              <CopyableCode code={`cd D:\\movies_pipeline\\movies_dbt
code packages.yml`} />

              <p style={styles.bodyText}><strong>{t('phase12.step3.addContent')}</strong></p>
              <CopyableCode code={`# movies_dbt/packages.yml
packages:
  - package: dbt-labs/dbt_utils
    version: 1.1.1`} />

              <p style={styles.bodyText}><strong>{t('phase12.step3.install')}</strong></p>
              <CopyableCode code={`dbt deps`} />
            </div>
          </section>

          {/* ── STEP 4: Run Tests ────────────────────────────────────── */}
          <section id="step4" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#E74C3C' }}>4️⃣</span>
                {t('phase12.step4.heading')}
              </h2>

              <p style={styles.bodyText}>{t('phase12.step4.desc')}</p>
              <CopyableCode code={`# Run all tests
dbt test

# Run tests for specific model
dbt test --select dim_movies

# Run tests for marts schema
dbt test --select marts.*

# Run only custom tests
dbt test --select test_type:singular`} />
            </div>
          </section>

          {/* ── STEP 5: Generate Documentation ───────────────────────── */}
          <section id="step5" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: COLOR }}>5️⃣</span>
                {t('phase12.step5.heading')}
              </h2>

              <CopyableCode code={`# Generate documentation
dbt docs generate

# Serve documentation site
dbt docs serve --port 8001`} />

              <p style={styles.bodyText}><strong>{t('phase12.labels.result')}</strong></p>
              <div style={styles.imageWrapper}>
                <img src="/phase12/generate_docs_site.png" alt="Generate Documentation Site" style={styles.screenshot} />
              </div>
            </div>
          </section>

          {/* ── SUMMARY ──────────────────────────────────────────────── */}
          <section id="summary" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: COLOR }}>🎉</span>
                {t('phase12.summary.heading')}
              </h2>

              <InfoBox color={COLOR}>
                <strong>✅ Phase 12: Testing &amp; Documentation — COMPLETE!</strong>
                <br />
                {t('phase12.summary.desc')}
              </InfoBox>

              <p style={styles.bodyText}><strong>{t('phase12.summary.whatDone')}</strong></p>
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr style={{ backgroundColor: COLOR + '20' }}>
                      <th style={{ ...styles.th, color: COLOR_DARK }}>{t('phase12.summary.thStep')}</th>
                      <th style={{ ...styles.th, color: COLOR_DARK }}>{t('phase12.summary.thFile')}</th>
                      <th style={{ ...styles.th, color: COLOR_DARK }}>{t('phase12.summary.thDesc')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Step 1', 'models/marts/schema.yml',             t('phase12.summary.row1')],
                      ['Step 2', 'tests/assert_movie_count.sql',        t('phase12.summary.row2')],
                      ['Step 2', 'tests/assert_no_orphan_bridges.sql',  t('phase12.summary.row3')],
                      ['Step 2', 'tests/assert_rating_consistency.sql', t('phase12.summary.row4')],
                      ['Step 3', 'packages.yml',                        t('phase12.summary.row5')],
                      ['Step 4', 'dbt test',                            t('phase12.summary.row6')],
                      ['Step 5', 'dbt docs generate/serve',             t('phase12.summary.row7')],
                    ].map((r, i) => (
                      <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#f0fbf4' : '#fff' }}>
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

          <PhaseNavigator currentPhase={12} totalPhases={15} />
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
  header:       { background: 'linear-gradient(135deg, #1a6b35 0%, #2ECC71 60%, #58d68d 100%)', padding: '60px 20px', color: 'white' },
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
  navItemActive:{ backgroundColor: '#eafaf1', color: COLOR_DARK, fontWeight: '600' },
  infoRow:      { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #f0f0f0' },
  infoLabel:    { fontSize: '0.78rem', color: '#666' },
  infoBadge:    { fontSize: '0.75rem', backgroundColor: COLOR + '25', color: COLOR_DARK, padding: '2px 8px', borderRadius: '10px', fontWeight: '600' },

  mainContent:  { flex: 1, minWidth: 0 },
  section:      { marginBottom: '8px' },
  subSection:   { marginTop: '24px', marginBottom: '8px' },
  contentCard:  { backgroundColor: 'white', borderRadius: '16px', padding: '36px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', textAlign: 'left' },
  sectionHeading:{ fontSize: '1.6rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', textAlign: 'left', color: '#1a1a2e' },
  sectionBadge: { width: '40px', height: '40px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 },
  subHeading:   { fontSize: '1.1rem', fontWeight: '700', borderLeft: '4px solid', paddingLeft: '14px', margin: '0 0 12px', color: '#1a1a2e', textAlign: 'left' },
  bodyText:     { fontSize: '1rem', color: '#444', lineHeight: '1.9', marginBottom: '12px', textAlign: 'left', wordBreak: 'keep-all', overflowWrap: 'break-word' },
  inlineCode:   { backgroundColor: '#eafaf1', padding: '2px 6px', borderRadius: '4px', fontSize: '0.88em', fontFamily: "'Courier New', monospace", color: '#1a6b35' },
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

export default Phase12Detail;
