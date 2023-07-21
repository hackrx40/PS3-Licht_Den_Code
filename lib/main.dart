import 'package:adaptive_theme/adaptive_theme.dart';
import 'package:flutter/material.dart';
import 'package:stockwatch/Auth/Login.dart';
import 'package:stockwatch/HomePage.dart';
import 'package:stockwatch/Screens/Landing/LandingPages.dart';
import 'Models/Utils.dart';

Future main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(
    AdaptiveTheme(
      light: ThemeData(brightness: Brightness.light),
      dark: ThemeData(brightness: Brightness.dark),
      initial: AdaptiveThemeMode.light,
      builder: (theme, darkTheme) => MaterialApp(
        theme: theme,
        darkTheme: darkTheme,
        scaffoldMessengerKey: messengerKey,
        debugShowCheckedModeBanner: false,
        home: const LandingPage(),
      ),
    ),
  );
}
