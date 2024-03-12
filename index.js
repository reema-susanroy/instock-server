const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');
const { CORS_ORIGIN } = process.env;
const warehousesRoutes = require('./routes/warehouses');

app.use(cors({ ORIGIN: CORS_ORIGIN }))
app.use(express.json());

const warehousesRoutes = require('./routes/warehousesRoutes');
const inventoriesRoutes = require('./routes/inventoriesRoutes');

app.use('/api/warehouses', warehousesRoutes);
app.use('/api/inventories', inventoriesRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });


