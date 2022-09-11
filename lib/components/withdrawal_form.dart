// ignore_for_file: prefer_const_constructors, sized_box_for_whitespace

import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:rounded_loading_button/rounded_loading_button.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

class WithdrawalForm extends StatefulWidget {
  const WithdrawalForm({Key? key}) : super(key: key);

  @override
  State<WithdrawalForm> createState() => _WithdrawalFormState();
}

class _WithdrawalFormState extends State<WithdrawalForm> {
  double amount = 0;
  String token = "";
  String description = "";
  String message = "";

  final RoundedLoadingButtonController _btnController =
      RoundedLoadingButtonController();

  void withdrawmoney() async {
    // print("adding money");
    final Map depositData = {
      "amount": amount,
      "description": description,
    };

    try {
      // print("I'm trying");
      String apiUrl = "https://flex-pay.herokuapp.com/wallet/withdrawal";
      final response = await http.post(Uri.parse(apiUrl),
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer $token',
          },
          body: json.encode(depositData));

      var responseData = json.decode(response.body);
      message = responseData["message"];
      // print(responseData);
      
      showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20)),
                content: SingleChildScrollView(
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(10, 10, 10, 40),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: <Widget>[
                        Image(
                          image: AssetImage('images/success.gif'),
                          width: 160,
                          height: 160,
                        ),
                        Text(
                          "Your money is on its way!",
                          textAlign: TextAlign.center,
                          style: TextStyle(
                              fontSize: 19, fontWeight: FontWeight.bold),
                        ),
                        SizedBox(height: 16),
                        Text(
                          'You have successfully withdrawn $amount to your bank account',
                          textAlign: TextAlign.center,
                        ),
                      ],
                    ),
                  ),
                ));
          });
      Future.delayed(const Duration(milliseconds: 500), () {
        setState(() {});
      });
      _btnController.reset();
    } catch (error) {
      Fluttertoast.showToast(msg: "Network issues. Try again");
      _btnController.reset();
    }
  }

  void setUser() async {
    final sharedPreference = await SharedPreferences.getInstance();
    Map<String, dynamic> jsonUser =
        jsonDecode(sharedPreference.getString('user') ?? "");
    setState(() {
      token = jsonUser['token'];
    });
  }

  @override
  Widget build(BuildContext context) {
    setUser();
    return SingleChildScrollView(
      child: Container(
          height: MediaQuery.of(context).size.height * 0.99,
          child: Padding(
              padding: const EdgeInsets.fromLTRB(30, 29, 30, 90),
              child: Column(children: [
                Text(
                  "Withdraw funds to your Bank",
                  style: TextStyle(fontWeight: FontWeight.w500, fontSize: 17),
                ),
                SizedBox(height: 15),
                SingleChildScrollView(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text("Enter Description"),
                      SizedBox(height: 0),
                      SingleChildScrollView(
                        child: TextFormField(
                          decoration: InputDecoration(
                              isDense: true,
                              border: OutlineInputBorder(
                                borderSide: BorderSide(
                                    color: Color.fromARGB(255, 212, 212, 212)),
                                borderRadius: BorderRadius.circular(5),
                              ),
                              focusedBorder: OutlineInputBorder(
                                borderSide: BorderSide(
                                    color: Color.fromARGB(255, 212, 212, 212)),
                                borderRadius: BorderRadius.circular(5),
                              )),
                          onChanged: (val) {
                            setState(() {
                              description = val;
                            });
                          },
                          style: TextStyle(height: 1.2),
                        ),
                      ),
                      SizedBox(height: 9),
                      Text("Enter amount"),
                      SizedBox(height: 0),
                      SingleChildScrollView(
                        child: TextFormField(
                          keyboardType: TextInputType.number,
                          inputFormatters: <TextInputFormatter>[
                            FilteringTextInputFormatter.digitsOnly
                          ],
                          decoration: InputDecoration(
                              isDense: true,
                              border: OutlineInputBorder(
                                borderSide: BorderSide(
                                    color: Color.fromARGB(255, 212, 212, 212)),
                                borderRadius: BorderRadius.circular(5),
                              ),
                              focusedBorder: OutlineInputBorder(
                                borderSide: BorderSide(
                                    color: Color.fromARGB(255, 212, 212, 212)),
                                borderRadius: BorderRadius.circular(5),
                              )),
                          onChanged: (val) {
                            setState(() {
                              amount = double.parse(val);
                            });
                          },
                          style: TextStyle(height: 1.2),
                        ),
                      ),
                      SizedBox(height: 20),
                      RoundedLoadingButton(
                          color: Colors.orange[800],
                          successColor: Colors.orange[800],
                          controller: _btnController,
                          height: 60,
                          width: 400,
                          onPressed: withdrawmoney,
                          child: Text('Withdraw Money',
                              style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold))),
                    ],
                  ),
                ),
              ]))),
    );
  }
}
