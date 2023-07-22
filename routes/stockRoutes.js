const express = require("express");
const auth = require("../middleware/auth");
const { getStocks,sendStocks, stockRec,updateStocks } = require("../controllers/stock");

const router = express.Router();

router.post("/getStocks", auth, getStocks);
router.post("/updateStocks", auth, updateStocks);
router.post("/sendStocks", auth, sendStocks);
router.post("/stockRec", auth, stockRec);

module.exports = router;
