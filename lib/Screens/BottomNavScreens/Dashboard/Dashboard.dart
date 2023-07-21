import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:stockwatch/Screens/BottomNavScreens/Dashboard/CarouselCard.dart';
import 'package:stockwatch/Screens/BottomNavScreens/Dashboard/StockTickerCard.dart';

class Dashboard extends StatefulWidget {
  const Dashboard({Key? key}) : super(key: key);

  @override
  State<Dashboard> createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {
  List<String> lst = const [
    "BHARTIARTL",
    "POWERGRID",
    "ICICIBANK",
    "ASIANPAINT",
    "BRITANNIA",
    "INFY",
    "NTPC",
    "CIPLA",
    "ONGC",
    "HDFCBANK",
    "SUNPHARMA",
    "EICHERMOT",
    "TECHM",
    "M&M",
    "AXISBANK",
    "RELIANCE",
    "WIPRO",
    "HINDALCO",
    "HINDUNILVR",
    "SBILIFE",
    "ULTRACEMCO",
    "APOLLOHOSP",
    "HDFC",
    "BAJAJFINSV",
    "COALINDIA",
    "DRREDDY",
    "ITC",
    "HEROMOTOCO",
    "DIVISLAB",
    "GRASIM",
    "HCLTECH",
    "TCS",
    "UPL",
    "KOTAKBANK",
    "TATACONSUM",
    "INDUSINDBK",
    "JSWSTEEL",
    "LT",
    "SBIN",
    "TATAMOTORS",
    "HDFCLIFE",
    "MARUTI",
    "BPCL",
    "TITAN",
    "BAJFINANCE",
    "ADANIPORTS",
    "NESTLEIND",
    "TATASTEEL",
    "ADANIENT",
    "BAJAJ-AUTO"
  ];
  List<String> companyNames = [
    "Bharti Airtel Limited",
    "Power Grid Corporation of India",
    "ICICI Bank Limited",
    "Asian Paints Limited",
    "Britannia Industries Limited",
    "Infosys Limited",
    "NTPC Limited",
    "Cipla Limited",
    "Oil and Natural Gas Corporation Limited",
    "HDFC Bank Limited",
    "Sun Pharmaceutical Industries Limited",
    "Eicher Motors Limited",
    "Tech Mahindra Limited",
    "Mahindra & Mahindra Limited",
    "Axis Bank Limited",
    "Reliance Industries Limited",
    "Wipro Limited",
    "Hindalco Industries Limited",
    "Hindustan Unilever Limited",
    "SBI Life Insurance Company Limited",
    "UltraTech Cement Limited",
    "Apollo Hospitals Enterprise Limited",
    "Housing Development Finance Corporation Limited",
    "Bajaj Finserv Limited",
    "Coal India Limited",
    "Dr. Reddy's Laboratories Limited",
    "ITC Limited",
    "Hero MotoCorp Limited",
    "Divi's Laboratories Limited",
    "Grasim Industries Limited",
    "HCL Technologies Limited",
    "Tata Consultancy Services Limited",
    "UPL Limited",
    "Kotak Mahindra Bank Limited",
    "Tata Consumer Products Limited",
    "IndusInd Bank Limited",
    "JSW Steel Limited",
    "Larsen & Toubro Limited",
    "State Bank of India",
    "Tata Motors Limited",
    "HDFC Life Insurance Company Limited",
    "Maruti Suzuki India Limited",
    "Bharat Petroleum Corporation Limited",
    "Titan Company Limited",
    "Bajaj Finance Limited",
    "Adani Ports and Special Economic Zone Limited",
    "Nestlé India Limited",
    "Tata Steel Limited",
    "Adani Enterprises Limited",
    "Bajaj Auto Limited",
  ];
  List<String> yahooFinanceNames = [
    "BRTI.NS",
    "POWERGRID.NS",
    "ICICIBANK.NS",
    "ASIANPAINT.NS",
    "BRITANNIA.NS",
    "INFY.NS",
    "NTPC.NS",
    "CIPLA.NS",
    "ONGC.NS",
    "HDFCBANK.NS",
    "SUNPHARMA.NS",
    "EICHERMOT.NS",
    "TECHM.NS",
    "M&M.NS",
    "AXISBANK.NS",
    "RELIANCE.NS",
    "WIPRO.NS",
    "HINDALCO.NS",
    "HINDUNILVR.NS",
    "SBILIFE.NS",
    "ULTRACEMCO.NS",
    "APOLLOHOSP.NS",
    "HDFC.NS",
    "BAJAJFINSV.NS",
    "COALINDIA.NS",
    "DRREDDY.NS",
    "ITC.NS",
    "HEROMOTOCO.NS",
    "DIVISLAB.NS",
    "GRASIM.NS",
    "HCLTECH.NS",
    "TCS.NS",
    "UPL.NS",
    "KOTAKBANK.NS",
    "TATACONSUM.NS",
    "INDUSINDBK.NS",
    "JSWSTEEL.NS",
    "LT.NS",
    "SBIN.NS",
    "TATAMOTORS.NS",
    "HDFCLIFE.NS",
    "MARUTI.NS",
    "BPCL.NS",
    "TITAN.NS",
    "BAJFINANCE.NS",
    "ADANIPORTS.NS",
    "NESTLEIND.NS",
    "TATASTEEL.NS",
    "ADANIENT.NS",
    "BAJAJ-AUTO.NS",
  ];

  @override
  Widget build(BuildContext context) {
    var height = MediaQuery.of(context).size.height;
    var width = MediaQuery.of(context).size.width;

    return Stack(
      children: [
        Container(
          height: MediaQuery.of(context).size.height,
          color: Colors.blueGrey[900],
        ),
        Padding(
          padding: EdgeInsets.only(top: height / 2.7),
          child: Container(
            width: width,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [
                    Colors.blueGrey[400]!,
                    Colors.white,
                  ]),
              borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(20), topRight: Radius.circular(20)),
            ),
            child: Padding(
              padding: const EdgeInsets.only(
                  top: 25.0, left: 4, right: 4, bottom: 4),
              child: SingleChildScrollView(
                clipBehavior: Clip.antiAlias,
                physics: const ScrollPhysics(),
                child: Column(
                  children: [
                    const Align(
                      alignment: Alignment.topLeft,
                      child: Padding(
                        padding: EdgeInsets.all(8.0),
                        child: SizedBox(
                          child: Text(
                            "Stock Performance",
                            style: TextStyle(
                                fontFamily: "productSansReg",
                                color: Colors.black,
                                fontWeight: FontWeight.w700,
                                fontSize: 20),
                          ),
                        ),
                      ),
                    ),
                    for (int index = 1; index < 5; index++)
                      // StockTickerCard(
                      //   index: index,
                      //   tickerName: lst[index],
                      //   companyName: companyNames[index],
                      //   companyAcronym: yahooFinanceNames[index],
                      // ),
                    SizedBox(
                      height: height * (70 / 840),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            children: [
              SizedBox(
                height: height * (50 / 840),
              ),
              const Padding(
                padding: EdgeInsets.all(8.0),
                child: Text(
                  "Best performing stocks currently",
                  style: TextStyle(
                      fontFamily: "productSansReg",
                      color: Colors.white,
                      fontWeight: FontWeight.w500,
                      fontSize: 20),
                ),
              ),
              CarouselSlider.builder(
                carouselController: CarouselController(),
                itemCount: 10,
                itemBuilder:
                    (BuildContext context, int itemIndex, int pageViewIndex) {
                  return const CarouselCard(
                    stockName: "Stock Name",
                  );
                },
                options: CarouselOptions(autoPlay: true),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
