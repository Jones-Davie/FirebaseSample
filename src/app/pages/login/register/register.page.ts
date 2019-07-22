import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from '../../../services/authentication.service';
import { NavController } from '@ionic/angular';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  accountCreated = false;
  password: string = ''
  validations_form: FormGroup
  errorMessage: string = ''
  successMessage: string = ''
 
  validation_messages = {
   'email': [
     { type: 'required', message: 'This field cannot be empty' },
     { type: 'pattern', message: 'Please enter a valid email.' }
   ],
   'password': [
     { type: 'required', message: 'This field cannot be empty.' },
     { type: 'minlength', message: 'Password must be at least 6 characters long.' }
   ],
   'confirm_password': [
    { type: 'required', message: 'Please confirm your password' },
    { type: 'pattern', message: 'Passwords must match to continue' }
  ]
 };
 
  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder
  ) {}
 
  ngOnInit(){
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
      confirm_password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(this.password)
      ]))
    });
  }

 tryRegister(value){
    this.authService.registerUser(value)
     .then( async res => {
       console.log(res);
       
       this.errorMessage = ""
       this.successMessage = "Succes! Going back to login page"
       this.accountCreated = true

       setTimeout(() => 
        {
          this.goLoginPage()
        },
      2000);
      
    }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })
  }
 
  goLoginPage(){
    this.navCtrl.navigateBack('/login');
  }

 
 
}