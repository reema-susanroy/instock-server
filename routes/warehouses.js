const express = require('express')(require('../knexfile'));
const router = require('express').Router();
// const fs = require('fs');
// const path = require('path');

const warehouseController = require('../controllers/warehouseController');


// router
//     .route("/warehouses")
//     .get
//     .post

// router
//     .route("/warehouses/:id")
//     .get(warehouseController.findOne);
//    /* .put
//     .delete*/

    

router
    .route("/api/warehouses/:warehouseId")
    .put(warehouseController.update)

//     router
//     .route("/warehouses/:warehouseId/add")
//     .post



module.exports = router;