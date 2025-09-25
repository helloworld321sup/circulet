import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import Market from './pages/Market';
import News from './pages/News';
import Chat from './pages/Chat';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/market" element={<Market />} />
            <Route path="/news" element={<News />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
