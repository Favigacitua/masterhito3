import pool from "../config/dbConnection.js"

async function getResenas() {
    const consulta = 'SELECT * FROM resenas '
    const { rows } = await pool.query(consulta)
    return rows
}

async function getMisResenas(token) {
    const consulta = 'SELECT id FROM usuarios WHERE token = $1'
    const { rows: usuarioRows } = await pool.query(consulta, [token])
    if (usuarioRows.length === 0) {
        throw new Error("Token inválido o usuario no encontrado");
    }

    const usuarioId = usuarioRows[0].id;

    const consultaResenas = 'SELECT * FROM mis_resenas WHERE id_usuario = $1';
    const { rows: resenasRows } = await pool.query(consultaResenas, [usuarioId]);

    return resenasRows; 
}

async function postResenas(id_usuario, id_viaje, valoracion, descripcion) {
     const consulta = 'INSERT INTO mis_resenas (id_usuario, id_viaje, valoracion, descripcion) VALUES($1,$2,$3,$4) RETURNING *'
     const values = [id_usuario, id_viaje, valoracion, descripcion]
     const { rows } = await pool.query(consulta, values)
    return rows [0]
}


export {
    getResenas,
    getMisResenas,
    postResenas
}