import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../Models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl: String = 'https://green-life-artemisas.herokuapp.com'

  constructor(
    private http: HttpClient
  ) { }

  createCategory(fromData){
    return this.http.post<Category>(`${this.apiUrl}/category/create`, fromData)
  }
  getAll(){
    return this.http.get<Category>(`${this.apiUrl}/category/getAll`)
  }
}
