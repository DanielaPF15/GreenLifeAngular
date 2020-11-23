import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Newsletter } from '../Models/newsletter';


@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  apiURL: String = 'https://green-life-artemisas.herokuapp.com';

  constructor(
    private http: HttpClient
    
  ) { }
  createNewsletter(formData){
    return this.http.post<Newsletter>(`${this.apiURL}/newsletters/create`, formData)
  }
  getAll(){
    return this.http.get(`${this.apiURL}/newsletters/getAll`)
  }
  deleteNewsletter(idnews){
    return this.http.delete(`${this.apiURL}/newsletters/deleteOne/${idnews}`)
  }
}
