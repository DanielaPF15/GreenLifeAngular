import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../Services/project.service'
import { Router} from '@angular/router'

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
})
export class ListProjectComponent implements OnInit {
  allProjects : any;

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  getAll(){
    this.projectService.getAll().subscribe(
      (projects) => {
         this.allProjects = projects
      },
      (error) => {
        console.error('Error -> ', error)
      }
    )
  }

  updateProject(project){
    localStorage.setItem(`project-${project._id}`, JSON.stringify(project) )
    this.router.navigate([`/update-user/${project._id}`])
  }

}
