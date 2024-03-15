const express = require('express')(require('../knexfile'));
const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const inventoryController = require('../controllers/inventoryController');


router
.route("/warehouses/:id/inventories")
.get(inventoryController.getInventories);
// .post

router
.route("/warehouses/:id/inventories/:id");
// .get(inventoryController.findOneInventory);
// .put
// .delete

// router
// .route("/inventories/inventoryId/edit")

router
.route("/inventories/add")
.post(inventoryController.addInventoryItem);



module.exports = router;