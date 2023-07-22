class SentimentArticles {
  late List<String> titles;
  late List<String> sentiments;
  late List<String> urls;

  SentimentArticles(
      {required this.titles, required this.sentiments, required this.urls});

  SentimentArticles.fromJson(Map<String, dynamic> json) {
    titles = json['titles'].cast<String>();
    sentiments = json['sentiments'].cast<String>();
    urls = json['urls'].cast<String>();
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['titles'] = titles;
    data['sentiments'] = sentiments;
    data['urls'] = urls;
    return data;
  }
}
