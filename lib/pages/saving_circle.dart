// ignore_for_file: avoid_unnecessary_containers, prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flexpay/components/savingcircles.dart';
import 'package:flutter/material.dart';
// import 'package:awesome_dialog/awesome_dialog.dart';

class SavingCircle extends StatefulWidget {
  const SavingCircle({Key? key}) : super(key: key);

  @override
  State<SavingCircle> createState() => _SavingCircleState();
}



class _SavingCircleState extends State<SavingCircle> {
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.orange[800],
        appBar: AppBar(
          backgroundColor: Colors.orange[800],
          iconTheme: const IconThemeData(color: Colors.white),
          title: const Text('Saving Circle'),
          centerTitle: true,
          elevation: 0,
        ),
        body: SingleChildScrollView(
          child: Container(
              padding: const EdgeInsets.fromLTRB(20, 10, 20, 10),
              child: Column(children: [
                Text(
                  "Choose a saving circle",
                  style: TextStyle(color: Colors.white, fontSize: 15),
                ),
                SizedBox(height: 10),
                SavingCircles(),
              ])),
        ));
  }
}
