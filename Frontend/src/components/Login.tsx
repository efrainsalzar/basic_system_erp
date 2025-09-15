import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    console.log('[Login] Intentando login...');
    setError('');

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Error desconocido');
        console.warn('[Login] Error:', data);
        return;
      }

      console.log('[Login] Login exitoso:', data);
      // Guardar token en localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirigir al dashboard
      navigate('/home');
    } catch (err) {
      console.error('[Login] Error de conexión:', err);
      setError('Error de conexión al servidor');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />
      <button onClick={handleLogin}>Ingresar</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
