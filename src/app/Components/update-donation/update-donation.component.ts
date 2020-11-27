import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DonationService } from '../../Services/donation.service';
const swal = require('sweetalert')

@Component({
  selector: 'app-update-donation',
  templateUrl: './update-donation.component.html',
  styleUrls: ['./update-donation.component.css']
})
export class UpdateDonationComponent implements OnInit {

  createDonationForm: FormGroup;
  idDonation: String;
  allProject: any
  

  constructor(
    private formBuilder:FormBuilder,
    private donationService: DonationService,
    private router: Router,
    private routeParams: ActivatedRoute

  ) {
    //this.getProject()
    this.validator()
  }

  ngOnInit(): void {
  }

  validator(){
    this.idDonation = this.routeParams.snapshot.paramMap.get('id')
    let storageDonation = localStorage.getItem(`donation-${this.idDonation}`)
    let dataDonation = JSON.parse(storageDonation)

    this.createDonationForm = this.formBuilder.group({
      entity: [dataDonation.entity],
      project: [dataDonation.project],
      user: [dataDonation.user],
      description: [dataDonation.description],
      value: [dataDonation.value, Validators.required],
      paymentSupport: [dataDonation.paymentSupport, Validators.required]
    })
  }

  saveDonation(){
    if(this.createDonationForm.valid){
      this.donationService.updateDonation(this.createDonationForm.value, this.idDonation).subscribe(
        (donationCreated) =>{
          swal('Proceso correcto', 'Donación actualizada correctamente', 'success')
          this.router.navigate(['/list-donation'])
        },
        (error) => {
          console.error('Error -> ', error)
        }
      )
    }else{
      swal('Proceso Incorrecto', 'La donación no se actualizó', 'error')
    }
  }

  /*getProject(){
    this.projectService.getAll().subscribe(
      (projects) => {
        this.allProject = projects
      },
      (error) =>{
        console.error('Error -->', error)
      }
    )
  }

  saveProject(event){
    console.log(event.target.value)
    if(this.projectDonation.includes(event.target.value)){
      const index = this.projectDonation.indexOf(event.target.value)
      this.projectDonation.splice(index, 1)
    }else{
      this.projectDonation.push(event.target.value)
    }

    let valueInput: any = ''
    if(this.projectDonation.length > 0){
      valueInput = this.projectDonation
    }

    this.createDonationForm.get('project').setValue(valueInput)
  }*/

}
