const db = require("../config/db");

// 🔹 Obtener todas las compras
const getAllCompras = (req, res) => {
  const sql = `
    SELECT c.id, c.proveedor_id, c.fecha, c.total, p.nombre AS proveedor_nombre
    FROM compras c
    JOIN proveedores p ON p.id = c.proveedor_id
    ORDER BY c.id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("[ERROR] al obtener compras:", err);
      return res.status(500).json({ error: "Error al obtener compras" });
    }

    res.json(results);
  });
};

// 🔹 Crear una nueva compra (solo cabecera)
const createCompra = (req, res) => {
  const { proveedor_id } = req.body;

  if (!proveedor_id) {
    return res.status(400).json({ error: "Proveedor requerido" });
  }

  db.query(
    "INSERT INTO compras (proveedor_id, total) VALUES (?, 0.00)",
    [proveedor_id],
    (err, result) => {
      if (err) {
        console.error("[ERROR] al crear compra:", err);
        return res.status(500).json({ error: "Error al crear compra" });
      }

      res.status(201).json({ message: "Compra creada", compra_id: result.insertId });
    }
  );
};

// 🔹 Obtener compra por ID
const getCompraById = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT c.id, c.proveedor_id, c.fecha, c.total, p.nombre AS proveedor_nombre
    FROM compras c
    JOIN proveedores p ON p.id = c.proveedor_id
    WHERE c.id = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener compra" });
    if (results.length === 0) return res.status(404).json({ error: "Compra no encontrada" });

    res.json(results[0]);
  });
};

// 🔹 Actualizar compra (ej. cambiar proveedor)
const updateCompra = (req, res) => {
  const { id } = req.params;
  const { proveedor_id } = req.body;

  if (!proveedor_id) {
    return res.status(400).json({ error: "Proveedor requerido" });
  }

  db.query(
    "UPDATE compras SET proveedor_id = ? WHERE id = ?",
    [proveedor_id, id],
    (err, result) => {
      if (err) {
        console.error("[ERROR] al actualizar compra:", err);
        return res.status(500).json({ error: "Error al actualizar compra" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Compra no encontrada" });
      }

      res.json({ message: "Compra actualizada correctamente" });
    }
  );
};

// 🔹 Eliminar compra
const deleteCompra = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM compras WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error al eliminar compra" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Compra no encontrada" });

    res.json({ message: "Compra eliminada correctamente" });
  });
};

module.exports = {
  getAllCompras,
  createCompra,
  getCompraById,
  updateCompra,
  deleteCompra
};
