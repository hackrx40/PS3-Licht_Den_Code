const Stock = require("../models/stocks.model");
const axios = require("axios")
const BASE_URL = "https://8a2d-35-230-62-233.ngrok-free.app";

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

const updateStocks = async (req, res) => {
  try {
    const user_id = req.user._id;
    const updatedData = req.body;

    // Find the existing stock record by user_id and any other criteria you have
    const existingStock = await Stock.findOneAndUpdate(
      { user_id: user_id}, // Update criteria (use your desired criteria here)
      updatedData, // Data to be updated
      { new: true, upsert: true } // Options: 'new' returns the updated document, 'upsert' creates a new document if not found
    );

    res.status(200).json({
      message: "Stock data updated!",
      updatedStock: existingStock,
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
    const b = stocks[0].portfolio
    const final_list = b.concat(a)
    const response = await axios.post(`${BASE_URL}/cfpredict/`, {
      user_id: (stocks[0].user_id).toString(),
      n: 5,
      watchlist:final_list
    }/* , {
      headers: final_list.getHeaders
        ? final_list.getHeaders()
        : final_list.getHeaders,
    } */);
    const rec = response.data;
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

const sendStocks = async (req,res) => {
  try {
    const stocks = await Stock.find({ user_id: req.user._id })
    const watchlist = stocks[0].watchlist
    const portfolio = stocks[0].portfolio
    const list1To2Mapping = {
      'BHARTIARTL': 'BRTI.NS',
      'POWERGRID': 'POWERGRID.NS',
      'ICICIBANK': 'ICICIBANK.NS',
      'ASIANPAINT': 'ASIANPAINT.NS',
      'BRITANNIA': 'BRITANNIA.NS',
      'INFY': 'INFY.NS',
      'NTPC': 'NTPC.NS',
      'CIPLA': 'CIPLA.NS',
      'ONGC': 'ONGC.NS',
      'HDFCBANK': 'HDFCBANK.NS',
      'SUNPHARMA': 'SUNPHARMA.NS',
      'EICHERMOT': 'EICHERMOT.NS',
      'TECHM': 'TECHM.NS',
      'M&M': 'M&M.NS',
      'AXISBANK': 'AXISBANK.NS',
      'RELIANCE': 'RELIANCE.NS',
      'WIPRO': 'WIPRO.NS',
      'HINDALCO': 'HINDALCO.NS',
      'HINDUNILVR': 'HINDUNILVR.NS',
      'SBILIFE': 'SBILIFE.NS',
      'ULTRACEMCO': 'ULTRACEMCO.NS',
      'APOLLOHOSP': 'APOLLOHOSP.NS',
      'HDFC': 'HDFC.NS',
      'BAJAJFINSV': 'BAJAJFINSV.NS',
      'COALINDIA': 'COALINDIA.NS',
      'DRREDDY': 'DRREDDY.NS',
      'ITC': 'ITC.NS',
      'HEROMOTOCO': 'HEROMOTOCO.NS',
      'DIVISLAB': 'DIVISLAB.NS',
      'GRASIM': 'GRASIM.NS',
      'HCLTECH': 'HCLTECH.NS',
      'TCS': 'TCS.NS',
      'UPL': 'UPL.NS',
      'KOTAKBANK': 'KOTAKBANK.NS',
      'TATACONSUM': 'TATACONSUM.NS',
      'INDUSINDBK': 'INDUSINDBK.NS',
      'JSWSTEEL': 'JSWSTEEL.NS',
      'LT': 'LT.NS',
      'SBIN': 'SBIN.NS',
      'TATAMOTORS': 'TATAMOTORS.NS',
      'HDFCLIFE': 'HDFCLIFE.NS',
      'MARUTI': 'MARUTI.NS',
      'BPCL': 'BPCL.NS',
      'TITAN': 'TITAN.NS',
      'BAJFINANCE': 'BAJFINANCE.NS',
      'ADANIPORTS': 'ADANIPORTS.NS',
      'NESTLEIND': 'NESTLEIND.NS',
      'TATASTEEL': 'TATASTEEL.NS',
      'ADANIENT': 'ADANIENT.NS',
      'BAJAJ-AUTO': 'BAJAJ-AUTO.NS'
    }
    
    function getList2FromList1(list1, mapping) {
      const list2 = list1.map((item) => {
        return mapping[item] || null; // Return the corresponding value or null if not found
      });
    
      return list2;
    }
    
    const watchlist_final = getList2FromList1(watchlist, list1To2Mapping);
    const portfolio_final = getList2FromList1(portfolio, list1To2Mapping);
    const sendStockData = {watchlist_final,portfolio_final}
    console.log(watchlist_final,portfolio_final);
    
    res.status(200).json({
      sendStockData
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

module.exports = {
  getStocks,
  updateStocks,
  sendStocks,
  stockRec
};
