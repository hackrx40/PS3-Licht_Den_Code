import 'package:syncfusion_flutter_gauges/gauges.dart';
import 'package:flutter/material.dart';
import 'dart:math' as math;

class GaugueCard extends StatefulWidget {
  const GaugueCard({super.key, required this.score});
  final int score;

  @override
  State<GaugueCard> createState() => _GaugueCardState();
}

class _GaugueCardState extends State<GaugueCard> {
  @override
  Widget build(BuildContext context) {
    var height = MediaQuery.of(context).size.height;
    var width = MediaQuery.of(context).size.width;

    return SizedBox(
        height: height * (220 / 804),
        width: width * (300 / 340),
        child: Card(
            shape: RoundedRectangleBorder(
              side: const BorderSide(
                color: Colors.white,
              ),
              borderRadius: BorderRadius.circular(7.0),
            ),
            elevation: 4,
            shadowColor: Colors.black,
            child: Padding(
              padding: const EdgeInsets.only(top: 18.0),
              child: Center(
                  child: SizedBox(
                      height: height * (200 / 804),
                      width: width * (150 / 340),
                      child: SfRadialGauge(axes: <RadialAxis>[
                        RadialAxis(
                            showLabels: false,
                            minimum: 0,
                            maximum: 10,
                            radiusFactor: 1.2,
                            ranges: <GaugeRange>[
                              GaugeRange(
                                startWidth: 40,
                                endWidth: 40,
                                startValue: 0,
                                endValue: 10,
                                gradient: const SweepGradient(
                                    endAngle: math.pi,
                                    colors: [
                                      Colors.green,
                                      Colors.orange,
                                      Colors.red,
                                    ]),
                              ),
                            ],
                            pointers: <GaugePointer>[
                              NeedlePointer(
                                value: widget.score.toDouble(),
                                enableAnimation: true,
                                animationType: AnimationType.ease,
                              )
                            ],
                            annotations: <GaugeAnnotation>[
                              GaugeAnnotation(
                                  widget: SizedBox(
                                      child: Text(widget.score.toString(),
                                          style: const TextStyle(
                                              fontSize: 25,
                                              fontWeight: FontWeight.bold))),
                                  angle: 90,
                                  positionFactor: 0.5)
                            ])
                      ]))),
            )));
  }
}
