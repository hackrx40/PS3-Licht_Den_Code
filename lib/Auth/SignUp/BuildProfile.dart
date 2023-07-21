import 'package:flutter/material.dart';
import 'package:dropdown_search/dropdown_search.dart';
import 'package:stockwatch/Models/Utils.dart';
import 'package:stockwatch/Screens/UserPage.dart';
import 'package:youtube_player_flutter/youtube_player_flutter.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class BuildProfile extends StatefulWidget {
  const BuildProfile(
      {Key? key, required this.token, required this.email, required this.id})
      : super(key: key);

  final String token, email, id;

  @override
  State<BuildProfile> createState() => _BuildProfileState();
}

class _BuildProfileState extends State<BuildProfile> {
  final formKey = GlobalKey<FormState>();
  YoutubePlayerController youtubeController1 = YoutubePlayerController(
      initialVideoId: 'GpiM_qi5mAc',
      flags: const YoutubePlayerFlags(
          autoPlay: false,
          enableCaption: false,
          showLiveFullscreenButton: false));
  String? risk;
  List<String> watchlistHolding = [], portfolioHolding = [];

  @override
  Widget build(BuildContext context) {
    var height = MediaQuery.of(context).size.height;
    var width = MediaQuery.of(context).size.width;

    return SafeArea(
        child: Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              Colors.blueGrey[200]!,
              Colors.blueGrey[400]!,
            ]),
      ),
      child: Form(
        key: formKey,
        child: Scaffold(
          backgroundColor: Colors.transparent,
          extendBodyBehindAppBar: true,
          extendBody: true,
          appBar: AppBar(
            elevation: 0,
            backgroundColor: Colors.transparent,
            title: const Text(
              "Build your initial profile",
              style: TextStyle(
                  fontFamily: "productSansReg",
                  color: Colors.white,
                  fontWeight: FontWeight.w700),
            ),
          ),
          body: Padding(
            padding: const EdgeInsets.all(8.0),
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(
                    height: height * (120 / 804),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(12.0),
                    child: YoutubePlayer(
                      controller: youtubeController1,
                      showVideoProgressIndicator: true,
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: DropdownSearch<String>.multiSelection(
                      dropdownButtonProps:
                          const DropdownButtonProps(color: Colors.blueGrey),
                      dropdownDecoratorProps: DropDownDecoratorProps(
                        dropdownSearchDecoration: InputDecoration(
                            contentPadding: const EdgeInsets.all(13),
                            fillColor: Colors.white,
                            filled: true,
                            hintText: "Select portfolio holdings",
                            hintStyle: const TextStyle(
                              fontFamily: "productSansReg",
                              color: Colors.black,
                            ),
                            errorStyle: const TextStyle(
                                color: Colors.red,
                                fontWeight: FontWeight.w500,
                                fontFamily: "productSansReg"),
                            border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(7.0),
                                borderSide: BorderSide.none)),
                      ),
                      popupProps: PopupPropsMultiSelection.menu(
                        onItemAdded: (lst, str) {
                          portfolioHolding.add(str);
                          print(portfolioHolding);
                        },
                        onItemRemoved: (lst, str) {
                          portfolioHolding.remove(str);
                          print(portfolioHolding);
                        },
                        showSelectedItems: true,
                        showSearchBox: true,
                        searchFieldProps: const TextFieldProps(
                            style: TextStyle(
                                fontFamily: "productSansReg",
                                color: Colors.black,
                                fontSize: 14)),
                      ),
                      items: const [
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
                      ],
                      validator: (value) {
                        if (value == []) {
                          return "Enter stock(s)";
                        }
                        return null;
                      },
                      onChanged: print,
                      selectedItems: const [],
                    ),
                  ),
                  SizedBox(
                    height: height * (20 / 804),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: DropdownSearch<String>.multiSelection(
                      dropdownButtonProps:
                          const DropdownButtonProps(color: Colors.blueGrey),
                      dropdownDecoratorProps: DropDownDecoratorProps(
                        dropdownSearchDecoration: InputDecoration(
                            contentPadding: const EdgeInsets.all(13),
                            fillColor: Colors.white,
                            filled: true,
                            hintText: "Select watchlist holdings",
                            hintStyle: const TextStyle(
                              fontFamily: "productSansReg",
                              color: Colors.black,
                            ),
                            errorStyle: const TextStyle(
                                color: Colors.red,
                                fontWeight: FontWeight.w500,
                                fontFamily: "productSansReg"),
                            border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(7.0),
                                borderSide: BorderSide.none)),
                      ),
                      popupProps: PopupPropsMultiSelection.menu(
                        onItemAdded: (lst, str) {
                          watchlistHolding.add(str);
                        },
                        onItemRemoved: (lst, str) {
                          watchlistHolding.remove(str);
                        },
                        showSelectedItems: true,
                        showSearchBox: true,
                        searchFieldProps: const TextFieldProps(
                            style: TextStyle(
                                fontFamily: "productSansReg",
                                color: Colors.black,
                                fontSize: 14)),
                      ),
                      items: const [
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
                      ],
                      validator: (value) {
                        if (value == []) {
                          return "Enter stock(s)";
                        }
                        return null;
                      },
                      onChanged: print,
                      selectedItems: const [],
                    ),
                  ),
                  SizedBox(
                    height: height * (20 / 804),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: DropdownButtonFormField(
                      hint: const Text(
                        "Enter Risk",
                        style: TextStyle(
                          fontFamily: "productSansReg",
                          color: Colors.black,
                        ),
                      ),
                      items: ['Low', 'High', 'Medium'].map((e) {
                        return DropdownMenuItem(
                          value: e,
                          child: Text(e,
                              style: const TextStyle(
                                fontFamily: "productSansReg",
                                color: Colors.black,
                              )),
                        );
                      }).toList(),
                      onChanged: (val) {
                        risk = val;
                      },
                      decoration: InputDecoration(
                          errorStyle: const TextStyle(
                              color: Colors.red,
                              fontWeight: FontWeight.w500,
                              fontFamily: "productSansReg"),
                          contentPadding: const EdgeInsets.all(13),
                          fillColor: Colors.white,
                          filled: true,
                          border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(7.0),
                              borderSide: BorderSide.none)),
                      onSaved: (value) {},
                    ),
                  ),
                  const Padding(padding: EdgeInsets.all(10)),
                  SizedBox(
                      width: width * (135 / 340),
                      height: height * (40 / 804),
                      child: ElevatedButton(
                        style: ButtonStyle(
                            backgroundColor:
                                MaterialStateProperty.all(Colors.blueGrey)),
                        onPressed: () async {
                          if (formKey.currentState!.validate()) {
                            await postProfileData(risk);
                            Navigator.of(context).push(MaterialPageRoute(
                                builder: (context) => UserPage(
                                    token: widget.token,
                                    email: widget.email,
                                    id: widget.id)));
                          }
                        },
                        child: const Text(
                          "Proceed",
                          style: TextStyle(
                              fontSize: 15.0,
                              fontWeight: FontWeight.w700,
                              color: Colors.white,
                              fontFamily: "productSansReg"),
                        ),
                      )),
                ],
              ),
            ),
          ),
        ),
      ),
    ));
  }

  Future postProfileData(String? risk) async {
    List list = [];
    String url = "https://ff0a-103-68-38-66.ngrok-free.app/stock/getStocks";
    http.Response response = await http.post(Uri.parse(url),
        headers: <String, String>{
          'Content-Type': 'application/json',
        },
        body: jsonEncode(<String, dynamic>{
          "watchlist": watchlistHolding,
          "portfolio": portfolioHolding,
          "risk_profile": "$risk",
        }));
    print(response.body);
    try {
      if (response.statusCode == 201) {
        var data = jsonDecode(response.body);
        Utils.showSnackBar1(data['message']);
      } else {
        print(response.statusCode);
      }
    } catch (e) {
      print(e.toString());
    }
    return list;
  }
}
