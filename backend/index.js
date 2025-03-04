
import express from 'express';
import cors from 'cors';
import { router as userRouter } from './routes/users.js';
import { viajesRouter } from "./routes/viajes.js";
import { resenasRouter } from "./routes/resenas.js";

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));  
app.use(express.json());

app.use("/api", resenasRouter);
app.use("/api", viajesRouter);
app.use("/api", userRouter);


console.log("📌 Rutas registradas en Express:");
app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log(`➡️ ${r.route.path}`);
  }
});

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}



export default app













