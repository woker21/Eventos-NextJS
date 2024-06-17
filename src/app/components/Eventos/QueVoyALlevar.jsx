import React from 'react';

const QueVoyALlevar = () => {
    // Suponiendo que tienes una lista de cosas para llevar
    const items = [
        'Broccoli',
        'Plátano de la serpiente',
        'Pizarra hinchada',
        'Manzana celeste',
        'Kombucha'
    ];

    return (
        <div>
            <h1>Qué voy a llevar</h1>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default QueVoyALlevar;
