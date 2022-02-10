import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CharacterDetail from './components/CharacterDetail';
import Quotes from './pages/Quotes';
import QuoteDetail from './pages/QuoteDetail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/char/:char_id" element={<CharacterDetail />} />
        <Route exact path="/quotes" element={<Quotes />} />
        <Route path="/quotes/:quote_id" element={<QuoteDetail />} />
      </Routes>
    </div>
  );
}

export default App;
