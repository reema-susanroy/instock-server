const express = require('express')(require('../knexfile'));
const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const inventoryController = require('../controllers/inventoryController');


router
    .route("/warehouses/:id/inventories")
    .get(inventoryController.getInventories);

router
    .route("/inventories")
    .post(inventoryController.addInventoryItem)
    .get(inventoryController.getInventoriesList);

router
    .route("/:id")
    .get(inventoryController.getSelectedInventories)
    .put(inventoryController.updateData)
    .delete(inventoryController.deleteInventoryItem)

router
    .route("/inventories/categories")
    .get(inventoryController.getCategories);

router
    .route("/inventories/warehouses")
    .get(inventoryController.getWarehouses);

module.exports = router;