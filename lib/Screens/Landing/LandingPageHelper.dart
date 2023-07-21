import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';

class LandingPage1 extends StatefulWidget {
  const LandingPage1({Key? key}) : super(key: key);

  @override
  State<LandingPage1> createState() => _LandingPage1State();
}

class _LandingPage1State extends State<LandingPage1> {
  @override
  Widget build(BuildContext context) {
    var height = MediaQuery.of(context).size.height;
    var width = MediaQuery.of(context).size.width;

    return SafeArea(
      child: Scaffold(
        body: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Lottie.asset("assets/landing1.json",
                  width: width * (400 / 340), height: height * (400 / 804)),
              const Padding(
                padding: EdgeInsets.all(10.0),
                child: Text(
                  "Welcome to the AI powered solution to your stock trading queries. Simplify your stock trading experience with StockWatch.",
                  style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: Colors.black,
                      fontFamily: "productSansReg"),
                ),
              )
            ]),
      ),
    );
  }
}

class LandingPage2 extends StatefulWidget {
  const LandingPage2({Key? key}) : super(key: key);

  @override
  State<LandingPage2> createState() => _LandingPage2State();
}

class _LandingPage2State extends State<LandingPage2> {
  @override
  Widget build(BuildContext context) {
    var height = MediaQuery.of(context).size.height;
    var width = MediaQuery.of(context).size.width;

    return SafeArea(
      child: Scaffold(
        body: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Lottie.asset("assets/landing2.json",
                  width: width * (400 / 340), height: height * (400 / 804)),
              const Padding(
                padding: EdgeInsets.all(10.0),
                child: Text(
                  "Sit back, put your feet up while our state-of-the-art algorithms improve your portfolio (and profits) as per your needs.",
                  style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: Colors.black,
                      fontFamily: "productSansReg"),
                ),
              )
            ]),
      ),
    );
  }
}

class LandingPage3 extends StatefulWidget {
  const LandingPage3({Key? key}) : super(key: key);

  @override
  State<LandingPage3> createState() => _LandingPage3State();
}

class _LandingPage3State extends State<LandingPage3> {
  @override
  Widget build(BuildContext context) {
    var height = MediaQuery.of(context).size.height;
    var width = MediaQuery.of(context).size.width;

    return SafeArea(
      child: Scaffold(
        body: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Lottie.asset("assets/landing3.json",
                  width: width * (400 / 340), height: height * (400 / 804)),
              const Padding(
                padding: EdgeInsets.all(10.0),
                child: Text(
                  "A few clicks to get various insights on how to navigate the maze of the market. Doesn't sound too bad, does it?",
                  style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: Colors.black,
                      fontFamily: "productSansReg"),
                ),
              )
            ]),
      ),
    );
  }
}
