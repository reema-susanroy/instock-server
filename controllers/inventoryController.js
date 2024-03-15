const knex = require("knex")(require("../knexfile"));

// API to GET Inventories for a Given Warehouse
const getInventories = async (req, res) => {
  try {
      const inventoriesFromDatabase = await knex("inventories")
      .select("inventories.*", "warehouses.id as warehouse_id")
      .join("warehouses", "warehouses.id", "inventories.warehouse_id")
      .where({ "warehouses.id": req.params.id });
      res.json(inventoriesFromDatabase);
  } catch (error) {
    res.status(404).json("Error with database");
  }
};


const findOneInventory = async (req, res) => {
  try {
    const inventoryFound = await knex("inventories")
      .join("warehouses", "warehouses.id", "inventories.warehouse_id")
      .where({ "inventories.id": req.params.id });
          // .where({id: req.params.id});

    if (inventoryFound.length === 0) {
      return res.status(404).json({
        message: `Inventory with ID ${req.params.id} not found`,
      });
    }

    const inventoryData = inventoryFound[0];
    res.status(200).json(inventoryData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve inventory data for inventory with ID ${req.params.id}`,
    });
  }
};


// API to POST/CREATE a New Inventory Item
const addInventoryItem = async (req, res) => {
  const {
    warehouse_id,
    item_name,
    description,
    category,
    status,
    quantity
  } = req.body;
  
  if (!warehouse_id || !item_name || !description || !category || !status || !quantity) {
      return res.status(400).json({ message: 'Missing properties in request body' });
  }

    const warehouseExists = await knex('warehouses').where('id', warehouse_id).first();
    if (!warehouseExists) {
        return res.status(400).json({ message: 'Warehouse does not exist' });
    }

    if (isNaN(quantity)) {
        return res.status(400).json({ message: 'Quantity must be a number' });
    }

    try {
        const [id] = await knex('inventories').insert({
            warehouse_id,
            item_name,
            description,
            category,
            status,
            quantity
        });

        const createdInventoryItem = await knex('inventories').where('id', id).first();
        res.status(201).json(createdInventoryItem);
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
  getInventories,
  addInventoryItem
};
