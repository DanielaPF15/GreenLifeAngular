import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsletterService } from '../../Services/newsletter.service';

@Component({
  selector: 'app-create-newsletter',
  templateUrl: './create-newsletter.component.html',
  styleUrls: ['./create-newsletter.component.css']
})
export class CreateNewsletterComponent implements OnInit {

  createNewsletterForm: FormGroup

  constructor(

    private formBuilder: FormBuilder,
    private newsletterService: NewsletterService
  ) {
    this.validator()
   }

  ngOnInit(): void {
  }

  validator(){
    this.createNewsletterForm= this.formBuilder.group({
    title :['', Validators.required],
    description: ['', Validators.required],
    date: ['', Validators.required],
    status:[true],
    user: ['5f9898856abe9a50141cbea9'],
    })
  }

  saveNewsletter(){
    if(this.createNewsletterForm.valid){
      this.newsletterService.createNewsletter(this.createNewsletterForm.value).subscribe(
        (newslettercreated)=>{
          alert('La publicacion se creo correctamente')
        }, (error)=>{
          console.error('Error', error)

        }
      )
    } else{
      alert('Todos los campos debes estar llenos')
    }
  }

 
}
