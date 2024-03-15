const knex = require("knex")(require("../knexfile"));

const getInventories = async (req, res) => {
  try {
    const inventoriesFromDatabase = await knex("inventories")
      .join("warehouses", "warehouses.id", "inventories.warehouse_id")
      .select("inventories.*", "warehouses.id as warehouse_id")
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



const updateData = async (req, res) => {
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

    // const responseData = {
    //   inventoryData: inventoryData,
    //   categories: categories,
    //   warehouses: warehouses
    // };
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
    const data= foundCategories.map(category => category.category);
    res.json(data);
  }
    catch (error) {
      console.error('Error fetching categories:', error);
      throw error; // Handle error appropriately
    }
}

const getWarehouses = async (_req, res) => {
  try {
    const foundWarehouses = await knex('warehouses');
    const data= foundWarehouses.map(warehouse => warehouse.warehouse_name);
    res.json(data);  
  }
    catch (error) {
      console.error('Error fetching warehouses:', error);
      throw error; // Handle error appropriately
    }
}

module.exports = {
  getInventories,
  updateData,
  getSelectedInventories,
  getCategories,
  getWarehouses
};
