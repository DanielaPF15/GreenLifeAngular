import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { StorageService} from '../../Services/storage.service'
const swal = require('sweetalert')

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  createUserForm: FormGroup
  idUser: String
  roleUser: Boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: Router,
    private routeParams: ActivatedRoute,
    private storageService: StorageService
  ) {
    let dataUser = this.storageService.dataUser()
    if (dataUser.role == 'Voluntario'){
      this.roleUser = true
    }

    this.validator()
   }

  ngOnInit(): void {
  }
  validator(){
    this.idUser = this.routeParams.snapshot.paramMap.get('id')
    let storageUser = localStorage.getItem(`user-${this.idUser}`)
    let dataUser = JSON.parse(storageUser)
    this.createUserForm  = this.formBuilder.group({
      name: [dataUser.name, Validators.required],
      lastName: [dataUser.lastName, Validators.required],
      email: [dataUser.email, Validators.required],
      city: [dataUser.city, Validators.required],
      cellPhone: [dataUser.cellPhone, Validators.required],
      userName: [dataUser.userName, Validators.required],
      password: ['nocambiocontra'],
      role: [dataUser.role, Validators.required],
      status: [dataUser.status, Validators.required],
    })
  }

  saveUser(){
    if (this.createUserForm.valid){
      this.userService.updateUser(this.createUserForm.value, this.idUser).subscribe(
        (usercreated) => {
          
          let dataUser = this.storageService.dataUser()
          if (dataUser.role ==  'Admin'){
            
            swal({
              title: "Excelente!",
              text: "Modificado correctamente!",
              icon: "success",
            }) 
            this.route.navigate(['/list-user'])
           
          } else {
            swal({
              title: "Excelente!",
              text: "Modificado correctamente!",
              icon: "success",
            }) 
           
            this.route.navigate(['/'])
          }
          
        },
        (error) => {
          console.error('Error -> ', error)
        }
      )
    }else{
      swal({
        title: "Error!",
        text: "Todos los campos son obligatorios!",
        icon: "error",
      })
    }
  }

}
