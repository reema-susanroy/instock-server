const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const { CORS_ORIGIN } = process.env;
const warehousesRoutes = require('./routes/warehouses');
const inventoriesRoutes = require('./routes/inventories');

app.use(cors({ ORIGIN: CORS_ORIGIN }))
app.use(express.json());

app.use('/api/warehouses', warehousesRoutes);
app.use('/api', inventoriesRoutes);

//for inventories
app.use('/api/inventories', inventoriesRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });


