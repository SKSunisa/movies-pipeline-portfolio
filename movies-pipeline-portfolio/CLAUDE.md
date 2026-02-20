# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Movies Pipeline Portfolio - A React-based web application visualizing a movie data pipeline with multi-language support (Thai, English, Chinese).

## Commands

```bash
# Development (from movies-pipeline-portfolio directory)
npm start          # Start dev server at http://localhost:3000
npm test           # Run tests in watch mode
npm run build      # Production build

# Run a single test file
npm test -- --testPathPattern="App.test.js"
```

## Architecture

### Tech Stack
- React 19 with Create React App
- react-i18next for internationalization (3 languages: th, en, zh)
- React Router for navigation
- Testing Library + Jest for testing

### Directory Structure
```
movies-pipeline-portfolio/
├── src/
│   ├── components/    # Reusable components (Header, LanguageSwitcher)
│   ├── pages/         # Page components (Home)
│   ├── locales/       # i18n JSON files (th.json, en.json, ch.json)
│   ├── i18n.js        # i18next configuration
│   └── App.js         # Root component with router setup
└── public/            # Static assets
```

### Key Patterns
- **Styling**: Inline CSS objects within components (not external CSS files)
- **i18n**: Use `useTranslation()` hook; default language is Thai with English fallback
- **Translation keys**: Namespaced as `nav.*`, `home.*`, `phases.*`, `common.*`

### Pipeline Phases
The app visualizes 5 data pipeline phases: Collection, Processing, Storage, Analysis, Visualization. Each phase has a color-coded card linking to its detail page.
