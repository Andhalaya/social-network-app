const express = require('express')
const app = express();
const PORT = 3023;
const authRoutes = require('./src/routes/authRoutes')
const {dbConnection} = require('./src/config/db')
const bodyParser = require('body-parser');
const cors = require('cors')
const session = require('express-session')
const {hashedSecret} = require('./src/crypto/config');

require ('dotenv').config();

dbConnection();

app.use(cors());

// Configuración body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(
//     session({
//         secret: hashedSecret,
//         resave: false,
//         saveUninitialized: true,
//         cookie: { secure: false }
//  })
// );


app.use('/auth', authRoutes); 

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`))