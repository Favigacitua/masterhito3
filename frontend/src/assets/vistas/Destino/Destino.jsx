import React from 'react';
import { useParams } from 'react-router-dom';
import DestinoDetailCard from '../../componentes/DestinoDetailCard/DestinoDetailCard';
import CardReseña from '../../componentes/CardReseña/CardReseña';

export const Destino = () => {
  const { id } = useParams();

  return (
    <div>
      <div>
        <DestinoDetailCard id={id} />
      </div>
      <br />
      <hr style={{ border: '2px solid gray', margin: 'auto', width:'90%' }} />
<br />

      <div className="reseñas">
        <CardReseña viajeId={id} />
      </div>
    </div>
  );
};

export default Destino;