import 'dart:convert';
import 'dart:io';
import 'package:image_picker/image_picker.dart';
import 'package:email_validator/email_validator.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:stockwatch/Auth/SignUp/BuildProfile.dart';
import 'package:stockwatch/Auth/SignUp/ForgotPassword.dart';
import 'package:stockwatch/Auth/Signup/SignUp.dart';
import 'package:http/http.dart' as http;
import 'package:stockwatch/Models/LogInModel.dart';
import 'package:stockwatch/Models/Utils.dart';
import 'package:stockwatch/Screens/UserPage.dart';
import 'package:flutter/services.dart';
import 'package:path_provider/path_provider.dart';
import 'package:path/path.dart';
import 'package:http_parser/http_parser.dart';

class Login extends StatefulWidget {
  const Login({super.key});

  @override
  State<Login> createState() => _Login();
}

class _Login extends State<Login> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  String email = "", password = "";
  bool hidden = true;
  File? image;
  String? name;

  final formKey = GlobalKey<FormState>();

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    var height = MediaQuery.of(context).size.height;
    var width = MediaQuery.of(context).size.width;

    return Form(
        key: formKey,
        child: SafeArea(
          bottom: false,
          child: Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [
                    Colors.blueGrey[200]!,
                    Colors.blueGrey[400]!,
                  ]),
            ),
            child: Scaffold(
              backgroundColor: Colors.transparent,
              body: GestureDetector(
                onTap: () {
                  FocusScopeNode currentFocus = FocusScope.of(context);

                  if (!currentFocus.hasPrimaryFocus) {
                    currentFocus.unfocus();
                  }
                },
                child: SingleChildScrollView(
                  child: Column(children: [
                    Center(
                      child: Container(
                        padding: const EdgeInsets.only(top: 100.0),
                        child: const Text(
                          "StockWatch.",
                          style: TextStyle(
                              color: Colors.blueGrey,
                              fontSize: 50.0,
                              fontWeight: FontWeight.w700,
                              fontFamily: "productSansReg"),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ),
                    const Text(
                      "Welcome to the ultimate trading app.",
                      style: TextStyle(
                          color: Colors.white,
                          fontSize: 20.0,
                          fontWeight: FontWeight.w700,
                          fontFamily: "productSansReg"),
                      textAlign: TextAlign.center,
                    ),
                    const Padding(padding: EdgeInsets.all(60.0)),
                    Container(
                        padding: const EdgeInsets.only(left: 35.0, right: 35.0),
                        child: Column(
                          children: [
                            TextFormField(
                              keyboardType: TextInputType.emailAddress,
                              decoration: InputDecoration(
                                  contentPadding: const EdgeInsets.all(13),
                                  fillColor: Colors.white,
                                  filled: true,
                                  hintText: "Email",
                                  hintStyle: const TextStyle(
                                      fontWeight: FontWeight.w500,
                                      color: Colors.black,
                                      fontFamily: "productSansReg"),
                                  errorStyle: const TextStyle(
                                      color: Colors.red,
                                      fontWeight: FontWeight.w500,
                                      fontFamily: "productSansReg"),
                                  border: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(7.0),
                                      borderSide: BorderSide.none)),
                              autovalidateMode:
                                  AutovalidateMode.onUserInteraction,
                              validator: (email) {
                                if (email != null &&
                                    !EmailValidator.validate(email)) {
                                  return 'Please enter a Valid Email';
                                }
                                return null;
                              },
                              controller: _emailController,
                              onSaved: (value) {
                                email = value!;
                              },
                            ),
                            const Padding(padding: EdgeInsets.all(10.0)),
                            TextFormField(
                              obscureText: hidden,
                              decoration: InputDecoration(
                                contentPadding: const EdgeInsets.all(10),
                                fillColor: Colors.white,
                                filled: true,
                                hintText: "Password",
                                hintStyle: const TextStyle(
                                    fontWeight: FontWeight.w500,
                                    color: Colors.black,
                                    fontFamily: "productSansReg"),
                                errorStyle: const TextStyle(
                                    color: Colors.red,
                                    fontWeight: FontWeight.w500,
                                    fontFamily: "productSansReg"),
                                suffix: InkWell(
                                  onTap: () {
                                    setState(() {
                                      hidden = !hidden;
                                    });
                                  },
                                  child: Icon(
                                    !hidden
                                        ? Icons.visibility
                                        : Icons.visibility_off,
                                    size: 20,
                                  ),
                                ),
                                border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(7.0),
                                    borderSide: BorderSide.none),
                              ),
                              autovalidateMode:
                                  AutovalidateMode.onUserInteraction,
                              validator: (value) {
                                if (value == null || value.isEmpty) {
                                  return 'Please enter Password';
                                } else if (value.length < 6) {
                                  return "Enter minimum six characters";
                                }
                                return null;
                              },
                              controller: _passwordController,
                              onSaved: (value) {
                                password = value!;
                              },
                            ),
                            SizedBox(
                              width: width * (20 / 340),
                              height: height * (30.0 / 804),
                            ),
                            SizedBox(
                                width: 135.0,
                                height: 40.0,
                                child: ElevatedButton(
                                  style: ButtonStyle(
                                      backgroundColor:
                                          MaterialStateProperty.all(
                                        Colors.blueGrey,
                                      ),
                                      shape: MaterialStateProperty.all<
                                              RoundedRectangleBorder>(
                                          RoundedRectangleBorder(
                                        borderRadius:
                                            BorderRadius.circular(7.0),
                                      ))),
                                  onPressed: () async {
                                    if (formKey.currentState!.validate()) {
                                      var path = await pickImage();
                                      var lst = await LoginGetTokens(
                                          _emailController.text.trim(),
                                          _passwordController.text.trim(),
                                          path);
                                      if (lst[3] == 200) {
                                        SharedPreferences prefs =
                                            await SharedPreferences
                                                .getInstance();
                                        prefs.setString('token', lst[2]);
                                        prefs.setString('email', lst[4]);
                                        prefs.setString('id', lst[5]);
                                        prefs.setBool('isLoggedIn', true);
                                        Navigator.of(context).pop();
                                        if (!lst[6]) {
                                          Navigator.of(context).push(
                                              MaterialPageRoute(
                                                  builder: (context) =>
                                                      UserPage(
                                                        token: lst[2],
                                                        email: lst[4],
                                                        id: lst[5],
                                                      )));
                                        } else {
                                          Navigator.of(context).push(
                                              MaterialPageRoute(
                                                  builder: (context) =>
                                                      BuildProfile(
                                                        token: lst[2],
                                                        email: lst[4],
                                                        id: lst[5],
                                                      )));
                                        }
                                        Utils.showSnackBar1(lst[0]);
                                      }
                                    }
                                  },
                                  child: const Text(
                                    "Login",
                                    style: TextStyle(
                                        fontSize: 15.0,
                                        fontWeight: FontWeight.w700,
                                        color: Colors.white,
                                        fontFamily: "productSansReg"),
                                  ),
                                )),
                            SizedBox(
                              width: width * (20 / 340),
                              height: height * (30.0 / 804),
                            ),
                            GestureDetector(
                              child: const Text(
                                "Forgot password?",
                                style: TextStyle(
                                    decoration: TextDecoration.underline,
                                    color: Colors.white,
                                    fontSize: 13.5,
                                    fontWeight: FontWeight.w700,
                                    fontFamily: "productSansReg"),
                              ),
                              onTap: () {
                                Navigator.of(context).push(MaterialPageRoute(
                                    builder: (context) =>
                                        const ForgotPassWord()));
                              },
                            ),
                            SizedBox(
                              width: width * (20 / 340),
                              height: height * (150.0 / 804),
                            ),
                            RichText(
                              text: TextSpan(
                                  text:
                                      "Haven't yet made an account? Click here to ",
                                  style: const TextStyle(
                                      color: Colors.white,
                                      fontSize: 13.5,
                                      fontWeight: FontWeight.w700,
                                      fontFamily: "productSansReg"),
                                  children: [
                                    TextSpan(
                                        recognizer: TapGestureRecognizer()
                                          ..onTap = () {
                                            Navigator.push(
                                                context,
                                                MaterialPageRoute(
                                                    builder: (context) =>
                                                        const SignUp()));
                                          },
                                        text: "Sign Up.",
                                        style: TextStyle(
                                            fontFamily: "productSansReg",
                                            decoration:
                                                TextDecoration.underline,
                                            color: Colors.blueGrey[600]!))
                                  ]),
                            ),
                          ],
                        )),
                  ]),
                ),
              ),
            ),
          ),
        ));
  }

  Future LoginGetTokens(
      String? email, String? password, File? imagePath) async {
    print(imagePath!.path);
    var headers = {
      "email": "$email",
      "password": "$password",
    };
    var response = http.MultipartRequest(
      'POST',
      Uri.parse('https://ff0a-103-68-38-66.ngrok-free.app/auth/login'),
    );
    response.files.add(http.MultipartFile(
        'file', imagePath.readAsBytes().asStream(), imagePath.lengthSync(),
        filename: basename(imagePath.path),
        contentType: MediaType('application', 'octet-stream')));
    response.headers.addAll(headers);
    var res = await response.send();
    var responseBody = await res.stream.bytesToString();
    if (kDebugMode) {
      print(responseBody);
      print(res.statusCode);
    }
    if (res.statusCode != 200) {
      Utils.showSnackBar("Error occurred! Unable to login.");
    }

    Map<String, dynamic> data = jsonDecode(responseBody);
    var stuff = LogInModel.fromJson(data);
    var list = [
      stuff.message,
      stuff.user,
      stuff.token,
      res.statusCode,
      stuff.user.email,
      stuff.user.id,
      stuff.isLoggedIn
    ];
    return list;
  }

  Future pickImage() async {
    try {
      final XFile? image = await ImagePicker().pickImage(
          source: ImageSource.camera,
          preferredCameraDevice: CameraDevice.front);
      if (image == null) return;
      File imagePath = await saveImagePermanently(image.path);
      name = image.name;
      return imagePath;
    } on PlatformException catch (e) {
      if (kDebugMode) {
        print('Failed to pick image: $e');
      }
    }
  }

  Future<File> saveImagePermanently(String path) async {
    final directory = await getApplicationDocumentsDirectory();
    final name = basename(path);
    final image = File('${directory.path}/$name');
    return File(path).copy(image.path);
  }
}
