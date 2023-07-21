import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:stockwatch/Models/GraphModel.dart';
import 'Graph.dart';
import 'package:shimmer/shimmer.dart';

class StockTickerCard extends StatefulWidget {
  const StockTickerCard(
      {Key? key,
      required this.index,
      required this.tickerName,
      required this.companyName,
      required this.companyAcronym})
      : super(key: key);
  final int index;
  final String tickerName, companyName, companyAcronym;

  @override
  State<StockTickerCard> createState() => _StockTickerCardState();
}

class _StockTickerCardState extends State<StockTickerCard> {
  @override
  Widget build(BuildContext context) {
    var height = MediaQuery.of(context).size.height;
    var width = MediaQuery.of(context).size.width;

    return FutureBuilder(
        future: getGraphData(widget.companyAcronym),
        builder: (context, snapshot) {
          if (snapshot.data != null) {
            return Card(
              color: Colors.black,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(7.0),
              ),
              elevation: 3,
              shadowColor: Colors.blueGrey,
              child: Row(
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      Padding(
                        padding: const EdgeInsets.only(
                            top: 8.0, bottom: 4.0, left: 8.0, right: 8.0),
                        child: SizedBox(
                          width: width * (100 / 340),
                          child: Text(
                            widget.tickerName,
                            style: const TextStyle(
                                fontFamily: "productSansReg",
                                color: Colors.white,
                                fontWeight: FontWeight.w500,
                                fontSize: 18),
                          ),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(
                            top: 4.0, bottom: 8.0, left: 8.0, right: 8.0),
                        child: SizedBox(
                          width: width * (100 / 340),
                          child: Text(
                            widget.companyName,
                            style: const TextStyle(
                                fontFamily: "productSansReg",
                                color: Color.fromARGB(179, 235, 228, 228),
                                fontWeight: FontWeight.w500,
                                fontSize: 12),
                          ),
                        ),
                      ),
                    ],
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: ((snapshot.data!.last.closePrice! -
                                    snapshot.data![snapshot.data!.length - 2]
                                        .closePrice!) /
                                snapshot.data!.last.closePrice!) >
                            0
                        ? GraphWidget(
                            isProfit: true,
                            graphData: snapshot.data,
                          )
                        : GraphWidget(
                            isProfit: false,
                            graphData: snapshot.data,
                          ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Column(
                      children: [
                        Padding(
                          padding: const EdgeInsets.only(
                              top: 8.0, bottom: 4.0, left: 4.0, right: 8.0),
                          child: Text(
                            "Rs. ${snapshot.data!.last.closePrice!.ceil().toString()}",
                            style: const TextStyle(
                                fontFamily: "productSansReg",
                                color: Colors.white,
                                fontWeight: FontWeight.w500,
                                fontSize: 18),
                          ),
                        ),
                        Container(
                          decoration: BoxDecoration(
                              color: ((snapshot.data!.last.closePrice! -
                                                  snapshot
                                                      .data![snapshot
                                                              .data!.length -
                                                          2]
                                                      .closePrice!) /
                                              snapshot.data!.last.closePrice!) *
                                          100 >
                                      0
                                  ? Colors.green
                                  : Colors.red,
                              borderRadius: BorderRadius.circular(10)),
                          child: Padding(
                            padding: const EdgeInsets.only(
                                top: 4.0, bottom: 8.0, left: 8.0, right: 8.0),
                            child: Center(
                              child: Text(
                                "${(((snapshot.data!.last.closePrice! - snapshot.data![snapshot.data!.length - 2].closePrice!) / snapshot.data!.last.closePrice!) * 100).toString().substring(0, 4)} %",
                                style: const TextStyle(
                                    fontFamily: "productSansReg",
                                    color: Colors.white,
                                    fontWeight: FontWeight.w500,
                                    fontSize: 14),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            );
          } else {
            Padding(
                padding: const EdgeInsets.all(8.0),
                child: Shimmer.fromColors(
                  baseColor: Colors.black12,
                  highlightColor: Colors.blueGrey[200]!,
                  child: Container(
                    height: height * (100 / 840),
                    width: width * (450 / 340),
                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(20.0),
                        color: Colors.blueGrey),
                  ),
                ));
          }
          return Padding(
              padding: const EdgeInsets.all(8.0),
              child: Shimmer.fromColors(
                baseColor: Colors.black12,
                highlightColor: Colors.blueGrey[200]!,
                child: Container(
                  height: height * (100 / 840),
                  width: width * (450 / 340),
                  decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(20.0),
                      color: Colors.blueGrey),
                ),
              ));
        });
  }

  Future<List<GraphModel>> getGraphData(String? tickerName) async {
    List<GraphModel> list = [];
    var response = await http.post(
      Uri.parse('https://ff0a-103-68-38-66.ngrok-free.app/yfin/graph'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode(<String, String>{
        "symbol": "$tickerName",
      }),
    );
    if (kDebugMode) {
      print(response.body);
    }
    try {
      if (response.statusCode == 200) {
        List<dynamic> jsonData = json.decode(response.body);
        for (var item in jsonData) {
          if (jsonData != []) {
            list.add(GraphModel.fromJson(item));
          }
        }
      } else {
        if (kDebugMode) {
          print(response.statusCode);
        }
      }
    } catch (e) {
      if (kDebugMode) {
        print(e.toString());
      }
    }
    return list;
  }
}
