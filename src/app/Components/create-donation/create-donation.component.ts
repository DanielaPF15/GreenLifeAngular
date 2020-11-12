import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DonationService } from '../../Services/donation.service'; 
import { StorageService } from '../../Services/storage.service';

@Component({
  selector: 'app-create-donation',
  templateUrl: './create-donation.component.html',
  styleUrls: ['./create-donation.component.css']
})
export class CreateDonationComponent implements OnInit {

  donationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: DonationService,
    private StorageService: StorageService,
    private router: Router,
  ) { this.validator() }

  ngOnInit(): void {
  }

  validator(){
    this.donationForm = this.formBuilder.group({
      entity: ['', Validators.required],
      project: ['', Validators.required],
      user: ['', Validators.required],
      description: ['', Validators.required],
      value: ['', Validators.required],
      paymentSupport: ['', Validators.required]
    })
  }

}
