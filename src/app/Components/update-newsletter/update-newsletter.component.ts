import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NewsletterService } from '../../Services/newsletter.service';
import * as moment from 'moment';
const swal = require('sweetalert')


@Component({
  selector: 'app-update-newsletter',
  templateUrl: './update-newsletter.component.html',
  styleUrls: ['./update-newsletter.component.css']
})
export class UpdateNewsletterComponent implements OnInit {
 

 createNewsletterForm: FormGroup;
  idNews: String;
   constructor(  
    private formBuilder:FormBuilder,
    private newsletterService: NewsletterService,
    private routeParams: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    this.validator()
  }
  validator(){
    this.idNews = this.routeParams.snapshot.paramMap.get('id')
    let storageNewsletter = localStorage.getItem(`newsletter-${this.idNews}`)
    let dataNewsletter = JSON.parse(storageNewsletter)
    const date = moment(dataNewsletter.date).format('YYYY-MM-DD')

    this.createNewsletterForm = this.formBuilder.group({
      title: [dataNewsletter.title, Validators.required],
      description: [dataNewsletter.description, Validators.required],
     date: [date, Validators.required],
    status:[true],
    user: ['5f9898856abe9a50141cbea9'],
    })
  }

  saveNewsletter(){
    if(this.createNewsletterForm.valid){
      this.newsletterService.updateNewsletter(this.createNewsletterForm.value, this.idNews).subscribe(
        (newsletterCreated) =>{
          swal({
            title: "Perfecto!",
            text: "La publicación se actualizo correctamente!",
            icon: "success",
          }) 
          this.router.navigate(['/create-newsletter'])
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
