const express = require('express')(require('../knexfile'));;
const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const warehouseController = require('../controllers/warehouseController');


router
    .route("/warehouses")
    .get(warehouseController.getWarehouses)
    .post

router
    .route("/warehouses/:id")
    .get(warehouseController.findOne);
   /* .put
    .delete*/

    

// router
//     .route("/warehouses/:warehouseId/edit")
//     .put

//     router
//     .route("/warehouses/:warehouseId/add")
//     .post



module.exports = router;