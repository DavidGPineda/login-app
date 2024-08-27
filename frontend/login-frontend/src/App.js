import React, { useState } from 'react';
import './App.css';
import Login from './login';
import Register from './register';

function App() {
    const [isRegister, setIsRegister] = useState(false);

    return (
        <div className="App">
            <h1>Bienvenido a BISAN</h1>
            {isRegister ? <Register /> : <Login />}
            <button onClick={() => setIsRegister(!isRegister)} className='boton-reg'>
                {isRegister ? '¿Ya tienes una cuenta? Inicia Sesión' : '¿No tienes cuenta? Regístrate'}
            </button>
        </div>
    );
}

export default App;
