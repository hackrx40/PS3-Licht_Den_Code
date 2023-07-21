var yahooFinance1 = require('yahoo-finance');
const currentDate = new Date();
const to = formatDate(currentDate);
const from = formatDate(getOneMonthAgo(currentDate));
yahooFinance1.historical({
  symbol: 'AAPL',
  from,
  to
  // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
}, function (err, quotes) {
/*     if (err) {
        console.error(err);
        return;
      }
    
      // Loop through the 'quotes' array to access each data point
      for (var i = 0; i < quotes.length; i++) {
        var date = quotes[i].date;
        var closePrice = quotes[i].close;
        console.log({date, closePrice});
      } */
})

/* function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  function getOneMonthAgo(currentDate) {
    const oneMonthAgo = new Date(currentDate);
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return oneMonthAgo;
  } */
const yahooFinance = require('yahoo-finance2').default;

const quote = await yahooFinance.quote(query,queryOptions);
const { regularMarketPrice as price, currency } = quote;

  /* yahooFinance.quote('HDFC')
    .then(quote => {
      console.log(quote);
    })
    .catch(error => {
      console.error(error);
    });
 */