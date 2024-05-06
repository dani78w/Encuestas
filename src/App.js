import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './screens/FeedScreen'
import './App.css';
import NotaFormulario from './components/NotaFormulario';
import ListaEncuestas from './components/ListaEncuestas'; 
import FeedScreen from './screens/FeedScreen';
import EncuestaScreen from './screens/EncuestaScreen';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={ <FeedScreen/> } />
        <Route path="/new" element={ <EncuestaScreen/> } />

      </Routes>
    </Router>
  );
}

export default App;
