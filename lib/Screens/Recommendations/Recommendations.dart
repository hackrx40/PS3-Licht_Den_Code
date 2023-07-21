import 'package:flutter/material.dart';

class Dashboard extends StatefulWidget {
  const Dashboard({Key? key}) : super(key: key);

  @override
  State<Dashboard> createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {
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
                  top: 25.0, left: 4, right: 4, bottom: 4),
              child: SingleChildScrollView(
                clipBehavior: Clip.antiAlias,
                physics: const ScrollPhysics(),
                child: Column(
                  children: [
                    const Align(
                      alignment: Alignment.topLeft,
                      child: Padding(
                        padding: EdgeInsets.all(8.0),
                        child: SizedBox(
                          child: Text(
                            "Stock Performance",
                            style: TextStyle(
                                fontFamily: "productSansReg",
                                color: Colors.black,
                                fontWeight: FontWeight.w700,
                                fontSize: 20),
                          ),
                        ),
                      ),
                    ),
                    for (int index = 1; index < 5; index++)
                      SizedBox(
                        height: height * (70 / 840),
                      ),
                  ],
                ),
              ),
            ),
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            children: [
              SizedBox(
                height: height * (50 / 840),
              ),
              const Padding(
                padding: EdgeInsets.all(8.0),
                child: Text(
                  "Best performing stocks currently",
                  style: TextStyle(
                      fontFamily: "productSansReg",
                      color: Colors.white,
                      fontWeight: FontWeight.w500,
                      fontSize: 20),
                ),
              ),
              Card(
                shape: RoundedRectangleBorder(
                  side: const BorderSide(
                    color: Colors.white,
                  ),
                  borderRadius: BorderRadius.circular(7.0),
                ),
                elevation: 4,
                shadowColor: Colors.black,
              )
            ],
          ),
        ),
      ],
    );
  }
}
