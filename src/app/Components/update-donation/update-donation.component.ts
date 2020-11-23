import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DonationService } from '../../Services/donation.service';

@Component({
  selector: 'app-update-donation',
  templateUrl: './update-donation.component.html',
  styleUrls: ['./update-donation.component.css']
})
export class UpdateDonationComponent implements OnInit {

  createDonationForm: FormGroup;
  idDonation: String;
  

  constructor(
    private formBuilder:FormBuilder,
    private donationService: DonationService,
    private router: Router,
    private routeParams: ActivatedRoute

  ) {
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
          alert('La donación se modificó correctamente')
          this.router.navigate(['/'])
        },
        (error) => {
          console.error('Error -> ', error)
        }
      )
    }else{
      alert('Todos los campos deben esta llenos')
    }
  }

}
