// ignore_for_file: sort_child_properties_last


import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:rounded_loading_button/rounded_loading_button.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:loader_overlay/loader_overlay.dart';
import 'package:shared_preferences/shared_preferences.dart';


class Transfer extends StatefulWidget {
  const Transfer({Key? key}) : super(key: key);

  @override
  State<Transfer> createState() => _TransferState();
}


List<DropdownMenuItem<String>> get dropdownItems {
  List<DropdownMenuItem<String>> menuItems = const [
    DropdownMenuItem(child: Text("Access Bank"), value: "044"),
    DropdownMenuItem(child: Text("Citibank"), value: "023"),
    DropdownMenuItem(child: Text("Diamond Bank"), value: "063"),
    DropdownMenuItem(child: Text("Ecobank"), value: "050"),
    DropdownMenuItem(child: Text("First Bank of Nigeria"), value: "011"),
    DropdownMenuItem(child: Text("GT Bank"), value: "058"),
    DropdownMenuItem(child: Text("Jaiz Bank"), value: "301"),
    DropdownMenuItem(child: Text("Keystone Bank"), value: "082"),
    DropdownMenuItem(child: Text("Kuda Bank"), value: "611"),
    DropdownMenuItem(child: Text("Polaris Bank"), value: "076"),
    DropdownMenuItem(child: Text("Stanbic IBTC Bank"), value: "221"),
    DropdownMenuItem(child: Text("Standard Chartered Bank"), value: "068"),
    DropdownMenuItem(child: Text("Sterling Bank"), value: "232"),
    DropdownMenuItem(child: Text("Union Bank"), value: "032"),
    DropdownMenuItem(child: Text("United Bank of Africa"), value: "033"),
    DropdownMenuItem(child: Text("Unity Bank"), value: "215"),
    DropdownMenuItem(child: Text("Wema Bank"), value: "035"),
    DropdownMenuItem(child: Text("Zenith Bank"), value: "057"),
  ];
  return menuItems;
}

class _TransferState extends State<Transfer> {
  String beneficiaryAccount = "";
  String bank = "044";
  String beneficiaryName="";
  double amount = 0;
  String token = "";
  String message="";
  var txt = TextEditingController();

    final RoundedLoadingButtonController _btnController =
      RoundedLoadingButtonController();

  void changeBank(newValue) async{
     setState(() {
      bank = newValue;
    });
  }

  

  void checkBank(val) async{
    final Map bankData = {
      "bank": bank,
      "accountNumber": val,
    };
    if(val.length == 10){
      context.loaderOverlay.show();
      //make post request to get bank name
      try{
      String apiUrl = "https://tips-api.herokuapp.com/bank";
      final response = await http.post(Uri.parse(apiUrl),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: json.encode(bankData));
        var beneficiaryBankData = json.decode(response.body);
        // print(beneficiaryBankData['data']['account_name']);
        setState(() {
          beneficiaryName = beneficiaryBankData['data']['account_name'];
        });
        txt.text = beneficiaryName;
        context.loaderOverlay.hide();
      } catch(error){
        Fluttertoast.showToast(msg: "Invalid Bank account number. Try again");
        context.loaderOverlay.hide();
      }
        
    }
  }

  void transferMoney() async{
    final Map depositData = {
      "amount": amount,
      "description": "Transfer to $beneficiaryName",
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
                        const Image(
                          image: AssetImage('images/success.gif'),
                          width: 160,
                          height: 160,
                        ),
                       const Text(
                          "Transfer Successful!",
                          textAlign: TextAlign.center,
                          style: TextStyle(
                              fontSize: 19, fontWeight: FontWeight.bold),
                        ),
                       const SizedBox(height: 16),
                        Text(
                          'You have successfully transferred $amount to $beneficiaryName',
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
  void initState(){
    super.initState();
     setUser();
  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(
        backgroundColor: Colors.orange[800],
        appBar: AppBar(
        backgroundColor: Colors.orange[800],
        iconTheme: const IconThemeData(color: Colors.white),
        title: const Text('Transfer'),
        centerTitle: true,
        elevation: 0,
      ),
        body: 
        LoaderOverlay(
          useDefaultLoading: false,
        overlayWidget: const Center(
          child: SpinKitCubeGrid(
            color: Colors.deepOrangeAccent,
            size: 50.0,
          ),
        ),
        overlayOpacity: 0.5,
        overlayColor: Colors.black,
          child: Padding(
            padding: const EdgeInsets.fromLTRB(0, 20, 0, 0),
            child: Card(
             shape:RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20)),
              child: SingleChildScrollView(
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(20, 30, 20, 30),
                  child: Form(
                      child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text("Transfer funds to any bank",textAlign: TextAlign.center,style:TextStyle(fontWeight: FontWeight.w600,fontSize: 17),),
                      const SizedBox(height:15),
                      const Text("Beneficiary Bank"),
                      DropdownButtonFormField(
                          focusColor: Colors.white,
                          dropdownColor: Colors.white,
                          isDense: true,
                          value: bank,
                          items: dropdownItems,
                          style: const TextStyle(color: Colors.black),
                            decoration: InputDecoration(
                            isDense: true,
                            border: OutlineInputBorder(
                              borderSide: const BorderSide(
                                  color: Color.fromARGB(255, 212, 212, 212)),
                              borderRadius: BorderRadius.circular(5),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderSide: const BorderSide(
                                  color: Color.fromARGB(255, 212, 212, 212)),
                              borderRadius: BorderRadius.circular(5),
                            )),
                          onChanged: (newValue) {
                           changeBank(newValue);
                          },
                        ),
                         const SizedBox(height:15),
                      const Text("Beneficiary Account Number"),
                      TextFormField(
                         keyboardType: TextInputType.number,
                                inputFormatters: <TextInputFormatter>[
                                  FilteringTextInputFormatter.digitsOnly
                                ],
                        decoration: InputDecoration(
                            isDense: true,
                            border: OutlineInputBorder(
                              borderSide: const BorderSide(
                                  color: Color.fromARGB(255, 212, 212, 212)),
                              borderRadius: BorderRadius.circular(5),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderSide: const BorderSide(
                                  color: Color.fromARGB(255, 212, 212, 212)),
                              borderRadius: BorderRadius.circular(5),
                            )),
                        onChanged: (val) {
                          checkBank(val);
                        },
                        style: const TextStyle(height: 1.2),
                      ),
                      const SizedBox(height:15),
                      const Text("Account Name"),
                      TextFormField(
                               readOnly: true,
                               controller: txt,
                                decoration: InputDecoration(
                                    isDense: true,
                                    border: OutlineInputBorder(
                                      borderSide: const BorderSide(
                                          color: Color.fromARGB(255, 212, 212, 212)),
                                      borderRadius: BorderRadius.circular(5),
                                    ),
                                    focusedBorder: OutlineInputBorder(
                                      borderSide:const BorderSide(
                                          color: Color.fromARGB(255, 212, 212, 212)),
                                      borderRadius: BorderRadius.circular(5),
                                    )),
                                onChanged: (val) {
                                 
                                },
                                style: const TextStyle(height: 1.2),
                              ),
                       const SizedBox(height:15),
                      const Text("Enter amount"),
                              const SizedBox(height: 0),
                              SingleChildScrollView(
                                child: TextFormField(
                                  keyboardType: TextInputType.number,
                                  inputFormatters:<TextInputFormatter>[
                                    FilteringTextInputFormatter.digitsOnly
                                  ],
                                  decoration: InputDecoration(
                                      isDense: true,
                                      border: OutlineInputBorder(
                                        borderSide:const BorderSide(
                                            color:  Color.fromARGB(255, 212, 212, 212)),
                                        borderRadius: BorderRadius.circular(5),
                                      ),
                                      focusedBorder: OutlineInputBorder(
                                        borderSide: const BorderSide(
                                            color: Color.fromARGB(255, 212, 212, 212)),
                                        borderRadius: BorderRadius.circular(5),
                                      )),
                                  onChanged: (val) {
                                    setState(() {
                                      amount = double.parse(val);
                                    });
                                  },
                                  style: const TextStyle(height: 1.2),
                                ),
                    
                              ),
                      const SizedBox(height: 20),
                          RoundedLoadingButton(
                              color: Colors.orange[800],
                              successColor: Colors.orange[800],
                              controller: _btnController,
                              height: 60,
                              width: 400,
                              onPressed: transferMoney,
                              child: const Text('Transfer Funds',
                                  style: TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold))),
                      
                    ],
                  )),
                ),
              ),
            ),
          ),
        ));
  }
}
