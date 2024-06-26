import React, { useState } from 'react';

function EncuestaFormulario({ control }) {
    const [titulo, setTitulo] = useState('');
    const [dueno, setDueno] = useState('');
    const [fecha, setFecha] = useState('');
    const [opciones, setOpciones] = useState(['']); // Estado para almacenar las opciones
    
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    
        const url = `http://danielarribas.work:8000/encuestas/`; // URL de la API
        
        try {
            // Enviar la solicitud POST a la API
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ titulo, dueno: parseInt(1/*dueno*/, 10), fecha, opciones }) // Incluye las opciones
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
    
            const result = await response.json();
            console.log('Encuesta creada:', result);
        } catch (error) {
            console.error('Error al crear la encuesta:', error);
            alert('Error al crear la encuesta');
        }
        control(); 
        setTitulo('');
        setDueno('');
        setFecha(''); // Limpiar el campo de fecha también
        setOpciones(['']); // Limpiar las opciones
    };

    const handleAddOption = () => {
        setOpciones([...opciones, '']);
    };

    const handleOptionChange = (index, value) => {
        const newOpciones = opciones.slice();
        newOpciones[index] = value;
        setOpciones(newOpciones);
    };

    return (
        <form onSubmit={handleSubmit} className='text-black'>
            <div></div>
            {/* Campo para el título */}
            <label 
                htmlFor="tituloEncuesta"
                className="my-3 t relative block rounded-md border-2 border-gray-200 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-600"
            >
                <input
                    type="text"
                    id="tituloEncuesta"
                    className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 py-2"
                    placeholder="Título de la encuesta"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                />
                <span
                    className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                >
                    Título de la encuesta
                </span>
            </label>

            {/* Campos para las opciones */}
            {opciones.map((opcion, index) => (
                <label 
                    key={index}
                    className="my-3 relative block rounded-md border-2 border-gray-200 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-600"
                >
                    <input
                        type="text"
                        className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 py-2"
                        placeholder={`Opción ${index + 1}`}
                        value={opcion}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        required
                    />
                    <span
                        className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                    >
                        Opción {index + 1}
                    </span>
                </label>
            ))}
            <div className='flex w-full justify-center gap-x-9'>
                <button
                    type="button"
                    className="my-3 inline-block rounded-full border border-indigo-600 p-3 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                    onClick={handleAddOption}
                >
                    <span className="sr-only">Añadir Opción</span>
                    <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                </button>

                {titulo && (
                    <button
                        type="submit"
                        className="my-3 inline-block rounded-full border border-indigo-600 p-3 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                    >
                        <span className="sr-only">Enviar Encuesta</span>
                        <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 12h14M12 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                )}
            </div>
        </form>
    );
}

export default EncuestaFormulario;