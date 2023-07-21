const Stock = require("../models/stocks.model");
const axios = require("axios")
const BASE_URL = "https://c71c-103-68-38-66.ngrok-free.app";

const getStocks = async (req, res) => {
  try {
    req.body.user_id = req.user._id;
    let newStock = new Stock(req.body);
    await newStock.save();
    res.status(201).json({
      message: "Stock data updated!",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const stockRec = async (req, res) => {
  try {
    const stocks = await Stock.find({ user_id: req.user._id })
    const a = stocks[0].watchlist
    console.log(stocks)
    const b = stocks[0].portfolio
    const final_list = b.concat(a)
    console.log(final_list)
    const response = await axios.post(`${BASE_URL}/cfpredict/`, {
      user_id: (stocks[0].user_id).toString(),
      n: 5,
      watchlist:final_list
    }/* , {
      headers: final_list.getHeaders
        ? final_list.getHeaders()
        : final_list.getHeaders,
    } */);
    const rec = response.data.recs;
    console.log(response.data.recs);
    res.status(200).json({
      rec
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  getStocks,
  stockRec
};
