import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'dart:convert';

class TradingView extends StatefulWidget {
  const TradingView({super.key});

  @override
  State<TradingView> createState() => _TradingViewState();
}

class _TradingViewState extends State<TradingView> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
        child: Scaffold(
            body: Padding(
                padding: const EdgeInsets.all(8),
                child: InAppWebView(
                  initialOptions: InAppWebViewGroupOptions(
                    crossPlatform: InAppWebViewOptions(
                      transparentBackground: true,
                      javaScriptEnabled: true,
                    ),
                    ios: IOSInAppWebViewOptions(
                      disallowOverScroll: true,
                    ),
                  ),
                  onWebViewCreated: (InAppWebViewController controller) async {
                    controller.loadUrl(
                      urlRequest: URLRequest(
                        url: Uri.dataFromString(
                          _testCode(),
                          mimeType: 'text/html',
                          encoding: Encoding.getByName('utf-8'),
                        ),
                      ),
                    );
                  },
                ))));
  }
}

String _testCode() {
  return """
<!-- TradingView Widget BEGIN -->
<div class="tradingview-widget-container">  
  <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
  <script type="text/javascript">
  new TradingView.widget({
    "autosize": true,
    "symbol": "ONGC",
    "interval": "D",
    "timezone": "exchange",
    "theme": "dark",
    "style": "1",
    "toolbar_bg": "#ff7518",
    "hide_side_toolbar": true,
    "allow_symbol_change": true,
    "save_image": false,
    "show_popup_button": false,
    "popup_width": "1000",
    "popup_height": "650",
    "locale": "en",
    "overrides": {
      "paneProperties.background": "#ffffff",
    }
  });
  </script>
</div>
<!-- TradingView Widget END -->
""";
}
