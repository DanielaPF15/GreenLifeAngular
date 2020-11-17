import { Component, OnInit } from '@angular/core';
import { NewsletterService  } from '../../Services/newsletter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-newsletter',
  templateUrl: './list-newsletter.component.html',
  styleUrls: ['./list-newsletter.component.css']
})
export class ListNewsletterComponent implements OnInit {
  allnewsletter: any;
  constructor(
    private newsletterService: NewsletterService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.getAll()
  }
  getAll(){
    this.newsletterService.getAll().subscribe(
      (newsletter) => {
         this.allnewsletter = newsletter
      },
      (error) => {
        console.error('Error -> ', error)
      }
    )
  }

}
