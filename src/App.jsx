import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import APPSC from './pages/APPSC/APPSC'
import TestSeriesPage from './pages/TestSeries/testseries';
import TGPSC from './pages/TGPSC/TGPSC';
import UPSC from './pages/UPSC/UPSC';
import Chatbot from './Components/Chatbot';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appsc" element={<APPSC />} />
        <Route path="/testseries" element={<TestSeriesPage />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/tgpsc" element={<TGPSC />} />
        <Route path="/upsc" element={<UPSC />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;