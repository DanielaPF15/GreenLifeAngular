import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../Services/project.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {

  createProjectForm: FormGroup;
  idProject: String;
  allCategory: any;

  constructor(
    private formBuilder:FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private routeParams: ActivatedRoute
  ) { 
    this.validator()
  }

  ngOnInit(): void {
  }
  validator(){
    this.idProject = this.routeParams.snapshot.paramMap.get('id')
    let storageProject = localStorage.getItem(`project-${this.idProject}`)
    let dataProject = JSON.parse(storageProject)

    this.createProjectForm = this.formBuilder.group({
    name:       [dataProject.name, Validators.required],
    theme:      [dataProject.theme, Validators.required],
    description:[dataProject.description, Validators.required],
    city:       [dataProject.city, Validators.required],
    address:    [dataProject.address, Validators.required],
    startDate:  [dataProject.startDate, Validators.required],
    endDate:    [dataProject.endDate, Validators.required],
    limitPeople:[dataProject.limitPeople, Validators.required],
    totalPeople:[dataProject.totalPeople, Validators.required],
    status:     [dataProject.status, Validators.required],
    user:       ['', Validators.required],
    category:   ['', Validators.required]

    })

  }
  saveProject(){
    if (this.createProjectForm.valid){
      this.projectService.updateProject(this.createProjectForm.value, this.idProject).subscribe(
        (projectcreated) => {
          alert ('Proyecto modificado correctamete!')
          /* swal({
            title: "Excelente!",
            text: "Proyecto modificado correctamete!",
            icon: "success",
          }) */

          this.router.navigate(['/list-project'])
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
