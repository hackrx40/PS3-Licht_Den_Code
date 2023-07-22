import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'package:stockwatch/Models/NewsModel.dart';

class RecommendationCard extends StatefulWidget {
  const RecommendationCard({
    super.key,
    required this.tickerName,
    required this.companyName,
    required this.color,
  });
  final String tickerName, companyName;
  final bool color;

  @override
  State<RecommendationCard> createState() => _RecommendationCardState();
}

class _RecommendationCardState extends State<RecommendationCard> {
  @override
  Widget build(BuildContext context) {
    var height = MediaQuery.of(context).size.height;
    var width = MediaQuery.of(context).size.width;

    return Card(
      color: widget.color ? Colors.black : Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(7.0),
      ),
      elevation: 3,
      shadowColor: Colors.blueGrey,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Padding(
            padding: const EdgeInsets.only(
                top: 8.0, bottom: 4.0, left: 8.0, right: 8.0),
            child: SizedBox(
              width: width * (100 / 340),
              child: Text(
                widget.tickerName,
                style: TextStyle(
                    fontFamily: "productSansReg",
                    color: widget.color ? Colors.white : Colors.black,
                    fontWeight: FontWeight.w500,
                    fontSize: 18),
              ),
            ),
          ),
          if (!widget.color)
            Padding(
                padding: const EdgeInsets.only(
                    top: 4.0, bottom: 8.0, left: 8.0, right: 8.0),
                child: ElevatedButton(
                    style: ButtonStyle(
                        backgroundColor:
                            const MaterialStatePropertyAll(Colors.blueGrey),
                        shape:
                            MaterialStateProperty.all<RoundedRectangleBorder>(
                                RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(7.0),
                        ))),
                    onPressed: () async {
                      await getArticles(widget.companyName);
                    },
                    child: const Text(
                      "Know More",
                      style: TextStyle(
                          fontFamily: "productSansReg",
                          color: Colors.white,
                          fontWeight: FontWeight.w500,
                          fontSize: 14),
                    )))
        ],
      ),
    );
  }

  Future<List<String>> getRecs() async {
    List<String> list = [];
    var pref = await SharedPreferences.getInstance();
    String? token = pref.getString('token');
    String url = "https://ff0a-103-68-38-66.ngrok-free.app/sentiment";
    http.Response response = await http.post(
      Uri.parse(url),
      headers: <String, String>{
        'Content-Type': 'application/json',
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

  Future<List<dynamic>> getArticles(String name) async {
    List<String> list1 = [], list2 = [];
    var pref = await SharedPreferences.getInstance();
    String? token = pref.getString('token');
    String url = "https://e8f2-35-230-62-233.ngrok-free.app/sentiment";
    http.Response response = await http.post(Uri.parse(url),
        headers: <String, String>{
          'Content-Type': 'application/json',
        },
        body: jsonEncode(<String, String>{'bank_name': "$name"}));
    if (kDebugMode) {
      print(response.body);
    }
    try {
      if (response.statusCode == 200) {
        var data = jsonDecode(response.body);
        Articles x = Articles.fromJson(data);
        if (kDebugMode) {
          print(x.title);
        }
        for (String t in data["rec"]) {
          list1.add(t);
        }
        for (String t in data["scores"]) {
          list2.add(t);
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
    return [list1, list2];
  }
}
