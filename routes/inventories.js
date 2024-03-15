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


router
    .route("/:id")
    .get(inventoryController.getSelectedInventories)
    .put(inventoryController.updateData);

router
.route("/inventories/categories")
.get(inventoryController.getCategories);

router
.route("/inventories/warehouses")
.get(inventoryController.getWarehouses);

// router
// .route("/inventories/inventoryId/add")



module.exports = router;