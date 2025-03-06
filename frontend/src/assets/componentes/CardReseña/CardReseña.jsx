import React, { useContext, useEffect,useState } from 'react';
import Card from 'react-bootstrap/Card';
import { MyContext } from '../../../Context/Context';
import './cardreseña.css'

export const CardReseña = ({ viajeId }) => {
  console.log(`🛠️ CardReseña recibida con viajeId:`, viajeId);
  const { resenas, fetchResenasPorViaje } = useContext(MyContext);
  const [resenasViaje, setResenasViaje] = useState([]);

  useEffect(() => {
    if (!viajeId) { 
      console.warn("⚠️ No se recibió un viajeId en CardReseña.");
      return;}  // ✅ Aseguramos que haya un ID válido
     

    if (!resenas[viajeId]) {
      console.log(`🔍 Buscando reseñas en: http://localhost:3000/api/resenas/viaje/${viajeId}`);
      fetchResenasPorViaje(viajeId);
    }
  }, [viajeId, fetchResenasPorViaje, resenas]);

  useEffect(() => {
    console.log("📌 resenas actualizado:", resenas);
    if (resenas && resenas[viajeId]) {
      console.log("📌 Nuevas reseñas detectadas:", resenas[viajeId]);
      setResenasViaje(resenas[viajeId]); // Se actualiza correctamente
    }
  }, [resenas, viajeId]); 


 if (!resenas || typeof resenas !== "object") {
    console.error("❌ resenas es undefined o no es un objeto. No se puede acceder a las reseñas.");
    return;
  }
  if (!resenasViaje || resenasViaje.length === 0) {
    return <p>Cargando reseñas...</p>;
  }
  return (
    <div className="reseñas-container">
      {resenasViaje.length > 0 ? (
        resenasViaje.map((resena, index) => (  // 🔥 CAMBIAMOS `review` por `resena`
            <Card className="reseñas" key={index}>
                <Card.Body>
                    <Card.Title>({resena.valoracion} estrellas)</Card.Title>  {/* 🔥 resena.valoracion en vez de review.valoracion */}
                    <Card.Subtitle className="mb-2 text-muted" style={{ fontWeight: "bold" }}>
                        @{resena.nombre} {resena.apellido}  {/* 🔥 resena.nombre y resena.apellido */}
                    </Card.Subtitle>
                    <Card.Text>{resena.descripcion}</Card.Text>  {/* 🔥 resena.descripcion */}
                </Card.Body>
            </Card>
        ))
    ) : (
        <p>No hay reseñas para este viaje.</p>
    )}
    </div>
  );
};

export default CardReseña;
