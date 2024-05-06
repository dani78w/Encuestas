import React, { useState, useEffect } from "react";
import NotaFormulario from '../components/NotaFormulario';
import ListaEncuestas from '../components/ListaEncuestas'; 
import logo from '../logo.svg';

function FeedScreen(){
  const [control, setControl] = useState(false);

    const manejarRecarga = () => {
        setControl(prevControl => !prevControl);  // Cambia el estado para forzar recarga
    };


    return(

        <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo color-indigo-500" alt="logo" />
          <NotaFormulario control={manejarRecarga}/>
          <ListaEncuestas recarga={control}/>
        </header>
        </div>
    )
}
export default FeedScreen;
