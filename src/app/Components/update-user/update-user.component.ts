import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  createUserForm: FormGroup
  idUser: String

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: Router,
    private routeParams: ActivatedRoute
  ) {
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
      password: [dataUser.password, Validators.required],
      role: [dataUser.role, Validators.required],
      status: [dataUser.status, Validators.required],
    })
  }

  saveUser(){
    if (this.createUserForm.valid){
      this.userService.updateUser(this.createUserForm.value, this.idUser).subscribe(
        (usercreated) => {
          alert ('Usuario modificado correctamete!')
          /* swal({
            title: "Excelente!",
            text: "Usuario modificado correctamete!",
            icon: "success",
          }) */

          this.route.navigate(['/list-user'])
        },
        (error) => {
          console.error('Error -> ', error)
        }
      )
    }else{
      alert('Todos los campos son obligatorios')
      /* swal({
        title: "Error!",
        text: "Todos los campos son obligatorios!",
        icon: "error",
      })  */
    }
  }

}
