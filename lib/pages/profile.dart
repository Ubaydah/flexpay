// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'package:indexed/indexed.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

class Profile extends StatefulWidget {
  const Profile({Key? key}) : super(key: key);

  @override
  State<Profile> createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  String name="";
  String email="";
  String company="";
  String role="";
  void setUser() async{
      final sharedPreference = await SharedPreferences.getInstance();
      Map <String,dynamic> jsonUser = jsonDecode(sharedPreference.getString('user')??"");
      setState(() {
          name = jsonUser["name"];
          email = jsonUser['email'];
          company = jsonUser['company'];
          role = jsonUser['role'];
      });
    
  }

  @override
  Widget build(BuildContext context) {
    setUser();
    return Scaffold(
        backgroundColor: Colors.orange[800],
        appBar: AppBar(
          actions: [
            const Icon(Icons.settings),
          ],
          title: const Text('Profile'),
          elevation: 0,
          backgroundColor: Colors.transparent,
        ),
        body: SingleChildScrollView(
            child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
              Indexer(
                alignment: Alignment.center,
                children: [
                  Indexed(
                    index: 100,
                    child: Image.asset('images/ellipses.png'),
                  ),
                  Indexed(
                      index: 1000,
                      child: Column(children: [
                        GestureDetector(
                          onTap: () {
                            Navigator.pushNamed(context, '/profile');
                          },
                          child: CircleAvatar(
                            backgroundColor: Colors.white,
                            radius: 30,
                            child: Text(name[0]+ name.split(' ')[1][0]),
                          ),
                        ),
                        const SizedBox(height: 20),
                        Text(
                          name,
                          style: TextStyle(
                              color: Colors.white,
                              fontSize: 24,
                              fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 10),
                        Text(
                          email,
                          style: TextStyle(color: Colors.white),
                        ),
                        const SizedBox(height: 10),
                        Padding(
                          padding: const EdgeInsets.fromLTRB(24, 8, 24, 36),
                          child: Card(
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: Padding(
                              padding: const EdgeInsets.fromLTRB(42, 8, 42, 48),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.stretch,
                                children: [
                                  Padding(
                                      padding:
                                          EdgeInsets.fromLTRB(0, 5, 0, 5),
                                      child: Text(
                                        "Personal Account Information",
                                        textAlign: TextAlign.center,
                                        style: TextStyle(
                                            fontSize: 16,
                                            fontWeight: FontWeight.w500),
                                      )),
                                  const Padding(
                                      padding:
                                          EdgeInsets.fromLTRB(0, 10, 0, 10),
                                      child: Divider(
                                        height: 6,
                                        color: Colors.grey,
                                      )),
                                  SizedBox(height: 20),
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text('Name',
                                          style: TextStyle(
                                            color: Colors.grey[500],
                                          )),
                                      Text(name)
                                    ],
                                  ),
                                  SizedBox(height: 20),
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text('Email',
                                          style: TextStyle(
                                            color: Colors.grey[500],
                                          )),
                                      Text(email)
                                    ],
                                  ),

                                   SizedBox(height: 20),
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text('Phone',
                                          style: TextStyle(
                                            color: Colors.grey[500],
                                          )),
                                      Text("08121172330")
                                    ],
                                  ),
                                  SizedBox(height: 20),
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text('Company',
                                          style: TextStyle(
                                            color: Colors.grey[500],
                                          )),
                                      Text(company)
                                    ],
                                  ),

                                  SizedBox(height: 20),
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text('Role',
                                          style: TextStyle(
                                            color: Colors.grey[500],
                                          )),
                                      Text(role)
                                    ],
                                  )
                                ],
                              ),
                            ),
                          ),
                        )
                      ])),
                ],
              )
            ])));
  }
}
