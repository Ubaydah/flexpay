// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';

class SavingCircles extends StatefulWidget {
  const SavingCircles({Key? key}) : super(key: key);

  @override
  State<SavingCircles> createState() => _SavingCirclesState();
}

class Circle {
  final String title;
  final String urlAvatar;
  final String amount;

  const Circle(
      {required this.title, required this.urlAvatar, required this.amount});
}

class _SavingCirclesState extends State<SavingCircles> {
  List<Circle> circles = [
    const Circle(
        title: "Products circle",
        amount: "save USD 200 every month",
        urlAvatar: 'images/productcircle.jpg'),
    const Circle(
        title: "Design circle",
        amount: "save USD 50 every month",
        urlAvatar: 'images/design.jpg'),
    const Circle(
        title: "Marketing circle",
        amount: "save USD 15 every month",
        urlAvatar: 'images/marketing.jpg'),
    const Circle(
        title: "Engineering circle",
        amount: "save USD 10 every month",
        urlAvatar: 'images/technology.jpg')
  ];

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: ListView.builder(
          physics: NeverScrollableScrollPhysics(),
          shrinkWrap: true,
          itemCount: circles.length,
          itemBuilder: (context, index) {
            final circle = circles[index];

            return SingleChildScrollView(
              child: Card(
                  child: ListTile(
                contentPadding: const EdgeInsets.fromLTRB(10, 20, 15, 20),
                leading: CircleAvatar(
                  radius: 28,
                  backgroundImage: AssetImage(circle.urlAvatar),
                ),
                title: Text(circle.title, style: TextStyle(fontSize: 14)),
                subtitle: Text(
                  circle.amount,
                  style: TextStyle(fontSize: 10),
                ),
                trailing: ElevatedButton(
                    style: ButtonStyle(
                      backgroundColor: MaterialStateProperty.all(Colors.white),
                      elevation: MaterialStateProperty.all(0),
                      shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                          RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(18.0),
                              side: BorderSide(color: Colors.orange))),
                    ),
                    onPressed: () {
                      showDialog(
                          context: context,
                          builder: (BuildContext context) {
                            return AlertDialog(
                                shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(20)),
                                content: SingleChildScrollView(
                                  child: Padding(
                                    padding: const EdgeInsets.fromLTRB(
                                        10, 10, 10, 40),
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.center,
                                      children: <Widget>[
                                        Image(
                                          image:
                                              AssetImage('images/success.gif'),
                                          width: 160,
                                          height: 160,
                                        ),
                                        Text(
                                          'Now You smell like Money',
                                          textAlign: TextAlign.center,
                                          style: TextStyle(
                                              fontSize: 19,
                                              fontWeight: FontWeight.bold),
                                        ),
                                        SizedBox(height: 16),
                                        Text(
                                          'You have successfully joined the ${circle.title}',
                                          textAlign: TextAlign.center,
                                        ),
                                      ],
                                    ),
                                  ),
                                ));
                          });
                    },
                    child: Text(
                      "Join",
                      style: TextStyle(color: Colors.orange),
                    )),
              )),
            );
          }),
    );
  }
}
