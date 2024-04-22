import React, { useState } from 'react';

function EncuestaFormulario() {
    // Definir estado para el título y el dueño
    const [titulo, setTitulo] = useState('');
    const [dueno, setDueno] = useState('');

    // Función para manejar el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();  // Prevenir el comportamiento predeterminado del formulario

        const url = `http://localhost:8000/encuestas/`; // URL de la API
        
        try {
            // Enviar la solicitud POST a la API
            const response = await fetch(url, {
                method: 'POST',  // Método HTTP
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ titulo, dueno: parseInt(dueno, 10) })  // Cuerpo de la solicitud (convertir dueno a entero)
            });

            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            // Si la respuesta es exitosa, mostrar un mensaje de éxito
            const result = await response.json(); // Suponiendo que la API responde con JSON
            console.log('Encuesta creada:', result);
            alert('Encuesta creada con éxito!');
        } catch (error) {
            // Si hay algún error, mostrar un mensaje de error
            console.error('Error al crear la encuesta:', error);
            alert('Error al crear la encuesta');
        }

        // Limpiar los campos del formulario después de enviarlo
        setTitulo('');
        setDueno('');
    };

    // Renderizar el formulario
    return (
        <form onSubmit={handleSubmit}>
            {/* Campo para ingresar el título de la encuesta */}
            <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Título de la encuesta"
                required
            />
            {/* Campo para ingresar el ID del dueño de la encuesta */}
            <input
                type="text" // Cambiado de number a text para adaptarse a los cambios
                value={dueno}
                onChange={(e) => setDueno(e.target.value)}
                placeholder="ID del dueño de la encuesta"
                required
            />
            {/* Botón para enviar el formulario */}
            <button type="submit">Crear Encuesta</button>
        </form>
    );
}

export default EncuestaFormulario;