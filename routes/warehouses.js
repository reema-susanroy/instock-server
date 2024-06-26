const express = require("express");
const router = require("express").Router();
const fs = require("fs");
const path = require("path");

const warehouseController = require("../controllers/warehouseController");

router.route("/").get(warehouseController.getWarehouses);
// .post

router
    .route("/")
    .get(warehouseController.getWarehouses)
    .post(warehouseController.newWarehouse)

router    
  .route("/:id")
  .get(warehouseController.findOne)
  .put(warehouseController.update)
  .delete(warehouseController.deleteWarehouse);

router
  .route("/api/warehouses/:warehouseId")
  .put(warehouseController.update)
  .get(warehouseController.findOne)
  .delete(warehouseController.deleteWarehouse);

router
  .route("/:warehouseId/add")
  .post(warehouseController.newWarehouse);


router
  .route("/name/:name")
  .get(warehouseController.getWarehouseIdByName);

router 
  .route("/id/:warehouseId")
  .get(warehouseController.getWarehouseNameById);
 

module.exports = router;
