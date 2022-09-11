// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables


import 'package:flexpay/components/deposit_form.dart';
import 'package:flutter/material.dart';




class BottomNavigation extends StatefulWidget {
  const BottomNavigation({Key? key}) : super(key: key);

  @override
  State<BottomNavigation> createState() => _BottomNavigationState();
}

class _BottomNavigationState extends State<BottomNavigation> {

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(color: Colors.white),
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
                          shape: CircleBorder(),
                        ),
                        child: Icon(Icons.add, color: Colors.white),
                        onPressed: () {
                          showModalBottomSheet(
                            context: context,
                            builder: (context) {
                              return DepositForm();
                            },
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.vertical(
                                top: Radius.circular(20),
                              ),
                            ),
                            clipBehavior: Clip.antiAliasWithSaveLayer,
                          );
                        },
                      ),
                    ),
                  ),
                ),
                Expanded(
                  child: IconButton(
                    icon: Icon(Icons.account_balance_wallet,
                        color: Colors.grey[300]),
                    onPressed: () {
                      Navigator.pushNamed(context, '/wallet');
                    },
                  ),
                ),
                Expanded(
                  child: IconButton(
                    icon: Icon(Icons.notifications, color: Colors.grey[300]),
                    onPressed: () {
                      Navigator.pushNamed(context, '/notifications');
                    },
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
