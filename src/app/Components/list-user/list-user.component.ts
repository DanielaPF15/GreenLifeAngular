import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service'
import { Router} from '@angular/router'

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  allUsers : any;


  constructor(
    private userService: UserService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.userService.getAll().subscribe(
      (users) => {
         this.allUsers = users
      },
      (error) => {
        console.error('Error -> ', error)
      }
    )
  }

  updateUser(user){
    localStorage.setItem(`user-${user._id}`, JSON.stringify(user) )
    this.route.navigate([`/update-user/${user._id}`])
  }

}
