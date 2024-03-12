const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.use(express.json());


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



// router
// .route("/inventories/inventoryId/edit")

// router
// .route("/inventories/inventoryId/add")



module.exports = router;