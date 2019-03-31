

import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

	constructor() { }

	doLogin(data){
		if (data.email == "admin@gmail.com" && data.password == "admin123") {
			window.localStorage.setItem("role","Admin");
			return {
				code : 200,
				message : "Login Successful",
				data : data
			};
		}
		if (data.email == "user@gmail.com" && data.password == "user123") {
			window.localStorage.setItem("role","User");
			return {
				code : 200,
				message : "Login Successful",
				data : data
			};
		}
		
		
		else{
			return {
				code : 503,
				message : "Invalid Credentials",
				data : null
			};
		}
	}

	// doRegister(data){
		// 	return this.http.post('user-add.php',data);	
		// }
	}

