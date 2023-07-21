import 'dart:convert';
import 'package:email_validator/email_validator.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:stockwatch/Models/SignUpModel.dart';
import 'package:stockwatch/Models/Utils.dart';
import 'package:http/http.dart' as http;
import 'dart:io';
import 'package:path_provider/path_provider.dart';
import 'package:path/path.dart';
import 'package:http_parser/http_parser.dart';
import 'package:image_picker/image_picker.dart';
import 'package:flutter/services.dart';

class SignUp extends StatefulWidget {
  const SignUp({super.key});

  @override
  State<SignUp> createState() => _SignUpState();
}

class _SignUpState extends State<SignUp> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController firstNameController = TextEditingController();
  final TextEditingController lastNameController = TextEditingController();
  final TextEditingController ageController = TextEditingController();

  String email1 = "", password1 = "", password2 = "";

  bool hidden1 = true;
  bool hidden2 = true;
  File? image;
  String? name, gender;

  final _formKey = GlobalKey<FormState>();

  @override
  void dispose() {
    emailController.dispose();
    passwordController.dispose();
    firstNameController.dispose();
    lastNameController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    var height = MediaQuery.of(context).size.height;
    var width = MediaQuery.of(context).size.width;

    return Form(
        key: _formKey,
        child: SafeArea(
          child: Center(
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
                          child: Center(
                        child: Column(children: [
                          SizedBox(
                            width: width * (20 / 340),
                            height: height * (30.0 / 804),
                          ),
                          Container(
                            padding: const EdgeInsets.only(right: 300.0),
                            child: CircleAvatar(
                              backgroundColor: Colors.white,
                              child: IconButton(
                                onPressed: () {
                                  Navigator.pop(context);
                                },
                                icon: const Icon(Icons.arrow_back_sharp),
                                color: Colors.blueGrey,
                              ),
                            ),
                          ),
                          const Padding(padding: EdgeInsets.all(20.0)),
                          Container(
                            padding: const EdgeInsets.only(top: 15),
                            child: const Text(
                              "Sign Up",
                              style: TextStyle(
                                  color: Colors.blueGrey,
                                  fontSize: 50.0,
                                  fontWeight: FontWeight.w700,
                                  fontFamily: "productSansReg"),
                            ),
                          ),
                          const Padding(padding: EdgeInsets.all(20.0)),
                          Container(
                              padding: const EdgeInsets.only(
                                  left: 35.0, right: 35.0),
                              child: Column(children: [
                                Row(
                                  children: [
                                    Expanded(
                                      child: TextFormField(
                                        keyboardType: TextInputType.name,
                                        decoration: InputDecoration(
                                            contentPadding:
                                                const EdgeInsets.all(13),
                                            fillColor: Colors.white,
                                            filled: true,
                                            hintText: "Enter First Name",
                                            hintStyle: const TextStyle(
                                                fontFamily: "productSansReg",
                                                fontWeight: FontWeight.w500,
                                                color: Colors.black),
                                            errorStyle: const TextStyle(
                                                fontFamily: "productSansReg",
                                                color: Colors.red,
                                                fontWeight: FontWeight.w500),
                                            border: OutlineInputBorder(
                                                borderRadius:
                                                    BorderRadius.circular(7.0),
                                                borderSide: BorderSide.none)),
                                        controller: firstNameController,
                                        validator: (name) {
                                          if (name == null) {
                                            return 'Enter your first name';
                                          }
                                          return null;
                                        },
                                        onSaved: (value) {},
                                      ),
                                    ),
                                    const Padding(padding: EdgeInsets.all(5.0)),
                                    Expanded(
                                      child: TextFormField(
                                        keyboardType: TextInputType.name,
                                        decoration: InputDecoration(
                                            contentPadding:
                                                const EdgeInsets.all(13),
                                            fillColor: Colors.white,
                                            filled: true,
                                            hintText: "Enter Last Name",
                                            hintStyle: const TextStyle(
                                                fontFamily: "productSansReg",
                                                fontWeight: FontWeight.w500,
                                                color: Colors.black),
                                            errorStyle: const TextStyle(
                                                fontFamily: "productSansReg",
                                                color: Colors.red,
                                                fontWeight: FontWeight.w500),
                                            border: OutlineInputBorder(
                                                borderRadius:
                                                    BorderRadius.circular(7.0),
                                                borderSide: BorderSide.none)),
                                        controller: lastNameController,
                                        validator: (name) {
                                          if (name == null) {
                                            return 'Enter your last name';
                                          }
                                          return null;
                                        },
                                        onSaved: (value) {},
                                      ),
                                    ),
                                  ],
                                ),
                                const Padding(padding: EdgeInsets.all(10.0)),
                                TextFormField(
                                  keyboardType: TextInputType.number,
                                  decoration: InputDecoration(
                                      contentPadding: const EdgeInsets.all(13),
                                      fillColor: Colors.white,
                                      filled: true,
                                      hintText: "Enter Age",
                                      hintStyle: const TextStyle(
                                          fontFamily: "productSansReg",
                                          fontWeight: FontWeight.w500,
                                          color: Colors.black),
                                      errorStyle: const TextStyle(
                                          fontFamily: "productSansReg",
                                          color: Colors.red,
                                          fontWeight: FontWeight.w500),
                                      border: OutlineInputBorder(
                                          borderRadius:
                                              BorderRadius.circular(7.0),
                                          borderSide: BorderSide.none)),
                                  controller: ageController,
                                  validator: (age) {
                                    if (age == null) {
                                      return 'Enter your age';
                                    } else if (int.parse(age) > 85) {
                                      return 'Enter a valid age';
                                    }
                                    return null;
                                  },
                                  onSaved: (value) {},
                                ),
                                const Padding(padding: EdgeInsets.all(10.0)),
                                Padding(
                                  padding: const EdgeInsets.all(2.0),
                                  child: DropdownButtonFormField(
                                    hint: const Text(
                                      "Enter Gender",
                                      style: TextStyle(
                                        fontFamily: "productSansReg",
                                        color: Colors.black,
                                      ),
                                    ),
                                    items: ['Male', 'Female', 'Other'].map((e) {
                                      return DropdownMenuItem(
                                        value: e,
                                        child: Text(e,
                                            style: const TextStyle(
                                              fontFamily: "productSansReg",
                                              color: Colors.black,
                                            )),
                                      );
                                    }).toList(),
                                    onChanged: (val) {
                                      gender = val;
                                    },
                                    decoration: InputDecoration(
                                        errorStyle: const TextStyle(
                                            color: Colors.red,
                                            fontWeight: FontWeight.w500,
                                            fontFamily: "productSansReg"),
                                        contentPadding:
                                            const EdgeInsets.all(13),
                                        fillColor: Colors.white,
                                        filled: true,
                                        border: OutlineInputBorder(
                                            borderRadius:
                                                BorderRadius.circular(7.0),
                                            borderSide: BorderSide.none)),
                                    onSaved: (value) {},
                                  ),
                                ),
                                const Padding(padding: EdgeInsets.all(10.0)),
                                TextFormField(
                                  keyboardType: TextInputType.emailAddress,
                                  decoration: InputDecoration(
                                      contentPadding: const EdgeInsets.all(13),
                                      fillColor: Colors.white,
                                      filled: true,
                                      hintText: "Enter Email",
                                      hintStyle: const TextStyle(
                                          fontFamily: "productSansReg",
                                          fontWeight: FontWeight.w500,
                                          color: Colors.black),
                                      errorStyle: const TextStyle(
                                          fontFamily: "productSansReg",
                                          color: Colors.red,
                                          fontWeight: FontWeight.w500),
                                      border: OutlineInputBorder(
                                          borderRadius:
                                              BorderRadius.circular(7.0),
                                          borderSide: BorderSide.none)),
                                  controller: emailController,
                                  validator: (email) {
                                    if (email != null &&
                                        !EmailValidator.validate(email)) {
                                      return 'Please enter a Valid Email';
                                    }
                                    return null;
                                  },
                                  onSaved: (value) {
                                    email1 = value!;
                                  },
                                ),
                                const Padding(padding: EdgeInsets.all(10.0)),
                                TextFormField(
                                  obscureText: hidden1,
                                  decoration: InputDecoration(
                                    contentPadding: const EdgeInsets.all(10),
                                    fillColor: Colors.white,
                                    filled: true,
                                    hintText: "Enter Password",
                                    hintStyle: const TextStyle(
                                        fontFamily: "productSansReg",
                                        fontWeight: FontWeight.w500,
                                        color: Colors.black),
                                    errorStyle: const TextStyle(
                                        fontFamily: "productSansReg",
                                        color: Colors.red,
                                        fontWeight: FontWeight.w500),
                                    suffix: InkWell(
                                        onTap: () {
                                          setState(() {
                                            hidden1 = !hidden1;
                                          });
                                        },
                                        child: Icon(
                                          !hidden1
                                              ? Icons.visibility
                                              : Icons.visibility_off,
                                          size: 20,
                                        )),
                                    border: OutlineInputBorder(
                                        borderRadius:
                                            BorderRadius.circular(7.0),
                                        borderSide: BorderSide.none),
                                  ),
                                  controller: passwordController,
                                  validator: (value) {
                                    if (value == null || value.isEmpty) {
                                      return 'Please enter Password';
                                    } else if (value.length < 6) {
                                      return "Enter minimum six characters";
                                    }
                                    return null;
                                  },
                                  onSaved: (value) {
                                    password1 = value!;
                                  },
                                ),
                                const Padding(padding: EdgeInsets.all(10.0)),
                                TextFormField(
                                  obscureText: hidden2,
                                  decoration: InputDecoration(
                                    contentPadding: const EdgeInsets.all(10),
                                    fillColor: Colors.white,
                                    filled: true,
                                    hintText: "Confirm Password",
                                    hintStyle: const TextStyle(
                                        fontFamily: "productSansReg",
                                        fontWeight: FontWeight.w500,
                                        color: Colors.black),
                                    errorStyle: const TextStyle(
                                        fontFamily: "productSansReg",
                                        color: Colors.red,
                                        fontWeight: FontWeight.w500),
                                    suffix: InkWell(
                                        onTap: () {
                                          setState(() {
                                            hidden2 = !hidden2;
                                          });
                                        },
                                        child: Icon(
                                          !hidden2
                                              ? Icons.visibility
                                              : Icons.visibility_off,
                                          size: 20,
                                        )),
                                    border: OutlineInputBorder(
                                        borderRadius:
                                            BorderRadius.circular(7.0),
                                        borderSide: BorderSide.none),
                                  ),
                                  onSaved: (value) {
                                    password2 = value!;
                                  },
                                  validator: (value) {
                                    if (value == null || value.isEmpty) {
                                      return 'Please confirm password';
                                    }
                                    if (password1 != password2) {
                                      return "Password doesn't match Confirm Password";
                                    }
                                    return null;
                                  },
                                ),
                                SizedBox(
                                  width: width * (20 / 340),
                                  height: height * (50.0 / 804),
                                ),
                                SizedBox(
                                    width: width * (135 / 340),
                                    height: height * (40 / 804),
                                    child: ElevatedButton(
                                      style: ButtonStyle(
                                          backgroundColor:
                                              MaterialStateProperty.all(
                                                  Colors.blueGrey),
                                          shape: MaterialStateProperty.all<
                                                  RoundedRectangleBorder>(
                                              RoundedRectangleBorder(
                                            borderRadius:
                                                BorderRadius.circular(7.0),
                                          ))),
                                      onPressed: () async {
                                        _formKey.currentState!.save();
                                        if (_formKey.currentState!.validate()) {
                                          var path = await pickImage();
                                          if (password1 == password2) {
                                            var lst = await SignUp(
                                                emailController.text.trim(),
                                                passwordController.text.trim(),
                                                firstNameController.text.trim(),
                                                lastNameController.text.trim(),
                                                path);
                                            Utils.showSnackBar1(lst[0]);
                                            Navigator.of(context).pop();
                                          }
                                        }
                                      },
                                      child: const Text(
                                        "Sign Up",
                                        style: TextStyle(
                                          fontFamily: "productSansReg",
                                          fontSize: 15.0,
                                          fontWeight: FontWeight.w700,
                                          color: Colors.white,
                                        ),
                                      ),
                                    )),
                              ]))
                        ]),
                      )))),
            ),
          ),
        ));
  }

  Future SignUp(String? email, String? password, String? first_name,
      String? last_name, File? imagePath) async {
    print(imagePath!.path);
    var headers = {
      "email": "$email",
      "password": "$password",
      "first_name": "$first_name",
      "last_name": "$last_name"
    };
    var response = http.MultipartRequest(
      'POST',
      Uri.parse('https://ff0a-103-68-38-66.ngrok-free.app/auth/signup'),
    );
    response.files.add(http.MultipartFile(
        'file', imagePath.readAsBytes().asStream(), imagePath.lengthSync(),
        filename: basename(imagePath.path),
        contentType: MediaType('multipart', 'form-data')));
    response.headers.addAll(headers);
    var res = await response.send();
    var responseBody = await res.stream.bytesToString();
    if (kDebugMode) {
      print(res.statusCode);
    }
    Map<String, dynamic> data = jsonDecode(responseBody);
    String message = SignUpModel.fromJson(data).message;
    var list = [message, res.statusCode];
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
