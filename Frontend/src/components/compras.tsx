import { useState, useEffect } from 'react';

interface Proveedor {
  id?: number;
  nombre: string;
  contacto: string;
  direccion: string;
  creado_en?: string;
}

export default function Compras() {
  const [proveedor, setProveedor] = useState<Proveedor>({
    nombre: '',
    contacto: '',
    direccion: ''
  });

  const [proveedores, setProveedores] = useState<Proveedor[]>([]);

  // Simulación de fetch desde backend
  useEffect(() => {
    fetch('http://localhost:3000/api/proveedores')
      .then(res => res.json())
      .then(data => setProveedores(data))
      .catch(err => console.error('Error fetching proveedores:', err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProveedor(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[Compras] Enviar proveedor:', proveedor);

    // Aquí harías POST a backend
    // fetch('http://localhost:3000/api/proveedores', {...})
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Formulario de Proveedor</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 300 }}>
        <input
          type="text"
          placeholder="Nombre"
          name="nombre"
          value={proveedor.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Contacto"
          name="contacto"
          value={proveedor.contacto}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Dirección"
          name="direccion"
          value={proveedor.direccion}
          onChange={handleChange}
          required
        />
        <button type="submit">Guardar Proveedor</button>
      </form>

      <h3 style={{ marginTop: 30 }}>Proveedores Registrados</h3>
      <ul>
        {proveedores.map(p => (
          <li key={p.id}>{p.nombre} - {p.contacto} - {p.direccion}</li>
        ))}
      </ul>
    </div>
  );
}
