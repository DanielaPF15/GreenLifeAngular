import { Component, OnInit } from '@angular/core';
import { DonationService } from '../../Services/donation.service';
import { Router } from '@angular/router';
const swal = require('sweetalert')

@Component({
  selector: 'app-list-donation',
  templateUrl: './list-donation.component.html',
  styleUrls: ['./list-donation.component.css']
})
export class ListDonationComponent implements OnInit {

  allDonations: any;
  search: String;

  constructor(
    private donationService: DonationService,
    private route: Router,
  ) { }

  ngOnInit(): void {
    //this.getAll()
    this.loadDonation()
  }

  /*getAll() {
    this.donationService.getAll().subscribe(
      (donations) => {
        this.allDonations = donations
      },
      (error) => {
        console.log('Error ->', error)
      }
    )
  }*/

  updateDonation(donation) {
    localStorage.setItem(`donation-${donation._id}`, JSON.stringify(donation))
    this.route.navigate([`/update-donation/${donation._id}`])
  }

  removeBook(id) {
    this.donationService.deleteDonation(id).subscribe(
      (donationDeleted) => {
        swal('Proceso correcto', 'Donación eliminada correctamente', 'success')
        this.route.navigateByUrl('/', {
          skipLocationChange: true
        }).then(
          () => {
            this.route.navigate(['/list-donation'])
          }
        );
      },
      (error) => {
        console.log('Erro al eliminar una donación', error)
      }
    )
  }

  loadDonation(){
    const filter = (typeof this.search == 'string' && this.search.length > 0) ? `?searchBy=${this.search}`: ''
    this.donationService.getAll(filter).subscribe(
      (donations) =>{
        this.allDonations = donations
      },
      (error) =>{
        console.error('Error ->', error)
      }
    )
  }

}
