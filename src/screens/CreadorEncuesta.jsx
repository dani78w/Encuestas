import React from "react";
import NotaFormulario from '../components/NotaFormulario';
import { Button } from '@nextui-org/react';
import { useState } from "react";

function CreadorEncuesta(){
    const variants = ["flat", "bordered", "underlined", "faded"];
    const [control, setControl] = useState(false);

    const manejarRecarga = () => {
        setControl(prevControl => !prevControl);  // Cambia el estado para forzar recarga
    };

    return(
        <div>
            <Button>Click me</Button>

            <NotaFormulario control={manejarRecarga}/>
        </div>
        
    );
}

export default CreadorEncuesta