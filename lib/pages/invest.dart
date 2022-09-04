// ignore_for_file: avoid_unnecessary_containers

import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_charts/charts.dart';

class Invest extends StatefulWidget {
  const Invest({Key? key}) : super(key: key);

  @override
  State<Invest> createState() => _InvestState();
}

class _InvestState extends State<Invest> {
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
                        Text("\$ 3004",style: TextStyle(fontSize: 20,color: Colors.orange[800]),),
                      ],),
                      const VerticalDivider(color: Colors.black,),
                      Column(children: <Widget>[
                        const Text("Interest",style: TextStyle(color: Colors.black26),),
                        Text("\$ 104",style: TextStyle(fontSize: 20,color: Colors.orange[800]),),
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
                        padding: const EdgeInsets.fromLTRB(28, 24, 0, 90),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.stretch,
                          children:const [
                          Text("Your Saving circle")
                        ],),
                      )
                    ),
          ],
        ),
      ),
      bottomNavigationBar: Container(
        decoration: const BoxDecoration(color: Colors.white),
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
                      onPressed: () {
                        Navigator.pushNamed(context, '/dashboard');
                      },
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
                            shape: const CircleBorder(),
                          ),
                          child: const Icon(Icons.add, color: Colors.white),
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

class SalesData {
  SalesData(this.year, this.sales);
  final String year;
  final double sales;
}
