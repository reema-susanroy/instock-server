const express = require('express');
const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const warehouseController = require('../controllers/warehouseController');


router
    .route("/")
    .get(warehouseController.getWarehouses);
    // .post

router
    .route("/:id")
<<<<<<< HEAD
    .get(warehouseController.findOne)
    .put(warehouseController.update)

=======
<<<<<<< HEAD
    .get(warehouseController.findOne);

router
.route("/api/warehouses/:warehouseId")
.put(warehouseController.update)
=======
    .get(warehouseController.findOne)
    .delete(warehouseController.deleteWarehouse);
   /* .put
    .delete*/
>>>>>>> 716192339c5b643464d6dd5f6f78c16f167fa6fe
>>>>>>> develop

    

// router
//     .route("/:warehouseId/edit")
//     .put

//     router
//     .route("/:warehouseId/add")
//     .post



module.exports = router;