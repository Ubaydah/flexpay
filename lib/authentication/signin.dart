// ignore_for_file: avoid_unnecessary_containers, prefer_const_constructors, unnecessary_new, deprecated_member_use, use_build_context_synchronously

import 'package:flutter/material.dart';
import 'package:rounded_loading_button/rounded_loading_button.dart';
import 'package:http/http.dart' as http;
import 'package:fluttertoast/fluttertoast.dart';
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flexpay/class/User.dart';


class Signin extends StatefulWidget {
  const Signin({Key? key}) : super(key: key);

  @override
  State<Signin> createState() => _SigninState();
}

class _SigninState extends State<Signin> {
  String name="";
  String email = '';
  String password = '';
  String company = "";
  String token = "";
  bool _obscureText = true;
  Icon iconType = Icon(Icons.visibility_off);
  final RoundedLoadingButtonController _btnController =
      RoundedLoadingButtonController();

  
   late SharedPreferences sharedPreferences;  

   @override
   void initState(){
    super.initState();
    initialGetSavedData();
   }

   void initialGetSavedData() async{
    sharedPreferences = await SharedPreferences.getInstance();
   }

  Future login() async {
    try {
      if (email == '' || password == '') {
        _btnController.reset();
        Fluttertoast.showToast(
            msg: 'Please fill all your details', fontSize: 18);
        return;
      } else {
        const String apiUrl =
            "https://flex-pay.herokuapp.com/auth/employee/login";
        final response = await http.post(Uri.parse(apiUrl), body: {
          'email': email,
          'password': password,
        });
        final Map data = jsonDecode(response.body);
        if (data['status'] == "false") {
          Fluttertoast.showToast(msg: data['message'], fontSize: 18);
          _btnController.reset();
        } else {
          _btnController.reset();
          final userData = jsonEncode(data['data']);
          // storage.setItem('user', user);
          String name = jsonDecode(userData)["name"];
          String email = jsonDecode(userData)["email"];
          String company = jsonDecode(userData)["company_name"];
          String role = jsonDecode(userData)["role"];
          String token = jsonDecode(userData)["tokens"]["access"];
          User user = User(name,email,company,role,token);
          String userdata = jsonEncode(user);
          sharedPreferences.setString('user',userdata);
          Navigator.pushReplacementNamed(context,'/dashboard');
        }
        _btnController.reset();
      }
    } catch (error) {
      Fluttertoast.showToast(
          msg: 'Something went wrong. Try again', fontSize: 18);
      _btnController.reset();
    }

    //  try{

    //   Navigator.pushReplacementNamed(context, '/dashboard');
    //    _btnController.reset();
    //  }
    //  catch(error){
    //    _btnController.reset();
    //  }
  }

  void _toggle() {
    setState(() {
      _obscureText = !_obscureText;
      iconType = _obscureText == false
          ? Icon(Icons.visibility)
          : Icon(Icons.visibility_off);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Container(
            child: Padding(
          padding: const EdgeInsets.fromLTRB(20, 60, 25, 0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Text("Flexpay",
                  style: TextStyle(fontFamily: 'DM Serif', fontSize: 30),
                  textAlign: TextAlign.start),
              SizedBox(height: 50),
              Text("Welcome Back",
                  style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold)),
              Text("Login to your Flexpay account to access your funds",
                  style: TextStyle(color: Colors.grey)),
              SizedBox(height: 10),
              Text(
                'Email',
                style: TextStyle(fontSize: 15, fontWeight: FontWeight.w500),
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
              Text(
                'Password',
                style: TextStyle(fontSize: 15, fontWeight: FontWeight.w500),
              ),
              SizedBox(height: 5),
              TextFormField(
                obscureText: _obscureText,
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
                    ),
                    suffixIcon: Column(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        IconButton(
                            onPressed: _toggle,
                            icon: iconType,
                            color: Colors.black),
                      ],
                    )),
                onChanged: (val) {
                  setState(() {
                    password = val;
                  });
                },
                style: TextStyle(height: 1.2),
              ),

              //forgot password
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  TextButton(
                    child: Text('Forgot Password?',
                        style: TextStyle(color: Colors.orange[800])),
                    onPressed: () =>
                        Navigator.pushNamed(context, '/forgot-password'),
                  )
                ],
              ),

              SizedBox(height: 10),
              RoundedLoadingButton(
                  color: Colors.orange[800],
                  successColor: Colors.orange[800],
                  controller: _btnController,
                  height: 60,
                  width: 400,
                  onPressed: login,
                  child: Text('Login',
                      style: TextStyle(
                          color: Colors.white, fontWeight: FontWeight.bold))),

              Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    Text(
                      textAlign: TextAlign.right,
                      "Dont't have an account?",
                      style: TextStyle(fontSize: 15),
                    ),
                    SizedBox(width: 5),
                    TextButton(
                      onPressed: () {
                        Navigator.pushNamed(context, '/signup');
                      },
                      child: Text(
                        'Signup',
                        style: TextStyle(
                            color: Colors.orange[800],
                            fontSize: 15,
                            fontWeight: FontWeight.bold),
                      ),
                    ),
                  ]),
            ],
          ),
        )),
      ),
    );
  }
}
