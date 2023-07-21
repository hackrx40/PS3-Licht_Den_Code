import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import '../../../Models/GraphModel.dart';

class GraphWidget extends StatefulWidget {
  const GraphWidget({Key? key, required this.isProfit, required this.graphData})
      : super(key: key);
  final bool isProfit;
  final List<GraphModel?>? graphData;

  @override
  State<GraphWidget> createState() => _GraphWidgetState();
}

class _GraphWidgetState extends State<GraphWidget> {
  List<FlSpot> list = [];

  @override
  Widget build(BuildContext context) {
    for (int i = 0; i < widget.graphData!.length; i++) {
      if (widget.graphData![i]!.closePrice != null) {
        list.add(
            FlSpot(i.toDouble(), widget.graphData![i]!.closePrice!.toDouble()));
      }
    }

    var height = MediaQuery.of(context).size.height;
    var width = MediaQuery.of(context).size.width;

    return Padding(
        padding: const EdgeInsets.all(8.0),
        child: SingleChildScrollView(
      
          child: SizedBox(
            height: height * (70 / 804),
            width: width * (100 / 340),
            child: AspectRatio(
              aspectRatio: 1.7,
              child: LineChart(LineChartData(
                gridData: const FlGridData(show: false),
                titlesData: const FlTitlesData(show: false),
                borderData: FlBorderData(
                  show: false,
                ),
                lineBarsData: [
                  LineChartBarData(
                    spots: list,
                    dotData: const FlDotData(show: false),
                    color: widget.isProfit ? Colors.green : Colors.red,
                    belowBarData: BarAreaData(
                      show: true,
                      color: widget.isProfit
                          ? Colors.green.withOpacity(0.3)
                          : Colors.red.withOpacity(0.3),
                    ),
                  )
                ],
              )),
            ),
          ),
        ));
  }
}
