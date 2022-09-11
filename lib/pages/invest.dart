// ignore_for_file: avoid_unnecessary_containers

import 'package:flexpay/components/savingcircles.dart';
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_charts/charts.dart';
import 'package:flexpay/components/bottom_navigation.dart';
import 'package:shared_preferences/shared_preferences.dart';
// import 'dart:convert';


class Invest extends StatefulWidget {
  const Invest({Key? key}) : super(key: key);

  @override
  State<Invest> createState() => _InvestState();
}




class _InvestState extends State<Invest> {
  late SharedPreferences sharedPreferences; 
String balance = "";
String interest = "";
  

   void initialGetSavedData() async{
    sharedPreferences = await SharedPreferences.getInstance();
   }

   _setBalance() async {
    try {
    
      final sharedPreference = await SharedPreferences.getInstance();
      String jsonBalance = (sharedPreference.getString('balance')).toString();
        
      setState(() {
        balance = jsonBalance;
        interest = (double.parse(jsonBalance)*0.0102).toStringAsFixed(2);
      });
      
    } catch (error) {
      return error;
    }
  }


 
@override
   void initState(){
    super.initState();
    initialGetSavedData();
    _setBalance();
   }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.orange[800],
      appBar: AppBar(
        backgroundColor: Colors.orange[800],
        title: const Text('Investment'),
        centerTitle: true,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Container(
                child: SfCartesianChart(
                    // Initialize category axis
                    primaryXAxis: CategoryAxis(),
                    series: <LineSeries<SalesData, String>>[
                  LineSeries<SalesData, String>(
                      // Bind data source
                      dataSource: <SalesData>[
                        SalesData('Jan', 35),
                        SalesData('Feb', 28),
                        SalesData('Mar', 34),
                        SalesData('Apr', 32),
                        SalesData('May', 40)
                      ],
                      xValueMapper: (SalesData sales, _) => sales.year,
                      yValueMapper: (SalesData sales, _) => sales.sales)
                ])),
            SizedBox(
              width: 300,
              height:94,
              child: Card(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(15),
                ),
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(20, 16,20, 16),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(children: <Widget>[
                        const Text("Earned",style: TextStyle(color: Colors.black26),),
                        Text("\$ $balance",style: TextStyle(fontSize: 20,color: Colors.orange[800]),),
                      ],),
                      const VerticalDivider(color: Colors.black,),
                      Column(children: <Widget>[
                        const Text("Interest",style: TextStyle(color: Colors.black26),),
                        Text("\$ $interest",style: TextStyle(fontSize: 20,color: Colors.orange[800]),),
                      ],)
                    ],
                    
                  ),
                ),
              ),
            ),
             Card(
                  color: Colors.white,
                  shape:const RoundedRectangleBorder(
                    borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(30.0),
                  topRight: Radius.circular(30.0),
                ),
                  ),
                      child:Padding(
                        padding: const EdgeInsets.fromLTRB(0, 24, 0, 90),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children:const [
                          Text("Join Saving Circle"),
                          Padding(
                            padding: EdgeInsets.fromLTRB(10, 6, 10, 6),
                            child: SavingCircles())
                        ],),
                      )
                    ),
          ],
        ),
      ),
      bottomNavigationBar:const BottomNavigation(),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
    );
  }
}

class SalesData {
  SalesData(this.year, this.sales);
  final String year;
  final double sales;
}
