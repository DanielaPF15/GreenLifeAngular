import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup

  constructor(
    private formBuilder: FormBuilder
    ) {
      this.validator()
     }
  

  ngOnInit(): void {
  }
  validator(){
    this.signUpForm = this.formBuilder.group({
      name:['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      cellPhone:['',Validators.required],
      userName: ['', Validators.required],
      password: ['', [Validators.required,Validators.minLength(6)]],
      role: ['User', Validators.required],
      birthDate: [''],
      status: ['']

    })
  }
  saveUser(){
    if(this.signUpForm.valid){
      alert('Se va a guardar la informacion')
    }else{
      alert('El formulario no es válido')
    }
  }
}
