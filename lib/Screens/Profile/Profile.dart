import 'package:flutter/material.dart';

import '../BottomNavScreens/Dashboard/StockTickerCard.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({Key? key}) : super(key: key);

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  @override
  Widget build(BuildContext context) {
    var height = MediaQuery.of(context).size.height;
    var width = MediaQuery.of(context).size.width;

    return SafeArea(
        child: Scaffold(
      backgroundColor: Colors.transparent,
      extendBodyBehindAppBar: true,
      extendBody: true,
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.transparent,
      ),
      body: Stack(
        children: [
          Container(
            height: height,
            color: Colors.blueGrey[900],
            child: Padding(
              padding: const EdgeInsets.only(top: 76.0, left: 40, bottom: 600),
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Stack(children: [
                      CircleAvatar(
                        backgroundColor: Colors.transparent,
                        radius: 40,
                        child: Image.asset(
                          "assets/images/new_profile.png",
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(left: 40),
                        child: Align(
                          alignment: Alignment.bottomRight,
                          child: IconButton(
                              onPressed: () {},
                              icon: Icon(
                                Icons.edit,
                                color: Colors.blueGrey[300],
                                size: 34,
                              )),
                        ),
                      ),
                    ]),
                    const Padding(
                      padding: EdgeInsets.only(left: 20),
                      child: Text(
                        "Your Watchlist",
                        style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.w700,
                            fontSize: 24),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          Padding(
              padding: EdgeInsets.only(top: height / 4),
              child: Container(
                height: height,
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
                      topLeft: Radius.circular(20),
                      topRight: Radius.circular(20)),
                ),
                child: Padding(
                  padding: const EdgeInsets.only(
                      top: 25.0, left: 4, right: 4, bottom: 4),
                  child: SingleChildScrollView(
                    child: Column(
                      children: [
                        // for (int index = 0; index < 7; index++)
                        //   StockTickerCard(
                        //     index: index,
                        //     tickerName: "Ticker Name",
                        //     companyName: "Company Name",
                        //     companyAcronym: '',
                        //   ),
                      ],
                    ),
                  ),
                ),
              )),
        ],
      ),
    ));
  }
}
