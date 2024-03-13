const express = require('express')(require('../knexfile'));;
const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const warehouseController = require('../controllers/warehouseController');


router
    .route("/")
    .get(warehouseController.getWarehouses)
    .post(warehouseController.newWarehouse)

router
    .route("/:id")
    .get(warehouseController.findOne);
   /* .put
    .delete*/

    

// router
//     .route("/:warehouseId/edit")
//     .put

//     router
//     .route("/:warehouseId/add")
//     .post



module.exports = router;