const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.use(express.json());


router
    .route("/api/warehouses")
    .get
    .post

router
    .route("/api/warehouses/:id")
    .get
    .put
    .delete

    

// router
//     .route("/warehouses/:warehouseId/edit")
//     .put

//     router
//     .route("/warehouses/:warehouseId/add")
//     .post



module.exports = router;