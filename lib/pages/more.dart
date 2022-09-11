import 'package:flutter/material.dart';

class More extends StatefulWidget {
  const More({Key? key}) : super(key: key);

  @override
  State<More> createState() => _MoreState();
}


class _MoreState extends State<More> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.orange[800],
      appBar: AppBar(
        backgroundColor: Colors.orange[800],
        iconTheme: const IconThemeData(color: Colors.white),
        title: const Text('More'),
        centerTitle: true,
        elevation: 0,
      ),
      body: SingleChildScrollView(
          child: Padding(
        padding: const EdgeInsets.fromLTRB(24, 0, 24, 0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            const SizedBox(height: 40),
            TextFormField(
              decoration: InputDecoration(
                filled: true,
                isDense: true,
                border: OutlineInputBorder(
                  borderSide: const BorderSide(color: Colors.white),
                  borderRadius: BorderRadius.circular(15),
                ),
                focusColor: Colors.white,
                focusedBorder: OutlineInputBorder(
                  borderSide: const BorderSide(color: Colors.white),
                  borderRadius: BorderRadius.circular(15),
                ),
                prefixIcon: const Icon(
                  Icons.search,
                  color: Colors.black,
                ),
                fillColor: Colors.white,
              ),
            ),
            const SizedBox(height: 48),
            const Text('Shortcuts',textAlign: TextAlign.start,style: TextStyle(color: Colors.white,fontWeight: FontWeight.w500),),
            Column(children: [
              TextButton(
                onPressed: (){},
                child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                  Row(children: [
                    Card(
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(15),
                      ),
                      child: const Padding(
                          padding: EdgeInsets.all(10),
                          child: Card(
                            color: Colors.black,
                              child: Icon(Icons.arrow_right_alt_rounded,color: Colors.white,))),
                    ),
                    const SizedBox(width:6),
                    const Text("Send Money",
                        style: TextStyle(fontSize: 16, color: Colors.white))
                  ]),
                  const Icon(
                    Icons.chevron_right,
                    color: Colors.white,
                  ),
                ]),
              ),

              TextButton(
                onPressed: (){},
                child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                  Row(children: [
                    Card(
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(15),
                      ),
                      child: const Padding(
                          padding: EdgeInsets.all(10),
                          child: Card(
                            color: Colors.black,
                              child: Icon(Icons.arrow_downward_outlined,color: Colors.white,))),
                    ),
                    const SizedBox(width:6),
                    const Text("Top-up Wallet",
                        style: TextStyle(fontSize: 16, color: Colors.white))
                  ]),
                  const Icon(
                    Icons.chevron_right,
                    color: Colors.white,
                  ),
                ]),
              ),

              TextButton(
                onPressed: (){},
                child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                  Row(children: [
                    Card(
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(15),
                      ),
                      child: const Padding(
                          padding: EdgeInsets.all(10),
                          child: Card(
                            color: Colors.black,
                              child: Icon(Icons.account_balance_wallet,color: Colors.white,))),
                    ),
                    const SizedBox(width:6),
                    const Text("Bill payment",
                        style: TextStyle(fontSize: 16, color: Colors.white))
                  ]),
                  const Icon(
                    Icons.chevron_right,
                    color: Colors.white,
                  ),
                ]),
              ),

               TextButton(
                onPressed: (){
                Navigator.of(context).pushNamed('/saving-circle'); 
                },
                child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                  Row(children: [
                    Card(
                      color: Colors.black,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(15),
                      ),
                      child: const Padding(
                          padding: EdgeInsets.all(10),
                          child: Card(
                            color: Colors.black,
                              child: Icon(Icons.qr_code_sharp,color: Colors.white,))),
                    ),
                    const SizedBox(width:6),
                    const Text("Join Saving Circle",
                        style: TextStyle(fontSize: 16, color: Colors.white))
                  ]),
                  const Icon(
                    Icons.chevron_right,
                    color: Colors.white,
                  ),
                ]),
              ),
            ]),
          ],
        ),
      )),
    );
  }
}
