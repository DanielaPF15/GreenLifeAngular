import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../Services/category.service';
import { ProjectService } from '../../Services/project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  createProjectForm: FormGroup
  allCategory: any
  categoryProject: Array<any> = []

  constructor(
    private fromBuilder: FormBuilder,
    private categoryService: CategoryService,
    private projectService: ProjectService
  ) {
    this.getCategory()
    this.validator()
   }

  ngOnInit(): void {
  }

  validator(){
    this.createProjectForm= this.fromBuilder.group({
    name: ['', Validators.required],
    theme: ['', Validators.required],
    description: [''],
    city: ['',Validators.required],
    address: ['',Validators.required],
    startDate:['',Validators.required],
    endDate: ['',Validators.required],   
    limitPeople: [true],
    totalPeople:['',Validators.required],
    status:  [true],
    user: ['5f9898856abe9a50141cbea9'],
    category: ['',Validators.required],
    })
  }

  saveProject(){
    if(this.createProjectForm.valid){
      this.projectService.createProject(this.createProjectForm.value).subscribe(
        (proyectcreated)=>{
          alert('El Proyecto se creo correctamente')
        }, (error)=>{
          console.error('Error', error)

        }
      )
    } else{
      alert('Todos los campos debes estar llenos')
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
