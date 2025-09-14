const db = require("../config/db");

// 🔹 Obtener todos los productos
const getAllProductos = (req, res) => {
  const sql = "SELECT id, nombre, descripcion, precio_unitario, precio_mayorista FROM productos";
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error("[ERROR] al obtener productos:", err);
      return res.status(500).json({ error: "Error al obtener productos" });
    }

    res.json(results);
  });
};

// 🔹 Obtener producto por ID
const getProductoById = (req, res) => {
  const { id } = req.params;
  
  if (!id || isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  db.query(
    "SELECT id, nombre, descripcion, precio_unitario, precio_mayorista FROM productos WHERE id = ?",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Error al obtener producto" });
      if (results.length === 0) return res.status(404).json({ error: "Producto no encontrado" });

      res.json(results[0]);
    }
  );
};

// 🔹 Crear producto
const createProducto = (req, res) => {
  const { nombre, descripcion, precio_unitario, precio_mayorista } = req.body;

  if (!nombre || !precio_unitario) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  db.query(
    "INSERT INTO productos (nombre, descripcion, precio_unitario, precio_mayorista) VALUES (?, ?, ?, ?)",
    [nombre, descripcion || null, precio_unitario, precio_mayorista || null],
    (err, result) => {
      if (err) {
        console.error("[ERROR] al crear producto:", err);
        return res.status(500).json({ error: "Error al crear producto" });
      }

      db.query(
        "SELECT id, nombre, descripcion, precio_unitario, precio_mayorista FROM productos WHERE id = ?",
        [result.insertId],
        (err2, rows) => {
          if (err2) return res.status(500).json({ error: "Error al obtener producto creado" });

          res.status(201).json(rows[0]);
        }
      );
    }
  );
};

// 🔹 Actualizar producto
const updateProducto = (req, res) => {
  const { id } = req.params;
  const campos = req.body;

  if (!id || isNaN(id)) return res.status(400).json({ error: "ID inválido" });
  if (Object.keys(campos).length === 0) return res.status(400).json({ error: "No hay campos para actualizar" });

  const keys = Object.keys(campos);
  const values = Object.values(campos);
  const setClause = keys.map(k => `${k} = ?`).join(", ");

  db.query(
    `UPDATE productos SET ${setClause} WHERE id = ?`,
    [...values, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error al actualizar producto" });
      if (result.affectedRows === 0) return res.status(404).json({ error: "Producto no encontrado" });

      res.json({ message: "Producto actualizado correctamente" });
    }
  );
};

// 🔹 Eliminar producto
const deleteProducto = (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  db.query("DELETE FROM productos WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error al eliminar producto" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Producto no encontrado" });

    res.json({ message: "Producto eliminado correctamente" });
  });
};

module.exports = {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
};
