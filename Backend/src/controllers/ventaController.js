const db = require("../config/db");

// 🔹 Obtener todas las ventas
const getAllVentas = (req, res) => {
  const sql = `
    SELECT id, cliente_id, fecha, total
    FROM ventas
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("[ERROR] al obtener ventas:", err);
      return res.status(500).json({ error: "Error al obtener ventas" });
    }

    res.json(results);
  });
};

// 🔹 Crear una nueva venta (solo cabecera)
const createVenta = (req, res) => {
  const { cliente_id } = req.body;

  if (!cliente_id) {
    return res.status(400).json({ error: "Cliente requerido" });
  }

  db.query(
    "INSERT INTO ventas (cliente_id, total) VALUES (?, 0.00)",
    [cliente_id],
    (err, result) => {
      if (err) {
        console.error("[ERROR] al crear venta:", err);
        return res.status(500).json({ error: "Error al crear venta" });
      }

      res.status(201).json({ message: "Venta creada", venta_id: result.insertId });
    }
  );
};

// 🔹 Obtener venta por ID
const getVentaById = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT v.id, v.cliente_id, v.fecha, v.total, c.nombre AS cliente_nombre
    FROM ventas v
    JOIN clientes c ON c.id = v.cliente_id
    WHERE v.id = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener venta" });
    if (results.length === 0) return res.status(404).json({ error: "Venta no encontrada" });

    res.json(results[0]);
  });
};

// 🔹 Actualizar venta (ej. cambiar cliente)
const updateVenta = (req, res) => {
  const { id } = req.params;
  const { cliente_id } = req.body;

  if (!cliente_id) {
    return res.status(400).json({ error: "Cliente requerido" });
  }

  db.query(
    "UPDATE ventas SET cliente_id = ? WHERE id = ?",
    [cliente_id, id],
    (err, result) => {
      if (err) {
        console.error("[ERROR] al actualizar venta:", err);
        return res.status(500).json({ error: "Error al actualizar venta" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Venta no encontrada" });
      }

      res.json({ message: "Venta actualizada correctamente" });
    }
  );
};

// 🔹 Eliminar venta
const deleteVenta = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM ventas WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error al eliminar venta" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Venta no encontrada" });

    res.json({ message: "Venta eliminada correctamente" });
  });
};

module.exports = {
  getAllVentas,
  createVenta,
  getVentaById,
  updateVenta,
  deleteVenta
};
