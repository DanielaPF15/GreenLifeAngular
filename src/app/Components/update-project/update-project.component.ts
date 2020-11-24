import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../Services/project.service';
import { CategoryService } from '../../Services/category.service';

import * as moment from 'moment';
const swal = require('sweetalert')

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {

  createProjectForm: FormGroup;
  idProject: String;
  allCategory: any;
  categoryProject: Array<any> = []

  constructor(
    private formBuilder:FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private routeParams: ActivatedRoute,
    private categoryService: CategoryService
    
  ) { 
    this.getCategory()
    this.validator()
    
  }

  ngOnInit(): void {
  }
  validator(){
    this.idProject = this.routeParams.snapshot.paramMap.get('id')
    let storageProject = localStorage.getItem(`project-${this.idProject}`)
    let dataProject = JSON.parse(storageProject)

  /*   dataProject.category.forEach(category => {
      this.categoryProject.push(category._id)
    }); */
    
       
    const startDate = moment(dataProject.startDate).format('YYYY-MM-DD')
    const endDate = moment(dataProject.endDate).format('YYYY-MM-DD')
 
    this.createProjectForm = this.formBuilder.group({
    name:       [dataProject.name, Validators.required],
    theme:      [dataProject.theme, Validators.required],
    description:[dataProject.description, Validators.required],
    city:       [dataProject.city, Validators.required],
    address:    [dataProject.address, Validators.required],
    startDate:  [startDate, Validators.required],
    endDate:    [endDate, Validators.required],
    limitPeople:[dataProject.limitPeople, Validators.required],
    totalPeople:[dataProject.totalPeople, Validators.required],
    status:     [true, Validators.required],
    user:       ['5fb953daa0fe3800241ec301', Validators.required],
    category:   [this.categoryProject, Validators.required]

    })

  }
  saveProject(){
    if (this.createProjectForm.valid){
      this.projectService.updateProject(this.createProjectForm.value, this.idProject).subscribe(
        (projectcreated) => {
          
          swal({
            title: "Excelente!",
            text: "Proyecto modificado correctamete!",
            icon: "success",
          }) 

          this.router.navigate(['/list-project'])
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
  getCategory(){
    this.categoryService.getAll().subscribe(
      (categorys) => {
        this.allCategory = categorys
      }, 
      (error) => {
        console.error('Error -> ', error)
      }
    )
  }
  saveCategory(event){
    console.log(event.target.value)
    if( this.categoryProject.includes(event.target.value) ){
      const index = this.categoryProject.indexOf(event.target.value)
      this.categoryProject.splice(index, 1)
    }else{
      this.categoryProject.push(event.target.value)
    }

    let valueInput: any = ''
    if(this.categoryProject.length > 0){
      valueInput = this.categoryProject
    }

    this.createProjectForm.get('category').setValue(valueInput)
  }

  

}
