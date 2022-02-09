import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './components/Detail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/char/:char_id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
