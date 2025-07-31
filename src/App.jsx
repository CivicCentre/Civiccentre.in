import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import APPSC from './pages/APPSC/APPSC'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appsc" element={<APPSC />} />
      </Routes>
    </Router>
  );
}

export default App;