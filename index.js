const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/db-config");

const app = express();

//conexion a BD
dbConnection();

// cors
app.use(cors());

// Directorio publico
app.use(express.static("public"));

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use("/api/auth", require("./routes/auth.routes"));

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running in the port ${process.env.PORT}`);
});
