# Movies Pipeline Portfolio

[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![i18next](https://img.shields.io/badge/i18next-25.8.7-26A69A?logo=i18next&logoColor=white)](https://www.i18next.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A comprehensive React-based web application showcasing an end-to-end data engineering pipeline for movie data. This portfolio demonstrates the complete journey from data collection to visualization, featuring professional documentation and multi-language support.

## Live Demo

**[View Live Application](https://sksunisa.github.io/movies-pipeline-portfolio/)**

## Overview

This project documents a real-world data engineering pipeline built for movie data analysis. It covers 15 distinct phases, demonstrating expertise in data engineering, cloud infrastructure, ETL processes, dimensional modeling, and business intelligence.

### Key Highlights

- **15 Comprehensive Pipeline Phases**: From data collection through cloud deployment
- **Multi-language Support**: Full internationalization in Thai (ไทย), English, and Chinese (中文)
- **Interactive Documentation**: Phase-by-phase walkthrough with visual diagrams
- **Modern Tech Stack**: Built with React 19 and modern web technologies
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Professional Presentation**: Clean UI with smooth animations and intuitive navigation

## Features

### Pipeline Coverage

The application documents each phase of the data pipeline:

1. **Data Collection**: Web scraping and data extraction
2. **Data Cleaning**: Data preprocessing and quality improvement
3. **Data Profiling**: Statistical analysis and data exploration
4. **Database Design**: ER diagram and schema design
5. **Database Creation**: PostgreSQL database implementation
6. **AWS S3 Setup**: Cloud storage configuration
7. **Docker Environment**: Containerization and environment setup
8. **Airflow Pipeline**: Workflow orchestration and automation
9. **DBT Data Quality**: Data transformation and quality checks
10. **Dimensional Modeling**: Star schema design and implementation
11. **Bridge Tables**: Many-to-many relationship handling
12. **DBT Documentation**: Auto-generated documentation
13. **Data Testing**: Comprehensive testing strategies
14. **Power BI Dashboard**: Business intelligence and visualization
15. **EC2 Deployment**: Cloud deployment and hosting

### Technical Features

- **Internationalization**: Seamless language switching between Thai, English, and Chinese
- **Responsive Navigation**: Dropdown menu, breadcrumbs, and phase navigation
- **Visual Diagrams**: SVG diagrams and screenshots for each phase
- **GitHub Pages Deployment**: Automated deployment workflow
- **Clean Architecture**: Modular component structure with React Router

## Tech Stack

### Frontend
- **React 19.2.4**: Latest React with modern hooks
- **React Router 7.13.0**: Client-side routing
- **react-i18next 16.5.4**: Internationalization framework
- **Create React App**: Build tooling and development server

### Testing
- **Jest**: Testing framework
- **React Testing Library**: Component testing utilities

### Deployment
- **GitHub Pages**: Static site hosting
- **gh-pages**: Automated deployment

## Project Structure

```
movies-pipeline-portfolio/
├── public/
│   ├── images/               # Phase diagrams and screenshots
│   ├── phase9-15/            # Phase-specific assets
│   ├── downloads/            # Downloadable resources
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js         # Navigation header with language switcher
│   │   └── LanguageSwitcher.js  # Language selection component
│   ├── pages/
│   │   ├── Home.js           # Landing page with phase overview
│   │   └── Phase*Detail.js   # Individual phase detail pages
│   ├── locales/
│   │   ├── th.json           # Thai translations
│   │   ├── en.json           # English translations
│   │   └── ch.json           # Chinese translations
│   ├── i18n.js               # i18next configuration
│   ├── App.js                # Root component with routing
│   └── index.js              # Application entry point
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SKSunisa/movies-pipeline-portfolio.git
cd movies-pipeline-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

### Available Scripts

#### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000). The page reloads on edits.

#### `npm test`
Launches the test runner in interactive watch mode.

#### `npm run build`
Builds the production-ready app to the `build/` folder. Optimizes for best performance.

#### `npm run deploy`
Deploys the application to GitHub Pages (requires proper GitHub configuration).

## Pipeline Phases Detailed

### Phase 1-3: Data Foundation
- Collecting movie data from various sources
- Cleaning and standardizing data formats
- Profiling data quality and characteristics

### Phase 4-6: Infrastructure Setup
- Designing relational database schema
- Creating PostgreSQL database
- Setting up AWS S3 for data lake storage

### Phase 7-9: Orchestration & Quality
- Containerizing applications with Docker
- Building Airflow DAGs for automation
- Implementing DBT for data transformations

### Phase 10-12: Data Modeling
- Creating dimensional models (star schema)
- Implementing bridge tables for complex relationships
- Generating comprehensive DBT documentation

### Phase 13-15: Validation & Delivery
- Comprehensive data testing strategies
- Building interactive Power BI dashboards
- Deploying to AWS EC2 for production access

## Internationalization

The application supports three languages with complete translations:

- **Thai (ไทย)**: Default language
- **English**: Full English translation
- **Chinese (中文)**: Traditional Chinese support

Language can be switched using the dropdown in the header navigation.

## Development Notes

### Styling Approach
- Uses inline CSS objects within components
- No external CSS files for maintainability
- Consistent color scheme across phases

### i18n Pattern
- Translation keys namespaced by feature: `nav.*`, `home.*`, `phases.*`
- Uses `useTranslation()` hook from react-i18next
- Fallback language: English

### Testing
Run specific test files:
```bash
npm test -- --testPathPattern="App.test.js"
```

## Deployment

This application is deployed to GitHub Pages using the `gh-pages` branch. Deployment is automated through the npm script:

```bash
npm run deploy
```

This command builds the application and pushes it to the GitHub Pages hosting environment.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

**Sunisa Krasaesom**

- GitHub: [@SKSunisa](https://github.com/SKSunisa)
- Portfolio: [Movies Pipeline Portfolio](https://sksunisa.github.io/movies-pipeline-portfolio/)

## Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- Icons and diagrams created for educational purposes
- Inspired by real-world data engineering pipelines

---

**⭐ If you find this project helpful, please consider giving it a star!**
