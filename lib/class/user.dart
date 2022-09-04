// ignore_for_file: file_names

class User{
  String name,email,company,role,token;
  User(this.name,this.email,this.company,this.role,this.token);
  User.fromJson(Map<String,dynamic>json): name = json['name'],email = json['email'],
  company = json['company'],role = json['role'],token= json['token'];

  Map<String,dynamic> toJson()=>{
    'name':name,
    "email":email,
    "company":company,
    "role":role,
    "token":token
  };
}