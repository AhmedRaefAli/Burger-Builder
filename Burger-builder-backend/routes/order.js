const express = require("express");

const orderControl = require("../controllers/order");
const isAuth = require('../middleware/is-auth');


const router = express.Router();

router.post('/get-orders',  isAuth , orderControl.getOrders);
//router.post("/make-order",orderControl.postOrder);
router.post('/make-order' ,  isAuth , orderControl.postOrder);

module.exports = router;