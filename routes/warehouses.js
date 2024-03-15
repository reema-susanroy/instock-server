const express = require("express");
const router = require("express").Router();
const fs = require("fs");
const path = require("path");

const warehouseController = require("../controllers/warehouseController");

router.route("/").get(warehouseController.getWarehouses);
// .post

router
  .route("/:id")
  .get(warehouseController.findOne)
  .put(warehouseController.update);

router
  .route("/api/warehouses/:warehouseId")
  .put(warehouseController.update)
  .get(warehouseController.findOne)
  .delete(warehouseController.deleteWarehouse);
/* .put
    .delete*/

// router
//     .route("/:warehouseId/edit")
//     .put

//     router
//     .route("/:warehouseId/add")
//     .post

module.exports = router;
