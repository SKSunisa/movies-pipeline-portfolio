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

const COLOR = '#D35400';

/* ════════════════════════════════════════════════════════════════════════════
   Phase 11 Detail Page
════════════════════════════════════════════════════════════════════════════ */
const Phase11Detail = () => {
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
    { id: 'purpose',        label: t('phase11.nav.purpose'),        bold: true },
    { id: 'structure',      label: t('phase11.nav.structure'),      bold: true },
    { id: 'tables',         label: t('phase11.nav.tables'),         bold: true },
    { id: 'part1',          label: t('phase11.nav.part1'),          bold: true },
    { id: 'step1',          label: t('phase11.nav.step1'),          bold: false },
    { id: 'step2',          label: t('phase11.nav.step2'),          bold: false },
    { id: 'step3',          label: t('phase11.nav.step3'),          bold: false },
    { id: 'step4',          label: t('phase11.nav.step4'),          bold: false },
    { id: 'step5',          label: t('phase11.nav.step5'),          bold: false },
    { id: 'bridges_summary',label: t('phase11.nav.bridges_summary'),bold: true },
    { id: 'part2',          label: t('phase11.nav.part2'),          bold: true },
    { id: 'final_verify',   label: t('phase11.nav.final_verify'),   bold: true },
    { id: 'summary',        label: t('phase11.nav.summary'),        bold: true },
  ];

  return (
    <div style={styles.container}>

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <button onClick={() => navigate('/')} style={styles.backButton}>{t('phase11.backBtn')}</button>
          <div style={styles.phaseNumber}>
            <span style={styles.phaseLabel}>Phase 11</span>
            <h1 style={styles.phaseTitle}>{t('phase11.title')}</h1>
            <p style={styles.phaseSubtitle}>{t('phase11.subtitle')}</p>
            <div style={styles.headerBadges}>
              <span style={styles.badge}>🗄️ dbt</span>
              <span style={styles.badge}>❄️ Snowflake</span>
              <span style={styles.badge}>🌉 Bridge Tables</span>
              <span style={styles.badge}>📊 Fact Table</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── TWO-COLUMN LAYOUT ──────────────────────────────────────────── */}
      <div style={styles.pageLayout}>

        {/* ── SIDEBAR (LEFT) ─────────────────────────────────────────── */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarCard}>
            <h3 style={styles.sidebarTitle}>{t('phase11.navTitle')}</h3>
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
            <h3 style={styles.sidebarTitle}>{t('phase11.info.title')}</h3>
            {[
              ['Bridge Tables', '5 tables'],
              ['bridge_movie_genre',    '238 rows'],
              ['bridge_movie_actor',    '189 rows'],
              ['bridge_movie_country',  '126 rows'],
              ['bridge_movie_language', '103 rows'],
              ['bridge_movie_director', '100 rows'],
              ['Fact Table', '1 table'],
              ['fact_movie_performance','95 rows'],
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
                {t('phase11.purpose.heading')}
              </h2>
              <p style={styles.bodyText}>{t('phase11.purpose.desc1')}</p>
              <p style={styles.bodyText}>{t('phase11.purpose.desc2')}</p>
              <ol style={styles.orderedList}>
                <li style={styles.listItem}>{t('phase11.purpose.goal1')}</li>
                <li style={styles.listItem}>{t('phase11.purpose.goal2')}</li>
              </ol>
              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase11/objective.svg" alt="Phase 11 Architecture" style={styles.screenshot} />
              </div>
            </div>
          </section>

          {/* ── Project Structure ──────────────────────────────────────── */}
          <section id="structure" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: COLOR }}>📁</span>
                {t('phase11.structure.heading')}
              </h2>
              <CopyableCode code={`movies_dbt/
├── models/
│   ├── staging/
│   │   ├── sources.yml
│   │   ├── schema.yml
│   │   ├── stg_movies_base.sql
│   │   └── stg_movies.sql
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
            </div>
          </section>

          {/* ── Tables Overview ────────────────────────────────────────── */}
          <section id="tables" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: COLOR }}>📋</span>
                {t('phase11.tables.heading')}
              </h2>

              <InfoBox color="#16A085">
                <strong>✅ {t('phase11.tables.dimTitle')}</strong>
                <ol style={{ ...styles.orderedList, marginTop: '8px' }}>
                  {['dim_movies','dim_genres','dim_directors','dim_actors','dim_countries','dim_languages','dim_time'].map((tbl,i) => (
                    <li key={i} style={styles.listItem}><code style={styles.inlineCode}>{tbl}</code></li>
                  ))}
                </ol>
              </InfoBox>

              <InfoBox color={COLOR}>
                <strong>▶️ {t('phase11.tables.bridgeTitle')}</strong>
                <ol style={{ ...styles.orderedList, marginTop: '8px' }}>
                  <li style={styles.listItem}><code style={styles.inlineCode}>bridge_movie_genre</code> — Movie ↔ Genre</li>
                  <li style={styles.listItem}><code style={styles.inlineCode}>bridge_movie_actor</code> — Movie ↔ Actor</li>
                  <li style={styles.listItem}><code style={styles.inlineCode}>bridge_movie_country</code> — Movie ↔ Country</li>
                  <li style={styles.listItem}><code style={styles.inlineCode}>bridge_movie_language</code> — Movie ↔ Language</li>
                  <li style={styles.listItem}><code style={styles.inlineCode}>bridge_movie_director</code> — Movie ↔ Director</li>
                </ol>
              </InfoBox>

              <InfoBox color="#2980B9">
                <strong>▶️ {t('phase11.tables.factTitle')}</strong>
                <ul style={{ ...styles.bulletList, marginTop: '8px' }}>
                  <li style={styles.listItem}><code style={styles.inlineCode}>fact_movie_performance</code> — Movie metrics (95 rows)</li>
                </ul>
              </InfoBox>
            </div>
          </section>

          {/* ── PART 1 INTRO ───────────────────────────────────────────── */}
          <section id="part1" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={{ ...styles.sectionHeading, fontSize: '1.8rem' }}>
                <span style={{ ...styles.sectionBadge, backgroundColor: COLOR }}>🌉</span>
                {t('phase11.part1.heading')}
              </h2>
              <p style={styles.bodyText}>{t('phase11.part1.desc')}</p>
            </div>
          </section>

          {/* ── STEP 1: bridge_movie_genre ────────────────────────────── */}
          <section id="step1" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#E74C3C' }}>1️⃣</span>
                {t('phase11.step1.heading')}
              </h2>

              <InfoBox color={COLOR}>
                <strong>bridge_movie_genre</strong> — Many-to-Many bridge between movies and genres | Input: dim_movies, dim_genres | Output: 238 rows
              </InfoBox>

              <p style={styles.bodyText}><strong>{t('phase11.labels.createFile')}</strong></p>
              <CopyableCode code={`cd D:\\movies_pipeline\\movies_dbt
code models\\marts\\bridges\\bridge_movie_genre.sql`} />

              <p style={styles.bodyText}><strong>{t('phase11.labels.code')}</strong></p>
              <CopyableCode code={`{{
    config(
        materialized='table',
        schema='marts'
    )
}}

-- =====================================================
-- MODEL: bridge_movie_genre
-- PURPOSE: Many-to-Many bridge between movies and genres
-- INPUT: {{ ref('dim_movies') }}, {{ ref('dim_genres') }}
-- OUTPUT: Movie-Genre relationships
-- =====================================================

with movies as (
    select
        movie_id,
        genres_raw
    from {{ ref('dim_movies') }}
),

genres as (
    select
        genre_id,
        genre_name
    from {{ ref('dim_genres') }}
),

-- Split genres for each movie
split_genres as (
    select
        movie_id,
        trim(genre.value) as genre_name
    from movies,
    lateral flatten(split(genres_raw, '|')) as genre
),

-- Join with dim_genres to get genre_id
final as (
    select
        sg.movie_id,
        g.genre_id,
        sg.genre_name,
        current_timestamp() as bridge_created_at
    from split_genres sg
    join genres g
        on sg.genre_name = g.genre_name
    where sg.genre_name is not null
      and trim(sg.genre_name) != ''
)

select * from final
order by movie_id, genre_id

-- =====================================================
-- OUTPUT:
-- 238 rows (movies × genres)
-- - One row per movie-genre combination
--
-- EXAMPLE:
-- movie_id | genre_id | genre_name
-- ---------|----------|------------
-- 1        | 5        | Crime
-- 1        | 8        | Drama
-- 2        | 5        | Crime
-- 2        | 8        | Drama
-- =====================================================`} />

              <p style={styles.bodyText}><strong>{t('phase11.labels.run')}</strong></p>
              <CopyableCode code={`dbt run --select bridge_movie_genre`} />

              <p style={styles.bodyText}><strong>{t('phase11.labels.verify')}</strong></p>
              <CopyableCode code={`SELECT COUNT(*) FROM bridge_movie_genre;`} />

              <p style={styles.bodyText}><strong>{t('phase11.labels.result')}</strong></p>
              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase11/bridge_movie_genre.png" alt="bridge_movie_genre result" style={styles.screenshot} />
              </div>

              <CopyableCode code={`-- See movies with multiple genres
SELECT
    movie_id,
    COUNT(*) as genre_count,
    LISTAGG(genre_name, ', ') as genres
FROM bridge_movie_genre
GROUP BY movie_id
ORDER BY genre_count DESC
LIMIT 10;`} />

              <p style={styles.bodyText}><strong>{t('phase11.labels.result')}</strong></p>
              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase11/bridge_movie_genre_2.png" alt="bridge_movie_genre genre count result" style={styles.screenshot} />
              </div>
            </div>
          </section>

          {/* ── STEP 2: bridge_movie_actor ────────────────────────────── */}
          <section id="step2" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#3498DB' }}>2️⃣</span>
                {t('phase11.step2.heading')}
              </h2>

              <InfoBox color={COLOR}>
                <strong>bridge_movie_actor</strong> — Many-to-Many bridge between movies and actors | Input: dim_movies, dim_actors | Output: 189 rows
              </InfoBox>

              <p style={styles.bodyText}><strong>{t('phase11.labels.createFile')}</strong></p>
              <CopyableCode code={`code models\\marts\\bridges\\bridge_movie_actor.sql`} />

              <p style={styles.bodyText}><strong>{t('phase11.labels.code')}</strong></p>
              <CopyableCode code={`{{
    config(
        materialized='table',
        schema='marts'
    )
}}

-- =====================================================
-- MODEL: bridge_movie_actor
-- PURPOSE: Many-to-Many bridge between movies and actors
-- INPUT: {{ ref('dim_movies') }}, {{ ref('dim_actors') }}
-- OUTPUT: Movie-Actor relationships
-- =====================================================

with movies as (
    select
        movie_id,
        actors_raw
    from {{ ref('dim_movies') }}
),

actors as (
    select
        actor_id,
        actor_name
    from {{ ref('dim_actors') }}
),

-- Split actors for each movie
split_actors as (
    select
        movie_id,
        trim(actor.value) as actor_name
    from movies,
    lateral flatten(split(actors_raw, '|')) as actor
    where actors_raw is not null
),

-- Join with dim_actors to get actor_id
final as (
    select
        sa.movie_id,
        a.actor_id,
        sa.actor_name,
        current_timestamp() as bridge_created_at
    from split_actors sa
    inner join actors a
        on sa.actor_name = a.actor_name
    where sa.actor_name is not null
      and trim(sa.actor_name) != ''
)

select * from final
order by movie_id, actor_id

-- =====================================================
-- OUTPUT:
-- 189 rows (movies × actors)
-- - One row per movie-actor combination
--
-- EXAMPLE:
-- movie_id | actor_id | actor_name
-- ---------|----------|------------------
-- 3        | 12       | Christian Bale
-- 3        | 87       | Heath Ledger
-- =====================================================`} />

              <p style={styles.bodyText}><strong>{t('phase11.labels.run')}</strong></p>
              <CopyableCode code={`dbt run --select bridge_movie_actor`} />

              <p style={styles.bodyText}><strong>{t('phase11.labels.verify')}</strong></p>
              <CopyableCode code={`SELECT COUNT(*) FROM bridge_movie_actor;`} />

              <p style={styles.bodyText}><strong>{t('phase11.labels.result')}</strong></p>
              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase11/bridge_movie_actor.png" alt="bridge_movie_actor result" style={styles.screenshot} />
              </div>
            </div>
          </section>

          {/* ── STEP 3: bridge_movie_country ─────────────────────────── */}
          <section id="step3" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#1ABC9C' }}>3️⃣</span>
                {t('phase11.step3.heading')}
              </h2>

              <InfoBox color={COLOR}>
                <strong>bridge_movie_country</strong> — Many-to-Many bridge between movies and countries | Input: dim_movies, dim_countries | Output: 126 rows
              </InfoBox>

              <p style={styles.bodyText}><strong>{t('phase11.labels.createFile')}</strong></p>
              <CopyableCode code={`code models\\marts\\bridges\\bridge_movie_country.sql`} />

              <p style={styles.bodyText}><strong>{t('phase11.labels.code')}</strong></p>
              <CopyableCode code={`{{
    config(
        materialized='table',
        schema='marts'
    )
}}

-- =====================================================
-- MODEL: bridge_movie_country
-- PURPOSE: Many-to-Many bridge between movies and countries
-- INPUT: {{ ref('dim_movies') }}, {{ ref('dim_countries') }}
-- OUTPUT: Movie-Country relationships
-- =====================================================

with movies as (
    select
        movie_id,
        country_list
    from {{ ref('dim_movies') }}
),

countries as (
    select
        country_id,
        country_name
    from {{ ref('dim_countries') }}
),

-- Split countries for each movie
split_countries as (
    select
        movie_id,
        trim(country.value) as country_name
    from movies,
    lateral flatten(split(country_list, '|')) as country
    where country_list is not null
),

-- Join with dim_countries to get country_id
final as (
    select
        sc.movie_id,
        c.country_id,
        sc.country_name,
        current_timestamp() as bridge_created_at
    from split_countries sc
    inner join countries c
        on sc.country_name = c.country_name
    where sc.country_name is not null
      and trim(sc.country_name) != ''
)

select * from final
order by movie_id, country_id

-- =====================================================
-- OUTPUT:
-- 126 rows (movies × countries)
-- - One row per movie-country combination
--
-- EXAMPLE:
-- movie_id | country_id | country_name
-- ---------|------------|-------------------
-- 3        | 45         | United States
-- 3        | 46         | United Kingdom
-- =====================================================`} />

              <p style={styles.bodyText}><strong>{t('phase11.labels.run')}</strong></p>
              <CopyableCode code={`dbt run --select bridge_movie_country`} />

              <p style={styles.bodyText}><strong>{t('phase11.labels.verify')}</strong></p>
              <CopyableCode code={`SELECT COUNT(*) FROM bridge_movie_country;`} />

              <p style={styles.bodyText}><strong>{t('phase11.labels.result')}</strong></p>
              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase11/bridge_movie_country.png" alt="bridge_movie_country result" style={styles.screenshot} />
              </div>
            </div>
          </section>

          {/* ── STEP 4: bridge_movie_language ────────────────────────── */}
          <section id="step4" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#9B59B6' }}>4️⃣</span>
                {t('phase11.step4.heading')}
              </h2>

              <InfoBox color={COLOR}>
                <strong>bridge_movie_language</strong> — Many-to-Many bridge between movies and languages | Input: dim_movies, dim_languages | Output: 103 rows
              </InfoBox>

              <p style={styles.bodyText}><strong>{t('phase11.labels.createFile')}</strong></p>
              <CopyableCode code={`code models\\marts\\bridges\\bridge_movie_language.sql`} />

              <p style={styles.bodyText}><strong>{t('phase11.labels.code')}</strong></p>
              <CopyableCode code={`{{
    config(
        materialized='table',
        schema='marts'
    )
}}

-- =====================================================
-- MODEL: bridge_movie_language
-- PURPOSE: Many-to-Many bridge between movies and languages
-- INPUT: {{ ref('dim_movies') }}, {{ ref('dim_languages') }}
-- OUTPUT: Movie-Language relationships
-- =====================================================

with movies as (
    select
        movie_id,
        language_list
    from {{ ref('dim_movies') }}
),

languages as (
    select
        language_id,
        language_name
    from {{ ref('dim_languages') }}
),

-- Split languages for each movie
split_languages as (
    select
        movie_id,
        trim(language.value) as language_name
    from movies,
    lateral flatten(split(language_list, '|')) as language
    where language_list is not null
),

-- Join with dim_languages to get language_id
final as (
    select
        sl.movie_id,
        l.language_id,
        sl.language_name,
        current_timestamp() as bridge_created_at
    from split_languages sl
    inner join languages l
        on sl.language_name = l.language_name
    where sl.language_name is not null
      and trim(sl.language_name) != ''
)

select * from final
order by movie_id, language_id

-- =====================================================
-- EXPECTED OUTPUT:
-- 103 rows (movies × languages)
-- - One row per movie-language combination
--
-- EXAMPLE:
-- movie_id | language_id | language_name
-- ---------|-------------|------------------
-- 7        | 8           | English
-- 7        | 15          | German
-- 7        | 32          | Polish
-- =====================================================`} />

              <p style={styles.bodyText}><strong>{t('phase11.labels.run')}</strong></p>
              <CopyableCode code={`dbt run --select bridge_movie_language`} />

              <p style={styles.bodyText}><strong>{t('phase11.labels.verify')}</strong></p>
              <CopyableCode code={`SELECT COUNT(*) FROM bridge_movie_language;`} />

              <p style={styles.bodyText}><strong>{t('phase11.labels.result')}</strong></p>
              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase11/bridge_movie_language.png" alt="bridge_movie_language result" style={styles.screenshot} />
              </div>
            </div>
          </section>

          {/* ── STEP 5: bridge_movie_director ────────────────────────── */}
          <section id="step5" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#E67E22' }}>5️⃣</span>
                {t('phase11.step5.heading')}
              </h2>

              <InfoBox color={COLOR}>
                <strong>bridge_movie_director</strong> — Many-to-Many bridge between movies and directors | Input: stg_movies_cleaned, dim_directors | Output: 100 rows | NOTE: Must use stg_movies_cleaned to access director_raw
              </InfoBox>

              <p style={styles.bodyText}><strong>{t('phase11.labels.createFile')}</strong></p>
              <CopyableCode code={`code models\\marts\\bridges\\bridge_movie_director.sql`} />

              <p style={styles.bodyText}><strong>{t('phase11.labels.code')}</strong></p>
              <CopyableCode code={`{{
    config(
        materialized='table',
        schema='marts'
    )
}}

-- =====================================================
-- MODEL: bridge_movie_director
-- PURPOSE: Many-to-Many bridge between movies and directors
-- INPUT: {{ ref('stg_movies_cleaned') }}, {{ ref('dim_directors') }}
-- OUTPUT: Movie-Director relationships
-- NOTE: Must use stg_movies_cleaned to access director_raw
-- =====================================================

with movies as (
    select
        movie_id,
        director_raw
    from {{ ref('stg_movies_cleaned') }}
),

directors as (
    select
        director_id,
        director_name
    from {{ ref('dim_directors') }}
),

-- Split directors for each movie (some movies have multiple directors)
split_directors as (
    select
        movie_id,
        trim(director.value) as director_name
    from movies,
    lateral flatten(split(director_raw, '|')) as director
    where director_raw is not null
),

-- Join with dim_directors to get director_id
final as (
    select
        sd.movie_id,
        d.director_id,
        sd.director_name,
        current_timestamp() as bridge_created_at
    from split_directors sd
    inner join directors d
        on trim(lower(sd.director_name)) = trim(lower(d.director_name))
    where sd.director_name is not null
      and trim(sd.director_name) != ''
)

select * from final
order by movie_id, director_id

-- =====================================================
-- OUTPUT:
-- 100 rows (most movies have 1 director, some have 2)
-- - One row per movie-director combination
--
-- EXAMPLE:
-- movie_id | director_id | director_name
-- ---------|-------------|---------------------
-- 3        | 23          | Christopher Nolan
-- 65       | 35          | Joel Coen
-- 65       | 36          | Ethan Coen
-- =====================================================`} />

              <p style={styles.bodyText}><strong>{t('phase11.labels.run')}</strong></p>
              <CopyableCode code={`dbt run --select bridge_movie_director`} />

              <p style={styles.bodyText}><strong>{t('phase11.labels.verify')}</strong></p>
              <CopyableCode code={`SELECT COUNT(*) FROM bridge_movie_director;`} />

              <p style={styles.bodyText}><strong>{t('phase11.labels.result')}</strong></p>
              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase11/bridge_movie_director.png" alt="bridge_movie_director result" style={styles.screenshot} />
              </div>
            </div>
          </section>

          {/* ── BRIDGES SUMMARY ──────────────────────────────────────── */}
          <section id="bridges_summary" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: COLOR }}>📊</span>
                {t('phase11.bridges_summary.heading')}
              </h2>

              <p style={styles.bodyText}><strong>{t('phase11.bridges_summary.runAll')}</strong></p>
              <CopyableCode code={`dbt run --select marts.bridges`} />

              <p style={styles.bodyText}><strong>{t('phase11.bridges_summary.verifyAll')}</strong></p>
              <CopyableCode code={`SELECT 'bridge_movie_genre' as table_name, COUNT(*) as rows FROM bridge_movie_genre
UNION ALL
SELECT 'bridge_movie_actor', COUNT(*) FROM bridge_movie_actor
UNION ALL
SELECT 'bridge_movie_country', COUNT(*) FROM bridge_movie_country
UNION ALL
SELECT 'bridge_movie_language', COUNT(*) FROM bridge_movie_language
UNION ALL
SELECT 'bridge_movie_director', COUNT(*) FROM bridge_movie_director;`} />

              <p style={styles.bodyText}><strong>{t('phase11.labels.result')}</strong></p>
              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase11/bridges_summary.png" alt="Bridges Summary result" style={styles.screenshot} />
              </div>
            </div>
          </section>

          {/* ── PART 2: FACT TABLE ──────────────────────────────────── */}
          <section id="part2" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={{ ...styles.sectionHeading, fontSize: '1.8rem' }}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#2980B9' }}>📊</span>
                {t('phase11.part2.heading')}
              </h2>

              <InfoBox color="#2980B9">
                <strong>fact_movie_performance</strong> — {t('phase11.part2.desc')}
              </InfoBox>

              <p style={styles.bodyText}><strong>{t('phase11.labels.createFile')}</strong></p>
              <CopyableCode code={`code models\\marts\\facts\\fact_movie_performance.sql`} />

              <p style={styles.bodyText}><strong>{t('phase11.labels.code')}</strong></p>
              <CopyableCode code={`{{
    config(
        materialized='table',
        schema='marts'
    )
}}

-- =====================================================
-- MODEL: fact_movie_performance
-- PURPOSE: Fact table with movie performance metrics
-- GRAIN: One row per movie
-- INPUT: {{ ref('dim_movies') }}, {{ ref('dim_time') }}
-- OUTPUT: Movie performance facts
-- =====================================================

with movies as (
    select * from {{ ref('dim_movies') }}
),

time_dim as (
    select * from {{ ref('dim_time') }}
),

final as (
    select
        -- ================================================
        -- FOREIGN KEYS (Dimension References)
        -- ================================================
        m.movie_id,           -- FK to dim_movies
        m.release_year as time_id,  -- FK to dim_time (year-based)

        -- ================================================
        -- DEGENERATE DIMENSIONS (Attributes stored in fact)
        -- ================================================
        m.movie_title,        -- Usually dimension, but included for convenience

        -- ================================================
        -- METRICS: RATINGS
        -- ================================================
        m.imdb_rating,            -- IMDb score (0-10), NULL if not available
        m.rotten_tomatoes_pct,    -- Rotten Tomatoes (0-100%)
        m.metacritic_score,       -- Metacritic (0-100)

        -- Average rating (normalized to 0-100 scale)
        case
            when m.imdb_rating is not null
             and m.rotten_tomatoes_pct is not null
             and m.metacritic_score is not null
            then (
                (m.imdb_rating * 10) +
                m.rotten_tomatoes_pct +
                m.metacritic_score
            ) / 3.0
            else null
        end as avg_rating_normalized,

        -- ================================================
        -- METRICS: PERFORMANCE
        -- ================================================
        m.box_office_millions,    -- Box office revenue (millions USD), ~17% missing
        m.oscars_won,             -- Number of Academy Awards won
        m.runtime_mins,           -- Runtime in minutes

        -- ================================================
        -- METRICS: DERIVED
        -- ================================================
        -- Revenue per minute
        case
            when m.runtime_mins > 0 and m.box_office_millions is not null
            then m.box_office_millions / m.runtime_mins
            else null
        end as revenue_per_minute,

        -- Box office per Oscar
        case
            when m.oscars_won > 0 and m.box_office_millions is not null
            then m.box_office_millions / m.oscars_won
            else null
        end as box_office_per_oscar,

        -- Rating quality indicator (0-3: how many ratings available)
        (
            case when m.imdb_rating is not null then 1 else 0 end +
            case when m.rotten_tomatoes_pct is not null then 1 else 0 end +
            case when m.metacritic_score is not null then 1 else 0 end
        ) as rating_sources_count,

        -- ================================================
        -- FLAGS (Semi-additive facts)
        -- ================================================
        case when m.imdb_rating >= 9.0 then 1 else 0 end as is_masterpiece,
        case when m.box_office_millions >= 1000 then 1 else 0 end as is_blockbuster,
        case when m.oscars_won > 0 then 1 else 0 end as has_oscars,

        -- ================================================
        -- DATA QUALITY SCORE (0-100)
        -- ================================================
        round(
            (
                case when m.imdb_rating is not null then 20 else 0 end +
                case when m.rotten_tomatoes_pct is not null then 20 else 0 end +
                case when m.metacritic_score is not null then 20 else 0 end +
                case when m.box_office_millions is not null then 20 else 0 end +
                case when m.runtime_mins is not null then 20 else 0 end
            ),
            2
        ) as data_quality_score,
        -- 5 fields × 20 points each = 100 max

        -- ================================================
        -- AUDIT
        -- ================================================
        current_timestamp() as fact_created_at

    from movies m
    left join time_dim t
        on m.release_year = t.time_id
)

select * from final
order by movie_id

-- =====================================================
-- EXPECTED OUTPUT:
-- - 95 rows (one per movie)
-- - Grain: movie_id
-- - All numeric metrics for analysis
-- =====================================================

-- =====================================================
-- USAGE EXAMPLES:
--
-- -- Total box office by decade
-- SELECT
--     t.decade,
--     SUM(f.box_office_millions) as total_box_office,
--     AVG(f.imdb_rating) as avg_rating,
--     SUM(f.oscars_won) as total_oscars
-- FROM fact_movie_performance f
-- JOIN dim_time t ON f.time_id = t.time_id
-- GROUP BY t.decade
-- ORDER BY t.decade;
--
-- -- Top 10 movies by box office
-- SELECT
--     m.movie_title,
--     f.box_office_millions,
--     f.imdb_rating,
--     f.oscars_won
-- FROM fact_movie_performance f
-- JOIN dim_movies m ON f.movie_id = m.movie_id
-- ORDER BY f.box_office_millions DESC
-- LIMIT 10;
-- =====================================================`} />

              <p style={styles.bodyText}><strong>{t('phase11.labels.run')}</strong></p>
              <CopyableCode code={`dbt run --select fact_movie_performance`} />

              <p style={styles.bodyText}><strong>{t('phase11.labels.verify')}</strong></p>
              <CopyableCode code={`SELECT COUNT(*) FROM fact_movie_performance;
-- 95 rows

-- Sample facts
SELECT
    movie_title,
    imdb_rating,
    box_office_millions,
    oscars_won,
    is_masterpiece,
    is_blockbuster
FROM fact_movie_performance
ORDER BY box_office_millions DESC
LIMIT 10;`} />

              <p style={styles.bodyText}><strong>{t('phase11.labels.result')}</strong></p>
              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase11/fact_table.png" alt="fact_movie_performance result" style={styles.screenshot} />
              </div>
            </div>
          </section>

          {/* ── FINAL VERIFICATION ───────────────────────────────────── */}
          <section id="final_verify" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#27AE60' }}>✅</span>
                {t('phase11.final_verify.heading')}
              </h2>

              <p style={styles.bodyText}><strong>{t('phase11.final_verify.runAll')}</strong></p>
              <CopyableCode code={`# Run all MARTS models
dbt run --select marts

# Run all tests
dbt test --select marts`} />

              <p style={styles.bodyText}><strong>{t('phase11.final_verify.completeCounts')}</strong></p>
              <CopyableCode code={`-- All MARTS tables
SELECT 'DIMENSIONS' as category, 'dim_movies' as table_name, COUNT(*) as row_count
FROM dim_movies
UNION ALL SELECT 'DIMENSIONS', 'dim_genres', COUNT(*) FROM dim_genres
UNION ALL SELECT 'DIMENSIONS', 'dim_directors', COUNT(*) FROM dim_directors
UNION ALL SELECT 'DIMENSIONS', 'dim_actors', COUNT(*) FROM dim_actors
UNION ALL SELECT 'DIMENSIONS', 'dim_countries', COUNT(*) FROM dim_countries
UNION ALL SELECT 'DIMENSIONS', 'dim_languages', COUNT(*) FROM dim_languages
UNION ALL SELECT 'DIMENSIONS', 'dim_time', COUNT(*) FROM dim_time
UNION ALL SELECT 'BRIDGES', 'bridge_movie_genre', COUNT(*) FROM bridge_movie_genre
UNION ALL SELECT 'BRIDGES', 'bridge_movie_actor', COUNT(*) FROM bridge_movie_actor
UNION ALL SELECT 'BRIDGES', 'bridge_movie_country', COUNT(*) FROM bridge_movie_country
UNION ALL SELECT 'BRIDGES', 'bridge_movie_language', COUNT(*) FROM bridge_movie_language
UNION ALL SELECT 'BRIDGES', 'bridge_movie_director', COUNT(*) FROM bridge_movie_director
UNION ALL SELECT 'FACTS', 'fact_movie_performance', COUNT(*) FROM fact_movie_performance
ORDER BY category, table_name;`} />

              <p style={styles.bodyText}><strong>{t('phase11.labels.result')}</strong></p>
              <div style={styles.imageWrapper}>
                <img src="/movies-pipeline-portfolio/phase11/complete_table_counts.png" alt="Complete Table Counts" style={styles.screenshot} />
              </div>
            </div>
          </section>

          {/* ── SUMMARY ──────────────────────────────────────────────── */}
          <section id="summary" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={styles.sectionHeading}>
                <span style={{ ...styles.sectionBadge, backgroundColor: '#27AE60' }}>🎉</span>
                {t('phase11.summary.heading')}
              </h2>

              <InfoBox color="#27AE60">
                <strong>✅ Phase 11: Bridge Tables and Fact table — COMPLETE!</strong>
                <br />
                {t('phase11.summary.desc')}
              </InfoBox>

              <p style={styles.bodyText}><strong>{t('phase11.summary.modelsBuilt')}</strong></p>
              <CopyableCode code={`models/marts/
├── bridges/ (5 models)
│   ├── bridge_movie_genre.sql
│   ├── bridge_movie_actor.sql
│   ├── bridge_movie_country.sql
│   ├── bridge_movie_language.sql
│   └── bridge_movie_director.sql
│
└── facts/ (1 model)
    └── fact_movie_performance.sql`} />

              <p style={styles.bodyText}><strong>{t('phase11.summary.totalModels')}</strong></p>
              <CopyableCode code={`movies_dbt/
└── models/
    ├── staging/ (3)
    │   ├── stg_movies_base.sql
    │   ├── stg_movies.sql
    │   └── data_quality_report.sql
    │
    └── marts/
        ├── dimensions/ (7)
        │   ├── dim_movie.sql
        │   ├── dim_genre.sql
        │   ├── dim_director.sql
        │   ├── dim_actor.sql
        │   ├── dim_country.sql
        │   ├── dim_language.sql
        │   └── dim_date.sql
        │
        ├── bridges/ (5)
        │   ├── bridge_movie_genre.sql
        │   ├── bridge_movie_actor.sql
        │   ├── bridge_movie_country.sql
        │   ├── bridge_movie_language.sql
        │   └── bridge_movie_director.sql
        │
        └── facts/ (1)
            └── fact_movie_performance.sql`} />

              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr style={{ backgroundColor: COLOR + '20' }}>
                      <th style={{ ...styles.th, color: COLOR }}>{t('phase11.summary.thCategory')}</th>
                      <th style={{ ...styles.th, color: COLOR }}>{t('phase11.summary.thTable')}</th>
                      <th style={{ ...styles.th, color: COLOR }}>{t('phase11.summary.thRows')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['BRIDGES', 'bridge_movie_actor',    '189'],
                      ['BRIDGES', 'bridge_movie_country',  '126'],
                      ['BRIDGES', 'bridge_movie_director', '100'],
                      ['BRIDGES', 'bridge_movie_genre',    '238'],
                      ['BRIDGES', 'bridge_movie_language', '103'],
                      ['FACTS',   'fact_movie_performance','95'],
                    ].map((r, i) => (
                      <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#fef9f6' : '#fff' }}>
                        <td style={{ ...styles.td, fontWeight: '700', color: COLOR }}>{r[0]}</td>
                        <td style={styles.td}><code style={styles.inlineCode}>{r[1]}</code></td>
                        <td style={{ ...styles.td, fontWeight: '700' }}>{r[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <PhaseNavigator currentPhase={11} totalPhases={15} />
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
  header:       { background: 'linear-gradient(135deg, #7D2C00 0%, #D35400 60%, #E67E22 100%)', padding: '60px 20px', color: 'white' },
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
  navItemActive:{ backgroundColor: '#FEF0E7', color: COLOR, fontWeight: '600' },
  infoRow:      { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #f0f0f0' },
  infoLabel:    { fontSize: '0.78rem', color: '#666' },
  infoBadge:    { fontSize: '0.75rem', backgroundColor: COLOR + '18', color: COLOR, padding: '2px 8px', borderRadius: '10px', fontWeight: '600' },

  mainContent:  { flex: 1, minWidth: 0 },
  section:      { marginBottom: '8px' },
  contentCard:  { backgroundColor: 'white', borderRadius: '16px', padding: '36px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', textAlign: 'left' },
  sectionHeading:{ fontSize: '1.6rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', textAlign: 'left', color: '#1a1a2e' },
  sectionBadge: { width: '40px', height: '40px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 },
  bodyText:     { fontSize: '1rem', color: '#444', lineHeight: '1.9', marginBottom: '12px', textAlign: 'left', wordBreak: 'keep-all', overflowWrap: 'break-word' },
  inlineCode:   { backgroundColor: '#fef0e7', padding: '2px 6px', borderRadius: '4px', fontSize: '0.88em', fontFamily: "'Courier New', monospace", color: '#7D2C00' },
  orderedList:  { paddingLeft: '24px', margin: '0 0 14px', display: 'flex', flexDirection: 'column', gap: '8px' },
  bulletList:   { paddingLeft: '20px', margin: '8px 0 10px', display: 'flex', flexDirection: 'column', gap: '6px', listStyleType: 'disc' },
  listItem:     { fontSize: '0.97rem', color: '#444', lineHeight: '1.8', textAlign: 'left', wordBreak: 'keep-all', overflowWrap: 'break-word' },

  tableWrapper: { overflowX: 'auto', marginBottom: '16px', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' },
  table:        { width: '100%', borderCollapse: 'collapse', fontSize: '0.87rem', backgroundColor: '#fff' },
  th:           { padding: '10px 14px', textAlign: 'left', fontWeight: '700', color: '#333', borderBottom: '2px solid #e0e0e0', whiteSpace: 'nowrap' },
  td:           { padding: '9px 14px', color: '#444', borderBottom: '1px solid #f0f0f0', verticalAlign: 'top' },

  imageWrapper: { margin: '16px 0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
  screenshot:   { maxWidth: '100%', borderRadius: '10px', border: '1px solid #e0e0e0', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },

  scrollTopBtn: { position: 'fixed', bottom: '115px', right: '30px', backgroundColor: COLOR, color: 'white', border: 'none', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem', fontWeight: '700', boxShadow: `0 4px 15px ${COLOR}66`, zIndex: 1000 },
};

export default Phase11Detail;
