import 'package:flutter/material.dart';
import 'package:stockwatch/Screens/Drawer.dart';
import 'package:stockwatch/Screens/News/NewsPage.dart';
import 'package:stockwatch/Screens/Profile/Profile.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'BottomNavScreens/Dashboard/Dashboard.dart';
import 'package:stockwatch/Screens/Recommendations/Recommendations.dart';

class UserPage extends StatefulWidget {
  const UserPage(
      {Key? key, required this.token, required this.email, required this.id})
      : super(key: key);

  final String token, email, id;

  @override
  State<UserPage> createState() => _UserPageState();
}

class _UserPageState extends State<UserPage> {
  int currentIndex = 1;
  final screens = [
    const Recommendations(),
    const Dashboard(),
    const Text("3"),
  ];

  @override
  Widget build(BuildContext context) {
    var height = MediaQuery.of(context).size.height;
    var width = MediaQuery.of(context).size.width;

    return SafeArea(
      child: Scaffold(
        extendBodyBehindAppBar: true,
        extendBody: true,
        appBar: AppBar(
          elevation: 0,
          backgroundColor: Colors.transparent,
          actions: [
            IconButton(
              padding: EdgeInsets.zero,
              onPressed: () {
                Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) => const FlutterNews()));
              },
              icon: Image.asset(
                'assets/images/newspap.png',
                height: 33,
                width: 33,
              ),
            ),
            IconButton(
              padding: EdgeInsets.zero,
              onPressed: () {
                Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) => const ProfilePage()));
              },
              icon: Image.asset(
                'assets/images/new_profile.png',
                height: height * (42 / 804),
                width: width * (42 / 340),
              ),
            ),
          ],
        ),
        backgroundColor: Colors.transparent,
        body: IndexedStack(
          index: currentIndex,
          children: screens,
        ),
        bottomNavigationBar: Container(
          decoration: const BoxDecoration(
            color: Colors.transparent,
          ),
          child: ClipRRect(
            borderRadius: const BorderRadius.only(
              topLeft: Radius.circular(30.0),
              topRight: Radius.circular(30.0),
            ),
            child: BottomNavigationBar(
              backgroundColor: Colors.white,
              selectedItemColor: Colors.black,
              unselectedItemColor: Colors.black,
              selectedFontSize: 18,
              unselectedFontSize: 14,
              iconSize: 27,
              showUnselectedLabels: false,
              currentIndex: currentIndex,
              onTap: (index) => setState(() {
                currentIndex = index;
              }),
              items: const [
                BottomNavigationBarItem(
                  icon: FaIcon(
                    Icons.account_balance,
                    color: Colors.black,
                  ),
                  label: "Top Stocks",
                ),
                BottomNavigationBarItem(
                  icon: Icon(
                    Icons.home_outlined,
                    color: Colors.black,
                  ),
                  label: "Home",
                ),
                BottomNavigationBarItem(
                  icon: Icon(
                    Icons.auto_graph_outlined,
                    color: Colors.black,
                  ),
                  label: "Analytics",
                ),
              ],
            ),
          ),
        ),
        drawer: const NavigationDrawer1(),
      ),
    );
  }
}
