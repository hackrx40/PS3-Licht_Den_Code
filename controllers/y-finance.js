var yahooFinance = require("yahoo-finance");

const graph = async (req, res) => {
  try {
    console.log(req.body)
    const {symbol} = req.body;
    const currentDate = new Date();
    const to = formatDate(currentDate);
    const from = formatDate(getOneMonthAgo(currentDate));
    yahooFinance.historical(
      {
        symbol:symbol,
        from,
        to,
      },
      (err, quotes) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Failed to retrieve stock data." });
        }

        const stockData = [];
        for (let i = 0; i < quotes.length; i++) {
          const date = quotes[i].date;
          const closePrice = quotes[i].close;
          stockData.push({ date, closePrice });
        }

        res.status(200).json(stockData);
      }
    );
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getOneMonthAgo(currentDate) {
  const oneMonthAgo = new Date(currentDate);
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  return oneMonthAgo;
}

module.exports = {
  graph,
};
