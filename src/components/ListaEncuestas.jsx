import React, { useState, useEffect } from 'react';

function ListaEncuestas() {
    const [encuestas, setEncuestas] = useState([]);

    useEffect(() => {
        // Función para obtener las encuestas
        const obtenerEncuestas = async () => {
            try {
                // Realizar solicitud GET a la API para obtener las encuestas
                const response = await fetch('http://localhost:8000/encuestas/');
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
        <div>
            <h2>Lista de Encuestas</h2>
            <ul>
                {/* Mapear las encuestas y renderizar cada una */}
                {encuestas.map((encuesta) => (
                    <li key={encuesta.id}>
                        <strong>Título:</strong> {encuesta.titulo} - <strong>Dueño:</strong> {encuesta.dueno}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListaEncuestas;