const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.use(express.json());

router
    .route("/warehouses")
    .get
    .put
    .post


router
    .route("/warehouses/:warehouseId")
    .get
    .put
    .post
    .delete

// router
//     .route("/warehouses/:warehouseId/edit")
//     .put

//     router
//     .route("/warehouses/:warehouseId/add")
//     .post


router
.route("/inventories")
.get
.put
.post
.delete

router
.route("/inventories/inventoryId")
.get
.put
.post
.delete

// router
// .route("/inventories/inventoryId/edit")

// router
// .route("/inventories/inventoryId/add")


router
.route("/warehouses/:warehouseId/inventories")


module.exports = router;