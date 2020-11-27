import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { ExperiencesService } from '../../Services/experiences.service';
import { ProjectService } from '../../Services/project.service';
import { StorageService } from '../../Services/storage.service';
import { Router } from '@angular/router';
const swal = require('sweetalert')


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
    private storageService: StorageService,
    private projectService: ProjectService,
    private route: Router
  ) {
    this.getProject();
    this.validator();
   }

  ngOnInit(): void {
    this.getAll();
  }

  validator(){
    let dataUser = this.storageService.dataUser();
    this.createExperiencesForm = this.formBuilder.group({
      name: [dataUser.name, Validators.required],
      project: ['', Validators.required],
      description: ['', Validators.required],
      evidence: [null],
      user: [dataUser.sub, Validators.required]
    });
  }

  saveExperiences(){
    if (this.createExperiencesForm.valid){
      this.experiencesService.createExperiences(this.createExperiencesForm.value).subscribe(
        (experiencesCreated) => {
          swal({
            title: "Excelente!",
            text: "Tu experiencia fue registrada correctamente",
            icon: "success",
          });

          this.route.navigateByUrl('/', { skipLocationChange: true } ).then(
            () => {
              this.route.navigate(['/create-experiences']);
            }
          );
        },
        (error) => {
          console.log('Error -> ', error);
        }
      );
    }else{
      swal({
        title: "Error!",
        text: "El formulario es invalido, complete todos los campos",
        icon: "error",
      });
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

  updateExperience(experience){
    localStorage.setItem(`experience-${experience._id}`, JSON.stringify(experience) )
    this.route.navigate([`/update-experience/${experience._id}`])
  }

}
