import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Recuperar usuario del localStorage
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!token || !userData) {
      navigate('/login'); // Redirigir si no hay sesión
      return;
    }

    setUser(JSON.parse(userData));
    console.log('[Home] Usuario cargado:', JSON.parse(userData));
  }, [navigate]);

  const handleCompras = () => {
    console.log('[Home] Ir a Compras');
    // Aquí redirigirías o mostrarías el módulo de Compras
    navigate('/compras');
  };

  const handleVentas = () => {
    console.log('[Home] Ir a Ventas');
    // Aquí redirigirías o mostrarías el módulo de Ventas
    alert('Ir a módulo Ventas');
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard Principal</h1>

      {user && (
        <div style={{
          border: '1px solid #ccc',
          padding: 10,
          borderRadius: 8,
          marginBottom: 20,
          width: 300
        }}>
          <h3>Perfil</h3>
          <p><strong>Nombre:</strong> {user.nombre}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Rol:</strong> {user.rol}</p>
        </div>
      )}

      <div style={{ display: 'flex', gap: 20 }}>
        <button onClick={handleCompras} style={{ padding: '10px 20px' }}>Compras</button>
        <button onClick={handleVentas} style={{ padding: '10px 20px' }}>Ventas</button>
      </div>
    </div>
  );
}
