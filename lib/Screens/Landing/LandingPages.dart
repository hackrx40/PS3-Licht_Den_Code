import 'package:flutter/material.dart';
import 'package:flutter_onboarding_slider/flutter_onboarding_slider.dart';
import 'package:stockwatch/Auth/Login.dart';
import 'package:stockwatch/HomePage.dart';
import 'package:stockwatch/Screens/UserPage.dart';

import 'LandingPageHelper.dart';

class LandingPage extends StatefulWidget {
  const LandingPage({Key? key}) : super(key: key);

  @override
  State<LandingPage> createState() => _LandingPageState();
}

class _LandingPageState extends State<LandingPage> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: OnBoardingSlider(
        controllerColor: Colors.black,
        headerBackgroundColor: Colors.white,
        finishButtonText: 'Get Started',
        finishButtonStyle: FinishButtonStyle(
            backgroundColor: Colors.black,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(7.0),
            )),
        onFinish: () {
          Navigator.of(context).pop();
          Navigator.of(context)
              .push(MaterialPageRoute(builder: (context) => const HomePage()));
        },
        skipTextButton: const Text(
          'Skip',
          style: TextStyle(color: Colors.black, fontFamily: "productSansReg"),
        ),
        background: const [SizedBox(), SizedBox(), SizedBox()],
        pageBodies: const [LandingPage1(), LandingPage2(), LandingPage3()],
        totalPage: 3,
        speed: 1.8,
      ),
    );
  }
}
