import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const languages = [
    { code: 'th', label: 'TH' },
    { code: 'en', label: 'EN' },
    { code: 'zh', label: '中文' }
  ];

  return (
    <div style={styles.container}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          style={{
            ...styles.button,
            ...(i18n.language === lang.code ? styles.activeButton : {})
          }}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    gap: '8px'
  },
  button: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '20px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  },
  activeButton: {
    backgroundColor: 'white',
    color: '#2c3e50'
  }
};

export default LanguageSwitcher;
