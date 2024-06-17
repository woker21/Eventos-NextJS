import React from 'react';
import EventoCard from './EventoCard';

const ListadoEventos = () => {
    // Suponiendo que tienes una lista de eventos
    const eventos = [
        { id: 1, nombre: 'Evento 1', fecha: '2024-06-20', participantes: ['Juan', 'María'] },
        { id: 2, nombre: 'Evento 2', fecha: '2024-06-21', participantes: ['Pedro', 'Ana'] },
        // Otros eventos...
    ];

    return (
        <div>
            <h1>Listado de Eventos</h1>
            {eventos.map(evento => (
                <EventoCard key={evento.id} evento={evento} />
            ))}
        </div>
    );
};

export default ListadoEventos;
