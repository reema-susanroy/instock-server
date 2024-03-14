const knex = require("knex")(require("../knexfile"));
const validator = require('email-validator');

const findOne = async (req, res) => {
    try {
      const warehouseFound = await knex("warehouses")
        .where({ id: req.params.id });
  
      if (warehouseFound.length === 0) {
        return res.status(404).json({
          message: `Warehouse with ID ${req.params.id} not found` 
        });
      }
  
      const warehouseData = warehouseFound[0];
      res.status(200).json(warehouseData);
    } catch (error) {
      res.status(500).json({
        message: `Unable to retrieve warehouse data for warehouse with ID ${req.params.id}`,
      });
    }
  };

const getWarehouses = async (_req, res) => {
  try {
    const warehousesFromDatabase = await knex("warehouses");
    res.json(warehousesFromDatabase);
  } catch (error) {
    res.status(500).send("Error with database");
  }
};

 // Validate warehouse data
const validateWarehouseData = (data) => {
  const {
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_position,
    contact_phone,
    contact_email
  } = data;

  if (!warehouse_name || !address || !city || !country ||
    !contact_name || !contact_position || !contact_phone || !contact_email) {
    console.log('All fields are required.');
    return false;
  }
 

  // Validate phone number using regex
  const phoneNumberRegex = /^\+\d{1,3}\s?\(?\d{1,3}\)?[\s-]?\d{1,4}[\s-]?\d{1,9}$/;
  if (!phoneNumberRegex.test(contact_phone)) {
    console.log('Invalid phone number.');
    console.log(contact_phone);
    return false;
  }


  // Validate email
  if (!validator.validate(contact_email)) {
    console.log('Invalid email address.');
    return false;
  }

  return true;
};

// Update warehouse by ID
const update = async (req, res) => {
  try {
    const isValid = validateWarehouseData(req.body);
    if (!isValid) {
      return res.status(400).json({ message: `Invalid data for warehouse with ID ${req.params.id}` });
    }

    const rowsUpdated = await knex('warehouses')
      .where({ id: req.params.id })
      .update(req.body);

    if (rowsUpdated === 0) {
      return res.status(404).json({ 
        message: `Warehouse with ID ${req.params.id} not found` 
      });
    }

    const updatedWarehouse = await knex('warehouses')
      .where({ id: req.params.id });

    res.status(200).json(updatedWarehouse[0]);
  } catch (error) {
    console.error('Error updating warehouse:', error);
    res.status(500).json({ message: `Unable to update warehouse with ID ${req.params.id}` });
  }
};

module.exports = {
  findOne,
  getWarehouses,
  update,
}
