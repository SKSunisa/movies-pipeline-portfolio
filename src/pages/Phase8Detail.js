import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PhaseNavigator from '../components/PhaseNavigator';

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

const InfoBox = ({ color, children }) => (
  <div style={{ ...styles.infoBox, borderLeftColor: color, backgroundColor: color + '12' }}>{children}</div>
);

const Phase8Detail = () => {
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
    { id: 'purpose',  label: t('phase8.nav.purpose'),  bold: true },
    { id: 'part1',    label: t('phase8.nav.part1'),    bold: true },
    { id: 'part1-1',  label: t('phase8.nav.part1_1'),  bold: false },
    { id: 'part1-2',  label: t('phase8.nav.part1_2'),  bold: false },
    { id: 'part1-3',  label: t('phase8.nav.part1_3'),  bold: false },
    { id: 'part1-4',  label: t('phase8.nav.part1_4'),  bold: false },
    { id: 'part1-5',  label: t('phase8.nav.part1_5'),  bold: false },
    { id: 'part2',    label: t('phase8.nav.part2'),    bold: true },
    { id: 'part3',    label: t('phase8.nav.part3'),    bold: true },
    { id: 'part4',    label: t('phase8.nav.part4'),    bold: true },
    { id: 'part5',    label: t('phase8.nav.part5'),    bold: true },
    { id: 'summary',  label: t('phase8.nav.summary'),  bold: true }
  ];

  const SubHeading = ({ id, title, color }) => (
    <h3 id={id} style={{ ...styles.subHeading, borderLeftColor: color }}>{title}</h3>
  );

  const COLOR = '#27AE60';

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <button onClick={() => navigate('/')} style={styles.backButton}>{t('phase8.backBtn')}</button>
          <div style={styles.phaseNumber}>
            <span style={styles.phaseLabel}>Phase 8</span>
            <h1 style={styles.phaseTitle}>{t('phase8.title')}</h1>
            <p style={styles.phaseSubtitle}>{t('phase8.subtitle')}</p>
            <div style={styles.headerBadges}>
              <span style={styles.badge}>🐳 Docker</span>
              <span style={styles.badge}>🌀 Airflow</span>
              <span style={styles.badge}>🐍 Python</span>
              <span style={styles.badge}>☁️ AWS S3</span>
            </div>
          </div>
        </div>
      </div>

      {/* TWO-COLUMN LAYOUT */}
      <div style={styles.pageLayout}>
        {/* SIDEBAR */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarCard}>
            <h3 style={styles.sidebarTitle}>{t('phase8.navTitle')}</h3>
            <nav>
              {NAV_SECTIONS.map((sec) => (
                <button key={sec.id} onClick={() => scrollTo(sec.id)} style={{
                  ...styles.navItem,
                  ...(activeSection === sec.id ? styles.navItemActive : {}),
                  paddingLeft: sec.bold ? '12px' : '24px',
                  fontSize: sec.bold ? '0.875rem' : '0.8rem',
                  fontWeight: sec.bold ? '700' : '400'
                }}>
                  {sec.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main style={styles.mainContent}>

          {/* PURPOSE */}
          <section id="purpose" style={styles.section}>
            <div style={styles.contentCard}>
              <h2 style={{ ...styles.sectionHeading, color: COLOR }}>
                <span style={{ ...styles.sectionBadge, backgroundColor: COLOR }}>🎯</span>
                {t('phase8.purpose.heading')}
              </h2>
              <p style={styles.bodyText}>{t('phase8.purpose.desc')}</p>
              <ol style={styles.orderedList}>
                <li style={styles.listItem}>{t('phase8.purpose.o1')}</li>
                <li style={styles.listItem}>{t('phase8.purpose.o2')}</li>
                <li style={styles.listItem}>{t('phase8.purpose.o3')}</li>
                <li style={styles.listItem}>{t('phase8.purpose.o4')}</li>
              </ol>
            </div>
          </section>

          {/* PART 1 HEADER */}
          <section id="part1" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="part1-h" title={t('phase8.part1.title')} color={COLOR} />
              <p style={styles.bodyText}>{t('phase8.part1.desc')}</p>
            </div>
          </section>

          {/* PART 1-1: Delete Config */}
          <section id="part1-1" style={styles.section}>
            <div style={styles.contentCard}>
              <h4 style={{ ...styles.subHeading2, borderLeftColor: COLOR }}>{t('phase8.part1.c1Title')}</h4>
              <p style={styles.noteText}>{t('phase8.part1.c1BeforeLabel')}</p>
              <CopyableCode code={`AIRFLOW_CONFIG: '/opt/airflow/config/airflow.cfg'`} />
              <p style={styles.bodyText}>↳ Delete this line</p>
              <InfoBox color={COLOR}>
                <p style={styles.infoText}>{t('phase8.part1.c1Note')}</p>
              </InfoBox>
            </div>
          </section>

          {/* PART 1-2: Performance Config */}
          <section id="part1-2" style={styles.section}>
            <div style={styles.contentCard}>
              <h4 style={{ ...styles.subHeading2, borderLeftColor: COLOR }}>{t('phase8.part1.c2Title')}</h4>
              <p style={styles.bodyText}>{t('phase8.part1.c2Intro')}</p>
              <CopyableCode code={`AIRFLOW__CORE__PARALLELISM: 32
AIRFLOW__CORE__MAX_ACTIVE_TASKS_PER_DAG: 16
AIRFLOW__CORE__MAX_ACTIVE_RUNS_PER_DAG: 16
AIRFLOW__CORE__DAGS_FOLDER: /opt/airflow/dags
AIRFLOW__SCHEDULER__DAG_DIR_LIST_INTERVAL: 30`} />
              <ul style={styles.bulletList}>
                <li style={styles.listItem}><code style={styles.inlineCode}>PARALLELISM: 32</code> — {t('phase8.part1.c2n1')}</li>
                <li style={styles.listItem}><code style={styles.inlineCode}>MAX_ACTIVE_TASKS_PER_DAG: 16</code> — {t('phase8.part1.c2n2')}</li>
                <li style={styles.listItem}><code style={styles.inlineCode}>MAX_ACTIVE_RUNS_PER_DAG: 16</code> — {t('phase8.part1.c2n3')}</li>
                <li style={styles.listItem}><code style={styles.inlineCode}>DAGS_FOLDER: /opt/airflow/dags</code> — {t('phase8.part1.c2n4')}</li>
                <li style={styles.listItem}><code style={styles.inlineCode}>DAG_DIR_LIST_INTERVAL: 30</code> — {t('phase8.part1.c2n5')}</li>
              </ul>
            </div>
          </section>

          {/* PART 1-3: Volumes */}
          <section id="part1-3" style={styles.section}>
            <div style={styles.contentCard}>
              <h4 style={{ ...styles.subHeading2, borderLeftColor: COLOR }}>{t('phase8.part1.c3Title')}</h4>
              <p style={styles.noteText}>{t('phase8.part1.c3BeforeLabel')}</p>
              <CopyableCode code={`      volumes:
        - \${AIRFLOW_PROJ_DIR:-.}/dags:/opt/airflow/dags
        - \${AIRFLOW_PROJ_DIR:-.}/logs:/opt/airflow/logs
        - \${AIRFLOW_PROJ_DIR:-.}/config:/opt/airflow/config
        - \${AIRFLOW_PROJ_DIR:-.}/plugins:/opt/airflow/plugins`} />
              <p style={styles.noteText}>{t('phase8.part1.c3AfterLabel')}</p>
              <CopyableCode code={`      volumes:
        - \${AIRFLOW_PROJ_DIR:-.}/dags:/opt/airflow/dags
        - \${AIRFLOW_PROJ_DIR:-.}/logs:/opt/airflow/logs
        - \${AIRFLOW_PROJ_DIR:-.}/plugins:/opt/airflow/plugins
        - \${AIRFLOW_PROJ_DIR:-.}/movies_dbt:/opt/airflow/movies_dbt
        - \${AIRFLOW_PROJ_DIR:-.}/data:/opt/airflow/data
        - \${AIRFLOW_PROJ_DIR:-.}/scripts:/opt/airflow/scripts`} />
              <InfoBox color={COLOR}>
                <p style={styles.infoText}>{t('phase8.part1.c3Note')}</p>
              </InfoBox>
            </div>
          </section>

          {/* PART 1-4: airflow-init command */}
          <section id="part1-4" style={styles.section}>
            <div style={styles.contentCard}>
              <h4 style={{ ...styles.subHeading2, borderLeftColor: COLOR }}>{t('phase8.part1.c4Title')}</h4>
              <p style={styles.bodyText}>{t('phase8.part1.c4Intro')}</p>
              <CopyableCode code={`    command:
      - -c
      - |
        # Create necessary directories
        mkdir -p /opt/airflow/{logs,dags,plugins,movies_dbt,data,scripts}

        # Initialize Airflow DB
        echo "Initializing Airflow database..."
        airflow db migrate

        # Create admin user
        echo "Creating admin user..."
        airflow users create \\
          --username airflow \\
          --firstname Airflow \\
          --lastname Admin \\
          --role Admin \\
          --email airflow@example.com \\
          --password airflow || true

        # Fix permissions
        echo "Fixing permissions..."
        chown -R "\${AIRFLOW_UID}:0" /opt/airflow/

        echo "Airflow initialization complete!"`} />
            </div>
          </section>

          {/* PART 1-5: environment */}
          <section id="part1-5" style={styles.section}>
            <div style={styles.contentCard}>
              <h4 style={{ ...styles.subHeading2, borderLeftColor: COLOR }}>{t('phase8.part1.c5Title')}</h4>
              <p style={styles.bodyText}>{t('phase8.part1.c5Intro')}</p>
              <CopyableCode code={`    environment:
      &airflow-common-env
      AIRFLOW__CORE__EXECUTOR: LocalExecutor
      AIRFLOW__CORE__PARALLELISM: 1
      AIRFLOW__CORE__MAX_ACTIVE_TASKS_PER_DAG: 1
      AIRFLOW__CORE__MAX_ACTIVE_RUNS_PER_DAG: 1
      AIRFLOW__CORE__AUTH_MANAGER: airflow.providers.fab.auth_manager.fab_auth_manager.FabAuthManager
      AIRFLOW__DATABASE__SQL_ALCHEMY_CONN: postgresql+psycopg2://airflow:airflow@postgres/airflow
      AIRFLOW__CORE__FERNET_KEY: ''
      AIRFLOW__CORE__DAGS_ARE_PAUSED_AT_CREATION: 'true'
      AIRFLOW__CORE__LOAD_EXAMPLES: 'false'
      AIRFLOW__CORE__EXECUTION_API_SERVER_URL: 'http://airflow-apiserver:8080/execution/'`} />
            </div>
          </section>

          {/* PART 2: Running Airflow */}
          <section id="part2" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="part2-h" title={t('phase8.part2.title')} color={COLOR} />
              <ol style={styles.orderedList}>
                <li style={styles.listItem}>
                  {t('phase8.part2.s1')}
                  <CopyableCode code={`docker compose build`} />
                  <p style={styles.bodyText}>{t('phase8.part2.s1Note')}</p>
                </li>
                <li style={styles.listItem}>
                  {t('phase8.part2.s2')}
                  <CopyableCode code={`docker compose up airflow-init`} />
                  <p style={styles.bodyText}>{t('phase8.part2.s2Intro')}</p>
                  <ul style={styles.bulletList}>
                    <li style={styles.listItem}>{t('phase8.part2.s2n1')}</li>
                    <li style={styles.listItem}>{t('phase8.part2.s2n2')}</li>
                    <li style={styles.listItem}>{t('phase8.part2.s2n3')}</li>
                    <li style={styles.listItem}>{t('phase8.part2.s2n4')}</li>
                  </ul>
                  <InfoBox color={COLOR}>
                    <p style={styles.infoText}>{t('phase8.part2.s2n5')}</p>
                  </InfoBox>
                </li>
                <li style={styles.listItem}>
                  {t('phase8.part2.s3')}
                  <CopyableCode code={`docker compose up -d`} />
                  <p style={styles.bodyText}>{t('phase8.part2.s3Note')}</p>
                </li>
                <li style={styles.listItem}>
                  {t('phase8.part2.s4')}
                  <CopyableCode code={`Login:
Username: airflow
Password: airflow`} />
                  <div style={styles.imageWrapper}>
                    <img src="/images/phase8/Airflow.png" alt="Airflow Web UI Login" style={styles.screenshot} />
                  </div>
                </li>
              </ol>
            </div>
          </section>

          {/* PART 3: upload_to_s3.py */}
          <section id="part3" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="part3-h" title={t('phase8.part3.title')} color={COLOR} />
              <p style={styles.bodyText}>{t('phase8.part3.desc')}</p>

              <p style={{ ...styles.bodyText, fontWeight: '700', marginTop: '20px' }}>{t('phase8.part3.step1Title')}</p>
              <CopyableCode code={`dir data
# Should see: top_100_movies_full_best_effort.csv`} />
              <p style={styles.bodyText}>{t('phase8.part3.step1Result')}</p>

              <p style={{ ...styles.bodyText, fontWeight: '700', marginTop: '20px' }}>{t('phase8.part3.step2Title')}</p>
              <ol style={styles.orderedList}>
                <li style={styles.listItem}>
                  {t('phase8.part3.step2s1')}
                  <CopyableCode code={`dir scripts

# Create scripts folder (if not yet created)
mkdir scripts`} />
                </li>
                <li style={styles.listItem}>{t('phase8.part3.step2s2')}</li>
                <li style={styles.listItem}>
                  {t('phase8.part3.step2s3')}
                  <CopyableCode code={`"""
Upload CSV file to AWS S3 bucket.
Airflow and Docker compatible version.
"""

import os
from datetime import datetime
import boto3
from botocore.exceptions import ClientError
from dotenv import load_dotenv
import platform

# Load environment variables from .env file
load_dotenv()

# ====================================
# Upload CSV file to S3 bucket
# ====================================
def upload_to_s3(add_timestamp=False):

    # ==========================================
    # Get Environment Variables
    # ==========================================
    aws_access_key = os.getenv("AWS_ACCESS_KEY_ID")
    aws_secret_key = os.getenv("AWS_SECRET_ACCESS_KEY")
    aws_region = os.getenv("AWS_REGION") or os.getenv("AWS_DEFAULT_REGION", "us-east-1")
    s3_bucket = os.getenv("S3_BUCKET_NAME")

    # ==========================================
    # Validate Environment Variables
    # ==========================================
    missing_vars = []
    if not aws_access_key:
        missing_vars.append("AWS_ACCESS_KEY_ID")
    if not aws_secret_key:
        missing_vars.append("AWS_SECRET_ACCESS_KEY")
    if not s3_bucket:
        missing_vars.append("S3_BUCKET_NAME")
    if missing_vars:
        print("Error: Missing required environment variables")
        print("Make sure your .env file contains:")
        print(" - AWS_ACCESS_KEY_ID")
        print(" - AWS_SECRET_ACCESS_KEY")
        print(" - S3_BUCKET_NAME")
        print(" - AWS_REGION (optional, defaults to us-east-1)")
        raise ValueError(f"Missing environment variables: {', '.join(missing_vars)}")

    # ==========================================
    # Upload File to S3
    # ==========================================
    # Path inside Airflow container
    if platform.system() == 'Windows':
        local_file = "data/top_100_movies_full_best_effort.csv"
    else:
        local_file = "/opt/airflow/data/top_100_movies_full_best_effort.csv"

    # S3 key with optional timestamp
    if add_timestamp:
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        s3_key = f"raw/top_100_movies_{timestamp}.csv"
    else:
        s3_key = "raw/top_100_movies_full_best_effort.csv"

    # ==========================================
    # Validate File Exists
    # ==========================================
    if not os.path.exists(local_file):
        print(f"ERROR: File not found: {local_file}")
        print("Expected file location: /opt/airflow/data/")
        print("Make sure the CSV file is in the data/ folder")
        raise FileNotFoundError(f"File not found: {local_file}")

    file_size = os.path.getsize(local_file)
    file_size_kb = file_size / 1024

    # ==========================================
    # Display Upload Info
    # ==========================================
    print("Upload Configuration:")
    print(f"Source File  : {local_file}")
    print(f"File Size    : {file_size_kb:.2f} KB ({file_size:,} bytes)")
    print(f"S3 Bucket    : {s3_bucket}")
    print(f"S3 Key       : {s3_key}")
    print(f"AWS Region   : {aws_region}")
    print(f"Full S3 Path : s3://{s3_bucket}/{s3_key}")

    # ==========================================
    # Upload to S3
    # ==========================================
    print(" Upload to S3")
    print(" Starting upload...")

    try:
        s3_client = boto3.client(
            's3',
            aws_access_key_id=aws_access_key,
            aws_secret_access_key=aws_secret_key,
            region_name=aws_region
        )

        print(" Uploading file to S3...")
        s3_client.upload_file(
            local_file,
            s3_bucket,
            s3_key,
            ExtraArgs={"ContentType": "text/csv"}
        )

        # Verify Upload
        print(" Verifying upload...")
        response = s3_client.head_object(Bucket=s3_bucket, Key=s3_key)
        s3_file_size = response['ContentLength']

        if s3_file_size == file_size:
            print(" File size verified!")
        else:
            print(f" Warning: Size mismatch (local: {file_size}, S3: {s3_file_size})")

        print(" SUCCESS File uploaded to S3")
        print(f" S3 URI    : s3://{s3_bucket}/{s3_key}")
        print(f" Size      : {file_size_kb:.2f} KB")
        print(f" Timestamp : {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

        return {
            "s3_bucket": s3_bucket,
            "s3_key": s3_key,
            "s3_uri": f"s3://{s3_bucket}/{s3_key}",
            "file_size": file_size,
            "file_size_kb": file_size_kb,
            "upload_timestamp": datetime.now().isoformat()
        }

    except ClientError as e:
        error_code = e.response['Error']['Code']
        error_message = e.response['Error']['Message']
        print(" AWS ERROR!")
        print(f" Error Code : {error_code}")
        print(f" Message    : {error_message}")
        print("\\n Common causes:")
        print(" 1. Invalid AWS credentials")
        print(" 2. Bucket doesn't exist")
        print(" 3. No permission to write to bucket")
        print(" 4. Incorrect AWS region")
        raise

    except Exception as e:
        print(" UNEXPECTED ERROR!")
        print(f" Error : {str(e)}")
        print(f" Type  : {type(e).__name__}")
        raise

# ==========================================
# List files in S3 bucket
# ==========================================
def list_s3_files(prefix='raw/'):
    print(f"\\n Listing files in S3 (prefix: {prefix})...")
    aws_access_key = os.getenv("AWS_ACCESS_KEY_ID")
    aws_secret_key = os.getenv("AWS_SECRET_ACCESS_KEY")
    aws_region = os.getenv("AWS_REGION") or os.getenv("AWS_DEFAULT_REGION", "us-east-1")
    s3_bucket = os.getenv('S3_BUCKET_NAME')

    try:
        s3_client = boto3.client(
            "s3",
            aws_access_key_id=aws_access_key,
            aws_secret_access_key=aws_secret_key,
            region_name=aws_region
        )

        response = s3_client.list_objects_v2(Bucket=s3_bucket, Prefix=prefix)

        if 'Contents' in response:
            files = [obj for obj in response['Contents'] if not obj['Key'].endswith('/')]
            print(f"\\n Found {len(files)} files:")
            for obj in files:
                size_kb = obj["Size"] / 1024
                print(f"  - {obj['Key']} ({size_kb:.2f} KB)")
            return files
        else:
            print("No files found")
            return []

    except Exception as e:
        print(f" Error listing files: {str(e)}")
        raise

if __name__ == "__main__":
    print("Running upload script directly...")
    result = upload_to_s3(add_timestamp=False)
    print(f"\\nResult: {result}")

    # List files
    list_s3_files()`} />
                </li>
              </ol>

              <div style={styles.imageWrapper}>
                <img src="/images/phase8/Part3_upload_to_s3.svg" alt="upload_to_s3.py script" style={styles.screenshot} />
              </div>

              <p style={{ ...styles.bodyText, fontWeight: '700', marginTop: '20px' }}>{t('phase8.part3.resultLabel')}</p>
              <CopyableCode code={`Running upload script directly...
Upload Configuration:
Source File  : /opt/airflow/data/top_100_movies_full_best_effort.csv
File Size    : 13.09 KB (13,406 bytes)
S3 Bucket    : movies-pipeline-data-22
S3 Key       : raw/top_100_movies_full_best_effort.csv
AWS Region   : us-east-1
Full S3 Path : s3://movies-pipeline-data-22/raw/top_100_movies_full_best_effort.csv
 Upload to S3
 Starting upload...
 Uploading file to S3...
 Verifying upload...
 File size verified!
 SUCCESS File uploaded to S3
 S3 URI    : s3://movies-pipeline-data-22/raw/top_100_movies_full_best_effort.csv
 Size      : 13.09 KB
 Timestamp : 2026-02-04 13:47:59

Result: {'s3_bucket': 'movies-pipeline-data-22', 's3_key': 'raw/top_100_movies_full_best_effort.csv',
  's3_uri': 's3://movies-pipeline-data-22/raw/top_100_movies_full_best_effort.csv',
  'file_size': 13406, 'file_size_kb': 13.091796875, 'upload_timestamp': '2026-02-04T13:47:59'}

 Listing files in S3 (prefix: raw/)...
 Found 1 files:
  - raw/top_100_movies_full_best_effort.csv (13.09 KB)`} />
            </div>
          </section>

          {/* PART 4: Verification */}
          <section id="part4" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="part4-h" title={t('phase8.part4.title')} color={COLOR} />

              <p style={{ ...styles.bodyText, fontWeight: '700' }}>{t('phase8.part4.s1Title')}</p>
              <p style={styles.bodyText}><strong>{t('phase8.part4.method1Label')}</strong></p>
              <CopyableCode code={`aws s3 ls s3://movies-pipeline-data-22/raw/`} />

              <p style={{ ...styles.bodyText, marginTop: '16px' }}><strong>{t('phase8.part4.method2Label')}</strong></p>
              <ul style={styles.bulletList}>
                <li style={styles.listItem}>{t('phase8.part4.m2s1')}</li>
                <li style={styles.listItem}>{t('phase8.part4.m2s2')}</li>
                <li style={styles.listItem}>{t('phase8.part4.m2s3')}</li>
              </ul>

              <p style={{ ...styles.bodyText, fontWeight: '700', marginTop: '24px' }}>{t('phase8.part4.s2Title')}</p>
              <CopyableCode code={`-- View files via Snowflake Stage
USE DATABASE movies_db;
USE SCHEMA raw;
LIST @movies_s3_stage;`} />
              <p style={styles.bodyText}><strong>{t('phase8.part4.resultLabel')}</strong></p>
              <div style={styles.imageWrapper}>
                <img src="/images/phase8/Part4_Verification.png" alt="Snowflake LIST stage result" style={styles.screenshot} />
              </div>
            </div>
          </section>

          {/* PART 5: Load data */}
          <section id="part5" style={styles.section}>
            <div style={styles.contentCard}>
              <SubHeading id="part5-h" title={t('phase8.part5.title')} color={COLOR} />
              <p style={styles.bodyText}>{t('phase8.part5.desc')}</p>
              <ol style={styles.orderedList}>
                <li style={styles.listItem}>{t('phase8.part5.s1')}</li>
                <li style={styles.listItem}>{t('phase8.part5.s2')}</li>
                <li style={styles.listItem}>
                  {t('phase8.part5.s3')}
                  <div style={{ ...styles.imageWrapper, marginBottom: '12px' }}>
                    <img src="/images/phase8/Part5_Snowflake_UI.svg" alt="Load data in Snowflake UI" style={styles.screenshot} />
                  </div>
                  <CopyableCode code={`-- =====================================================
-- Part 5: Load Data
-- =====================================================

-- ⚠️ CRITICAL: Set context before loading
USE DATABASE movies_db;
USE SCHEMA raw;
USE WAREHOUSE movies_wh;

-- Verify context
SELECT CURRENT_DATABASE(), CURRENT_SCHEMA(), CURRENT_WAREHOUSE();

-- Load Data
COPY INTO movies_raw (
    rank,
    title,
    year,
    genres,
    director,
    main_actors,
    country,
    imdb_rating,
    rotten_tomatoes_pct,
    runtime_mins,
    language,
    oscars_won,
    box_office_millions,
    metacritic_score
)
FROM @movies_s3_stage/top_100_movies_full_best_effort.csv
FILE_FORMAT = csv_format
ON_ERROR = 'CONTINUE';

-- Count total rows
SELECT COUNT(*) FROM RAW.MOVIES_RAW;
-- Expected: 100

-- Preview first 10 rows
SELECT * FROM movies_raw ORDER BY rank LIMIT 10;`} />
                </li>
              </ol>
            </div>
          </section>

          {/* SUMMARY */}
          <section id="summary" style={styles.section}>
            <div style={{ ...styles.contentCard, background: 'linear-gradient(135deg, #27AE60 0%, #1e8449 50%, #196f3d 100%)', color: 'white' }}>
              <h2 style={{ ...styles.sectionHeading, color: 'white', marginBottom: '8px' }}>
                ✅ {t('phase8.summary.title')}
              </h2>
              <p style={{ ...styles.bodyText, color: 'rgba(255,255,255,0.9)', marginBottom: '24px' }}>
                {t('phase8.summary.subtitle')}
              </p>
              <div style={styles.summaryGrid}>
                {[
                  { icon: '🐳', ti: 'item1Title', di: 'item1Desc' },
                  { icon: '🌀', ti: 'item2Title', di: 'item2Desc' },
                  { icon: '🐍', ti: 'item3Title', di: 'item3Desc' },
                  { icon: '✅', ti: 'item4Title', di: 'item4Desc' },
                  { icon: '📥', ti: 'item5Title', di: 'item5Desc' },
                  { icon: '📊', ti: 'item6Title', di: 'item6Desc' }
                ].map((item, i) => (
                  <div key={i} style={styles.summaryItem}>
                    <span style={styles.summaryIcon}>{item.icon}</span>
                    <div>
                      <div style={styles.summaryItemTitle}>{t(`phase8.summary.${item.ti}`)}</div>
                      <div style={styles.summaryItemDesc}>{t(`phase8.summary.${item.di}`)}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={styles.nextBox}>
                <h3 style={styles.nextTitle}>{t('phase8.summary.nextTitle')}</h3>
                <p style={styles.nextDesc}>{t('phase8.summary.nextDesc')}</p>
              </div>
            </div>
          </section>

          {/* NAV BUTTONS */}
          <div style={styles.section}>
            <div style={styles.navButtons}>
              <button onClick={() => navigate('/phase/7')} style={styles.navBtn}>{t('phase8.navBtn.prev')}</button>
              <button onClick={() => navigate('/phase/9')} style={{ ...styles.navBtn, ...styles.navBtnNext }}>{t('phase8.navBtn.next')}</button>
            </div>
          </div>

          <PhaseNavigator currentPhase={8} totalPhases={15} />
        </main>
      </div>

      {showScrollTop && (
        <button onClick={scrollToTop} style={styles.scrollTopBtn} title="Scroll to top">↑</button>
      )}
    </div>
  );
};

const styles = {
  container: { maxWidth: '100%', margin: '0 auto', backgroundColor: '#f8f9fa' },
  header: { background: 'linear-gradient(135deg, #27AE60 0%, #1e8449 60%, #196f3d 100%)', padding: '60px 20px', color: 'white' },
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
  sidebarTitle: { fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#27AE60', marginBottom: '16px', borderBottom: '2px solid #27AE60', paddingBottom: '8px' },
  navItem: { display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', padding: '8px 12px', border: 'none', borderRadius: '8px', cursor: 'pointer', backgroundColor: 'transparent', color: '#555', transition: 'all 0.2s ease', marginBottom: '2px', lineHeight: '1.4' },
  navItemActive: { backgroundColor: '#EAFAF1', color: '#27AE60', fontWeight: '600' },
  mainContent: { flex: 1, minWidth: 0 },
  section: { marginBottom: '8px' },
  contentCard: { backgroundColor: 'white', borderRadius: '16px', padding: '36px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', textAlign: 'left' },
  sectionHeading: { fontSize: '1.6rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', textAlign: 'left' },
  sectionBadge: { width: '40px', height: '40px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 },
  subHeading: { fontSize: '1.25rem', fontWeight: '700', borderLeft: '4px solid', paddingLeft: '14px', margin: '0 0 20px 0', color: '#1a1a2e', textAlign: 'left' },
  subHeading2: { fontSize: '1.05rem', fontWeight: '700', borderLeft: '3px solid', paddingLeft: '12px', margin: '0 0 16px 0', color: '#1a1a2e', textAlign: 'left' },
  bodyText: { fontSize: '1rem', color: '#444', lineHeight: '1.9', marginBottom: '12px', textAlign: 'left', wordBreak: 'keep-all', overflowWrap: 'break-word' },
  noteText: { fontSize: '0.9rem', color: '#777', lineHeight: '1.7', margin: '4px 0 6px 0', textAlign: 'left', fontStyle: 'italic' },
  inlineCode: { backgroundColor: '#f0f0f0', padding: '2px 6px', borderRadius: '4px', fontSize: '0.88em', fontFamily: "'Courier New', monospace", color: '#e74c3c' },
  orderedList: { paddingLeft: '24px', margin: '0 0 14px 0', display: 'flex', flexDirection: 'column', gap: '10px' },
  bulletList: { paddingLeft: '20px', margin: '8px 0 10px 0', display: 'flex', flexDirection: 'column', gap: '6px', listStyleType: 'disc' },
  listItem: { fontSize: '0.97rem', color: '#444', lineHeight: '1.8', textAlign: 'left', wordBreak: 'keep-all', overflowWrap: 'break-word' },
  infoBox: { borderLeft: '4px solid', borderRadius: '8px', padding: '14px 18px', marginBottom: '16px' },
  infoText: { fontSize: '0.95rem', color: '#333', lineHeight: '1.8', margin: 0, textAlign: 'left', wordBreak: 'keep-all' },
  imageWrapper: { margin: '16px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  screenshot: { maxWidth: '100%', borderRadius: '10px', border: '1px solid #e0e0e0', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
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
  navBtnNext: { backgroundColor: '#27AE60', color: 'white', border: '2px solid #27AE60' },
  scrollTopBtn: { position: 'fixed', bottom: '115px', right: '30px', backgroundColor: '#27AE60', color: 'white', border: 'none', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem', fontWeight: '700', boxShadow: '0 4px 15px rgba(39,174,96,0.4)', zIndex: 1000 }
};

export default Phase8Detail;
