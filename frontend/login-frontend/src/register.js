import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [nombre, setnombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [id_rol, setId_rol] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/register', { nombre, apellidos, contrasena, correo, id_rol });

            // Asegúrate de que `response` y `response.data` están definidos
            if (response && response.data) {
                setMessage(response.data.message);
            } else {
                setMessage('Registro exitoso, pero la respuesta no es como se esperaba.');
            }
        } catch (error) {
            // Asegúrate de manejar los errores correctamente
            if (error.response && error.response.data) {
                setMessage('Error en el registro: ' + error.response.data);
            } else {
                setMessage('Error en el registro: ' + error.message);
            }
        }
    };

    return (
        <div>
            <h2>Registrarse</h2>
            <form onSubmit={handleRegister} className='formulario-register'>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setnombre(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Apellidos:</label>
                    <input
                        type="text"
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Correo:</label>
                    <input
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <h2>Escoge el Rol:</h2>
                    <p>Seleciona 1 para Estudiante</p>
                    <p>Seleciona 2 para Profesor</p>
                    <select
                        value={id_rol}
                        onChange={(e) => setId_rol(e.target.value)}
                        required>
                        <option>Seleciona el Rol</option>
                        <option>1</option>
                        <option>2</option>
                    </select>
                    <br></br>
                    <br></br>
                </div>
                <button type="submit" className='register'>Registrarse</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Register;
