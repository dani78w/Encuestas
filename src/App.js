import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './screens/FeedScreen'
import './App.css';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddCircleIcon from '@mui/icons-material/AddCircle';import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NotaFormulario from './components/NotaFormulario';
import ListaEncuestas from './components/ListaEncuestas'; 
import FeedScreen from './screens/FeedScreen';
import CreadorEncuesta from './screens/CreadorEncuesta';
import EncuestaScreen from './screens/EncuestaScreen';

function App() {
  return (
    <Router>
      <Routes>
              
        <Route path="/" element={ <FeedScreen/> } />
        <Route path="/new" element={ <CreadorEncuesta/> } />
        <Route path="/encuesta/:id" element={<EncuestaScreen />} />
      </Routes>
      <div className='fixed bottom-0 w-full shadow-lg z-50'>
        <BottomNavigation
         sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(10px)'// Añade un borde difuso
        }}
            showLabels
            onChange={(event, newValue) => {
            
            }}
          >
            <BottomNavigationAction label="Recientes" icon={<FavoriteIcon />} />
            <BottomNavigationAction  label="Nueva" icon={<AddCircleIcon />} />
            <BottomNavigationAction label="Cercanas" icon={<LocationOnIcon />} />
          </BottomNavigation>
      </div>
      
    </Router>
  );
}

export default App;
