const db = require("../config/db");

// 🔹 Obtener todos los proveedores
const getAllProveedores = (req, res) => {
  console.log("[INFO] Solicitando todos los proveedores...");

  db.query("SELECT id, nombre, contacto, direccion, creado_en FROM proveedores", (err, results) => {
    if (err) {
      console.error("[ERROR] al obtener proveedores:", err);
      return res.status(500).json({ error: "Error al obtener proveedores" });
    }

    console.log(`[OK] ${results.length} proveedores obtenidos`);
    res.json(results);
  });
};

// 🔹 Obtener proveedor por id
const getProveedorById = (req, res) => {
  const { id } = req.params;
  console.log(`[INFO] Solicitando proveedor con ID = ${id}`);

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  db.query("SELECT id, nombre, contacto, direccion, creado_en FROM proveedores WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("[ERROR] al obtener proveedor:", err);
      return res.status(500).json({ error: "Error al obtener proveedor" });
    }

    if (results.length === 0) {
      console.warn(`[WARN] Proveedor con ID ${id} no encontrado`);
      return res.status(404).json({ error: "Proveedor no encontrado" });
    }

    console.log(`[OK] Proveedor con ID ${id} obtenido`);
    res.json(results[0]);
  });
};

// 🔹 Crear proveedor
const createProveedor = (req, res) => {
  const { nombre, contacto, direccion } = req.body;
  console.log("[INFO] Intentando crear proveedor...");

  if (!nombre) {
    return res.status(400).json({ error: "Nombre es obligatorio" });
  }

  db.query(
    "INSERT INTO proveedores (nombre, contacto, direccion) VALUES (?, ?, ?)",
    [nombre, contacto || null, direccion || null],
    (err, results) => {
      if (err) {
        console.error("[ERROR] al crear proveedor:", err);
        return res.status(500).json({ error: "Error al crear proveedor" });
      }

      console.log(`[OK] Proveedor creado con ID = ${results.insertId}`);
      res.status(201).json({ id: results.insertId, nombre, contacto, direccion });
    }
  );
};

// 🔹 Actualizar proveedor
const updateProveedor = (req, res) => {
  const { id } = req.params;
  const campos = req.body;
  console.log(`[INFO] Intentando actualizar proveedor con ID = ${id}`);

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }
  if (Object.keys(campos).length === 0) {
    return res.status(400).json({ error: "No hay campos para actualizar" });
  }

  const keys = Object.keys(campos);
  const values = Object.values(campos);
  const setClause = keys.map((k) => `${k} = ?`).join(", ");

  const sql = `UPDATE proveedores SET ${setClause} WHERE id = ?`;

  db.query(sql, [...values, id], (err, result) => {
    if (err) {
      console.error("[ERROR] al actualizar proveedor:", err);
      return res.status(500).json({ error: "Error al actualizar proveedor" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Proveedor no encontrado" });
    }

    console.log(`[OK] Proveedor con ID ${id} actualizado`);
    res.json({ message: "Proveedor actualizado correctamente" });
  });
};

// 🔹 Eliminar proveedor
const deleteProveedor = (req, res) => {
  const { id } = req.params;
  console.log(`[INFO] Intentando eliminar proveedor con ID = ${id}`);

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  db.query("DELETE FROM proveedores WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("[ERROR] al eliminar proveedor:", err);
      return res.status(500).json({ error: "Error al eliminar proveedor" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Proveedor no encontrado" });
    }

    console.log(`[OK] Proveedor con ID ${id} eliminado`);
    res.json({ message: "Proveedor eliminado correctamente" });
  });
};

module.exports = {
  getAllProveedores,
  getProveedorById,
  createProveedor,
  updateProveedor,
  deleteProveedor,
};
