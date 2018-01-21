import { Injectable } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages'

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user){
  	if(user.name == undefined || user.username == undefined || user.email == undefined || user.password == undefined || user.email == ""){
  		return false;
  	}
  	else return true;
  }

  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  validatePasswordLength(password){
    if(password.length < 6) {
      return false;
    }else return true;
  }
  validatePassowrdForAtleastOneNumber(password){
    const re = /[0-9]/;
    return re.test(password);
  }
}
