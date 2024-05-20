import React from "react";
import NotaFormulario from '../components/NotaFormulario';
import { Button } from '@nextui-org/react';


function CreadorEncuesta(){
    const variants = ["flat", "bordered", "underlined", "faded"];

    return(
        <div>
            <Button>Click me</Button>

            <NotaFormulario/>
        </div>
        
    );
}

export default CreadorEncuesta