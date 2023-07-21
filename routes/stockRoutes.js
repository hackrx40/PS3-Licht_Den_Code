const express = require("express");
const auth = require("../middleware/auth");
const { getStocks, stockRec } = require("../controllers/stock");

const router = express.Router();

router.post("/getStocks", auth, getStocks);
router.post("/stockRec", auth, stockRec);

module.exports = router;
