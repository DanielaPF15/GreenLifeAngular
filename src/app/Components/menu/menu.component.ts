import { Component, OnInit } from '@angular/core';
/* import { UserService } from '../../Services/user.service'; */
import { StorageService} from '../../Services/storage.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  user
  /* allUsers : any; */

  constructor(
    private storageService: StorageService,
    private router: Router,
    /* private userService = UserService */
  ) { 
    this.storageService.auth$.subscribe(
      (userAuth) =>{
        this.user = userAuth
      }
    )
  }

  ngOnInit(): void {
    /* this.getAll() */
  }

  destroySession(){
    this.storageService.removeSession(),
    this.router.navigate(['/'])
  }

  updateUser(user){
    let dataUser = this.storageService.dataUser();
    localStorage.setItem(`user-${dataUser.sub}`, JSON.stringify(user) )
    this.router.navigate([`/update-user/${dataUser.sub}`])
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



}
