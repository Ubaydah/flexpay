// ignore_for_file: prefer_const_constructors, sort_child_properties_last, prefer_const_literals_to_create_immutables, avoid_unnecessary_containers
import 'package:flexpay/components/bottom_navigation.dart';
import 'package:flexpay/components/deposit_form.dart';
import 'package:flutter/material.dart';
import 'package:glassmorphism/glassmorphism.dart';
import 'package:http/http.dart' as http;

import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:getwidget/getwidget.dart';
// import 'package:provider/provider.dart';


class Dashboard extends StatefulWidget {
  const Dashboard({Key? key}) : super(key: key);

  @override
  State<Dashboard> createState() => _DashboardState();
}

class Transaction {
  final String id;
  final String transactionType;
  final String description;
  final String amount;
  final String createdAt;

  const Transaction(
      {required this.id,
      required this.transactionType,
      required this.amount,
      required this.description,
      required this.createdAt});
}

List<DropdownMenuItem<String>> get dropdownItems {
  List<DropdownMenuItem<String>> menuItems = [
    DropdownMenuItem(child: Text("USD"), value: "USD"),
    DropdownMenuItem(child: Text("NGN"), value: "NGN"),
    DropdownMenuItem(child: Text("GHS"), value: "GHS"),
    DropdownMenuItem(child: Text("KES"), value: "KES"),
  ];
  return menuItems;
}

String currency = "USD";
bool loading = true;
double balance = 450;
String oldValue = "";
String selectedValue = "USD";
String name = "";
String token = "";
int amount = 700;
String description = "NYSC allawee";
var balanceData = {};

class _DashboardState extends State<Dashboard> {
  List<dynamic> transactions = [];

   late SharedPreferences sharedPreferences;  

   

  

  void _fetchBalance() async {
    String apiUrl = "https://flex-pay.herokuapp.com/wallet/details";
    final response = await http.get(
      Uri.parse(apiUrl),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer $token',
      },
    );
   
    balanceData = json.decode(response.body);
    sharedPreferences.setString('balance',balanceData["balance"].toString());
    setState(() {
      balance = balanceData["balance"];
      loading = false;
      
    });
  }

  void _fetchTransactions() async {
    try {
      String apiUrl = "https://flex-pay.herokuapp.com/wallet/transactions";
      final response = await http.get(
        Uri.parse(apiUrl),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer $token',
        },
      );
      // print(response.body);
      var responseData = response.body;
      transactions.addAll((json.decode(responseData)["results"]));
      
    } catch (error) {
      return;
    }
  }

  void changeCurrency(newValue) async {
    setState(() {
      loading = true;
      oldValue = currency;
      currency = newValue;
    });

    final Map balanceData = {
      "currency": oldValue,
      "newCurrency": newValue,
    };
    const String apiUrl = "https://tellbooksapi.herokuapp.com/converter";
    final response = await http.post(Uri.parse(apiUrl),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer $token',
        },
        body: json.encode(balanceData));

    setState(() {
      balance = double.parse(
          (double.parse(response.body) * balance).toStringAsFixed(2));
    });
    loading = false;
  }

  _setUser() async {
    try {
      final sharedPreference = await SharedPreferences.getInstance();
      Map<String, dynamic> jsonUser =
          jsonDecode(sharedPreference.getString('user') ?? "");
      setState(() {
        name = jsonUser['name'];
        token = jsonUser['token'];
      });
      // print("this runs more than once!");
      
      _fetchBalance();
      _fetchTransactions();
    } catch (error) {
      return error;
    }
  }

  @override
  void initState() {
    super.initState();
    initialGetSavedData();
    _setUser();
  }

 void initialGetSavedData() async{
    sharedPreferences = await SharedPreferences.getInstance();
   }


  @override
  Widget build(BuildContext context) {
    //  setUser();
    return Scaffold(
      backgroundColor: Colors.orange[800],
      body: SingleChildScrollView(
        child: Column(children: [
          Container(
              padding: const EdgeInsets.fromLTRB(20, 60, 20, 0),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Welcome',
                              style: TextStyle(
                                  color: Colors.grey[100], fontSize: 15)),
                          Text(name,
                              style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 25,
                                  fontWeight: FontWeight.bold))
                        ],
                      ),
                      GestureDetector(
                        onTap: () {
                          Navigator.pushNamed(context, '/profile');
                        },
                        child: CircleAvatar(
                          backgroundColor: Colors.white,
                          radius: 30,
                          child: Text(name[0] + name.split(' ')[1][0]),
                        ),
                      )
                    ],
                  ),
                  const SizedBox(height: 30),
                  //the column of wallet
                  Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        //glass wallet
                        GlassmorphicContainer(
                          border: 2,
                          borderRadius: 30,
                          blur: 100,
                          width: 1000,
                          height: 370,
                          linearGradient: LinearGradient(
                              begin: Alignment.topLeft,
                              end: Alignment.bottomRight,
                              colors: [
                                Color(0xFAfafafa).withOpacity(0.2),
                                Color(0xFFFFFFFF).withOpacity(0.15),
                              ],
                              stops: [
                                0.1,
                                1,
                              ]),
                          borderGradient: LinearGradient(
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                            colors: [
                              Color(0xFFffffff).withOpacity(0.5),
                              Color((0xFFFFFFFF)).withOpacity(0.5),
                            ],
                          ),
                          child: Padding(
                            padding: const EdgeInsets.fromLTRB(20, 30, 20, 25),
                            child: Column(
                              children: <Widget>[
                                Text('Total Balance',
                                    style: TextStyle(color: Colors.white)),
                                SizedBox(height: 10),
                                if (loading == true)
                                  GFLoader(
                                      size: 60,
                                      loaderColorOne: Colors.white,
                                      loaderColorTwo: Colors.white,
                                      loaderColorThree: Colors.white),
                                if (loading == false)
                                  Text("$currency $balance",
                                      style: TextStyle(
                                          color: Colors.white,
                                          fontSize: 40,
                                          fontWeight: FontWeight.w600)),
                                SizedBox(height: 10),
                                SizedBox(
                                  width: 90,
                                  child: DropdownButton(
                                    focusColor: Colors.white,
                                    dropdownColor: Colors.white,
                                    isDense: true,
                                    value: currency,
                                    items: dropdownItems,
                                    style: TextStyle(color: Colors.black),
                                    // decoration: InputDecoration(
                                    //     border: OutlineInputBorder(
                                    //       borderSide:
                                    //           BorderSide(color: Colors.white, width: 1),
                                    //       borderRadius: BorderRadius.circular(20),
                                    //     ),
                                    //     focusedBorder: OutlineInputBorder(
                                    //       borderSide:
                                    //           BorderSide(color: Colors.white, width: 1),
                                    //       borderRadius: BorderRadius.circular(20),
                                    //     )),
                                    onChanged: (String? newValue) {
                                      changeCurrency(newValue);
                                    },
                                  ),
                                ),
                                SizedBox(height: 20),
                                Divider(color: Colors.white, height: 9),
                                SizedBox(height: 20),
                                Row(
                                  children: [
                                    Column(
                                      children: [
                                        TextButton(
                                          style: TextButton.styleFrom(
                                            backgroundColor: Colors.black,
                                            shape: RoundedRectangleBorder(
                                                borderRadius:
                                                    BorderRadius.circular(20)),
                                          ),
                                          child: Padding(
                                            padding: EdgeInsets.all(10),
                                            child: Icon(
                                                Icons
                                                    .arrow_circle_right_rounded,
                                                color: Colors.white),
                                          ),
                                          onPressed: () {
                                            Navigator.pushNamed(
                                                context, '/transfer');
                                          },
                                        ),
                                        SizedBox(height: 10),
                                        Text('Transfer',
                                            style: TextStyle(
                                                color: Colors.white,
                                                fontSize: 16))
                                      ],
                                    ),
                                    SizedBox(width: 18),
                                    Column(
                                      children: [
                                        TextButton(
                                          style: TextButton.styleFrom(
                                            backgroundColor: Colors.black,
                                            shape: RoundedRectangleBorder(
                                                borderRadius:
                                                    BorderRadius.circular(20)),
                                          ),
                                          child: Padding(
                                            padding: EdgeInsets.all(10),
                                            child: Icon(
                                                Icons
                                                    .keyboard_double_arrow_up_outlined,
                                                color: Colors.white),
                                          ),
                                          onPressed: () {
                                            showModalBottomSheet(
                                              context: context,
                                              builder: (context) {
                                                return DepositForm();
                                              },
                                              shape: RoundedRectangleBorder(
                                                borderRadius:
                                                    BorderRadius.vertical(
                                                  top: Radius.circular(20),
                                                ),
                                              ),
                                              clipBehavior:
                                                  Clip.antiAliasWithSaveLayer,
                                            );
                                          },
                                        ),
                                        SizedBox(height: 10),
                                        Text('Top-up',
                                            style: TextStyle(
                                                color: Colors.white,
                                                fontSize: 16))
                                      ],
                                    ),
                                    SizedBox(width: 18),
                                    Column(
                                      children: [
                                        TextButton(
                                          style: TextButton.styleFrom(
                                            backgroundColor: Colors.black,
                                            shape: RoundedRectangleBorder(
                                                borderRadius:
                                                    BorderRadius.circular(20)),
                                          ),
                                          child: Padding(
                                            padding: EdgeInsets.all(10),
                                            child: Icon(
                                                Icons.account_balance_wallet,
                                                color: Colors.white),
                                          ),
                                          onPressed: () {
                                            Navigator.pushReplacementNamed(
                                                context, '/wallet');
                                          },
                                        ),
                                        SizedBox(height: 10),
                                        Text('Wallet',
                                            style: TextStyle(
                                                color: Colors.white,
                                                fontSize: 16))
                                      ],
                                    ),
                                    SizedBox(width: 18),
                                    Column(
                                      children: [
                                        TextButton(
                                          style: TextButton.styleFrom(
                                            backgroundColor: Colors.black,
                                            shape: RoundedRectangleBorder(
                                                borderRadius:
                                                    BorderRadius.circular(20)),
                                          ),
                                          child: Padding(
                                            padding: EdgeInsets.all(10),
                                            child: Icon(Icons.dashboard,
                                                color: Colors.white),
                                          ),
                                          onPressed: () {
                                            Navigator.pushNamed(
                                                context, '/more');
                                          },
                                        ),
                                        SizedBox(height: 10),
                                        Text('More',
                                            style: TextStyle(
                                                color: Colors.white,
                                                fontSize: 16))
                                      ],
                                    )
                                  ],
                                )
                              ],
                            ),
                          ),
                        ),

                        SizedBox(height: 30),
                      ]),
                  //saving circle component
                ],
              )),
          Card(
              color: Colors.white,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.only(
                  topLeft: const Radius.circular(30.0),
                  topRight: const Radius.circular(30.0),
                ),
              ),
              child: Padding(
                padding: const EdgeInsets.fromLTRB(0, 35, 0, 90),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Text(
                      "Recent Transactions",
                      textAlign: TextAlign.start,
                      style: TextStyle(fontSize: 17),
                    ),
                    ListView.builder(
                        shrinkWrap: true,
                        itemCount: transactions.length,
                        physics: NeverScrollableScrollPhysics(),
                        itemBuilder: (context, index) {
                          final transaction = transactions[index];
                          return SingleChildScrollView(
                            child: Padding(
                              padding: EdgeInsets.fromLTRB(20, 0, 20, 10),
                              child: Card(
                                shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(18.0),
                                    side: BorderSide(color: Colors.orange)),
                                child: ListTile(
                                  contentPadding:
                                      const EdgeInsets.fromLTRB(20, 20, 20, 20),
                                  leading: CircleAvatar(
                                    radius: 28,
                                    backgroundImage: AssetImage(
                                        transaction["transaction_type"] ==
                                                "deposit"
                                            ? 'images/deposit.png'
                                            : 'images/withdrawal.png'),
                                  ),
                                  title: Text(transaction["description"],
                                      style: TextStyle(fontSize: 15)),
                                  subtitle: Text(
                                    "${(transaction["created_at"].toString())
                                            .substring(0, 10)}, ${(transaction["created_at"].toString())
                                            .substring(11, 16)}",
                                    style: TextStyle(fontSize: 10),
                                  ),
                                  trailing:
                                      Text('USD ${transaction["amount"]}'),
                                ),
                              ),
                            ),
                          );
                        }),
                        SizedBox(height:20),
                    Text("Your Saving circle",
                        style: TextStyle(
                            fontSize: 17, fontWeight: FontWeight.w500)),
                    SizedBox(height:20),
                    SvgPicture.asset("images/nosavings.svg",height: 250,width:250),
                    SizedBox(height:10),
                    Padding(
                        padding: const EdgeInsets.fromLTRB(30, 0, 30, 0),
                        child: Text(
                          "You don't currently belong to a saving circle. Tap the button below to create/join one",
                          textAlign: TextAlign.center,
                          style: TextStyle(fontSize: 14),
                        )),
                    SizedBox(height: 30),
                    ElevatedButton(
                        style: ElevatedButton.styleFrom(
                            primary: Colors.orange[800]),
                        onPressed: () {
                          Navigator.pushNamed(context, "/saving-circle");
                        },
                        child: Padding(
                            padding: const EdgeInsets.fromLTRB(13, 15, 13, 15),
                            child: Text(
                              "Join saving circle",
                              style: TextStyle(fontSize: 17),
                            )))
                  ],
                ),
              )),
        ]),
      ),
      bottomNavigationBar: BottomNavigation(),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
    );
  }
}
