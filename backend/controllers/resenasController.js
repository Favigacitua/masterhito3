import pool from "../config/dbConnection.js"; 
import jwt from 'jsonwebtoken';
import { secretKey } from "../secretKey.js";
import { getResenasPorViaje, getMisResenas, postResenas, getResenas } from "../helpers/resenasHelper.js";


const getResenasController = async (req, res) => {
    try {
        const resenas = await getResenas();
        res.json({ resenas });
    } catch (error) {
        console.error("❌ Error en getResenasController:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};



const getResenasPorViajeController = async (req, res) => {
    try {
        const { id_viaje } = req.params;
        console.log("📌 Buscando reseñas para el viaje ID:", id_viaje);

        if (!id_viaje) {
            return res.status(400).json({ error: "ID de viaje requerido" });
        }

        const resenas = await getResenasPorViaje(id_viaje);

        res.json({ resenas });
    } catch (error) {
        console.error("❌ Error en getResenasPorViajeController:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

const getMisResenasController = async (req, res)=>{
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Token de autenticación requerido" });
        }

        const token = authHeader.split(" ")[1];
       
        let id_usuario;
        try {
            const decoded = jwt.verify(token, secretKey);
            id_usuario = decoded.id;
        } catch (error) {
            return res.status(401).json({ error: "Token inválido o expirado" });
        }

        const resenas = await getMisResenas(id_usuario); // 🔥 Ahora pasamos el id_usuario, no el token

        res.json({ resenas });

    } catch (error) {
        console.error("Error al obtener reseñas:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
}

const postResenasController = async (req, res) => {
    try {
        console.log("📌 POST /resenas alcanzado");

        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Token de autenticación requerido" });
        }
        const token = authHeader.split(" ")[1]; 
        console.log("📌 Token recibido:", token);

        let decoded;
        try {
            decoded = jwt.verify(token, secretKey);
            console.log("📌 Token decodificado:", decoded);
        } catch (error) {
            console.error("❌ Error al verificar token:", error);
            return res.status(401).json({ error: "Token inválido o expirado" });
        }

        console.log("📌 Datos recibidos en req.body:", req.body); // 🔥 Ver qué datos llegan realmente


        const { id_viaje, valoracion, descripcion } = req.body;
        const id_usuario = decoded.id;

        if (!id_viaje || !valoracion || !descripcion) {
            console.error("❌ Faltan campos obligatorios:", { id_viaje, valoracion, descripcion });
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }

        const resena = await postResenas(id_usuario, id_viaje, valoracion, descripcion);

        res.status(201).json({ success: true, message: "Reseña agregada", resena });
    } catch (error) {
        console.error("❌ Error en postResenasController:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

export {
    getResenasController,
    getMisResenasController,
    getResenasPorViajeController,
    postResenasController
}