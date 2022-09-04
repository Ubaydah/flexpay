// ignore_for_file: prefer_const_constructors, sort_child_properties_last, prefer_const_literals_to_create_immutables, avoid_unnecessary_containers
import 'package:flutter/material.dart';
import 'package:glassmorphism/glassmorphism.dart';
import 'package:localstorage/localstorage.dart';
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:getwidget/getwidget.dart';
import 'package:http/http.dart' as http;

class Dashboard extends StatefulWidget {
  const Dashboard({Key? key}) : super(key: key);

  @override
  State<Dashboard> createState() => _DashboardState();
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
bool loading = false;
double balance = 450;
String oldValue = "";
String selectedValue = "USD";
String name = "";
String token = "";

class _DashboardState extends State<Dashboard> {

  void setUser() async {
    final sharedPreference = await SharedPreferences.getInstance();
    Map<String, dynamic> jsonUser =
        jsonDecode(sharedPreference.getString('user') ?? "");
    setState(() {
      name = jsonUser['name'];
      token = jsonUser['token'];
    });
  }


  void changeCurrency(newValue) async {
    setState(() {
      loading = true;
      oldValue = currency;
      currency = newValue;
    });
    print('here is the money');
    // print(balance.runtimeType);
   final Map balanceData = {
       "currency":oldValue,
       "newCurrency":newValue,
      };
    print(balanceData["newCurrency"]);
    print(balanceData['currency']);
    const String apiUrl = "https://tellbooksapi.herokuapp.com/converter";
      final response = await http.post(Uri.parse(apiUrl), 
      headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer $token',
    },
      body: json.encode(balanceData));
    
       setState(() {
      balance = double.parse((double.parse(response.body)*balance).toStringAsFixed(2));
    });
      loading = false;
      // print(data.toString());
      
  }

  final LocalStorage storage = LocalStorage('user');

  @override
  Widget build(BuildContext context) {
    setUser();
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
                               SizedBox(height:10),
                               if(loading==true)
                              GFLoader(size: 60,loaderColorOne: Colors.white,loaderColorTwo:Colors.white,loaderColorThree: Colors.white),
                               
                                if(loading==false)
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
                                            Navigator.pushReplacementNamed(
                                                context, '/login');
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
                                                    .keyboard_double_arrow_down_outlined,
                                                color: Colors.white),
                                          ),
                                          onPressed: () {
                                            Navigator.pushReplacementNamed(
                                                context, '/login');
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
                                                context, '/login');
                                          },
                                        ),
                                        SizedBox(height: 10),
                                        Text('Bills',
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
                    Text("Your Saving circle",
                        style: TextStyle(
                            fontSize: 20, fontWeight: FontWeight.w500)),
                    SvgPicture.asset("images/nosavings.svg"),
                    Padding(
                        padding: const EdgeInsets.fromLTRB(30, 0, 30, 0),
                        child: Text(
                          "You don't currently belong to a saving circle. Tap the button below to create/join one",
                          textAlign: TextAlign.center,
                          style: TextStyle(fontSize: 17),
                        )),
                    SizedBox(height: 30),
                    ElevatedButton(
                        style: ElevatedButton.styleFrom(
                            primary: Colors.orange[800]),
                        onPressed: () {
                          Navigator.pushNamed(context, '/coming-soon');
                        },
                        child: Padding(
                            padding: const EdgeInsets.fromLTRB(13, 15, 13, 15),
                            child: Text("Join saving circle")))
                  ],
                ),
              )),
        ]),
      ),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(color: Colors.white),
        child: Padding(
          padding: const EdgeInsets.fromLTRB(0, 12, 0, 12),
          child: Card(
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(50),
            ),
            child: Padding(
              padding: const EdgeInsets.fromLTRB(0, 0, 0, 0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Expanded(
                    child: IconButton(
                      icon: Icon(Icons.home, color: Colors.grey[300]),
                      onPressed: () {},
                    ),
                  ),
                  Expanded(
                    child: IconButton(
                      icon: Icon(Icons.pie_chart, color: Colors.grey[300]),
                      onPressed: () {
                        Navigator.pushNamed(context, '/invest');
                      },
                    ),
                  ),
                  Expanded(
                    child: Padding(
                      padding: const EdgeInsets.fromLTRB(0, 10, 0, 10),
                      child: SizedBox(
                        height: 50,
                        width: 50,
                        child: TextButton(
                          style: TextButton.styleFrom(
                            backgroundColor: Colors.orange[800],
                            shape: CircleBorder(),
                          ),
                          child: Icon(Icons.add, color: Colors.white),
                          onPressed: () {
                            Navigator.pushReplacementNamed(context, '/login');
                          },
                        ),
                      ),
                    ),
                  ),
                  Expanded(
                    child: IconButton(
                      icon: Icon(Icons.account_balance_wallet,
                          color: Colors.grey[300]),
                      onPressed: () {},
                    ),
                  ),
                  Expanded(
                    child: IconButton(
                      icon: Icon(Icons.notifications, color: Colors.grey[300]),
                      onPressed: () {},
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
    );
  }
}
