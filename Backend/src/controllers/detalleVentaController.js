const db = require("../config/db");

// 🔹 Obtener todos los detalles de una venta
const getDetallesByVentaId = (req, res) => {
  const venta_id = req.params.id;

  const sql = `
    SELECT id, venta_id, cantidad, producto_id FROM detalle_ventas
    WHERE venta_id = ?
  `;

  db.query(sql, [venta_id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener detalles de la venta" });
    res.json(results);
  });
};

// 🔹 Agregar un detalle a una venta
const createDetalleVenta = (req, res) => {
  const { venta_id, producto_id, cantidad } = req.body;

  if (!venta_id || !producto_id || !cantidad) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  db.query(
    "INSERT INTO detalle_ventas (venta_id, producto_id, cantidad) VALUES (?, ?, ?)",
    [venta_id, producto_id, cantidad],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error al crear detalle de venta" });
      res.status(201).json({ message: "Detalle agregado", detalle_id: result.insertId });
    }
  );
};

// 🔹 Actualizar un detalle de venta
const updateDetalleVenta = (req, res) => {
  const { id } = req.params;
  const { venta_id, producto_id, cantidad } = req.body;

  const campos = [];
  const values = [];

  if (venta_id) { campos.push("venta_id = ?"); values.push(venta_id); }
  if (producto_id) { campos.push("producto_id = ?"); values.push(producto_id); }
  if (cantidad) { campos.push("cantidad = ?"); values.push(cantidad); }

  if (campos.length === 0) {
    return res.status(400).json({ error: "No hay campos para actualizar" });
  }

  const sql = `UPDATE detalle_ventas SET ${campos.join(", ")} WHERE id = ?`;
  values.push(id);

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: "Error al actualizar detalle de venta" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Detalle no encontrado" });

    res.json({ message: "Detalle de venta actualizado correctamente" });
  });
};

// 🔹 Eliminar un detalle de venta
const deleteDetalleVenta = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM detalle_ventas WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error al eliminar detalle de venta" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Detalle no encontrado" });

    res.json({ message: "Detalle de venta eliminado correctamente" });
  });
};

module.exports = {
  getDetallesByVentaId,
  createDetalleVenta,
  updateDetalleVenta,
  deleteDetalleVenta,
};
