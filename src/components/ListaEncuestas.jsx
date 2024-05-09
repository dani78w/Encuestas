import React, { useState, useEffect } from 'react';
import Card from './Card';

function ListaEncuestas({ recarga }) {
    const [encuestas, setEncuestas] = useState([]);
    
    useEffect(() => {
        const obtenerEncuestas = async () => {
            try {
                const response = await fetch('http://188.127.169.12:8000/encuestas/');
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setEncuestas(data);
            } catch (error) {
                console.error('Error al obtener las encuestas:', error);
            }
        };
    
        obtenerEncuestas();
    }, [recarga]); // 'control' como dependencia hace que useEffect se ejecute cada vez que 'control' cambia
    
    return (



            
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8 overflow-x-hidden py-12 px-5 transition-all duration-300" >
    {encuestas.slice().reverse().map((encuesta) => (
        <Card
            title={encuesta.titulo}
            description=""
            id={encuesta.id}
            timeLength={encuesta.id + 1}
            guests={encuesta.dueno}
        />
    ))}
</div>

    
    );
}

export default ListaEncuestas;