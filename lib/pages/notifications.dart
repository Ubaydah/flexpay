import 'package:flutter/material.dart';

class Notifications extends StatefulWidget {
  const Notifications({Key? key}) : super(key: key);

  @override
  State<Notifications> createState() => _NotificationsState();
}

class _NotificationsState extends State<Notifications> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
       backgroundColor: Colors.orange[800],
      appBar: AppBar(
        backgroundColor: Colors.orange[800],
        iconTheme: const IconThemeData(color: Colors.white),
        title: const Text('Notifications'),
        centerTitle: true,
        elevation: 0,
      ),
      body: Container(
        padding: const EdgeInsets.fromLTRB(0, 80, 0, 0),
        child:  Center(
          child: Column(children: const [
            Icon(Icons.notifications_paused_sharp,size: 120,color: Colors.white,),
            SizedBox(height:40),
            Text("Nothing new to see here, yet",style:TextStyle(fontSize:16,color: Colors.white))
          ],),
        ),
      ),
    );
  }
}