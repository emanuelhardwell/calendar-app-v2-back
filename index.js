const express = require("express");
require("dotenv").config();

const app = express();

// ruta estatica
app.use(express.static("public"));

//rutas dinamicas
app.use("/api/auth", require("./routes/auth.routes"));

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running in the port ${process.env.PORT}`);
});
