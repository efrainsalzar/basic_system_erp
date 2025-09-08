const db = require("../config/db");

const getAllClientes = (req, res) => {
  db.query("SELECT * FROM clientes", (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener clientes" });
    res.json(results);
  });
};

const getClienteById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM clientes WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener cliente" });
    res.json(results[0]);
  });
};

const createCliente = (req, res) => {
  const { nombre, tipo_cliente, contacto, direccion } = req.body;
  db.query(
    "INSERT INTO clientes (nombre, tipo_cliente, contacto, direccion) VALUES (?, ?, ?, ?)",
    [nombre, tipo_cliente, contacto, direccion],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Error al crear cliente" });
      res.json({ id: results.insertId, nombre, tipo_cliente });
    }
  );
};

const updateCliente = (req, res) => {
  const { id } = req.params;
  const { nombre, tipo_cliente, contacto, direccion } = req.body;
  db.query(
    "UPDATE clientes SET nombre=?, tipo_cliente=?, contacto=?, direccion=? WHERE id=?",
    [nombre, tipo_cliente, contacto, direccion, id],
    (err) => {
      if (err) return res.status(500).json({ error: "Error al actualizar cliente" });
      res.json({ message: "Cliente actualizado correctamente" });
    }
  );
};

const deleteCliente = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM clientes WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Error al eliminar cliente" });
    res.json({ message: "Cliente eliminado correctamente" });
  });
};

module.exports = { getAllClientes, getClienteById, createCliente, updateCliente, deleteCliente };
