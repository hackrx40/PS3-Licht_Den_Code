import 'dart:async';
import 'package:flutter/foundation.dart';
import 'package:stockwatch/Screens/UserPage.dart';
import 'package:stockwatch/Auth/Login.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  var tokens = [];

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: getFlagValuesSF(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(
            child: CircularProgressIndicator(),
          );
        } else if (snapshot.hasData && snapshot.data![0] == null) {
          return const Login();
        } else if (snapshot.hasData) {
          if (snapshot.data![0]) {
            return UserPage(
              token: snapshot.data![1],
              email: snapshot.data![2],
              id: snapshot.data![3],
            );
          } else {
            return const Login();
          }
        } else if (snapshot.hasError) {
          if (kDebugMode) {
            print(snapshot.error);
          }
          return const Center(
            child: Text("Error occurred"),
          );
        } else {
          return const Center(
            child: CircularProgressIndicator(),
          );
        }
      },
    );
  }
}

Future<List<dynamic>?> getFlagValuesSF() async {
  try {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? token = prefs.getString('token');
    bool? isLoggedIn = prefs.getBool('isLoggedIn');
    String? email = prefs.getString('email');
    String? id = prefs.getString('id');
    return [isLoggedIn, token, email, id];
  } catch (e) {
    if (kDebugMode) {
      print(e.toString());
    }
  }
  return null;
}
