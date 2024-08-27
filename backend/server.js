const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,  
    user: 'root',
    password: 'D7711avidPineda',
    database: 'proyecto_bisan',
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
        throw err;
    }
    console.log('Conectado a la base de datos MySQL');
});


// Ruta de registro
app.post('/register', (req, res) => {
    const { nombre, apellidos, correo, contrasena, id_rol } = req.body;
    console.log('Datos recibidos:', { nombre, apellidos, correo, contrasena, id_rol});  // Log para verificar los datos recibidos

    // Validar si el usuario ya existe
    db.query('SELECT * FROM usuarios WHERE nombre = ?', [nombre], (err, result) => {
        if (err) {
            console.error('Error al buscar usuario:', err);  // Log del error al buscar usuario
            return res.status(500).send('Error en el servidor al buscar el usuario');
        }
        if (result.length > 0) {
            console.warn('Usuario ya existe:', nombre);  // Log si el usuario ya existe
            return res.status(400).send('El usuario ya existe');
        }

        // Encriptar la contraseña
        const hashedPassword = bcrypt.hashSync(contrasena, 8);
        console.log('Contraseña encriptada:', hashedPassword);  // Log para verificar la encriptación

        // Insertar el nuevo usuario en la base de datos
        db.query('INSERT INTO usuarios (nombre, apellidos, correo, contrasena, id_rol) VALUES (?, ?, ?, ?, ?)', [nombre, apellidos, correo,hashedPassword, id_rol], (err, result) => {
            if (err) {
                console.error('Error al insertar usuario:', err);  // Log del error al insertar usuario
                return res.status(500).send('Error en el servidor al insertar el usuario');
            }
            console.log('Usuario registrado con éxito:', nombre);  // Log de éxito
            res.status(200).send({ message: 'Usuario registrado con éxito' });
        });
    });
});



// Ruta de login
app.post('/login', (req, res) => {
    const { correo, contrasena } = req.body;

    // Busca al usuario por su correo
    db.query('SELECT * FROM usuarios WHERE correo = ?', [correo], (err, result) => {
        if (err) {
            console.error('Error al buscar usuario en login:', err);
            return res.status(500).send('Error en el servidor');
        }
        if (result.length === 0) {
            return res.status(404).send('Usuario no encontrado');
        }

        const user = result[0];
        const isPasswordValid = bcrypt.compareSync(contrasena, user.contrasena);

        if (!isPasswordValid) {
            return res.status(401).send('Contraseña incorrecta');
        }

        // Genera un token JWT
        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
        res.status(200).send({ auth: true, token });
    });
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
