import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:stockwatch/Screens/BottomNavScreens/Recommendations/GaugeCard.dart';
import 'package:stockwatch/Screens/BottomNavScreens/Recommendations/RecommendationCard.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
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
              child: FutureBuilder<List<String>>(
                future: getRecs(),
                builder: (context, snapshot) {
                  return snapshot.data != null
                      ? Column(children: [
                        SizedBox(
                          height: 60 * (height/804),
                        ),
                          for (int index = 0; index < 5; index++)
                            GestureDetector(
                                onTap: () async {
                                  setState(() {
                                    selectedIndex = index;
                                    score = math.Random().nextInt(10);
                                  });
                                },
                                child: selectedIndex == index
                                    ? RecommendationCard(
                                        color: false,
                                        tickerName: snapshot.data![index],
                                        companyName: "Company Name",
                                      )
                                    : RecommendationCard(
                                        color: true,
                                        tickerName: snapshot.data![index],
                                        companyName: "Company Name",
                                      ))
                        ])
                      : const Align(
                          alignment: Alignment.center,
                          child: CircularProgressIndicator());
                },
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

  Future<List<String>> getRecs() async {
    List<String> list = [];
    var pref = await SharedPreferences.getInstance();
    String? token = pref.getString('token');
    String url = "https://ff0a-103-68-38-66.ngrok-free.app/stock/stockRec";
    http.Response response = await http.post(
      Uri.parse(url),
      headers: <String, String>{
        'Content-Type': 'application/json',
        'Authorization': "Bearer $token"
      },
    );
    if (kDebugMode) {
      print(response.body);
    }
    try {
      if (response.statusCode == 200) {
        var data = jsonDecode(response.body);
        if (kDebugMode) {
          print(data["rec"]);
        }
        for (String t in data["rec"]) {
          list.add(t);
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
