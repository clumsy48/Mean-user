import { Injectable } from '@angular/core';
import { Http , Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';

import 'rxjs/add/operator/map';
@Injectable()

export class AuthService {
  authToken : any;
  user : any;

  constructor(private http : Http) { }

  registerUser(user){
     let headers = new Headers();
     headers.append('Content-type','application/json');
     return this.http.post('http://localhost:3000/users/register',user,{headers : headers})
       .map(res=>res.json());
  }
  authenticateUser(user){
  	 let headers = new Headers();
     headers.append('Content-type','application/json');
     return this.http.post('http://localhost:3000/users/authenticate',user,{headers : headers})
       .map(res => res.json());
       //console.log('In Login '+this.loggedIn());
  }
  getProfile(){
  	 let headers = new Headers();
  	 this.loadToken();
  	 headers.append('Authorization',this.authToken);
     headers.append('Content-type','application/json');
     console.log('In getProfile '+this.loggedIn());
     
     return this.http.get('http://localhost:3000/users/profile',{headers : headers})
       .map(res => res.json());
  }
  loadToken(){
  	const token = localStorage.getItem('id_token');
  	this.authToken = token;
  	//console.log(this.authToken);
  }
  storeUserData(token,user){
      localStorage.setItem('id_token',token);
      localStorage.setItem('user',JSON.stringify(user));
      this.authToken = token;
      this.user = user;
  }
  logout(){
  	this.authToken = null;
  	this.user = null;
  	localStorage.clear();
  }
  loggedIn(){
  	 return tokenNotExpired('id_token');
  }
}
