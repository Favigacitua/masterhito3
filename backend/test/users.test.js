import request from 'supertest';
import app from '../index.js'; 
import pool from '../config/dbConnection.js';
import bcrypt from 'bcrypt';

// describe('Rutas protegidas con autenticación', () => {

//   it('GET /api/users debería devolver los datos del usuario autenticado', async () => {
//     const res = await request(app)
//       .get('/api/users')
//       .set('Authorization', `Bearer ${token}`);

//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty('email', userEmail);
//   });

// });

describe('POST /api/users', () => {

  beforeEach(async () => {
    await pool.query('BEGIN'); 
  });

  afterEach(async () => {
    await pool.query('ROLLBACK'); 
  });

  it('Debería crear un nuevo usuario', async () => {

    const res = await request(app)
      .post('/api/users')
      .send({
        nombre: 'Juan',
        apellido: 'Pérez',
        email: `juan${Date.now()}@example.com`,
        password: 'password123',
        repetir_password: 'password123'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('user');

  });

});

describe('GET /api/users/:id', () => {
  let token;
  const userEmail = "jan@example.com";
  const userPassword = "password123";
  let userId;

  beforeEach(async () => {
    console.log("🔍 Eliminando usuario existente solo para este test...");
    await pool.query("DELETE FROM usuario WHERE email = $1", [userEmail]);

    console.log("🔍 Creando usuario de prueba con contraseña encriptada...");
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const result = await pool.query(
      "INSERT INTO usuario (nombre, apellido, email, password) VALUES ($1, $2, $3, $4) RETURNING id",
      ["Juan", "Pérez", userEmail, hashedPassword]
    );

    userId = result.rows[0].id; // 🔥 Guardamos el ID del usuario creado
    console.log("✅ Usuario de prueba creado con ID:", userId);

    console.log("🔍 Intentando login con:", userEmail);
    const loginResponse = await request(app)
      .post('/api/login')
      .send({ email: userEmail, password: userPassword });

    console.log("🔍 Respuesta del login en Jest:", loginResponse.statusCode, loginResponse.body);

    if (loginResponse.statusCode !== 200) {
      throw new Error("❌ No se pudo autenticar en el test.");
    }

    token = loginResponse.body.token;

    if (!token) {
      throw new Error("❌ No se pudo obtener un token válido.");
    }
  });

  it('Debería devolver los datos del usuario solicitado', async () => {
    const res = await request(app)
      .get(`/api/users/${userId}`) // 🔥 Usamos el ID generado dinámicamente
      .set('Authorization', `Bearer ${token}`);

    console.log("🔍 Respuesta del servidor para usuario válido:", res.statusCode, res.body);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', userId);
    expect(res.body).toHaveProperty('email', userEmail);
  });

  it('Debería devolver error si el usuario no existe', async () => {
    const res = await request(app)
      .get('/api/users/9999')
      .set('Authorization', `Bearer ${token}`);

    console.log("🔍 Respuesta del servidor para usuario inexistente:", res.statusCode, res.body);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error', "Usuario no encontrado");
  });

});


