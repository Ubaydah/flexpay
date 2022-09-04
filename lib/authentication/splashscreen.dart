// ignore_for_file: prefer_const_constructors, avoid_unnecessary_containers

import 'package:flutter/material.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({Key? key}) : super(key: key);

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.orange[800],
      resizeToAvoidBottomInset: false,
      body: SingleChildScrollView(
          child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Image.asset('images/splashimage.png'),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Card(
                borderOnForeground: true,
                shadowColor: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(30),
                ),
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(37, 40, 37, 0),
                  child: Column(
                    children: <Widget>[
                      Text(
                        'Your Monthly income',
                        style: TextStyle(
                            fontSize: 25, fontWeight: FontWeight.bold,fontFamily: 'Poppins'),
                      ),
                      Text(
                        'Working for You!',
                        style: TextStyle(
                            fontSize: 25, fontWeight: FontWeight.bold,fontFamily: 'Poppins'),
                      ),
                      SizedBox(height: 10),
                      Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          Text(
                            'Payment tools for enabling the African \nworking class to build wealth from \ntheir monthly income',
                            style: TextStyle(fontSize: 16, color: Colors.grey,fontFamily: 'Poppins'),
                            textAlign: TextAlign.center,
                          ),
                          SizedBox(height: 30),
                          TextButton(
                            style: TextButton.styleFrom(
                              backgroundColor: Colors.black,
                              shape: CircleBorder(),
                              
                            ),
                            child: Icon(Icons.arrow_forward,color:Colors.white),
                            onPressed: () {
                              Navigator.pushReplacementNamed(context,'/login');
                            },
                          ),
                           SizedBox(height: 30),
                        ],
                      )
                    ],
                  ),
                ),
              )
            ],
          ),
        ],
      )),
    );
  }
}
