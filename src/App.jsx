import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GameInfo from './pages/GameInfo';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/game/:id" element={<GameInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;