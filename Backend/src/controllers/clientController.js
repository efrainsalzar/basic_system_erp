const db = require("../config/db");

// Obtener todos los clientes
const getAllClientes = (req, res) => {
  db.query(
    "SELECT id, nombre, tipo_cliente, contacto, direccion, creado_en FROM clientes",
    (err, results) => {
      if (err) {
        console.error(" Error al obtener clientes:", err);
        return res.status(500).json({ error: "Error al obtener clientes" });
      }
      console.log(" Clientes obtenidos:", results.length);
      res.json(results);
    }
  );
};

// Obtener cliente por id
const getClienteById = (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Falta el ID del cliente" });

  db.query(
    "SELECT id, nombre, tipo_cliente, contacto, direccion, creado_en FROM clientes WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error(" Error al obtener cliente:", err);
        return res.status(500).json({ error: "Error al obtener cliente" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Cliente no encontrado" });
      }
      console.log(" Cliente obtenido:", results[0]);
      res.json(results[0]);
    }
  );
};

// Crear cliente
const createCliente = (req, res) => {
  const { nombre, tipo_cliente, contacto, direccion } = req.body;

  if (!nombre || !tipo_cliente) {
    return res
      .status(400)
      .json({ error: "Los campos 'nombre' y 'tipo_cliente' son obligatorios" });
  }

  db.query(
    "INSERT INTO clientes (nombre, tipo_cliente, contacto, direccion) VALUES (?, ?, ?, ?)",
    [nombre, tipo_cliente, contacto || null, direccion || null],
    (err, results) => {
      if (err) {
        console.error(" Error al crear cliente:", err);
        return res.status(500).json({ error: "Error al crear cliente" });
      }

      db.query(
        "SELECT id, nombre, tipo_cliente, contacto, direccion, creado_en FROM clientes WHERE id = ?",
        [results.insertId],
        (err2, rows) => {
          if (err2) {
            console.error(" Error al obtener cliente creado:", err2);
            return res
              .status(500)
              .json({ error: "Error al obtener cliente creado" });
          }
          console.log(" Cliente creado:", rows[0]);
          res.status(201).json(rows[0]);
        }
      );
    }
  );
};

// Actualizar cliente
const updateCliente = (req, res) => {
  const { id } = req.params;
  const campos = req.body;

  if (!id) return res.status(400).json({ error: "Falta el ID del cliente" });
  if (Object.keys(campos).length === 0) {
    return res.status(400).json({ error: "No hay campos para actualizar" });
  }

  const keys = Object.keys(campos);
  const values = Object.values(campos);
  const setClause = keys.map((k) => `${k} = ?`).join(", ");
  const sql = `UPDATE clientes SET ${setClause} WHERE id = ?`;

  db.query(sql, [...values, id], (err, result) => {
    if (err) {
      console.error(" Error al actualizar cliente:", err);
      return res.status(500).json({ error: "Error al actualizar cliente" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    console.log(` Cliente ${id} actualizado`);
    res.json({ message: "Cliente actualizado correctamente" });
  });
};

// Eliminar cliente
const deleteCliente = (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Falta el ID del cliente" });

  db.query("DELETE FROM clientes WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error(" Error al eliminar cliente:", err);
      return res.status(500).json({ error: "Error al eliminar cliente" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    console.log(` Cliente ${id} eliminado`);
    res.json({ message: "Cliente eliminado correctamente" });
  });
};

module.exports = {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
};
