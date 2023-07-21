class GraphModel {
  String? date;
  num? closePrice;

  GraphModel({this.date, this.closePrice});

  GraphModel.fromJson(Map<String, dynamic> json) {
    date = json['date'];
    closePrice = json['closePrice'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['date'] = date;
    data['closePrice'] = closePrice;
    return data;
  }
}