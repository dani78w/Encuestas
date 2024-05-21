import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { extendTheme } from '@mui/joy/styles';
import Button from '@mui/joy/Button';

function EncuestaScreen() {
    const { id } = useParams();
    const [encuesta, setEncuesta] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEncuesta = async () => {
            try {
                const response = await fetch(`http://danielarribas.work:8000/encuesta/${id}`);
                if (!response.ok) {
                    throw new Error('No se pudo obtener la encuesta');
                }
                const data = await response.json();
                setEncuesta(data[0]); // Asumimos que el primer elemento del array es el que queremos
                console.log(data[0]);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchEncuesta();
    }, [id]);

    if (loading) {
        return (
            <div className="w-[100vw] h-[100vh] flex justify-center items-center">
                <Button loading variant="soft">
                    Cargando...
                </Button>
            </div>
        );
    }

    if (!encuesta) {
        return (
            <div className="w-[100vw] h-[100vh] flex justify-center items-center">
                <p>Error al cargar la encuesta.</p>
            </div>
        );
    }

    const { titulo, descripcion, fecha, dueno } = encuesta;

    return (
        <section className="bg-white min-h-screen">
            <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                <div className="flex flex-col rounded-lg px-4 py-8 text-center">
                    <h2 className="text-4xl font-bold text-blue-600 sm:text-4xl">{titulo}</h2>
                    <p className="mt-4 text-lg text-gray-600">{descripcion}</p>
                </div>

                <div className="mt-8 sm:mt-12">
                    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="flex flex-col rounded-lg bg-green-50 px-4 py-8 text-center">
                            <dd className="text-2xl font-extrabold text-green-600 md:text-5xl">Opcion 1</dd>
                        </div>
                        <div className="flex flex-col rounded-lg bg-purple-50 px-4 py-8 text-center">
                            <dd className="text-2xl font-extrabold text-purple-600 md:text-5xl">Opcion 2</dd>
                        </div>
                        <div className="flex flex-col rounded-lg bg-yellow-50 px-4 py-8 text-center">
                            <dd className="text-2xl font-extrabold text-yellow-600 md:text-5xl">Opcion 3</dd>
                        </div>

                        <div className="flex flex-col rounded-lg bg-white px-4 py-8 text-center">
                            <dt className="order-last text-lg font-medium text-gray-500">ID</dt>
                            <dd className="text-4xl font-extrabold text-blue-600 md:text-3xl">{id}</dd>
                        </div>

                        <div className="flex flex-col rounded-lg bg-white px-4 py-8 text-center">
                            <dt className="order-last text-lg font-medium text-gray-500">Fecha</dt>
                            <dd className="text-4xl font-extrabold text-blue-600 md:text-xl">{fecha}</dd>
                        </div>

                        <div className="flex flex-col rounded-lg bg-white px-4 py-8 text-center">
                            <dt className="order-last text-lg font-medium text-gray-500">Dueño</dt>
                            <dd className="text-4xl font-extrabold text-blue-600 md:text-3xl">{dueno}</dd>
                        </div>
                    </dl>
                </div>

                {/* Botón flotante con enlace a /home */}
                <Link to="/" className="fixed bottom-24 right-8 bg-blue-500 text-white rounded-full p-4 flex items-center justify-center shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </section>
    );
}

export default EncuestaScreen;
