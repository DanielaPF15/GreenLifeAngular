import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../Services/project.service'
import { Router} from '@angular/router'
import { CategoryService } from '../../Services/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
})
export class ListProjectComponent implements OnInit {
  allProjects : any;
  createProjectForm: FormGroup
  allCategory: any
  categoryProject: Array<any> = []
  constructor(
    private projectService: ProjectService,
    private router: Router,
    private categoryService: CategoryService,  
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.getAll()
    this.validator()
    this.getCategory()

  }
  validator(){
    this.createProjectForm= this.formBuilder.group({
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
          this.router.navigateByUrl('/', { skipLocationChange: true } ).then(
            () => {
              this.router.navigate(['/list-project'])
            }
          )
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

  getAll(){
    this.projectService.getAll().subscribe(
      (projects) => {
         this.allProjects = projects
         console.log(this.allProjects)
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

