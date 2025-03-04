import bcrypt from 'bcrypt';

const inputPassword = "password123"; // 🔥 La contraseña que envías en el login
const storedHashedPassword = "$2b$10$D9gZ0qyzMvHJZBbY3nKMBeDsiTh2uPyxBYPQQqkK5aUMl/TX4NHmW"; // 🔥 La que está en la BD

bcrypt.compare(inputPassword, storedHashedPassword)
  .then(match => console.log("🔍 ¿bcrypt.compare() devuelve true?", match))
  .catch(err => console.error("❌ Error en bcrypt:", err));