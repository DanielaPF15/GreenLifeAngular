import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { Router} from '@angular/router';
import { StorageService } from '../../Services/storage.service';
const swal = require('sweetalert')

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  allUsers : any;
  search: String;


  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.loadUser()
  }

  /* getAll(){
    this.userService.getAll().subscribe(
      (users) => {
         this.allUsers = users
         
      },
      (error) => {
        console.error('Error -> ', error)
      }
    )
  } */

  updateUser(user){
    localStorage.setItem(`user-${user._id}`, JSON.stringify(user) )
    this.route.navigate([`/update-user/${user._id}`])
  }

  removeUser(idUser){
    this.userService.deleteUser(idUser).subscribe(
      (userDeleted) => {
        swal({
          title: "Hecho!",
          text: "Usuario elimiando correctamente!",
          icon: "success",
        });

        this.route.navigateByUrl('/', { skipLocationChange: true } ).then(
          () => {
            this.route.navigate(['/list-user'])
          }
        )

      },(error) => {
        console.error('Error al eliminar el Usuario', error)
      }

    )

  }

  loadUser(){
    console.log('This.search-->',this.search)
    const filter= (typeof this.search== 'string' && this.search.length >0 ) ? `?searchBy=${this.search}` : ''
    this.userService.getAll(filter).subscribe(
      (users) =>{
        this.allUsers = users
      }, (error) =>{
        console.error('Error ->', error)
      }
    )
    console.log(this.allUsers)
  }

}
