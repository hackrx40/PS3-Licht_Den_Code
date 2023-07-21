import 'package:email_validator/email_validator.dart';
import 'package:flutter/material.dart';
import 'package:stockwatch/Models/Utils.dart';

class ForgotPassWord extends StatefulWidget {
  const ForgotPassWord({Key? key}) : super(key: key);

  @override
  State<ForgotPassWord> createState() => _ForgotPassWordState();
}

class _ForgotPassWordState extends State<ForgotPassWord> {
  final formKey = GlobalKey<FormState>();

  String email = "";

  final TextEditingController emailController = TextEditingController();
  @override
  void dispose() {
    emailController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    var height = MediaQuery.of(context).size.height;
    var width = MediaQuery.of(context).size.width;

    return Form(
        key: formKey,
        child: SafeArea(
          child: Container(
              height: MediaQuery.of(context).size.height,
              width: MediaQuery.of(context).size.width,
              decoration: BoxDecoration(
                gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [
                      Colors.blueGrey[200]!,
                      Colors.blueGrey[400]!,
                    ]),
              ),
              child: Center(
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
                              height: height * (30 / 804),
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
                            Container(
                              padding: const EdgeInsets.only(top: 230),
                              child: const Text(
                                "Reset password via email.",
                                style: TextStyle(
                                  fontFamily: "productSansReg",
                                  color: Colors.blueGrey,
                                  fontSize: 25.0,
                                  fontWeight: FontWeight.w700,
                                ),
                              ),
                            ),
                            const Padding(padding: EdgeInsets.all(20.0)),
                            Container(
                              padding: const EdgeInsets.only(
                                  left: 35.0, right: 35.0),
                              child: TextFormField(
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
                                validator: (email) {
                                  if (email != null &&
                                      !EmailValidator.validate(email)) {
                                    return 'Please enter a Valid Email';
                                  }
                                  return null;
                                },
                                onSaved: (value) {
                                  email = value!;
                                },
                                controller: emailController,
                              ),
                            ),
                            const Padding(padding: EdgeInsets.all(20.0)),
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
                                  onPressed: () {
                                    if (formKey.currentState!.validate()) {
                                      Utils.showSnackBar1(
                                          "Email sent to ${emailController.text.trim()}");
                                    }
                                  },
                                  child: const Text(
                                    "Send email",
                                    style: TextStyle(
                                      fontFamily: "productSansReg",
                                      fontSize: 15.0,
                                      fontWeight: FontWeight.w700,
                                      color: Colors.white,
                                    ),
                                  ),
                                )),
                          ]),
                        )))),
              )),
        ));
  }
}
