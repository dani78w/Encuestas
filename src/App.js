import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NotaFormulario from './components/NotaFormulario';
import ListaEncuestas from './components/ListaEncuestas'; 
import FeedScreen from './screens/FeedScreen';
import CreadorEncuesta from './screens/CreadorEncuesta';
import EncuestaScreen from './screens/EncuestaScreen';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<FeedScreen />} />
          <Route path="/new" element={<CreadorEncuesta />} />
          <Route path="/encuesta/:id" element={<EncuestaScreen />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}

function BottomNav() {
  const navigate = useNavigate();
  
  return (
    <div className='fixed bottom-0 w-full shadow-lg z-50'>
      <BottomNavigation
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(10px)' // Añade un borde difuso
        }}
        showLabels
        onChange={(event, newValue) => {
          if (newValue === 0) navigate('/');
          if (newValue === 1) navigate('/new');
          if (newValue === 2) navigate('/nearby');
        }}
      >
        <BottomNavigationAction label="Inicio" icon={<HomeIcon />} />
        <BottomNavigationAction label="Nueva" icon={<AddCircleIcon />} />
        <BottomNavigationAction label="Cercanas" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </div>
  );
}

export default App;
