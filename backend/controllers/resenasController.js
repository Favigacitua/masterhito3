import pool from "../config/dbConnection.js"; 
import jwt from 'jsonwebtoken';
import { secretKey } from "../secretKey.js";
import { getResenas, getMisResenas, postResenas } from "../helpers/resenasHelper.js";

const getResenasController = async (req, res) =>{
    try {
        const { id } = req.params;  
        if (!id) {
            return res.status(400).json({ error: "ID de reseña requerido" });
        }

        const resenas = await getResenas(id);  

        if (!resenas) {
            return res.status(404).json({ error: "Reseña no encontrado" });
        }

        res.json({ resenas });  

    } catch (error) {
        console.error("Error al obtener la reseña:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
}

const getMisResenasController = async (req, res)=>{
    try {
        const token = req.headers.authorization; 
        if (!token) {
            return res.status(401).json({ error: "Token de autenticación requerido" });
        }
        const resenas = await getMisResenas(token);
        res.json({ resenas });

    } catch (error) {
        console.error("Error al obtener reseñas:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
}

const postResenasController = async (req, res) => {
    try {
        console.log("📌 POST /mis_resenas alcanzado");

        // 🔥 Verificar si el token existe
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Token de autenticación requerido" });
        }

        const token = authHeader.split(" ")[1]; // 🔥 Extraer el token sin "Bearer "
        
        try {
            const decoded = jwt.verify(token, secretKey); // 🔥 Verificar token
            var id_usuario = decoded.id;
        } catch (error) {
            return res.status(401).json({ error: "Token inválido o expirado" });
        }

        // 🔥 Extraer datos del body
        const { id_viaje, valoracion, descripcion } = req.body;
        if (!id_viaje || !valoracion || !descripcion) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }

        // 🔥 Validar que `id_viaje` existe en la BD antes de insertar la reseña
        const viajeExiste = await pool.query("SELECT id FROM viajes WHERE id = $1", [id_viaje]);
        if (viajeExiste.rows.length === 0) {
            return res.status(404).json({ error: "El viaje no existe" });
        }

        // 🔥 Insertar la reseña
        const resena = await postResenas(id_usuario, id_viaje, valoracion, descripcion);

        return res.status(201).json({ message: "Reseña agregada", resena });

    } catch (error) {
        console.error("❌ Error al agregar reseña:", error);
        return res.status(500).json({ error: "Error en el servidor" });
    }
};

export {
    getMisResenasController,
    getResenasController,
    postResenasController
}