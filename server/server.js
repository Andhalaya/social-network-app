const express = require('express')
const app = express();
const PORT = 3023;
const authRoutes = require('./src/routes/authRoutes')
const postsRoutes = require('./src/routes/postsRoutes')
const {dbConnection} = require('./src/config/db')
const bodyParser = require('body-parser');
const cors = require('cors')


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
app.use('/posts', postsRoutes) 

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`))