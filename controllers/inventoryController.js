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

// GET all inventories for all warehouses
//use warehouse id to get warehouse name, use where? 
const getInventoriesList = async (_req, res) => {
  try {
    const inventoriesFromDatabase = await knex("inventories")
    .select("inventories.*", "warehouses.warehouse_name")
    .join("warehouses", "inventories.warehouse_id", "warehouses.id");;
    res.json(inventoriesFromDatabase);
  } catch (error) {
    res.status(500).send("Error with database");
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

const deleteInventoryItem = async (req, res) => {
  try {
    const rowsDeleted = await knex("inventories")
          .where({id: req.params.id})
          .delete();

    if (rowsDeleted === 0) {
      return res.status(404).json({
        message: `Inventory with ID ${req.params.id} not found`,
      });
    }
    res.sendStatus(204)
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete Inventory ${error}`,})
  }
}
    


const updateData = async (req, res) => {
  console.log(req.body);

  const { warehouse_id, item_name, description, category, status, quantity } = req.body;
  const { id } = req.params;

  if (!warehouse_id || !item_name || !description || !category || !status || !quantity) {
    return res.status(400).json({ message: 'Missing properties in request body' });
  }

  const warehouseFound = await knex('warehouses').where('id', warehouse_id);
  if (warehouseFound.length === 0) {
    return res.status(400).json({ message: 'Warehouse ID does not exist' });
  }
  if (isNaN(quantity)) {
    return res.status(400).json({ message: 'Quantity must be a number' });
  }

  try {
    const updatedInventory = await knex('inventories')
      .where('id', id)
      .update(req.body);

    if (updatedInventory === 0) {
      return res.status(404).json({
        message: `Inventory item with ID ${id} not found`
      });
    }

    res.status(200).json(updatedInventory[0]);
  } catch (error) {
    console.error('Error updating inventory:', error);
    res.status(500).json({ message: `Unable to update inventory with ID ${req.params.id}` });
  }
};

const getSelectedInventories = async (req, res) => {
  try {
    const fectchInventories = await knex("inventories")
      .where({ id: req.params.id });

    if (fectchInventories.length === 0) {
      return res.status(404).json({
        message: `Inventory with ID ${req.params.id} not found`
      });
    }
    const inventoryData = fectchInventories[0];
    res.status(200).json(inventoryData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve inv data for inv with ID ${req.params.id}`,
    });
  }
};


const getCategories = async (_req, res) => {
  try {
    const foundCategories = await knex('inventories').distinct('category');
    const data = foundCategories.map(category => category.category);
    res.json(data);
  }
  catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

const getWarehouses = async (_req, res) => {
  try {
    const foundWarehouses = await knex('warehouses');
    const data = foundWarehouses.map(warehouse => warehouse.warehouse_name);
    res.json(data);
  }
  catch (error) {
    console.error('Error fetching warehouses:', error);
    throw error;
  }
}

const getQuantity = async (req, res) => {
  try {
    const quantity = await knex('inventories').select('quantity').where({ id: req.params.id });
    res.json(quantity);
  }
  catch (error) {
    console.error('Error fetching quanity:', error);
    throw error;
  }
}

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
  addInventoryItem,
  getInventories,
  updateData,
  getSelectedInventories,
  getCategories,
  getWarehouses,
  getQuantity,
  deleteInventoryItem,
  getInventoriesList
};
