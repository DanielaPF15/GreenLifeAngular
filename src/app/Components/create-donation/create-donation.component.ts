import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DonationService } from '../../Services/donation.service';
import { ProjectService } from '../../Services/project.service';
const swal = require('sweetalert')

@Component({
  selector: 'app-create-donation',
  templateUrl: './create-donation.component.html',
  styleUrls: ['./create-donation.component.css']
})
export class CreateDonationComponent implements OnInit {

  createDonationForm: FormGroup;
  allProjects: any;
  projectsExperiences:Array<any> = [];

  constructor(
    private formBuilder: FormBuilder,
    private donationService: DonationService,
    private projectService: ProjectService
  ) { 
    this.getProject();
    this.validator() 
  }

  ngOnInit(): void {
  }

  validator() {
    this.createDonationForm = this.formBuilder.group({
      entity: [''],
      project: ['', Validators.required],
      user: ['5f9898856abe9a50141cbea9', Validators.required],
      description: [''],
      value: ['', Validators.required],
      paymentSupport: ['', Validators.required]
    })
  }

  saveDonation(){
    if(this.createDonationForm.valid){
      this.donationService.createDonation(this.createDonationForm.value).subscribe(
        (donationCreated) =>{
          swal('Gracias por Donar', 'Se ha realizado la donación con éxito', 'success')
        }, (error) =>{
          console.error('Error', error)
        }
      )
    }else{
      swal('Ohh!', 'Algunos campos no pueden quedar vacios', 'error')
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

    this.createDonationForm.get('project').setValue(valueInput);

  }

}
