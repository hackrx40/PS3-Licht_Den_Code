import 'package:flutter/material.dart';
import 'package:percent_indicator/circular_percent_indicator.dart';

class CarouselCard extends StatefulWidget {
  const CarouselCard({Key? key, required this.stockName, required this.risk, required this.current, required this.expected})
      : super(key: key);

  final String stockName;
  final int risk, current, expected;

  @override
  State<CarouselCard> createState() => _CarouselCardState();
}

class _CarouselCardState extends State<CarouselCard> {
  @override
  Widget build(BuildContext context) {
    var height = MediaQuery.of(context).size.height;
    var width = MediaQuery.of(context).size.width;

    return Card(
      shape: RoundedRectangleBorder(
        side: const BorderSide(
          color: Colors.white,
        ),
        borderRadius: BorderRadius.circular(7.0),
      ),
      elevation: 4,
      shadowColor: Colors.black,
      child: Padding(
        padding: const EdgeInsets.all(4.0),
        child: SizedBox(
          width: double.infinity,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Padding(
                padding: const EdgeInsets.only(
                    bottom: 8.0, left: 19.0, top: 8.0, right: 8.0),
                child: Column(
                  children: [
                    Align(
                      alignment: Alignment.topLeft,
                      child: Text(
                        widget.stockName,
                        style: const TextStyle(
                            fontFamily: "productSansReg",
                            color: Colors.black,
                            fontWeight: FontWeight.w500,
                            fontSize: 20),
                      ),
                    ),
                    const Align(
                      alignment: Alignment.topLeft,
                      child: Text(
                        "Good time to enter",
                        style: TextStyle(
                            fontFamily: "productSansReg",
                            color: Colors.green,
                            fontWeight: FontWeight.w500,
                            fontSize: 14),
                      ),
                    ),
                  ],
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  CircularPercentIndicator(
                    backgroundColor: Colors.black54,
                    radius: 30.0,
                    lineWidth: 10.0,
                    animation: true,
                    percent: 0.54,
                    center: Text(
                      widget.risk.toString(),
                      style: const TextStyle(
                          fontFamily: "productSansReg",
                          fontWeight: FontWeight.bold,
                          fontSize: 12.0),
                    ),
                    footer: const Text(
                      "Risk",
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 12.0,
                        fontFamily: "productSansReg",
                      ),
                    ),
                    circularStrokeCap: CircularStrokeCap.round,
                    progressColor: Colors.black,
                  ),
                  Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Column(
                                children: [
                                  const Text("Current",
                                      style: TextStyle(
                                          fontFamily: "productSansReg",
                                          color: Colors.black,
                                          fontWeight: FontWeight.w500,
                                          fontSize: 14)),
                                  Text("Rs. ${widget.current}",
                                      style: const TextStyle(
                                          fontFamily: "productSansReg",
                                          color: Colors.black,
                                          fontWeight: FontWeight.w500,
                                          fontSize: 14)),
                                ],
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Column(
                                children: [
                                  const Text("Expected",
                                      style: TextStyle(
                                          fontFamily: "productSansReg",
                                          color: Colors.black,
                                          fontWeight: FontWeight.w500,
                                          fontSize: 14)),
                                  Text("Rs. ${widget.expected}",
                                      style: const TextStyle(
                                          fontFamily: "productSansReg",
                                          color: Colors.black,
                                          fontWeight: FontWeight.w500,
                                          fontSize: 14)),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              ElevatedButton(
                  style: ButtonStyle(
                      backgroundColor:
                          const MaterialStatePropertyAll(Colors.black),
                      shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                          RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(7.0),
                      ))),
                  onPressed: () {},
                  child: const Text("Why this stock?"))
            ],
          ),
        ),
      ),
    );
  }
}
