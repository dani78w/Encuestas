import logo from './logo.svg';

import './App.css';
import NotaFormulario from './components/NotaFormulario';
import ListaEncuestas from './components/ListaEncuestas'; 
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo color-indigo-500" alt="logo" />
        <NotaFormulario/>
        <ListaEncuestas/>
      </header>
    </div>
  );
}

export default App;
