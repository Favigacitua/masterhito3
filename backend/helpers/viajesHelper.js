import pool from "../config/dbConnection.js"


async function getViajes() {
    const consulta = 'SELECT * FROM viajes'
    const { rows } = await pool.query(consulta)
    return {rows}
}


async function getViajeId(id) {
    const consulta = 'SELECT * FROM viajes WHERE id = $1'
    const { rows } = await pool.query(consulta, [id])
    return rows[0] || null
}

async function getMisViajes(token) {
    //verifica token valido
    const consulta = 'SELECT id FROM usuarios WHERE token = $1'
    const { rows: usuarioRows } = await pool.query(consulta, [token])

    if (usuarioRows.length === 0) {
        throw new Error("Token inválido o usuario no encontrado");
    }

    const usuarioId = usuarioRows[0].id;

    //verifica viajes usuario autenticado
    const consultaViajes = 'SELECT * FROM mis_viajes WHERE id_usuario = $1';
    const { rows: viajesRows } = await pool.query(consultaViajes, [usuarioId]);

    return viajesRows; 
}

async function postViajesFavoritos(id_usuario, id_viaje ) {
    const consulta = 'INSERT INTO favoritos (id_usuario, id_viaje) VALUES($1,$2) RETURNING *'
    const values = [id_usuario, id_viaje]
    const { rows } = await pool.query(consulta, values)
    return { rows }

}



export {
    getViajes,
    getViajeId,
    getMisViajes,
    postViajesFavoritos
} 