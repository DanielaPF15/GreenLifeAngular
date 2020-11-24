import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'; //Validar los formularios
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { StorageService } from '../../Services/storage.service';
const swal = require('sweetalert')

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private StorageService: StorageService,
    private router: Router,

  ) { this.validator() }

  ngOnInit(): void {
  }

  validator(){
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  login(){
    if(this.loginForm.valid){
      this.userService.login(this.loginForm.value).subscribe(
        (dataUser) =>{
          this.StorageService.saveToken(dataUser['token'])
          const infoUser = this.StorageService.dataUser()
          if(infoUser.role == 'Admin'){
            this.router.navigate(['/'])
            swal({
              title: "Bienvenido Admin! 🌻🍀",
              text: "🍃Gracias por hacer parte de esta hermosa causa🌱",
              button: "Aww yiss!🌺"
            });
    
            }else{
              swal({
                title: "Bienvenido a GreenLife Voluntario! 🌷🌻",
                text: "🍃Gracias por unirte a esta hermosa causa🌱",
                button: "Aww yiss!🌺"
              });
              this.router.navigate(['/'])
            }
        },
        (error) =>{
          swal({
            title: "Error!",
            text: "Los campos no coinciden",
            icon: "error",
          });
          console.log('Error --->', error)
        }
      )
    }else{
      swal({
        title: "Alto!",
        text: "Debes llenar todos los campos",
        icon: "warning",
      });
    }
  }
}
