import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../../Services/user.service';
const swal = require('sweetalert')
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: Router

  ) {
    this.validator()
  }


  ngOnInit(): void {
  }

  validator() {
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      cellPhone: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['Voluntario', Validators.required],
      status: [true],
    })
  }
  saveUser() {
    if (this.signUpForm.valid) {
      this.userService.createUser(this.signUpForm.value).subscribe(
        (userCreated) => {
          console.log(userCreated)
          swal({
            title: "Excelente!",
            text: "Usuario creado correctamente",
            icon: "success",
          });
          this.route.navigateByUrl('/', { skipLocationChange: true } ).then(
            () => {
              this.route.navigate(['/login'])
            }
          )
          
        }, (error) => {
          console.error('Tuvimos un errror ->', error)
        }
      )
    } else {
      swal({
        title: "Error!",
        text: "El formulario es invalido",
        icon: "error",
      });
    }
  }

}
