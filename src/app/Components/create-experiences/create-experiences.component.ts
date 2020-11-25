import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { ExperiencesService } from '../../Services/experiences.service';
import { ProjectService } from '../../Services/project.service'; 


@Component({
  selector: 'app-create-experiences',
  templateUrl: './create-experiences.component.html',
  styleUrls: ['./create-experiences.component.css']
})
export class CreateExperiencesComponent implements OnInit {

  createExperiencesForm: FormGroup;
  allProjects: any;
  allExperiences: any;
  projectsExperiences:Array<any> = [];

  constructor(
    private formBuilder: FormBuilder,
    private experiencesService: ExperiencesService,
    private projectService: ProjectService
  ) {
    this.getProject();
    this.validator();
   }

  ngOnInit(): void {
    this.getAll();
  }

  validator(){
    this.createExperiencesForm = this.formBuilder.group({
      name: ['', Validators.required],
      project: ['', Validators.required],
      description: ['', Validators.required],
      evidence: ['', Validators.required]
    });
  }

  saveExperiences(){
    if (this.createExperiencesForm.valid){
      this.experiencesService.createExperiences(this.createExperiencesForm.value).subscribe(
        (experiencesCreated) => {
          alert('La experiencia se creo correctamente');
        },
        (error) => {
          console.log('Error -> ', error);
        }
      );
    }else{
      alert('Todos los campos deben estar llenos');
    }
  }

  getProject(){
    this.projectService.getAll().subscribe(
      (project) => {
        this.allProjects = project;
      },
      (error) => {
        console.log('Error -> ', error);
      }
    );
  }

  saveProject(event){
    console.log(event.target.value);

    if(this.projectsExperiences.includes(event.target.value)){
      const index = this.projectsExperiences.indexOf(event.target.value);
      this.projectsExperiences.splice(index, 1);
    }else{
      this.projectsExperiences.push(event.target.value);
    }

    let valueInput: any = '';

    if (this.projectsExperiences.length > 0){
      valueInput = this.projectsExperiences;
    }

    this.createExperiencesForm.get('project').setValue(valueInput);

  }

  getAll(){
    this.experiencesService.getAll().subscribe(
      (experiences) => {
         this.allExperiences = experiences;
      },
      (error) => {
        console.error('Error -> ', error);
      }
    );
  }

}
