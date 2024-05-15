import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function CreadorEncuesta() {
    const { id } = useParams();
    const [encuesta, setEncuesta] = useState(null);

    useEffect(() => {
        const fetchEncuesta = async () => {
            try {
                const response = await fetch(`http://danielarribas.work:8000/encuesta/${id}`);
                if (!response.ok) {
                    throw new Error('No se pudo obtener la encuesta');
                }
                const data = await response.json();
                setEncuesta(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEncuesta();
    }, [id]);

    if (!encuesta) {
        return <p></p>;
    }

    const { titulo, descripcion, fecha, dueno } = encuesta;

    return (
        <section className="bg-white">
            <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                    <h2 className="text-3xl font-bold text-blue-600 sm:text-4xl">{titulo}</h2>
                </div>

                <div className="mt-8 sm:mt-12">
                    <dl className="grid grid-cols gap-4 sm:grid-cols-3">
                        <div className="flex flex-col rounded-lg bg-green-50 px-4 py-8 text-center">
                            <dd className="text-4xl font-extrabold text-green-600 md:text-5xl">Opcion 1</dd>
                        </div>
                        <div className="flex flex-col rounded-lg bg-purple-50 px-4 py-8 text-center">
                            <dd className="text-4xl font-extrabold text-purple-600 md:text-5xl">Opcion 2</dd>
                        </div>
                        <div className="flex flex-col rounded-lg bg-yellow-50 px-4 py-8 text-center">
                            <dd className="text-4xl font-extrabold text-yellow-600 md:text-5xl">Opcion 3</dd>
                        </div>

                        <div className="flex flex-col rounded-lg bg-white-50 px-4 py-8 text-center">
                            <dt className="order-last text-lg font-medium text-gray-500">ID</dt>
                            <dd className="text-4xl font-extrabold text-blue-600 md:text-3xl">{id}</dd>
                        </div>

                        <div className="flex flex-col rounded-lg bg-white-50 px-4 py-8 text-center">
                            <dt className="order-last text-lg font-medium text-gray-500">Tiempo</dt>
                            <dd className="text-4xl font-extrabold text-blue-600 md:text-xl">{fecha}</dd>
                        </div>

                        <div className="flex flex-col rounded-lg bg-white-50 px-4 py-8 text-center">
                            <dt className="order-last text-lg font-medium text-gray-500">Usuario</dt>
                            <dd className="text-4xl font-extrabold text-blue-600 md:text-3xl">{dueno}</dd>
                        </div>
                    </dl>
                </div>

                {/* Botón flotante con enlace a /home */}
                <Link to="/" className="fixed bottom-8 right-8 bg-blue-500 text-white rounded-full p-4 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </section>
    );
}

export default CreadorEncuesta;
