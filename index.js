const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');
const { Routes } = require('react-router-dom');
const { CORS_ORIGIN } = process.env;
const warehousesRoutes = require('./routes/warehouses');

app.use(cors({ ORIGIN: CORS_ORIGIN }))

app.use('/', warehousesRoutes);
app.use(express.json());


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });


  