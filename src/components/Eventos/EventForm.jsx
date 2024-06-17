import React, { useState } from 'react';

const EventForm = () => {
    const [nombre, setNombre] = useState('');
    const [fecha, setFecha] = useState('');
    const [participantes, setParticipantes] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para enviar los datos del nuevo evento
        console.log({ nombre, fecha, participantes });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre del Evento</label>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div>
                <label>Fecha del Evento</label>
                <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
            </div>
            <div>
                <label>Participantes</label>
                <input type="text" value={participantes} onChange={(e) => setParticipantes(e.target.value)} />
            </div>
            <button type="submit">Crear Evento</button>
        </form>
    );
};

export default EventForm;
