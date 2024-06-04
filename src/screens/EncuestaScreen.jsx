import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import HomeIcon from '@mui/icons-material/Home';

ChartJS.register(ArcElement, Tooltip, Legend);

function EncuestaScreen() {
    const { id } = useParams();
    const [encuesta, setEncuesta] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);
    const [clickCounts, setClickCounts] = useState({
        option1: 0,
        option2: 0,
        option3: 0,
    });

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

    const handleButtonClick = (option) => {
        if (selectedOption === option) {
            setSelectedOption(null);
            setClickCounts((prevCounts) => ({
                ...prevCounts,
                [option]: prevCounts[option] - 1,
            }));
        } else {
            setSelectedOption(option);
            setClickCounts((prevCounts) => ({
                ...prevCounts,
                [option]: prevCounts[option] + 1,
            }));
        }
    };

    const data = {
        labels: ['Opción 1', 'Opción 2', 'Opción 3'],
        datasets: [
            {
                label: 'Número de clics',
                data: [clickCounts.option1, clickCounts.option2, clickCounts.option3],
                backgroundColor: ['#66bb6a', '#ab47bc', '#ffca28'],
                hoverOffset: 4
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Número de veces que se ha pulsado cada botón',
            },
        },
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!encuesta) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h6" component="div">Error al cargar la encuesta.</Typography>
            </Box>
        );
    }

    const { titulo, descripcion, fecha, dueno } = encuesta;

    return (
        <Container>
            <Box sx={{ textAlign: 'center', my: 4 }}>
                <Typography variant="h2" component="h2" sx={{ color: 'blue' }}>
                    {titulo}
                </Typography>
                <Typography variant="h6" component="p" sx={{ color: 'gray' }}>
                    {descripcion}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', my: 4 }}>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#E6FFFA', color: '#66bb6a' }}
                    onClick={() => handleButtonClick('option1')}
                    disabled={selectedOption !== null && selectedOption !== 'option1'}
                >
                    Opción 1
                </Button>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#F3E8FF', color: '#ab47bc' }}
                    onClick={() => handleButtonClick('option2')}
                    disabled={selectedOption !== null && selectedOption !== 'option2'}
                >
                    Opción 2
                </Button>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#FFFAE5', color: '#ffca28' }}
                    onClick={() => handleButtonClick('option3')}
                    disabled={selectedOption !== null && selectedOption !== 'option3'}
                >
                    Opción 3
                </Button>
            </Box>
            <Box sx={{ my: 4 }}>
                <Pie data={data} options={options} />
            </Box>
            <Link to="/" className="fixed bottom-24 right-8 bg-blue-500 text-white rounded-full p-4 flex items-center justify-center shadow-lg">
                <HomeIcon />
            </Link>
        </Container>
    );
}

export default EncuestaScreen;
