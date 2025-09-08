const db = require("../config/db");

// Obtener todos los usuarios
const getAllUsers = (req, res) => {
  db.query("SELECT * FROM usuarios", (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener usuarios" });
    res.json(results);
  });
};

// Obtener usuario por id
const getUserById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM usuarios WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener usuario" });
    res.json(results[0]);
  });
};

// Crear usuario
const createUser = (req, res) => {
  const { nombre, email, password_hash, rol } = req.body;
  db.query(
    "INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES (?, ?, ?, ?)",
    [nombre, email, password_hash, rol],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Error al crear usuario" });
      res.json({ id: results.insertId, nombre, email, rol });
    }
  );
};

// Actualizar usuario
const updateUser = (req, res) => {
  const { id } = req.params;
  const { nombre, email, rol } = req.body;
  db.query(
    "UPDATE usuarios SET nombre = ?, email = ?, rol = ? WHERE id = ?",
    [nombre, email, rol, id],
    (err) => {
      if (err) return res.status(500).json({ error: "Error al actualizar usuario" });
      res.json({ message: "Usuario actualizado correctamente" });
    }
  );
};

// Eliminar usuario
const deleteUser = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM usuarios WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Error al eliminar usuario" });
    res.json({ message: "Usuario eliminado correctamente" });
  });
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
