import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PhaseNavigator from '../components/PhaseNavigator';

const Phase1Detail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);

  const copyToClipboard = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sections = [
    { id: 'overview', number: '1', color: '#3498DB' },
    { id: 'duplicates', number: '2', color: '#E74C3C' },
    { id: 'multivalue', number: '3', color: '#9B59B6' },
    { id: 'missing', number: '4', color: '#F39C12' },
    { id: 'statistics', number: '5', color: '#1ABC9C' },
    { id: 'outliers', number: '6', color: '#E67E22' }
  ];

  const duplicateData = [
    { rank: 76, title: 'Paths of Glory', year: 1957 },
    { rank: 92, title: 'Paths of Glory', year: 1957 },
    { rank: 45, title: 'Rashomon', year: 1950 },
    { rank: 79, title: 'Rashomon', year: 1950 },
    { rank: 73, title: 'The Bridge on the River Kwai', year: 1957 },
    { rank: 97, title: 'The Bridge on the River Kwai', year: 1957 },
    { rank: 43, title: 'The Great Dictator', year: 1940 },
    { rank: 75, title: 'The Great Dictator', year: 1940 },
    { rank: 47, title: 'The Third Man', year: 1949 },
    { rank: 71, title: 'The Third Man', year: 1949 }
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <button onClick={() => navigate('/')} style={styles.backButton}>
            ← {t('common.back')}
          </button>
          <div style={styles.phaseNumber}>
            <span style={styles.phaseLabel}>{t('phases.phase')} 1</span>
            <h1 style={styles.phaseTitle}>{t('phase1.title')}</h1>
            <p style={styles.phaseSubtitle}>{t('phase1.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div style={styles.section}>
        <div style={styles.downloadCard}>
          <h3 style={styles.downloadTitle}>{t('phase1.downloads.title')}</h3>
          <div style={styles.downloadButtons}>
            <a
              href="/movies-pipeline-portfolio/downloads/imdb_top_100.csv"
              download
              style={styles.downloadButton}
            >
              <span style={styles.downloadIcon}>📄</span>
              {t('phase1.downloads.dataset')}
            </a>
            <a
              href="/movies-pipeline-portfolio/downloads/data_profiling.ipynb"
              download
              style={{...styles.downloadButton, ...styles.downloadButtonAlt}}
            >
              <span style={styles.downloadIcon}>📓</span>
              {t('phase1.downloads.notebook')}
            </a>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div style={styles.section}>
        <div style={styles.introCard}>
          <h2 style={styles.sectionTitle}>
            <span style={styles.sectionIcon}>💡</span>
            {t('phase1.intro.title')}
          </h2>
          <p style={styles.introText}>{t('phase1.intro.description')}</p>
          <div style={styles.purposeBox}>
            <h3 style={styles.purposeTitle}>{t('phase1.intro.purposeTitle')}</h3>
            <p style={styles.purposeText}>{t('phase1.intro.purpose')}</p>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div style={styles.section}>
        <h3 style={styles.navSectionTitle}>{t('phase1.navigation.title')}</h3>
        <div style={styles.navGrid}>
          {sections.map((section) => (
            <div
              key={section.id}
              style={{
                ...styles.navCard,
                borderLeftColor: section.color,
                transform: activeSection === section.id ? 'translateY(-5px)' : 'translateY(0)'
              }}
              onMouseEnter={() => setActiveSection(section.id)}
              onMouseLeave={() => setActiveSection(null)}
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span style={{...styles.navNumber, backgroundColor: section.color}}>
                {section.number}
              </span>
              <span style={styles.navText}>{t(`phase1.sections.${section.id}`)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 1. Overview */}
      <div id="overview" style={styles.section}>
        <div style={styles.contentCard}>
          <h2 style={{...styles.cardTitle, color: '#3498DB'}}>
            <span style={{...styles.numberBadge, backgroundColor: '#3498DB'}}>1</span>
            {t('phase1.overview.title')}
          </h2>
          <p style={styles.description}>{t('phase1.overview.description')}</p>

          <div style={styles.statsGrid}>
            <div style={styles.statBox}>
              <div style={styles.statLabel}>{t('phase1.overview.totalRows')}</div>
              <div style={styles.statNumber}>100</div>
            </div>
            <div style={styles.statBox}>
              <div style={styles.statLabel}>{t('phase1.overview.totalColumns')}</div>
              <div style={styles.statNumber}>14</div>
            </div>
          </div>

          <div style={styles.dataTypesSection}>
            <h3 style={styles.subTitle}>{t('phase1.overview.dataTypes')}</h3>
            <div style={styles.typesList}>
              <div style={styles.typeItem}>
                <span style={{...styles.typeBadge, backgroundColor: '#3498DB'}}>int64</span>
                <div style={styles.typeContent}>
                  <span style={styles.typeLabel}>{t('phase1.overview.intType')}</span>
                  <span style={styles.typeText}>Rank, Year, Oscars Won</span>
                </div>
              </div>
              <div style={styles.typeItem}>
                <span style={{...styles.typeBadge, backgroundColor: '#1ABC9C'}}>object</span>
                <div style={styles.typeContent}>
                  <span style={styles.typeLabel}>{t('phase1.overview.objectType')}</span>
                  <span style={styles.typeText}>Title, Genre(s), Director, Main Actor(s), Country, Language</span>
                </div>
              </div>
              <div style={styles.typeItem}>
                <span style={{...styles.typeBadge, backgroundColor: '#F39C12'}}>float64</span>
                <div style={styles.typeContent}>
                  <span style={styles.typeLabel}>{t('phase1.overview.floatType')}</span>
                  <span style={styles.typeText}>IMDb Rating, Rotten Tomatoes %, Runtime (mins), Box Office ($M), Metacritic Score</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Duplicates */}
      <div id="duplicates" style={styles.section}>
        <div style={styles.contentCard}>
          <h2 style={{...styles.cardTitle, color: '#E74C3C'}}>
            <span style={{...styles.numberBadge, backgroundColor: '#E74C3C'}}>2</span>
            {t('phase1.duplicates.title')}
          </h2>
          <p style={styles.description}>{t('phase1.duplicates.description')}</p>

          <div style={styles.codeSection}>
            <h3 style={styles.codeTitle}>{t('phase1.duplicates.methodTitle')}</h3>
            <div style={styles.codeBlock}>
              <div style={styles.codeHeader}>
                <span style={styles.codeLanguage}>Python</span>
                <button
                  style={{
                    ...styles.copyButton,
                    ...(copiedCode === 'duplicate' ? styles.copyButtonCopied : {})
                  }}
                  onClick={() => copyToClipboard(`# Standardize Title column by removing parentheses
data['Title'] = data['Title'].str.replace(r'\\s*\\([^)]*\\)', '', regex=True)

# Find duplicates
duplicates_data = data[data.duplicated(subset=['Title'], keep=False)]

# Display results
print(duplicates_data.sort_values(by='Title')[['Rank', 'Title', 'Year']])`, 'duplicate')}
                >
                  {copiedCode === 'duplicate' ? '✓ Copied!' : '📋 Copy'}
                </button>
              </div>
              <div style={styles.codeContent}>
                <pre style={styles.codeText}>{`# Standardize Title column by removing parentheses
data['Title'] = data['Title'].str.replace(r'\\s*\\([^)]*\\)', '', regex=True)

# Find duplicates
duplicates_data = data[data.duplicated(subset=['Title'], keep=False)]

# Display results
print(duplicates_data.sort_values(by='Title')[['Rank', 'Title', 'Year']])`}</pre>
              </div>
            </div>
          </div>

          <div style={styles.resultBox}>
            <h3 style={styles.resultTitle}>{t('phase1.duplicates.results')}</h3>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHeader}>
                    <th style={styles.th}>Rank</th>
                    <th style={styles.th}>Title</th>
                    <th style={styles.th}>Year</th>
                  </tr>
                </thead>
                <tbody>
                  {duplicateData.map((row, index) => (
                    <tr key={index} style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                      <td style={styles.td}>{row.rank}</td>
                      <td style={styles.td}>{row.title}</td>
                      <td style={styles.td}>{row.year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={styles.summaryBox}>
              <p style={styles.summaryText}>{t('phase1.duplicates.summary')}: <strong>5 {t('phase1.duplicates.pairs')} (10 {t('phase1.duplicates.rows')})</strong></p>
            </div>
          </div>

          <div style={styles.solutionBox}>
            <h3 style={styles.solutionTitle}>💡 {t('phase1.duplicates.solutionTitle')}</h3>
            <p style={styles.solutionText}>{t('phase1.duplicates.solution')}</p>
          </div>
        </div>
      </div>

      {/* 3. Multi-value */}
      <div id="multivalue" style={styles.section}>
        <div style={styles.contentCard}>
          <h2 style={{...styles.cardTitle, color: '#9B59B6'}}>
            <span style={{...styles.numberBadge, backgroundColor: '#9B59B6'}}>3</span>
            {t('phase1.multivalue.title')}
          </h2>
          <p style={styles.description}>{t('phase1.multivalue.description')}</p>
          <p style={styles.description}>{t('phase1.multivalue.observation')}</p>

          {/* Step 1: Find columns with pipe delimiter */}
          <div style={styles.codeSection}>
            <h3 style={styles.codeTitle}>{t('phase1.multivalue.step1Title')}</h3>
            <div style={styles.codeBlock}>
              <div style={styles.codeHeader}>
                <span style={styles.codeLanguage}>Python</span>
                <button
                  style={{
                    ...styles.copyButton,
                    ...(copiedCode === 'multivalue1' ? styles.copyButtonCopied : {})
                  }}
                  onClick={() => copyToClipboard(`# Find which columns contain the pipe '|' delimiter
print("Columns containing '|':")
for column in data.columns:
    # Check if pipe symbol exists
    has_pipe = data[column].astype(str).str.contains('|', regex=False).any()
    if has_pipe:
        print(column)`, 'multivalue1')}
                >
                  {copiedCode === 'multivalue1' ? '✓ Copied!' : '📋 Copy'}
                </button>
              </div>
              <div style={styles.codeContent}>
                <pre style={styles.codeText}>{`# Find which columns contain the pipe '|' delimiter
print("Columns containing '|':")
for column in data.columns:
    # Check if pipe symbol exists
    has_pipe = data[column].astype(str).str.contains('|', regex=False).any()
    if has_pipe:
        print(column)`}</pre>
              </div>
            </div>
          </div>

          {/* Output 1 */}
          <div style={styles.outputBox}>
            <h4 style={styles.outputTitle}>{t('phase1.multivalue.results1')}</h4>
            <div style={styles.outputContent}>
              <pre style={styles.outputText}>{`Columns containing '|':
Genre(s)
Director
Main Actor(s)
Country
Language`}</pre>
            </div>
          </div>

          {/* Step 2: Count rows with delimiters */}
          <div style={styles.codeSection}>
            <h3 style={styles.codeTitle}>{t('phase1.multivalue.step2Title')}</h3>
            <div style={styles.codeBlock}>
              <div style={styles.codeHeader}>
                <span style={styles.codeLanguage}>Python</span>
                <button
                  style={{
                    ...styles.copyButton,
                    ...(copiedCode === 'multivalue2' ? styles.copyButtonCopied : {})
                  }}
                  onClick={() => copyToClipboard(`print("--- Detailed count of rows with delimiters ---")
for column in data.columns:
    # Count rows containing pipe symbol
    pipe_rows_count = data[column].astype(str).str.contains('|', regex=False).sum()
    if pipe_rows_count > 0:
        print(column, f"Rows with multiple values: {pipe_rows_count} rows")`, 'multivalue2')}
                >
                  {copiedCode === 'multivalue2' ? '✓ Copied!' : '📋 Copy'}
                </button>
              </div>
              <div style={styles.codeContent}>
                <pre style={styles.codeText}>{`print("--- Detailed count of rows with delimiters ---")
for column in data.columns:
    # Count rows containing pipe symbol
    pipe_rows_count = data[column].astype(str).str.contains('|', regex=False).sum()
    if pipe_rows_count > 0:
        print(column, f"Rows with multiple values: {pipe_rows_count} rows")`}</pre>
              </div>
            </div>
          </div>

          {/* Output 2 */}
          <div style={styles.outputBox}>
            <h4 style={styles.outputTitle}>{t('phase1.multivalue.results2')}</h4>
            <div style={styles.outputContent}>
              <pre style={styles.outputText}>{`--- Detailed count of rows with delimiters ---
Genre(s) Rows with multiple values: 89 rows
Director Rows with multiple values: 5 rows
Main Actor(s) Rows with multiple values: 99 rows
Country Rows with multiple values: 27 rows
Language Rows with multiple values: 5 rows`}</pre>
            </div>
          </div>

          <div style={styles.solutionBox}>
            <h3 style={styles.solutionTitle}>💡 {t('phase1.multivalue.solutionTitle')}</h3>
            <p style={styles.solutionText}>{t('phase1.multivalue.solution')}</p>
          </div>
        </div>
      </div>

      {/* 4. Missing Data */}
      <div id="missing" style={styles.section}>
        <div style={styles.contentCard}>
          <h2 style={{...styles.cardTitle, color: '#F39C12'}}>
            <span style={{...styles.numberBadge, backgroundColor: '#F39C12'}}>4</span>
            {t('phase1.missing.title')}
          </h2>
          <p style={styles.description}>{t('phase1.missing.description')}</p>

          {/* Missing Data Table */}
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.th}>{t('phase1.missing.columnName')}</th>
                  <th style={styles.th}>{t('phase1.missing.missingCount')}</th>
                  <th style={styles.th}>{t('phase1.missing.percentage')}</th>
                  <th style={styles.th}>{t('phase1.missing.note')}</th>
                </tr>
              </thead>
              <tbody>
                <tr style={styles.tableRowEven}>
                  <td style={styles.td}>Metacritic Score</td>
                  <td style={styles.td}>50</td>
                  <td style={styles.td}>50%</td>
                  <td style={{...styles.td, ...styles.noteCell}}>{t('phase1.missing.metacriticNote')}</td>
                </tr>
                <tr style={styles.tableRowOdd}>
                  <td style={styles.td}>Box Office ($M)</td>
                  <td style={styles.td}>17</td>
                  <td style={styles.td}>17%</td>
                  <td style={{...styles.td, ...styles.noteCell}}>{t('phase1.missing.boxOfficeNote')}</td>
                </tr>
                <tr style={styles.tableRowEven}>
                  <td style={styles.td}>Rotten Tomatoes %</td>
                  <td style={styles.td}>3</td>
                  <td style={styles.td}>3%</td>
                  <td style={{...styles.td, ...styles.noteCell}}>{t('phase1.missing.lowNote')}</td>
                </tr>
                <tr style={styles.tableRowOdd}>
                  <td style={styles.td}>IMDb Rating</td>
                  <td style={styles.td}>1</td>
                  <td style={styles.td}>1%</td>
                  <td style={{...styles.td, ...styles.noteCell}}>{t('phase1.missing.lowNote')}</td>
                </tr>
                <tr style={styles.tableRowEven}>
                  <td style={styles.td}>Runtime (mins)</td>
                  <td style={styles.td}>1</td>
                  <td style={styles.td}>1%</td>
                  <td style={{...styles.td, ...styles.noteCell}}>{t('phase1.missing.lowNote')}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={styles.solutionBox}>
            <h3 style={styles.solutionTitle}>💡 {t('phase1.missing.solutionTitle')}</h3>
            <p style={styles.solutionText}>{t('phase1.missing.solution')}</p>
          </div>
        </div>
      </div>

      {/* 5. Statistical Summary */}
      <div id="statistics" style={styles.section}>
        <div style={styles.contentCard}>
          <h2 style={{...styles.cardTitle, color: '#1ABC9C'}}>
            <span style={{...styles.numberBadge, backgroundColor: '#1ABC9C'}}>5</span>
            {t('phase1.statistics.title')}
          </h2>

          <p style={styles.description}>{t('phase1.statistics.description')}</p>

          <div style={styles.codeSection}>
            <div style={styles.codeBlock}>
              <div style={styles.codeHeader}>
                <span style={styles.codeLanguage}>Python</span>
                <button
                  style={{
                    ...styles.copyButton,
                    ...(copiedCode === 'statistics' ? styles.copyButtonCopied : {})
                  }}
                  onClick={() => copyToClipboard('data.describe()', 'statistics')}
                >
                  {copiedCode === 'statistics' ? '✓ Copied!' : '📋 Copy'}
                </button>
              </div>
              <div style={styles.codeContent}>
                <pre style={styles.codeText}>data.describe()</pre>
              </div>
            </div>
          </div>

          {/* Output - Image */}
          <div style={styles.outputBox}>
            <h4 style={styles.outputTitle}>{t('phase1.statistics.resultTitle')}</h4>
            <div style={styles.imageContainer}>
              <img
                src="/movies-pipeline-portfolio/images/describe_output.png"
                alt="data.describe() output"
                style={styles.outputImage}
              />
            </div>
          </div>

          {/* Summary */}
          <div style={styles.summaryListBox}>
            <h4 style={styles.summaryListTitle}>{t('phase1.statistics.summaryTitle')}</h4>
            <ul style={styles.summaryList}>
              <li style={styles.summaryListItem}>
                <strong>Year:</strong> {t('phase1.statistics.yearSummary')}
              </li>
              <li style={styles.summaryListItem}>
                <strong>IMDb Rating:</strong> {t('phase1.statistics.imdbSummary')}
              </li>
              <li style={styles.summaryListItem}>
                <strong>Runtime (mins):</strong> {t('phase1.statistics.runtimeSummary')}
              </li>
              <li style={styles.summaryListItem}>
                <strong>Box Office ($M):</strong> {t('phase1.statistics.boxOfficeSummary')}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 6. Outliers */}
      <div id="outliers" style={styles.section}>
        <div style={styles.contentCard}>
          <h2 style={{...styles.cardTitle, color: '#E67E22'}}>
            <span style={{...styles.numberBadge, backgroundColor: '#E67E22'}}>6</span>
            {t('phase1.outliers.title')}
          </h2>
          <p style={styles.description}>{t('phase1.outliers.description')}</p>
          <p style={styles.description}>{t('phase1.outliers.purpose')}</p>
          <p style={styles.description}>{t('phase1.outliers.codeIntro')}</p>

          <div style={styles.codeSection}>
            <div style={styles.codeBlock}>
              <div style={styles.codeHeader}>
                <span style={styles.codeLanguage}>Python</span>
                <button
                  style={{
                    ...styles.copyButton,
                    ...(copiedCode === 'outliers' ? styles.copyButtonCopied : {})
                  }}
                  onClick={() => copyToClipboard(`# Data Validation (Outlier Detection)
print("--- Data Quality Validation ---")

# 1. Validate Year (should not be too old or in the future)
current_year = 2025
invalid_year = data[(data['Year'] < 1800) | (data['Year'] > current_year)]
print(f"Invalid years: {len(invalid_year)} rows")

# 2. Validate IMDb Rating (must be between 0-10)
invalid_imdb = data[(data['IMDb Rating'] < 0) | (data['IMDb Rating'] > 10)]
print(f"Invalid IMDb ratings: {len(invalid_imdb)} rows")

# 3. Validate Runtime (should not be negative or zero)
invalid_runtime = data[data['Runtime (mins)'] <= 0]
print(f"Invalid runtime: {len(invalid_runtime)} rows")

# 4. Validate percentage scores (must be between 0-100)
invalid_rt = data[(data['Rotten Tomatoes %'] < 0) | (data['Rotten Tomatoes %'] > 100)]
print(f"Invalid Rotten Tomatoes scores: {len(invalid_rt)} rows")

# 5. Validate Oscar count (should not be negative)
invalid_oscars = data[data['Oscars Won'] < 0]
print(f"Invalid Oscar counts: {len(invalid_oscars)} rows")`, 'outliers')}
                >
                  {copiedCode === 'outliers' ? '✓ Copied!' : '📋 Copy'}
                </button>
              </div>
              <div style={styles.codeContent}>
                <pre style={styles.codeText}>{`# Data Validation (Outlier Detection)
print("--- Data Quality Validation ---")

# 1. Validate Year (should not be too old or in the future)
current_year = 2025
invalid_year = data[(data['Year'] < 1800) | (data['Year'] > current_year)]
print(f"Invalid years: {len(invalid_year)} rows")

# 2. Validate IMDb Rating (must be between 0-10)
invalid_imdb = data[(data['IMDb Rating'] < 0) | (data['IMDb Rating'] > 10)]
print(f"Invalid IMDb ratings: {len(invalid_imdb)} rows")

# 3. Validate Runtime (should not be negative or zero)
invalid_runtime = data[data['Runtime (mins)'] <= 0]
print(f"Invalid runtime: {len(invalid_runtime)} rows")

# 4. Validate percentage scores (must be between 0-100)
invalid_rt = data[(data['Rotten Tomatoes %'] < 0) | (data['Rotten Tomatoes %'] > 100)]
print(f"Invalid Rotten Tomatoes scores: {len(invalid_rt)} rows")

# 5. Validate Oscar count (should not be negative)
invalid_oscars = data[data['Oscars Won'] < 0]
print(f"Invalid Oscar counts: {len(invalid_oscars)} rows")`}</pre>
              </div>
            </div>
          </div>

          {/* Validation Rules Explanation */}
          <div style={styles.summaryListBox}>
            <h4 style={styles.summaryListTitle}>{t('phase1.outliers.validation')}</h4>
            <ul style={styles.summaryList}>
              <li style={styles.summaryListItem}>
                <strong>Year:</strong> {t('phase1.outliers.yearRule')}
              </li>
              <li style={styles.summaryListItem}>
                <strong>IMDb Rating:</strong> {t('phase1.outliers.imdbRule')}
              </li>
              <li style={styles.summaryListItem}>
                <strong>Runtime:</strong> {t('phase1.outliers.runtimeRule')}
              </li>
              <li style={styles.summaryListItem}>
                <strong>Rotten Tomatoes:</strong> {t('phase1.outliers.rottenRule')}
              </li>
              <li style={styles.summaryListItem}>
                <strong>Oscars Won:</strong> {t('phase1.outliers.oscarsRule')}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div style={styles.section}>
        <div style={{...styles.contentCard, ...styles.summaryCard}}>
          <h2 style={styles.summaryCardTitle}>
            <span style={styles.summaryIcon}>✅</span>
            {t('phase1.summary.title')}
          </h2>
          <p style={styles.summaryDescription}>{t('phase1.summary.description')}</p>

          <div style={styles.keyFindingsGrid}>
            <div style={styles.keyFinding}>
              <div style={styles.keyFindingIcon}>🔄</div>
              <h3 style={styles.keyFindingTitle}>{t('phase1.summary.finding1Title')}</h3>
              <p style={styles.keyFindingText}>{t('phase1.summary.finding1')}</p>
            </div>
            <div style={styles.keyFinding}>
              <div style={styles.keyFindingIcon}>📑</div>
              <h3 style={styles.keyFindingTitle}>{t('phase1.summary.finding2Title')}</h3>
              <p style={styles.keyFindingText}>{t('phase1.summary.finding2')}</p>
            </div>
            <div style={styles.keyFinding}>
              <div style={styles.keyFindingIcon}>❓</div>
              <h3 style={styles.keyFindingTitle}>{t('phase1.summary.finding3Title')}</h3>
              <p style={styles.keyFindingText}>{t('phase1.summary.finding3')}</p>
            </div>
          </div>

          <div style={styles.nextStepsBox}>
            <h3 style={styles.nextStepsTitle}>{t('phase1.summary.nextSteps')}</h3>
            <p style={styles.nextStepsText}>{t('phase1.summary.nextStepsDescription')}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={styles.section}>
        <div style={styles.navigationButtons}>
          <button onClick={() => navigate('/')} style={styles.navButton}>
            ← {t('common.back')}
          </button>
          <button onClick={() => navigate('/phase/2')} style={{...styles.navButton, ...styles.navButtonNext}}>
            Phase 2: {t('phases.phase2.name')} →
          </button>
        </div>
      </div>

      {/* Phase Navigator */}
      <PhaseNavigator currentPhase={1} totalPhases={15} />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          style={styles.scrollTopButton}
          title="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '100%',
    margin: '0 auto',
    backgroundColor: '#f8f9fa'
  },
  downloadCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '30px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    textAlign: 'center'
  },
  downloadTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: '20px'
  },
  downloadButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap'
  },
  downloadButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '15px 30px',
    backgroundColor: '#3498DB',
    color: 'white',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)'
  },
  downloadButtonAlt: {
    backgroundColor: '#E67E22',
    boxShadow: '0 4px 15px rgba(230, 126, 34, 0.3)'
  },
  downloadIcon: {
    fontSize: '1.2rem'
  },
  header: {
    background: 'linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)',
    padding: '60px 20px',
    color: 'white',
    position: 'relative'
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  backButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginBottom: '20px',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)'
  },
  phaseNumber: {
    textAlign: 'center'
  },
  phaseLabel: {
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    opacity: 0.9
  },
  phaseTitle: {
    fontSize: '3rem',
    fontWeight: '700',
    margin: '10px 0',
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
  },
  phaseSubtitle: {
    fontSize: '1.2rem',
    opacity: 0.9,
    maxWidth: '600px',
    margin: '0 auto'
  },
  section: {
    padding: '40px 20px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  introCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
  },
  sectionTitle: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textAlign: 'left'
  },
  sectionIcon: {
    fontSize: '1.5rem'
  },
  introText: {
    fontSize: '1.1rem',
    color: '#555',
    lineHeight: '1.8',
    marginBottom: '30px',
    textAlign: 'left',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word'
  },
  purposeBox: {
    backgroundColor: '#f0f4ff',
    borderLeft: '4px solid #3498DB',
    borderRadius: '8px',
    padding: '20px',
    marginTop: '20px'
  },
  purposeTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: '10px'
  },
  purposeText: {
    fontSize: '1rem',
    color: '#555',
    lineHeight: '2',
    margin: 0,
    textAlign: 'left',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word'
  },
  navSectionTitle: {
    fontSize: '1.4rem',
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: '20px',
    textAlign: 'left'
  },
  navGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px'
  },
  navCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    borderLeft: '4px solid',
    boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  navNumber: {
    fontSize: '1rem',
    fontWeight: '700',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    flexShrink: 0
  },
  navText: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1a1a2e'
  },
  contentCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
  },
  cardTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    textAlign: 'left'
  },
  numberBadge: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'currentColor',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    fontWeight: '700'
  },
  description: {
    fontSize: '1.1rem',
    color: '#555',
    lineHeight: '2',
    marginBottom: '30px',
    textAlign: 'left',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  statBox: {
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    padding: '30px',
    textAlign: 'center'
  },
    statNumber: {
    fontSize: '3rem',
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: '5px'
  },
  statLabel: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: '10px'
  },
  dataTypesSection: {
    marginTop: '30px'
  },
  subTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: '20px',
    textAlign: 'left'
  },
  typesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  typeItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px'
  },
  typeBadge: {
    padding: '5px 15px',
    borderRadius: '6px',
    color: 'white',
    fontSize: '0.85rem',
    fontWeight: '600',
    minWidth: '80px',
    textAlign: 'center'
  },
  typeContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    textAlign: 'left'
  },
  typeLabel: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#1a1a2e'
  },
  typeText: {
    fontSize: '0.9rem',
    color: '#666',
    lineHeight: '1.6'
  },
  codeSection: {
    marginBottom: '30px'
  },
  codeTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: '15px',
    textAlign: 'left'
  },
  codeBlock: {
    backgroundColor: '#1e1e2e',
    borderRadius: '12px',
    padding: '0',
    overflow: 'hidden',
    position: 'relative',
    border: '1px solid #313244'
  },
  codeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 15px',
    backgroundColor: '#313244',
    borderBottom: '1px solid #45475a'
  },
  codeLanguage: {
    color: '#cdd6f4',
    fontSize: '0.8rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  copyButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    backgroundColor: 'transparent',
    border: '1px solid #45475a',
    borderRadius: '6px',
    color: '#cdd6f4',
    fontSize: '0.8rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  copyButtonCopied: {
    backgroundColor: '#a6e3a1',
    color: '#1e1e2e',
    borderColor: '#a6e3a1'
  },
  codeContent: {
    padding: '20px',
    overflow: 'auto',
    maxHeight: '400px'
  },
  codeText: {
    color: '#cdd6f4',
    fontSize: '0.9rem',
    fontFamily: '"Fira Code", Consolas, Monaco, "Courier New", monospace',
    margin: 0,
    lineHeight: '1.8',
    textAlign: 'left',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word'
  },
  codeComment: {
    color: '#6c7086'
  },
  codeKeyword: {
    color: '#cba6f7'
  },
  codeString: {
    color: '#a6e3a1'
  },
  codeFunction: {
    color: '#89b4fa'
  },
  outputBox: {
    marginBottom: '30px'
  },
  outputTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: '10px',
    textAlign: 'left'
  },
  outputContent: {
    backgroundColor: '#f8f9fa',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '20px',
    overflow: 'auto'
  },
  outputText: {
    color: '#2d3748',
    fontSize: '0.9rem',
    fontFamily: '"Fira Code", Consolas, Monaco, "Courier New", monospace',
    margin: 0,
    lineHeight: '1.8',
    textAlign: 'left',
    whiteSpace: 'pre-wrap'
  },
  imageContainer: {
    backgroundColor: '#f8f9fa',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '20px',
    overflow: 'auto',
    textAlign: 'center'
  },
  outputImage: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  summaryListBox: {
    backgroundColor: '#f0f9ff',
    borderLeft: '4px solid #1ABC9C',
    borderRadius: '8px',
    padding: '25px',
    marginTop: '20px'
  },
  summaryListTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: '15px',
    textAlign: 'left'
  },
  summaryList: {
    margin: 0,
    paddingLeft: '25px',
    listStyleType: 'disc',
    textAlign: 'left'
  },
  summaryListItem: {
    fontSize: '1rem',
    color: '#555',
    lineHeight: '2',
    marginBottom: '8px',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word'
  },
  noteCell: {
    fontSize: '0.85rem',
    color: '#666',
    maxWidth: '300px',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word'
  },
  resultBox: {
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    padding: '30px',
    marginBottom: '20px'
  },
  resultTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: '20px',
    textAlign: 'left'
  },
  tableContainer: {
    overflowX: 'auto',
    marginBottom: '20px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  tableHeader: {
    backgroundColor: '#1a1a2e',
    color: 'white'
  },
  th: {
    padding: '15px',
    textAlign: 'left',
    fontWeight: '600'
  },
  tableRowEven: {
    backgroundColor: 'white'
  },
  tableRowOdd: {
    backgroundColor: '#f8f9fa'
  },
  td: {
    padding: '12px 15px',
    borderBottom: '1px solid #e0e0e0'
  },
  summaryBox: {
    backgroundColor: '#E74C3C20',
    borderLeft: '4px solid #E74C3C',
    borderRadius: '8px',
    padding: '15px 20px'
  },
  summaryText: {
    fontSize: '1rem',
    color: '#555',
    margin: 0
  },
  solutionBox: {
    backgroundColor: '#f0f9ff',
    borderLeft: '4px solid #3498DB',
    borderRadius: '8px',
    padding: '20px',
    marginTop: '20px'
  },
  solutionTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: '10px',
    textAlign: 'left'
  },
  solutionText: {
    fontSize: '1.05rem',
    color: '#555',
    lineHeight: '2',
    margin: 0,
    textAlign: 'left',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word'
  },
  multivalueGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px'
  },
  multivalueCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
    border: '2px solid #9B59B6'
  },
  multivalueHeader: {
    marginBottom: '15px',
    textAlign: 'center'
  },
  multivalueColumn: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1a1a2e'
  },
  multivalueBody: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '5px'
  },
  multivalueRows: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#9B59B6'
  },
  multivalueLabel: {
    fontSize: '0.85rem',
    color: '#666',
    textAlign: 'center'
  },
  missingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '20px'
  },
  missingCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
    textAlign: 'center'
  },
  missingHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px'
  },
  missingColumn: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#1a1a2e'
  },
  severityBadge: {
    padding: '4px 12px',
    borderRadius: '12px',
    color: 'white',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  missingStats: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '10px',
    marginBottom: '10px'
  },
  missingCount: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1a1a2e'
  },
  missingPercentage: {
    fontSize: '1.2rem',
    color: '#666'
  },
  missingBar: {
    height: '8px',
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  missingBarFill: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 0.5s ease'
  },
  statsCardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  },
  statsCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
    textAlign: 'center'
  },
  statsCardIcon: {
    fontSize: '2.5rem',
    marginBottom: '15px'
  },
  statsCardTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: '15px'
  },
  statsCardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  statsCardRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.95rem',
    color: '#555'
  },
  validationGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  validationCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    padding: '25px',
    textAlign: 'center',
    boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
  },
  validationIcon: {
    fontSize: '2.5rem',
    marginBottom: '15px'
  },
  validationTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: '10px'
  },
  validationRule: {
    fontSize: '0.95rem',
    color: '#E67E22',
    fontWeight: '600'
  },
  summaryCard: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white'
  },
  summaryCardTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: 'white',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  summaryIcon: {
    fontSize: '2rem'
  },
  summaryDescription: {
    fontSize: '1.1rem',
    lineHeight: '2',
    marginBottom: '30px',
    opacity: 0.95,
    textAlign: 'left',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word'
  },
  keyFindingsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  keyFinding: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: '12px',
    padding: '25px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.2)',
    textAlign: 'center'
  },
  keyFindingIcon: {
    fontSize: '2rem',
    marginBottom: '15px'
  },
  keyFindingTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '10px'
  },
  keyFindingText: {
    fontSize: '1rem',
    lineHeight: '2',
    opacity: 0.9,
    textAlign: 'left',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word'
  },
  nextStepsBox: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: '12px',
    padding: '25px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.3)'
  },
  nextStepsTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '10px'
  },
  nextStepsText: {
    fontSize: '1.05rem',
    lineHeight: '2',
    opacity: 0.9,
    margin: 0,
    textAlign: 'left',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word'
  },
  navigationButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    flexWrap: 'wrap'
  },
  navButton: {
    padding: '15px 30px',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    border: '2px solid #1a1a2e',
    backgroundColor: 'white',
    color: '#1a1a2e',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    flex: '1',
    minWidth: '200px'
  },
  navButtonNext: {
    backgroundColor: '#1a1a2e',
    color: 'white'
  },
  scrollTopButton: {
    position: 'fixed',
    bottom: '30px',
    left: '30px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',
    fontSize: '1.5rem',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 998
  }
};

export default Phase1Detail;
