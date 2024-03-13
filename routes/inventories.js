const express = require('express')(require('../knexfile'));;
const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const inventoriesController = require('../controllers/inventoriesController');

/*
router
.route("/api/inventories")
.get
.post

router
.route("/api/inventories/:id")
.get
.put
.delete

router
.route("/api/warehouses/:id/inventories")
.get

*/

// router
// .route("/inventories/inventoryId/edit")

// router
// .route("/inventories/inventoryId/add")



module.exports = router;