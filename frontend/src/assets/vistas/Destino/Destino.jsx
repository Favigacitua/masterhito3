import React from 'react';
import { useParams } from 'react-router-dom';
import DestinoDetailCard from '../../componentes/DestinoDetailCard/DestinoDetailCard';
import CardReseña from '../../componentes/CardReseña/CardReseña';

export const Destino = () => {
  const { id } = useParams();
  const viajeId = Number(id); // Convertimos `id` a número

  console.log(`🔍 Renderizando Destino con viajeId:`, viajeId);

  return (
    <div>
      <div>
        <DestinoDetailCard id={viajeId} />
      </div>
      <br />
      <hr style={{ border: '2px solid gray', margin: 'auto', width:'90%' }} />
      <br />
      <div className="reseñas">
        <CardReseña viajeId={viajeId} />
      </div>
    </div>
  );
};

export default Destino;