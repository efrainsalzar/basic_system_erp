const db = require("../config/db");

// 🔹 Obtener todos los usuarios
const getAllUsers = (req, res) => {
  console.log("[INFO] Solicitando todos los usuarios...");

  db.query("SELECT id, nombre, email, rol, creado_en FROM usuarios", (err, results) => {
    if (err) {
      console.error("[ERROR] al obtener usuarios:", err);
      return res.status(500).json({ error: "Error al obtener usuarios" });
    }

    console.log(`[OK] ${results.length} usuarios obtenidos`);
    res.json(results);
  });
};

// 🔹 Obtener usuario por id
const getUserById = (req, res) => {
  const { id } = req.params;
  console.log(`[INFO] Solicitando usuario con ID = ${id}`);

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  db.query("SELECT id, nombre, email, rol, creado_en FROM usuarios WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("[ERROR] al obtener usuario:", err);
      return res.status(500).json({ error: "Error al obtener usuario" });
    }

    if (results.length === 0) {
      console.warn(`[WARN] Usuario con ID ${id} no encontrado`);
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    console.log(`[OK] Usuario con ID ${id} obtenido`);
    res.json(results[0]);
  });
};

// 🔹 Crear usuario
const createUser = (req, res) => {
  const { nombre, email, password_hash, rol } = req.body;
  console.log("[INFO] Intentando crear usuario...");

  if (!nombre || !email || !password_hash) {
    console.warn("[WARN] Datos incompletos al crear usuario");
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  db.query(
    "INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES (?, ?, ?, ?)",
    [nombre, email, password_hash, rol || "user"],
    (err, results) => {
      if (err) {
        console.error("[ERROR] al crear usuario:", err);
        return res.status(500).json({ error: "Error al crear usuario" });
      }

      console.log(`[OK] Usuario creado con ID = ${results.insertId}`);

      db.query(
        "SELECT id, nombre, email, rol, creado_en FROM usuarios WHERE id = ?",
        [results.insertId],
        (err2, rows) => {
          if (err2) {
            console.error("[ERROR] al obtener usuario creado:", err2);
            return res.status(500).json({ error: "Error al obtener usuario creado" });
          }

          console.log(`[OK] Usuario con ID ${results.insertId} recuperado`);
          res.status(201).json(rows[0]);
        }
      );
    }
  );
};

// 🔹 Actualizar usuario
const updateUser = (req, res) => {
  const { id } = req.params;
  const campos = req.body;

  console.log(`[INFO] Intentando actualizar usuario con ID = ${id}`);

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }
  if (Object.keys(campos).length === 0) {
    console.warn("[WARN] No se enviaron campos para actualizar");
    return res.status(400).json({ error: "No hay campos para actualizar" });
  }

  const keys = Object.keys(campos);
  const values = Object.values(campos);
  const setClause = keys.map((k) => `${k} = ?`).join(", ");

  const sql = `UPDATE usuarios SET ${setClause} WHERE id = ?`;

  db.query(sql, [...values, id], (err, result) => {
    if (err) {
      console.error("[ERROR] al actualizar usuario:", err);
      return res.status(500).json({ error: "Error al actualizar usuario" });
    }

    if (result.affectedRows === 0) {
      console.warn(`[WARN] Usuario con ID ${id} no encontrado`);
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    console.log(`[OK] Usuario con ID ${id} actualizado correctamente`);
    res.json({ message: "Usuario actualizado correctamente" });
  });
};

// 🔹 Eliminar usuario
const deleteUser = (req, res) => {
  const { id } = req.params;
  console.log(`[INFO] Intentando eliminar usuario con ID = ${id}`);

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  db.query("DELETE FROM usuarios WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("[ERROR] al eliminar usuario:", err);
      return res.status(500).json({ error: "Error al eliminar usuario" });
    }

    if (result.affectedRows === 0) {
      console.warn(`[WARN] Usuario con ID ${id} no encontrado`);
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    console.log(`[OK] Usuario con ID ${id} eliminado`);
    res.json({ message: "Usuario eliminado correctamente" });
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
