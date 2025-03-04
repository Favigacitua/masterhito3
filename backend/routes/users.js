import { Router } from "express";
import { getUsersController, postUsersController, getUserByIdController,loginController } from "../controllers/users.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { request } from "../schema/postuserSchema.js";
import authMiddleware from "../middlewares/authMiddleware.js"; // Importamos el middleware de autenticación

const router = Router();

// Ruta para obtener todos los usuarios (protegida por autenticación)
router.get('/users', authMiddleware, getUsersController);
router.get('/users/:id', authMiddleware, getUserByIdController)
router.post('/login', loginController)

// Ruta para crear un usuario (sin autenticación)
router.post('/users', [schemaValidator(request.payload.register.request)], postUsersController);

export { router };