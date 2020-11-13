import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DonationService } from '../../Services/donation.service';

@Component({
  selector: 'app-create-donation',
  templateUrl: './create-donation.component.html',
  styleUrls: ['./create-donation.component.css']
})
export class CreateDonationComponent implements OnInit {

  createDonationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private donationService: DonationService,
  ) { this.validator() }

  ngOnInit(): void {
  }

  validator() {
    this.createDonationForm = this.formBuilder.group({
      entity: [''],
      project: ['5f9898856abe9a50141cbea9', Validators.required],
      user: ['5f9898856abe9a50141cbea9'],
      description: [''],
      value: ['', Validators.required],
      paymentSupport: ['', Validators.required]
    })
  }

  saveDonation(){
    if(this.createDonationForm.valid){
      this.donationService.createDonation(this.createDonationForm.value).subscribe(
        (donationCreated) =>{
          alert('La donación se registró correctamente')
        }, (error) =>{
          console.error('Error', error)
        }
      )
    }else{
      alert('Todos los campos deben estar llenos')
    }
  }

}
