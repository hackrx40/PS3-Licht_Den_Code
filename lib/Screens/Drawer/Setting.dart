import 'package:adaptive_theme/adaptive_theme.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:settings_ui/settings_ui.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Setting extends StatefulWidget {
  const Setting({Key? key}) : super(key: key);

  @override
  State<Setting> createState() => _SettingState();
}

class _SettingState extends State<Setting> {
  bool? dark;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getDark();
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
          appBar: AppBar(
            title: const Text("Settings"),
            backgroundColor: Colors.black,
          ),
          body: FutureBuilder(
            future: getDark(),
            builder: (context, snapshot) => SettingsList(sections: [
              SettingsSection(
                  title: const Text(
                    "Appearance",
                    style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.w700,
                        color: Colors.black),
                  ),
                  tiles: <SettingsTile>[
                    SettingsTile.switchTile(
                      initialValue: dark ?? false,
                      leading: const Icon(Icons.dark_mode_outlined),
                      title: const Text("Dark theme"),
                      onToggle: (value) async {
                        var prefs = await SharedPreferences.getInstance();
                        await prefs.setBool('dark', value);
                        if (kDebugMode) {
                          print(dark);
                        }
                        setState(() {
                          value
                              ? AdaptiveTheme.of(context).setDark()
                              : AdaptiveTheme.of(context).setLight();
                          dark = value;
                        });
                      },
                    ),
                    SettingsTile(
                      leading: const Icon(Icons.display_settings),
                      title: const Text('Display'),
                    ),
                  ]),
              SettingsSection(
                  title: const Text(
                    "Privacy",
                    style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.w700,
                        color: Colors.black),
                  ),
                  tiles: <SettingsTile>[
                    SettingsTile(
                      leading: const Icon(Icons.privacy_tip_outlined),
                      title: const Text("Permissions"),
                    ),
                    SettingsTile(
                      leading: const Icon(Icons.security_outlined),
                      title: const Text('Security'),
                    ),
                  ]),
              SettingsSection(
                  title: const Text(
                    "Accounts",
                    style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.w700,
                        color: Colors.black),
                  ),
                  tiles: <SettingsTile>[
                    SettingsTile(
                      leading:
                          const Icon(Icons.supervised_user_circle_outlined),
                      title: const Text("Multiple Users"),
                    ),
                    SettingsTile(
                      leading: const Icon(Icons.feedback_outlined),
                      title: const Text('Feedback'),
                    ),
                  ]),
            ]),
          )),
    );
  }

  Future<void> getDark() async {
    var prefs = await SharedPreferences.getInstance();
    dark = prefs.getBool('dark');
    if (kDebugMode) {
      print(dark);
    }
  }
}
