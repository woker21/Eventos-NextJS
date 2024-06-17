import React from 'react';

const EventoCard = ({ evento }) => {
    return (
        <div>
            <h2>{evento.nombre}</h2>
            <p>Fecha: {evento.fecha}</p>
            <p>Participantes: {evento.participantes.join(', ')}</p>
        </div>
    );
};

export default EventoCard;
