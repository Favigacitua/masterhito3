import { Router } from "express";
import { getUsersController, postUsersController, getUserByIdController,loginController, putUserController, getUserProfileController } from "../controllers/users.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { request } from "../schema/postuserSchema.js";
import authMiddleware from "../middlewares/authMiddleware.js"; 
import upload from "../middlewares/uploadMiddleware.js";


const router = Router();



router.get('/users', authMiddleware, getUsersController);
router.get('/users/:id', authMiddleware, getUserByIdController)
router.post('/login', loginController)
router.post('/users', [schemaValidator(request.payload.register.request)], postUsersController);
router.get("/perfil", authMiddleware, getUserProfileController);
router.put('/perfil', authMiddleware, upload.single("imagen"), putUserController);

export { router };