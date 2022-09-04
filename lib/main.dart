// ignore_for_file: prefer_const_constructors
import 'package:flexpay/authentication/forgotpassword.dart';
import 'package:flexpay/authentication/signin.dart';
import 'package:flexpay/authentication/signup.dart';
import 'package:flexpay/authentication/splashscreen.dart';
import 'package:flexpay/pages/dashboard.dart';
import 'package:flexpay/pages/invest.dart';
import 'package:flexpay/pages/more.dart';
import 'package:flexpay/pages/profile.dart';
import 'package:flutter/material.dart';




void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
     theme: ThemeData(
       fontFamily:"Poppins",
     ),
      initialRoute: '/',
      routes:{
        "/":(context)=>SplashScreen(),
        "/login":(context)=>Signin(),
        "/signup":(context)=>Signup(),
        "/forgot-password":(context)=>ForgotPassword(),
        "/dashboard":(context)=>Dashboard(),
        "/more":(context)=>More(),
        "/invest":(context)=>Invest(),
        "/profile":(context)=>Profile()
        

  },
      
    );
  }
}




