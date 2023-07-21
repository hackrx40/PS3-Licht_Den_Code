import 'package:flutter/material.dart';
import 'package:stockwatch/Screens/Recommendations/GaugeCard.dart';
import 'package:stockwatch/Screens/Recommendations/RecommendationCard.dart';
import 'package:syncfusion_flutter_gauges/gauges.dart';
import 'dart:math' as math;

class Recommendations extends StatefulWidget {
  const Recommendations({Key? key}) : super(key: key);

  @override
  State<Recommendations> createState() => _RecommendationsState();
}

class _RecommendationsState extends State<Recommendations> {
  int selectedIndex = 0, score = 7;

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
                  top: 20.0, left: 4, right: 4, bottom: 4),
              child: SingleChildScrollView(
                clipBehavior: Clip.antiAlias,
                physics: const ScrollPhysics(),
                child: Column(
                  children: [
                    ListView.builder(
                        shrinkWrap: true,
                        physics: const ScrollPhysics(),
                        itemCount: 5,
                        itemBuilder: (context, index) {
                          return GestureDetector(
                              onTap: () {
                                setState(() {
                                  selectedIndex = index;
                                  score = math.Random().nextInt(10);
                                });
                              },
                              child: selectedIndex == index
                                  ? const RecommendationCard(
                                      color: false,
                                      tickerName: "Stock Name",
                                      companyName: "Company Name",
                                    )
                                  : const RecommendationCard(
                                      color: true,
                                      tickerName: "Stock Name",
                                      companyName: "Company Name",
                                    ));
                        }),
                    SizedBox(
                      height: height * (70 / 840),
                    )
                  ],
                ),
              ),
            ),
          ),
        ),
        Center(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                SizedBox(
                  height: height * (50 / 840),
                ),
                const Padding(
                  padding: EdgeInsets.all(8.0),
                  child: Text(
                    "View your recommendations",
                    style: TextStyle(
                        fontFamily: "productSansReg",
                        color: Colors.white,
                        fontWeight: FontWeight.w500,
                        fontSize: 20),
                  ),
                ),
                GaugueCard(
                  score: score,
                )
              ],
            ),
          ),
        ),
      ],
    );
  }
}
