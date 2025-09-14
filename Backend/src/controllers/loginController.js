const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 🔹 Login de usuario (con soporte hash y sin hash)
const loginUser = (req, res) => {
  const { email, password } = req.body;

  console.log(`[INFO] Intentando login con email: ${email}`);

  if (!email || !password) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  db.query(
    "SELECT id, nombre, email, rol, password_hash FROM usuarios WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        console.error("[ERROR] al buscar usuario:", err);
        return res.status(500).json({ error: "Error al buscar usuario" });
      }

      if (results.length === 0) {
        console.warn("[WARN] Usuario no encontrado");
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const user = results[0];
      let tipoValidacion = "";
      let loginValido = false;

      try {
        // 1️⃣ Intentar con hash
        loginValido = await bcrypt.compare(password, user.password_hash);
        if (loginValido) tipoValidacion = "hash";
      } catch (error) {
        console.error("[ERROR] al comparar con bcrypt:", error);
      }

      // 2️⃣ Si no coincide con hash, intentar sin hash
      if (!loginValido && password === user.password_hash) {
        loginValido = true;
        tipoValidacion = "sin hash";
      }

      if (!loginValido) {
        console.warn("[WARN] Contraseña incorrecta");
        return res.status(401).json({ error: "Contraseña incorrecta" });
      }

      // Generar token JWT
      const token = jwt.sign(
        { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol },
        process.env.JWT_SECRET || "clave_secreta",
        { expiresIn: "8h" }
      );

      console.log(`[OK] Usuario ${user.email} logueado correctamente usando ${tipoValidacion}`);

      res.json({
        message: "Login exitoso",
        token,
        tipoValidacion, // indica si fue con hash o sin hash
        user: {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          rol: user.rol,
        },
      });
    }
  );
};

module.exports = { loginUser };
