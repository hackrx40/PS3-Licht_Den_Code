class LogInModel {
  LogInModel({
    required this.message,
    required this.isLoggedIn,
    required this.user,
    required this.token,
  });
  late final String message;
  late final bool isLoggedIn;
  late final User user;
  late final String token;
  
  LogInModel.fromJson(Map<String, dynamic> json){
    message = json['message'];
    isLoggedIn = json['isLoggedIn'];
    user = User.fromJson(json['user']);
    token = json['token'];
  }

  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};
    _data['message'] = message;
    _data['isLoggedIn'] = isLoggedIn;
    _data['user'] = user.toJson();
    _data['token'] = token;
    return _data;
  }
}

class User {
  User({
    required this.id,
    required this.email,
    required this.password,
    required this.firstName,
    required this.lastName,
    required this.face,
    required this.tokens,
    required this.V,
  });
  late final String id;
  late final String email;
  late final String password;
  late final String firstName;
  late final String lastName;
  late final String face;
  late final List<Tokens> tokens;
  late final int V;
  
  User.fromJson(Map<String, dynamic> json){
    id = json['_id'];
    email = json['email'];
    password = json['password'];
    firstName = json['first_name'];
    lastName = json['last_name'];
    face = json['face'];
    tokens = List.from(json['tokens']).map((e)=>Tokens.fromJson(e)).toList();
    V = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};
    _data['_id'] = id;
    _data['email'] = email;
    _data['password'] = password;
    _data['first_name'] = firstName;
    _data['last_name'] = lastName;
    _data['face'] = face;
    _data['tokens'] = tokens.map((e)=>e.toJson()).toList();
    _data['__v'] = V;
    return _data;
  }
}

class Tokens {
  Tokens({
    required this.token,
    required this.id,
  });
  late final String token;
  late final String id;
  
  Tokens.fromJson(Map<String, dynamic> json){
    token = json['token'];
    id = json['_id'];
  }

  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};
    _data['token'] = token;
    _data['_id'] = id;
    return _data;
  }
}