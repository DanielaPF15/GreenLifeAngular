import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Experiences } from '../Models/Experiences';

@Injectable({ 
  providedIn: 'root'
})
export class ExperiencesService {

  apiURL: String = 'https://green-life-artemisas.herokuapp.com';

  constructor(
    private http: HttpClient
  ) { }

  createExperiences(formData){
    return this.http.post<Experiences>(`${this.apiURL}/experiences/create`, formData);
  }

  getAll(){
    return this.http.get(`${this.apiURL}/experiences/getAll`);
  }
}
