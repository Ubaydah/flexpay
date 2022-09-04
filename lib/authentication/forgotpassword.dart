// ignore_for_file: avoid_unnecessary_containers, prefer_const_constructors, unnecessary_new, deprecated_member_use

import 'package:flutter/material.dart';
import 'package:rounded_loading_button/rounded_loading_button.dart';

class ForgotPassword extends StatefulWidget {
  const ForgotPassword({Key? key}) : super(key: key);

  @override
  State<ForgotPassword> createState() => _ForgotPasswordState();
}

class _ForgotPasswordState extends State<ForgotPassword> {
  String email = '';
  final RoundedLoadingButtonController _btnController = RoundedLoadingButtonController();

   




  @override
  Widget build(BuildContext context) {
    return Scaffold(

      appBar: AppBar(
          backgroundColor: Colors.white,
          iconTheme: IconThemeData(color: Colors.black),
          elevation: 0,
        ),

      body: SingleChildScrollView(
        

        child: Container(
            child: Padding(
          padding: const EdgeInsets.fromLTRB(20, 30, 25, 0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Text("Flexpay",
                  style: TextStyle(fontFamily: 'DM Serif', fontSize: 30),
                  textAlign: TextAlign.start),
              SizedBox(height: 50),
              Text("Forgot Password?",
                  style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold,fontFamily: 'Poppins')),
              Text("Enter your email/phone number to reset your password",
                  style: TextStyle(color: Colors.grey,fontFamily: 'Poppins')),
              SizedBox(height: 25),
              Text(
                'Email/Phone Number',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.w500,fontFamily: 'Poppins'),
              ),
              SizedBox(height: 5),
              TextFormField(
                decoration: InputDecoration(
                    isDense: true,
                    border: OutlineInputBorder(
                      borderSide:
                          BorderSide(color: Color.fromARGB(255, 212, 212, 212)),
                      borderRadius: BorderRadius.circular(5),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderSide:
                          BorderSide(color: Color.fromARGB(255, 212, 212, 212)),
                      borderRadius: BorderRadius.circular(5),
                    )),
                onChanged: (val) {
                  setState(() {
                    email = val;
                  });
                },
                style: TextStyle(height: 1.2),
              ),
              SizedBox(height: 19),
            
            
             
      
              //forgot password
             
      
      
              SizedBox(height: 0),
               RoundedLoadingButton(
                        color: Colors.orange[800],
                        successColor: Colors.orange[800],
                        controller: _btnController,
                        height:60,
                        width: 400,
                        onPressed: (){},
                        child: Text('Reset Password',
                            style: TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.bold))),

            ],
          ),
        )),
      ),
    );
  }
}
