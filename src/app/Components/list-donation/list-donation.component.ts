import { Component, OnInit } from '@angular/core';
import { DonationService } from '../../Services/donation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-donation',
  templateUrl: './list-donation.component.html',
  styleUrls: ['./list-donation.component.css']
})
export class ListDonationComponent implements OnInit {

  allDonations: any;

  constructor(
    private donationService: DonationService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.donationService.getAll().subscribe(
      (donations) => {
        this.allDonations = donations
      },
      (error) => {
        console.log('Error ->', error)
      }
    )
  }

  updateDonation(donation){
    localStorage.setItem(`donation-${donation._id}`, JSON.stringify(donation))
    this.route.navigate([`/update-donation/${donation._id}`])
  }

}
