import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InnerScreen from './components/InnerScreen';
import MainScreen from './components/MainScreen';
import HomeScreen from './components/HomeScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InnerScreen />} />
        <Route path="/subjects" element={<MainScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/calculator" element={
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            Calculator Page - Coming Soon
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;