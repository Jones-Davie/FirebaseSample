import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../services/authentication.service';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.page.html',
  styleUrls: ['./recovery.page.scss'],
})
export class RecoveryPage implements OnInit {

  validation_form: FormGroup

  errorMessage: string = ''
  succesMessage: string = ''
  recover_email : string = ''

  recovered = false

  constructor(

    private authService: AuthenticateService,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit() {

    this.validation_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ]
  }

  recoverPassword(recoverEmail : string){

    console.log(recoverEmail)

    this.authService.forgotPassword(recoverEmail)  
    .then(res => {
      
      console.log(res)

      this.recovered = true

      this.errorMessage = ""
      this.succesMessage = "A email has been sent. It may take a few minutes to appear."

    }, err => {
      this.errorMessage = err.message
    })
  }

}
