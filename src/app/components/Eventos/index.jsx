import React from 'react';
import Perfil from './Perfil';
import Inscripcion from './Inscripcion';
import ListadoEventos from './ListadoEventos';
import NuevoEvento from './NuevoEvento';
import InvitarParticipantes from './InvitarParticipantes';
import QueVoyALlevar from './QueVoyALlevar';

const Eventos = () => {
    return (
        <div>
            <Perfil />
            <Inscripcion />
            <ListadoEventos />
            <NuevoEvento />
            <InvitarParticipantes />
            <QueVoyALlevar />
        </div>
    );
};

export default Eventos;
