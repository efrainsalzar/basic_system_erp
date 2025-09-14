const db = require("../config/db");

// 🔹 Obtener todos los detalles de una compra
const getDetallesByCompraId = (req, res) => {
  const compra_id = req.params.id;

  db.query(
    "SELECT * FROM detalle_compras WHERE compra_id = ?",
    [compra_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Error al obtener detalles" });
      res.json(results);
    }
  );
};

// 🔹 Agregar un detalle a una compra
const createDetalle = (req, res) => {
  const { compra_id, producto_id, cantidad } = req.body;

  if (!compra_id || !producto_id || !cantidad) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  db.query(
    "INSERT INTO detalle_compras (compra_id, producto_id, cantidad) VALUES (?, ?, ?)",
    [compra_id, producto_id, cantidad],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error al crear detalle" });
      res.status(201).json({ message: "Detalle agregado", detalle_id: result.insertId });
    }
  );
};

// 🔹 Actualizar un detalle
const updateDetalle = (req, res) => {
  const { id } = req.params;
  const { compra_id, producto_id, cantidad } = req.body;

  const campos = [];
  const values = [];

  if (compra_id) { campos.push("compra_id = ?"); values.push(compra_id); }
  if (producto_id) { campos.push("producto_id = ?"); values.push(producto_id); }
  if (cantidad) { campos.push("cantidad = ?"); values.push(cantidad); }

  if (campos.length === 0) {
    return res.status(400).json({ error: "No hay campos para actualizar" });
  }

  const sql = `UPDATE detalle_compras SET ${campos.join(", ")} WHERE id = ?`;
  values.push(id);

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: "Error al actualizar detalle" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Detalle no encontrado" });

    res.json({ message: "Detalle actualizado correctamente" });
  });
};

// 🔹 Eliminar un detalle
const deleteDetalle = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM detalle_compras WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error al eliminar detalle" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Detalle no encontrado" });

    res.json({ message: "Detalle eliminado correctamente" });
  });
};

module.exports = {
  getDetallesByCompraId,
  createDetalle,
  updateDetalle,
  deleteDetalle,
};
