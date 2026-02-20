import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './i18n';
import Header from './components/Header';
import Home from './pages/Home';
import Phase1Detail from './pages/Phase1Detail';
import Phase2Detail from './pages/Phase2Detail';
import Phase3Detail from './pages/Phase3Detail';
import Phase4Detail from './pages/Phase4Detail';
import Phase5Detail from './pages/Phase5Detail';
import Phase6Detail from './pages/Phase6Detail';
import Phase7Detail from './pages/Phase7Detail';
import Phase8Detail from './pages/Phase8Detail';
import Phase9Detail from './pages/Phase9Detail';
import Phase10Detail from './pages/Phase10Detail';
import Phase11Detail from './pages/Phase11Detail';
import Phase12Detail from './pages/Phase12Detail';
import Phase13Detail from './pages/Phase13Detail';
import Phase14Detail from './pages/Phase14Detail';
import Phase15Detail from './pages/Phase15Detail';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main style={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/phase/1" element={<Phase1Detail />} />
            <Route path="/phase/2" element={<Phase2Detail />} />
            <Route path="/phase/3" element={<Phase3Detail />} />
            <Route path="/phase/4" element={<Phase4Detail />} />
            <Route path="/phase/5" element={<Phase5Detail />} />
            <Route path="/phase/6" element={<Phase6Detail />} />
            <Route path="/phase/7" element={<Phase7Detail />} />
            <Route path="/phase/8" element={<Phase8Detail />} />
            <Route path="/phase/9" element={<Phase9Detail />} />
            <Route path="/phase/10" element={<Phase10Detail />} />
            <Route path="/phase/11" element={<Phase11Detail />} />
            <Route path="/phase/12" element={<Phase12Detail />} />
            <Route path="/phase/13" element={<Phase13Detail />} />
            <Route path="/phase/14" element={<Phase14Detail />} />
            <Route path="/phase/15" element={<Phase15Detail />} />
            <Route path="/phase/:id" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

const styles = {
  main: {
    minHeight: 'calc(100vh - 60px)',
    backgroundColor: '#f5f6fa'
  }
};

export default App;
