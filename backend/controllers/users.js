import { getUsers, postUsers, getUserById, userLogin } from "../helpers/usersHelper.js";
import jwt from 'jsonwebtoken';
import { secretKey } from '../secretKey.js'; 

// 🔥 Controlador para obtener todos los usuarios (requiere autenticación)
const getUsersController = async (req, res) => {
  try {
    const users = await getUsers();
    res.json({ users });
  } catch (error) {
    console.error("❌ Error al obtener los usuarios:", error.message);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

// 🔥 Controlador para obtener un usuario por ID (requiere autenticación)
const getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("❌ Error en GET /users/:id:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const loginController = async (req, res) => { // 🔥 El controller mantiene el nombre loginController
  try {
    const { email, password } = req.body;
    console.log(`🔍 Intentando login con: ${email}`);

    // 🔥 Intentar autenticar el usuario
    const { user, error, status } = await userLogin(email, password); // 🔥 Cambio aquí

    if (error) {
      return res.status(status).json({ error });
    }

    // 🔥 Generar token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: "1h" });

    console.log("✅ Login exitoso. Token generado.");
    res.status(200).json({ token, user: { id: user.id, nombre: user.nombre, email: user.email } });

  } catch (error) {
    console.error("❌ Error en loginController:", error.message);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// 🔥 Controlador para registrar un nuevo usuario y generar token
const postUsersController = async (req, res) => {
  try {
    const { nombre, apellido, email, password, repetir_password } = req.body;

    if (password !== repetir_password) {
      return res.status(400).json({ error: "Las contraseñas no coinciden" });
    }

    const user = await postUsers(nombre, apellido, email, password);
    
    console.log("✅ Usuario registrado:", user);

    // 🔥 Generar un token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      secretKey,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      token,
      user
    });
  } catch (error) {
    console.error("❌ Error en postUsersController:", error.message);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

export { getUsersController, postUsersController, getUserByIdController, loginController };
