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

const COLOR = '#16A085';

/* ════════════════════════════════════════════════════════════════════════════
   Phase 10 Detail Page
════════════════════════════════════════════════════════════════════════════ */
const Phase10Detail = () => {
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
    { id: 'purpose',   label: t('phase10.nav.purpose'),   bold: true },
    { id: 'structure', label: t('phase10.nav.structure'), bold: true },
    { id: 'step1',     label: t('phase10.nav.step1'),     bold: true },
    { id: 'step2',     label: t('phase10.nav.step2'),     bold: true },
    { id: 'step3',     label: t('phase10.nav.step3'),     bold: true },
    { id: 'step4',     label: t('phase10.nav.step4'),     bold: true },
    { id: 'step5',     label: t('phase10.nav.step5'),     bold: true },
    { id: 'step6',     label: t('phase10.nav.step6'),     bold: true },
    { id: 'step7',     label: t('phase10.nav.step7'),     bold: true },
    { id: 'step8',     label: t('phase10.nav.step8'),     bold: true },
    { id: 'summary',   label: t('phase10.nav.summary'),   bold: true },
  ];

  return (
    <div style={styles.container}>

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <button onClick={() => navigate('/')} style={styles.backButton}>{t('phase10.backBtn')}</button>
          <div style={styles.phaseNumber}>
            <span style={styles.phaseLabel}>Phase 10</span>
            <h1 style={styles.phaseTitle}>{t('phase10.title')}</h1>
            <p style={styles.phaseSubtitle}>{t('phase10.subtitle')}</p>
            <div style={styles.headerBadges}>
              <span style={styles.badge}>🗄️ dbt</span>
              <span style={styles.badge}>❄️ Snowflake</span>
              <span style={styles.badge}>⭐ Star Schema</span>
              <span style={styles.badge}>📐 Dimensional Modeling</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── TWO-COLUMN LAYOUT ──────────────────────────────────────────── */}
      <div style={styles.pageLayout}>

        {/* ── SIDEBAR (LEFT) ─────────────────────────────────────────── */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarCard}>
            <h3 style={styles.sidebarTitle}>{t('phase10.navTitle')}</h3>
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
            <h3 style={styles.sidebarTitle}>{t('phase10.info.title')}</h3>
            {[
              ['Dimension Tables', '7 tables'],
              ['dim_movies',       '95 rows'],
              ['dim_genres',       '21 rows'],
              ['dim_directors',    '61 rows'],
              ['dim_actors',       '152 rows'],
              ['dim_countries',    '16 rows'],
              ['dim_languages',    '12 rows'],
              ['dim_time',         '54 rows'],
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
                {t('phase10.purpose.heading')}
              </h2>
              <p style={styles.bodyText}>{t('phase10.purpose.desc')}</p>
              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase10/objective.svg" alt="Phase 10 Architecture" style={styles.screenshot} />
              </div>
            </div>
          </section>

          {/* ── Project Structure ──────────────────────────────────────── */}
          <section id="structure" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: COLOR }}>📁</span>
                {t('phase10.structure.heading')}
              </h2>
              <CopyableCode code={`movies_dbt/
├── models/
│   ├── staging/
│   │   ├── sources.yml
│   │   ├── schema.yml
│   │   ├── stg_movies_base.sql
│   │   └── stg_movies.sql
│   │   └── data_quality_report.sql
│   │
│   └── marts/
│       ├── dimensions/          ← Phase 10
│       │   ├── dim_movies.sql
│       │   ├── dim_genres.sql
│       │   ├── dim_directors.sql
│       │   ├── dim_actors.sql
│       │   ├── dim_countries.sql
│       │   ├── dim_languages.sql
│       │   └── dim_time.sql
│       │
│       ├── bridges/             ← Phase 11
│       │   ├── bridge_movie_genre.sql
│       │   ├── bridge_movie_actor.sql
│       │   ├── bridge_movie_country.sql
│       │   ├── bridge_movie_language.sql
│       │   └── bridge_movie_director.sql
│       │
│       ├── facts/               ← Phase 11
│       │   └── fact_movie_performance.sql
│       │
│       └── schema.yml           ← Tests & docs (Phase 12)`} />

              <p style={styles.bodyText}>{t('phase10.structure.listTitle')}</p>
              <ol style={styles.orderedList}>
                {['dim_movies', 'dim_genres', 'dim_directors', 'dim_actors', 'dim_countries', 'dim_languages', 'dim_time'].map((tbl, i) => (
                  <li key={i} style={styles.listItem}><code style={styles.inlineCode}>{tbl}</code></li>
                ))}
              </ol>
            </div>
          </section>

          {/* ── Step 1: Setup Folders ──────────────────────────────────── */}
          <section id="step1" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: COLOR }}>1️⃣</span>
                {t('phase10.step1.heading')}
              </h2>

              <p style={styles.bodyText}><strong>{t('phase10.step1.cmd')}</strong></p>
              <CopyableCode code={`cd D:\\movies_pipeline\\movies_dbt

# สร้างโฟลเดอร์
mkdir models\\marts
mkdir models\\marts\\dimensions
mkdir models\\marts\\bridges
mkdir models\\marts\\facts`} />

              <p style={styles.bodyText}><strong>{t('phase10.step1.verify')}</strong></p>
              <CopyableCode code={`dir models\\marts
# ควรเห็น: dimensions, bridges, facts`} />
            </div>
          </section>

          {/* ── Step 2: dim_movies ─────────────────────────────────────── */}
          <section id="step2" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#2980b9' }}>2️⃣</span>
                {t('phase10.step2.heading')}
              </h2>

              <InfoBox color={COLOR}>
                <strong>dim_movies</strong> — {t('phase10.step2.infoText')}
              </InfoBox>

              <p style={styles.bodyText}><strong>{t('phase10.labels.createFile')}</strong></p>
              <CopyableCode code={`code models\\marts\\dimensions\\dim_movies.sql`} />

              <p style={styles.bodyText}><strong>Code:</strong></p>
              <CopyableCode code={`{{
    config(
        materialized='table',
        schema='marts'
    )
}}

-- =============================================================================
-- MODEL: dim_movies
-- PURPOSE: Movie dimension with all attributes
-- INPUT: {{ ref('stg_movies_enriched') }}
-- OUTPUT: Complete movie information ready for fact tables
-- =============================================================================

with movies as (
    select * from {{ ref('stg_movies_enriched') }}
),

final as (
    select
        -- ======================================================================
        -- PRIMARY KEY
        -- ======================================================================
        movie_id,

        -- ======================================================================
        -- MOVIE ATTRIBUTES
        -- ======================================================================
        movie_title,
        release_year,
        decade,
        era,

        -- ======================================================================
        -- RATINGS
        -- ======================================================================
        imdb_rating,
        rating_category,
        rotten_tomatoes_pct,
        metacritic_score,

        -- ======================================================================
        -- MOVIE DETAILS
        -- ======================================================================
        runtime_mins,
        runtime_category,
        oscars_won,
        oscar_category,
        box_office_millions,
        box_office_category,

        -- ======================================================================
        -- SINGLE-VALUE TEXT FIELDS (from enriched)
        -- Note: These have 'Unknown' for NULL values
        -- ======================================================================
        director as primary_director,
        country  as primary_country,
        language as primary_language,

        -- ======================================================================
        -- MULTI-VALUE FIELDS (Raw - for bridge tables in Phase 11)
        -- ======================================================================
        genres_raw,    -- Example: "Action|Crime|Drama"
        actors_raw,    -- Example: "Christian Bale|Heath Ledger"
        country_list,  -- Example: "United States|United Kingdom"
        language_list, -- Example: "English|German|Polish"

        -- ======================================================================
        -- AUDIT FIELDS
        -- ======================================================================
        loaded_at,
        dbt_updated_at,
        current_timestamp() as dim_created_at

    from movies
)

select * from final
order by movie_id

-- ==============================================================================
-- EXPECTED OUTPUT:
-- - 95 rows (all movies from stg_movies_enriched)
-- - Ready for fact table joins
-- - Contains both single values (primary_*) and raw multi-values (*_list, *_raw)
-- ==============================================================================`} />

              <p style={styles.bodyText}><strong>Run:</strong></p>
              <CopyableCode code={`dbt run --select dim_movies`} />

              <p style={styles.bodyText}><strong>Verify:</strong></p>
              <CopyableCode code={`USE DATABASE movies_db;
USE SCHEMA analytics_marts;

SELECT COUNT(*) FROM dim_movies;
-- Expected: 95 rows

SELECT * FROM dim_movies LIMIT 5;`} />

              <p style={styles.bodyText}><strong>{t('phase10.labels.result')}</strong></p>
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr style={{ backgroundColor: COLOR + '22' }}>
                      {['MOVIE_ID', 'MOVIE_TITLE', 'RELEASE_YEAR', 'DECADE', 'ERA', 'IMDB_RATING', 'RATING_CATEGORY'].map(h => (
                        <th key={h} style={styles.th}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [1, 'The Shawshank Redemption', 1994, 1990, '1990s', 9.3, 'Masterpiece'],
                      [2, 'The Godfather',            1972, 1970, '1970s', 9.2, 'Masterpiece'],
                      [3, 'The Dark Knight',          2008, 2000, '2000s', 9,   'Masterpiece'],
                      [4, 'The Godfather: Part II',   1974, 1970, '1970s', 9,   'Masterpiece'],
                      [5, '12 Angry Men',             1957, 1950, '1950s', 9,   'Masterpiece'],
                    ].map((r, i) => (
                      <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#f0faf8' : '#fff' }}>
                        {r.map((c, j) => <td key={j} style={styles.td}>{c}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ── Step 3: dim_genres ─────────────────────────────────────── */}
          <section id="step3" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#8e44ad' }}>3️⃣</span>
                {t('phase10.step3.heading')}
              </h2>

              <InfoBox color="#8e44ad">
                <strong>dim_genres</strong> — {t('phase10.step3.infoText')}
              </InfoBox>

              <p style={styles.bodyText}><strong>{t('phase10.labels.createFile')}</strong></p>
              <CopyableCode code={`code models\\marts\\dimensions\\dim_genres.sql`} />

              <p style={styles.bodyText}><strong>Code:</strong></p>
              <CopyableCode code={`{{
    config(
        materialized='table',
        schema='marts'
    )
}}

-- =============================================================================
-- MODEL: dim_genres
-- PURPOSE: Genre lookup dimension
-- INPUT: {{ ref('stg_movies_enriched') }}
-- OUTPUT: Unique list of genres with surrogate keys
-- =============================================================================

with movies as (
    select * from {{ ref('stg_movies_enriched') }}
),

-- STEP 1: Split genres_raw into individual genres
split_genres as (
    select
        movie_id,
        trim(genre.value) as genre_name
    from movies,
    lateral flatten(split(genres_raw, '|')) as genre
    -- LATERAL FLATTEN: Split "Action|Crime|Drama" → 3 rows
    -- SPLIT: Split by "|"
    -- FLATTEN: Convert array → rows
    where genres_raw is not null
),

-- STEP 2: Get unique genres
unique_genres as (
    select distinct
        genre_name
    from split_genres
    where genre_name is not null
      and trim(genre_name) != ''
),

-- STEP 3: Add surrogate key
final as (
    select
        row_number() over (order by genre_name) as genre_id,
        -- Surrogate key: 1, 2, 3, ...

        genre_name,
        -- Genre name: Action, Drama, Sci-Fi, etc.

        current_timestamp() as dim_created_at

    from unique_genres
)

select * from final
order by genre_name

-- ==============================================================================
-- EXPECTED OUTPUT:
-- - ~20 rows (unique genres)
-- - genre_id: 1, 2, 3, ...
-- - genre_name: Action, Adventure, Animation, ...
-- ==============================================================================`} />

              <p style={styles.bodyText}><strong>Run:</strong></p>
              <CopyableCode code={`dbt run --select dim_genres`} />

              <p style={styles.bodyText}><strong>Verify:</strong></p>
              <CopyableCode code={`SELECT COUNT(*) FROM dim_genres;
-- Expected: 21 rows

SELECT * FROM dim_genres ORDER BY genre_name;
-- Should see: Action, Adventure, Animation, Biography, Crime, ..`} />

              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase10/dim_genres-1.png" alt="dim_genres COUNT = 21" style={styles.screenshot} />
              </div>
              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase10/dim_genres-2.png" alt="dim_genres results" style={styles.screenshot} />
              </div>
            </div>
          </section>

          {/* ── Step 4: dim_directors ──────────────────────────────────── */}
          <section id="step4" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#e67e22' }}>4️⃣</span>
                {t('phase10.step4.heading')}
              </h2>

              <InfoBox color="#e67e22">
                <strong>dim_directors</strong> — {t('phase10.step4.infoText')}
              </InfoBox>

              <p style={styles.bodyText}><strong>{t('phase10.labels.createFile')}</strong></p>
              <CopyableCode code={`code models\\marts\\dimensions\\dim_directors.sql`} />

              <p style={styles.bodyText}><strong>Code:</strong></p>
              <CopyableCode code={`{{
    config(
        materialized='table',
        schema='marts'
    )
}}

-- =============================================================================
-- MODEL: dim_directors
-- PURPOSE: Director lookup dimension
-- INPUT: {{ ref('stg_movies_cleaned') }} -- ใช้ cleaned เพราะต้องใช้ director_raw
-- OUTPUT: Unique list of directors with surrogate keys
-- =============================================================================

with movies as (
    select * from {{ ref('stg_movies_cleaned') }}
),

-- STEP 1: Split directors (some movies have multiple directors)
split_directors as (
    select
        movie_id,
        trim(director.value) as director_name
    from movies,
    lateral flatten(split(director_raw, '|')) as director
    -- Split directors separated by "|"
    -- Example: "Joel Coen|Ethan Coen" → 2 rows
    where director_raw is not null
),

-- STEP 2: Get unique directors
unique_directors as (
    select distinct
        director_name
    from split_directors
    where director_name is not null
      and trim(director_name) != ''
),

-- STEP 3: Add surrogate key
final as (
    select
        row_number() over (order by director_name) as director_id,
        director_name,
        current_timestamp() as dim_created_at
    from unique_directors
)

select * from final
order by director_name

-- ==============================================================================
-- EXPECTED OUTPUT:
-- - ~80-90 rows (unique directors)
-- - director_id: 1, 2, 3, ...
-- - director_name: Alfred Hitchcock, Christopher Nolan, ...
-- ==============================================================================`} />

              <p style={styles.bodyText}><strong>Run:</strong></p>
              <CopyableCode code={`dbt run --select dim_directors`} />

              <p style={styles.bodyText}><strong>Verify:</strong></p>
              <CopyableCode code={`SELECT COUNT(*) FROM dim_directors;
-- Expected: 61 rows

SELECT * FROM dim_directors LIMIT 10;`} />

              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase10/dim_directors-1.png" alt="dim_directors COUNT = 61" style={styles.screenshot} />
              </div>
              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase10/dim_directors-2.png" alt="dim_directors results" style={styles.screenshot} />
              </div>
            </div>
          </section>

          {/* ── Step 5: dim_actors ─────────────────────────────────────── */}
          <section id="step5" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#c0392b' }}>5️⃣</span>
                {t('phase10.step5.heading')}
              </h2>

              <InfoBox color="#c0392b">
                <strong>dim_actors</strong> — {t('phase10.step5.infoText')}
              </InfoBox>

              <p style={styles.bodyText}><strong>{t('phase10.labels.createFile')}</strong></p>
              <CopyableCode code={`code models\\marts\\dimensions\\dim_actors.sql`} />

              <p style={styles.bodyText}><strong>Code:</strong></p>
              <CopyableCode code={`{{
    config(
        materialized='table',
        schema='marts'
    )
}}

-- =============================================================================
-- MODEL: dim_actors
-- PURPOSE: Actor lookup dimension
-- INPUT: {{ ref('stg_movies_enriched') }}
-- OUTPUT: Unique list of actors with surrogate keys
-- =============================================================================

with movies as (
    select * from {{ ref('stg_movies_enriched') }}
),

-- STEP 1: Split actors (pipe-separated)
split_actors as (
    select
        movie_id,
        trim(actor.value) as actor_name
    from movies,
    lateral flatten(split(actors_raw, '|')) as actor
    -- Split actors separated by "|"
    -- Example: "Christian Bale|Heath Ledger" → 2 rows
    where actors_raw is not null
),

-- STEP 2: Get unique actors
unique_actors as (
    select distinct
        actor_name
    from split_actors
    where actor_name is not null
      and trim(actor_name) != ''
),

-- STEP 3: Add surrogate key
final as (
    select
        row_number() over (order by actor_name) as actor_id,
        actor_name,
        current_timestamp() as dim_created_at
    from unique_actors
)

select * from final
order by actor_name

-- ==============================================================================
-- EXPECTED OUTPUT:
-- - ~150-200 rows (unique actors)
-- - actor_id: 1, 2, 3, ...
-- - actor_name: Al Pacino, Brad Pitt, ...
-- ==============================================================================`} />

              <p style={styles.bodyText}><strong>Run:</strong></p>
              <CopyableCode code={`dbt run --select dim_actors`} />

              <p style={styles.bodyText}><strong>Verify:</strong></p>
              <CopyableCode code={`SELECT COUNT(*) FROM dim_actors;
-- Expected: 152 rows

SELECT * FROM dim_actors LIMIT 20;`} />

              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase10/dim_actors-1.png" alt="dim_actors COUNT = 152" style={styles.screenshot} />
              </div>
              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase10/dim_actors-2.png" alt="dim_actors results" style={styles.screenshot} />
              </div>
            </div>
          </section>

          {/* ── Step 6: dim_countries ──────────────────────────────────── */}
          <section id="step6" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#27ae60' }}>6️⃣</span>
                {t('phase10.step6.heading')}
              </h2>

              <InfoBox color="#27ae60">
                <strong>dim_countries</strong> — {t('phase10.step6.infoText')}
              </InfoBox>

              <p style={styles.bodyText}><strong>{t('phase10.labels.createFile')}</strong></p>
              <CopyableCode code={`code models\\marts\\dimensions\\dim_countries.sql`} />

              <p style={styles.bodyText}><strong>Code:</strong></p>
              <CopyableCode code={`{{
    config(
        materialized='table',
        schema='marts'
    )
}}

-- =============================================================================
-- MODEL: dim_countries
-- PURPOSE: Country lookup dimension
-- INPUT: {{ ref('stg_movies_enriched') }}
-- OUTPUT: Unique list of countries with surrogate keys
-- =============================================================================

with movies as (
    select * from {{ ref('stg_movies_enriched') }}
),

-- STEP 1: Split countries (pipe-separated)
split_countries as (
    select
        movie_id,
        trim(country.value) as country_name
    from movies,
    lateral flatten(split(country_list, '|')) as country
    -- Note: stg_movies_enriched has "country_list" (not country_raw)
    -- Split "United States|United Kingdom" → 2 rows
    where country_list is not null
),

-- STEP 2: Get unique countries
unique_countries as (
    select distinct
        country_name
    from split_countries
    where country_name is not null
      and trim(country_name) != ''
),

-- STEP 3: Add surrogate key
final as (
    select
        row_number() over (order by country_name) as country_id,
        country_name,
        current_timestamp() as dim_created_at
    from unique_countries
)

select * from final
order by country_name

-- ==============================================================================
-- EXPECTED OUTPUT:
-- - ~15-20 rows (unique countries)
-- - country_id: 1, 2, 3, ...
-- - country_name: Brazil, France, Italy, Japan, United States, ...
-- ==============================================================================`} />

              <p style={styles.bodyText}><strong>Run:</strong></p>
              <CopyableCode code={`dbt run --select dim_countries`} />

              <p style={styles.bodyText}><strong>Verify:</strong></p>
              <CopyableCode code={`SELECT COUNT(*) FROM dim_countries;
-- Expected: 16 rows

SELECT * FROM dim_countries ORDER BY country_name;`} />

              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase10/dim_countries-1.png" alt="dim_countries COUNT = 16" style={styles.screenshot} />
              </div>
              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase10/dim_countries-2.png" alt="dim_countries results" style={styles.screenshot} />
              </div>
            </div>
          </section>

          {/* ── Step 7: dim_languages ──────────────────────────────────── */}
          <section id="step7" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#2980b9' }}>7️⃣</span>
                {t('phase10.step7.heading')}
              </h2>

              <InfoBox color="#2980b9">
                <strong>dim_languages</strong> — {t('phase10.step7.infoText')}
              </InfoBox>

              <p style={styles.bodyText}><strong>{t('phase10.labels.createFile')}</strong></p>
              <CopyableCode code={`code models\\marts\\dimensions\\dim_languages.sql`} />

              <p style={styles.bodyText}><strong>Code:</strong></p>
              <CopyableCode code={`{{
    config(
        materialized='table',
        schema='marts'
    )
}}

-- =============================================================================
-- MODEL: dim_languages
-- PURPOSE: Language lookup dimension
-- INPUT: {{ ref('stg_movies_enriched') }}
-- OUTPUT: Unique list of languages with surrogate keys
-- =============================================================================

with movies as (
    select * from {{ ref('stg_movies_enriched') }}
),

-- STEP 1: Split languages (pipe-separated)
split_languages as (
    select
        movie_id,
        trim(language.value) as language_name
    from movies,
    lateral flatten(split(language_list, '|')) as language
    -- Note: stg_movies_enriched has "language_list" (not language_raw)
    -- Split "English|German|Polish" → 3 rows
    where language_list is not null
),

-- STEP 2: Get unique languages
unique_languages as (
    select distinct
        language_name
    from split_languages
    where language_name is not null
      and trim(language_name) != ''
),

-- STEP 3: Add surrogate key
final as (
    select
        row_number() over (order by language_name) as language_id,
        language_name,
        current_timestamp() as dim_created_at
    from unique_languages
)

select * from final
order by language_name

-- ==============================================================================
-- EXPECTED OUTPUT:
-- - ~10-15 rows (unique languages)
-- - language_id: 1, 2, 3, ...
-- - language_name: English, French, German, Italian, Japanese, ...
-- ==============================================================================`} />

              <p style={styles.bodyText}><strong>Run:</strong></p>
              <CopyableCode code={`dbt run --select dim_languages`} />

              <p style={styles.bodyText}><strong>Verify:</strong></p>
              <CopyableCode code={`SELECT COUNT(*) FROM dim_languages;
-- Expected: 12 rows

SELECT * FROM dim_languages ORDER BY language_name;`} />

              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase10/dim_languages-1.png" alt="dim_languages COUNT = 12" style={styles.screenshot} />
              </div>
              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase10/dim_languages-2.png" alt="dim_languages results" style={styles.screenshot} />
              </div>
            </div>
          </section>

          {/* ── Step 8: dim_time ───────────────────────────────────────── */}
          <section id="step8" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#7f8c8d' }}>8️⃣</span>
                {t('phase10.step8.heading')}
              </h2>

              <InfoBox color="#7f8c8d">
                <strong>dim_time</strong> — {t('phase10.step8.infoText')}
              </InfoBox>

              <p style={styles.bodyText}><strong>{t('phase10.labels.createFile')}</strong></p>
              <CopyableCode code={`code models\\marts\\dimensions\\dim_time.sql`} />

              <p style={styles.bodyText}><strong>Code:</strong></p>
              <CopyableCode code={`{{
    config(
        materialized='table',
        schema='marts'
    )
}}

-- =============================================================================
-- MODEL: dim_time
-- PURPOSE: Time dimension (year-based for movies)
-- INPUT: {{ ref('stg_movies_enriched') }}
-- OUTPUT: Year-level time dimension
-- =============================================================================

with movies as (
    select * from {{ ref('stg_movies_enriched') }}
),

-- Get unique years
unique_years as (
    select distinct
        release_year as year
    from movies
    where release_year is not null
),

-- Add time attributes
final as (
    select
        year as time_id,
        -- PK: Year itself (1940, 1950, ...)

        year,
        -- Full year: 1994, 2010

        floor(year / 10) * 10 as decade,
        -- Decade: 1990, 2000, 2010

        case
            when year < 1960 then 'Classic Era'
            when year < 1980 then 'New Hollywood Era'
            when year < 2000 then 'Blockbuster Era'
            else 'Modern Era'
        end as era,
        -- Movie era

        case
            when year < 2000 then '20th Century'
            else '21st Century'
        end as century,
        -- Century

        -- Additional time attributes
        case
            when year < 1950 then 'Pre-1950s'
            when year < 1960 then '1950s'
            when year < 1970 then '1960s'
            when year < 1980 then '1970s'
            when year < 1990 then '1980s'
            when year < 2000 then '1990s'
            when year < 2010 then '2000s'
            else '2010s+'
        end as decade_label,

        current_timestamp() as dim_created_at

    from unique_years
)

select * from final
order by year

-- ==============================================================================
-- EXPECTED OUTPUT:
-- - ~70 rows (one per unique year: 1931-2019)
-- - time_id = year
-- - decade, era, century attributes
-- ==============================================================================`} />

              <p style={styles.bodyText}><strong>Run:</strong></p>
              <CopyableCode code={`dbt run --select dim_time`} />

              <p style={styles.bodyText}><strong>Verify:</strong></p>
              <CopyableCode code={`SELECT COUNT(*) FROM dim_time;
-- Expected: 54 rows

SELECT * FROM dim_time ORDER BY year LIMIT 10;`} />

              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase10/dim_time-1.png" alt="dim_time COUNT = 54" style={styles.screenshot} />
              </div>
              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase10/dim_time-2.png" alt="dim_time results" style={styles.screenshot} />
              </div>
            </div>
          </section>

          {/* ── Dimensions Summary ──────────────────────────────────────── */}
          <section id="summary" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: COLOR }}>🎉</span>
                {t('phase10.summary.heading')}
              </h2>

              <p style={styles.bodyText}><strong>{t('phase10.summary.runAll')}</strong></p>
              <CopyableCode code={`dbt run --select marts.dimensions`} />

              <p style={styles.bodyText}><strong>{t('phase10.summary.verifyAll')}</strong></p>
              <CopyableCode code={`-- =============================================================================
-- Dimensions Summary
-- =============================================================================
-- Check all dimension tables
SELECT 'dim_movies'    as table_name, COUNT(*) as row_count FROM dim_movies
UNION ALL
SELECT 'dim_genres',    COUNT(*) FROM dim_genres
UNION ALL
SELECT 'dim_directors', COUNT(*) FROM dim_directors
UNION ALL
SELECT 'dim_actors',    COUNT(*) FROM dim_actors
UNION ALL
SELECT 'dim_countries', COUNT(*) FROM dim_countries
UNION ALL
SELECT 'dim_languages', COUNT(*) FROM dim_languages
UNION ALL
SELECT 'dim_time',      COUNT(*) FROM dim_time
ORDER BY table_name;`} />

              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase10/Dimensions Summary.png" alt="Dimensions Summary Results" style={styles.screenshot} />
              </div>

              <InfoBox color={COLOR}>
                <strong>{t('phase10.summary.completeMsg')}</strong>
                <p style={{ margin: '8px 0 4px' }}>{t('phase10.summary.tablesBuilt')}</p>
                <ol style={{ margin: '4px 0 0', paddingLeft: '20px' }}>
                  <li><code style={styles.inlineCode}>dim_movies</code> — 95 rows</li>
                  <li><code style={styles.inlineCode}>dim_genres</code> — 21 rows</li>
                  <li><code style={styles.inlineCode}>dim_directors</code> — 61 rows</li>
                  <li><code style={styles.inlineCode}>dim_actors</code> — 152 rows</li>
                  <li><code style={styles.inlineCode}>dim_countries</code> — 16 rows</li>
                  <li><code style={styles.inlineCode}>dim_languages</code> — 12 rows</li>
                  <li><code style={styles.inlineCode}>dim_time</code> — 54 rows</li>
                </ol>
              </InfoBox>

              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr style={{ backgroundColor: COLOR + '22' }}>
                      <th style={styles.th}>{t('phase10.summary.thTable')}</th>
                      <th style={styles.th}>{t('phase10.summary.thRows')}</th>
                      <th style={styles.th}>{t('phase10.summary.thKey')}</th>
                      <th style={styles.th}>{t('phase10.summary.thDesc')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['dim_actors',    152, 'actor_id',      t('phase10.summary.d1Desc')],
                      ['dim_countries',  16, 'country_id',    t('phase10.summary.d2Desc')],
                      ['dim_directors',  61, 'director_id',   t('phase10.summary.d3Desc')],
                      ['dim_genres',     21, 'genre_id',      t('phase10.summary.d4Desc')],
                      ['dim_languages',  12, 'language_id',   t('phase10.summary.d5Desc')],
                      ['dim_movies',     95, 'movie_id',      t('phase10.summary.d6Desc')],
                      ['dim_time',       54, 'time_id (year)',t('phase10.summary.d7Desc')],
                    ].map((r, i) => (
                      <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#f0faf8' : '#fff' }}>
                        <td style={{ ...styles.td, fontWeight: '700' }}><code style={styles.inlineCode}>{r[0]}</code></td>
                        <td style={{ ...styles.td, fontWeight: '700', color: COLOR }}>{r[1]}</td>
                        <td style={styles.td}><code style={styles.inlineCode}>{r[2]}</code></td>
                        <td style={{ ...styles.td, fontSize: '0.82rem' }}>{r[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <PhaseNavigator currentPhase={10} totalPhases={15} />
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
  header:       { background: 'linear-gradient(135deg, #0e6655 0%, #16A085 60%, #1abc9c 100%)', padding: '60px 20px', color: 'white' },
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
  navItemActive:{ backgroundColor: '#E8F8F5', color: COLOR, fontWeight: '600' },
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
  inlineCode:   { backgroundColor: '#e8f8f5', padding: '2px 6px', borderRadius: '4px', fontSize: '0.88em', fontFamily: "'Courier New', monospace", color: '#0e6655' },
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

  scrollTopBtn: { position: 'fixed', bottom: '115px', right: '30px', backgroundColor: COLOR, color: 'white', border: 'none', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem', fontWeight: '700', boxShadow: `0 4px 15px ${COLOR}66`, zIndex: 1000 },
};

export default Phase10Detail;
