const express = require("express");

const ingControl = require("../controllers/ingredients");

const router = express.Router();

router.get('/get-ingredients',ingControl.getingredients);


module.exports = router;