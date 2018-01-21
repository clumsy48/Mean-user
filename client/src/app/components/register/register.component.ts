import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages'
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;

  constructor( private validateService : ValidateService
              ,private flashMessagesService : FlashMessagesService
              ,private authService : AuthService
              ,private router : Router
              ) { }

  ngOnInit() {
  }
  
  onRegisterSubmit(){
  	const user = {
  		name : this.name,
  		username : this.username,
  		email : this.email,
  		password : this.password
    }

    if(!this.validateService.validateRegister(user)){
     // console.log(user);
      this.flashMessagesService.show('Input fields must be empty',{cssClass:'alert-danger' ,timeout:3000});
      return false;
    }

    if(!this.validateService.validateEmail(user.email)){
      this.flashMessagesService.show('Please enter a valid Email Id',{cssClass:'alert-warning',timeout:3000});
      return false;
    }

    if(!this.validateService.validatePasswordLength(user.password)){
      console.log('In validatePasswordLength');
      this.flashMessagesService.show('Error: Password must contain at least six characters!',{cssClass:'alert-warning',timeout:3000});
      return false;
    }

    if(!this.validateService.validatePassowrdForAtleastOneNumber(user.password)){
      console.log('In validatePassowrdForAtleastOneNumber');
      this.flashMessagesService.show('Error: password must contain at least one number (0-9)!',{cssClass:'alert-warning',timeout:3000});
      return false;
    }

    this.authService.registerUser(user).subscribe(data => {

       if(data.success){
          this.flashMessagesService.show('You are registered successfully',{cssclass:'alert-success',timeout:3000});
          this.router.navigate(['/login']);
       }
       else{
          this.flashMessagesService.show('Something went wrong',{cssclass:'alert-danger',timeout:3000});
          this.router.navigate(['/login']);
       }
    });

  }
}
