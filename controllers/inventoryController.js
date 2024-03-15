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

const deleteInventory = async (req, res) => {
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
      message: `Unable to delete Inventory ${error}`,
    });
  }
};

module.exports = {
  getInventories,
  deleteInventory
};
