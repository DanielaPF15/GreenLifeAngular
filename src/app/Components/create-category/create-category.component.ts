import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService} from '../../Services/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  categoryForm: FormGroup

  constructor(
    private fromBuilder: FormBuilder,
    private categoryService: CategoryService
  ) { 
    this.validator()
  }

  ngOnInit(): void {
  }

  
  validator(){
    this.categoryForm= this.fromBuilder.group({
    name: ['', Validators.required],
    })
  }

  saveCategory(){
    if(this.categoryForm.valid){
      this.categoryService.createCategory(this.categoryForm.value).subscribe(
        (categoryCreated) =>{
          alert('Categoria creada correctamente')
        },
        (error)=>{
          console.error('Error ->', error)
        }
      )

    }else{
      alert('Todos los campos debes estar llenos')
    }

  }

}
