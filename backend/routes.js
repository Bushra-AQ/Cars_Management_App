const express = require("express");
const router = express.Router();
const controller = require("./controler");

//------------------------------route to fetch user------------------------------------
// router.get("/fetch", controller.fetchCars);
router.get("/", controller.fetchCars);

//------------------------------route to fetch user by id------------------------------------

router.get("/:_id", controller.fetchCarsById);
//------------------------------route to insert user------------------------------------

router.post("/", controller.insertCars);
// router.post("/insert", controller.insertCars);

//------------------------------route to update user------------------------------------

router.put("/:_id", controller.updateCars);
// router.put("/update/:_id", controller.updateCars);

//------------------------------route to delete user------------------------------------

router.delete("/:_id", controller.deleteCars);
// router.delete("/delete/:_id", controller.deleteCars);

module.exports = router;
