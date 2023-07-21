import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class NewsCard extends StatefulWidget {
  const NewsCard(
      {Key? key,
      required this.url,
      required this.imageUrl,
      required this.index,
      required this.name,
      required this.author,
      required this.title})
      : super(key: key);
  final String? url, imageUrl, name, author, title;
  final int index;

  @override
  State<NewsCard> createState() => _NewsCardState();
}

class _NewsCardState extends State<NewsCard> {
  @override
  Widget build(BuildContext context) {
    var height = MediaQuery.of(context).size.height;
    var width = MediaQuery.of(context).size.width;

    return Column(
      children: [
        GestureDetector(
            onTap: () {
              _makeSocialMediaRequest(widget.url);
            },
            child: Container(
              margin: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
              height: height * (220 / 804),
              width: width,
              decoration: BoxDecoration(
                  color: Colors.black,
                  borderRadius: BorderRadius.circular(7),
                  boxShadow: const [
                    BoxShadow(
                      color: Colors.black,
                      offset: Offset(
                        0.0,
                        10.0,
                      ),
                      blurRadius: 10.0,
                      spreadRadius: -6.0,
                    ),
                  ],
                  image: widget.imageUrl != null
                      ? DecorationImage(
                          colorFilter: ColorFilter.mode(
                            Colors.black.withOpacity(0.6),
                            BlendMode.multiply,
                          ),
                          image: NetworkImage(widget.imageUrl!),
                          fit: BoxFit.cover)
                      : DecorationImage(
                          colorFilter: ColorFilter.mode(
                            Colors.black.withOpacity(0.6),
                            BlendMode.multiply,
                          ),
                          image: const AssetImage('assets/images/news.jpg'),
                          fit: BoxFit.cover)),
              child: Stack(
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Padding(
                        padding: const EdgeInsets.only(
                            bottom: 50.0, top: 8, left: 8, right: 8),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            SizedBox(
                              width: width * (150 / 304),
                              child: Text(
                                widget.name != null
                                    ? widget.name!
                                    : "Publication unavailable",
                                style: const TextStyle(
                                    overflow: TextOverflow.ellipsis,
                                    color: Colors.white,
                                    fontWeight: FontWeight.w700,
                                    fontSize: 12),
                              ),
                            ),
                            SizedBox(
                              width: width * (80 / 304),
                              child: Text(
                                widget.author != null
                                    ? "By ${widget.author}"
                                    : "Author unavailable",
                                style: const TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.w700,
                                    fontSize: 12,
                                    overflow: TextOverflow.ellipsis),
                              ),
                            )
                          ],
                        ),
                      ),
                      Align(
                        child: Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 5.0),
                          child: Text(
                            widget.title!,
                            style: const TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.w700,
                                fontSize: 20),
                            textAlign: TextAlign.center,
                          ),
                        ),
                      ),
                      const Padding(
                        padding: EdgeInsets.all(8.0),
                        child: Text(
                          "Click to read more",
                          style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.w500,
                              fontSize: 14),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ))
      ],
    );
  }

  Future<void> _makeSocialMediaRequest(String? url) async {
    if (await canLaunchUrl(Uri.parse(url!))) {
      await launchUrl(Uri.parse(url), mode: LaunchMode.externalApplication);
    } else {
      throw 'Could not launch $url';
    }
  }
}
