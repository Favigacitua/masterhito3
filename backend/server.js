import app from './index.js';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});

export default server;