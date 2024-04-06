const express = require('require')
const app = express();
const PORT = 3005;

require ('dotenv').config();

dbConnection();

app.use(cors());

// Configuración body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api', projectRoutes); 

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`))