import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsletterService } from '../../Services/newsletter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-newsletter',
  templateUrl: './create-newsletter.component.html',
  styleUrls: ['./create-newsletter.component.css']
})
export class CreateNewsletterComponent implements OnInit {

  createNewsletterForm: FormGroup
  allnewsletter: any;
  constructor(

    private formBuilder: FormBuilder,
    private newsletterService: NewsletterService,
    private route: Router
  ) {
    this.validator()
   }

  ngOnInit(): void {
    this.getAll()
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

          this.route.navigateByUrl('/', { skipLocationChange: true } ).then(
            () => {
              this.route.navigate(['/create-newsletter'])
            }
          )

        }, (error)=>{
          console.error('Error', error)

        }
      )
    } else{
      alert('Todos los campos debes estar llenos')
    }
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
