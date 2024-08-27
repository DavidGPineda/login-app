import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', { correo, contrasena });
            setMessage(`Bienvenido a BISAN, ${correo}`);
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            setMessage('Usuario o contraseña incorrectos');
        }
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin} className='formulario-login'>
                <div>
                    <label>Correo</label>
                    <input
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className='login'>Inciar Sesión</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;
