import React, { useState, useEffect } from 'react';
import Card from './Card';

function ListaEncuestas() {
    const [encuestas, setEncuestas] = useState([]);

    useEffect(() => {
        // Función para obtener las encuestas
        const obtenerEncuestas = async () => {
            try {
                // Realizar solicitud GET a la API para obtener las encuestas
                const response = await fetch('http://188.127.169.12:8000/encuestas/');
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                // Convertir la respuesta a JSON
                const data = await response.json();
                // Actualizar el estado con las encuestas obtenidas
                setEncuestas(data);
            } catch (error) {
                console.error('Error al obtener las encuestas:', error);
            }
        };

        // Llamar a la función para obtener las encuestas al cargar el componente
        obtenerEncuestas();
    }, []); // La dependencia vacía asegura que solo se ejecute una vez al montar el componente

    return (



            
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
        
                {encuestas.map((encuesta) => (

                    <Card
                        title={encuesta.titulo}
                        description=""
                        episodeNumber={encuesta.id}
                        timeLength={encuesta.id + 1}
                        guests={encuesta.dueno}
                    />

                ))}
            </div>
    
    );
}

export default ListaEncuestas;