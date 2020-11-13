import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../Models/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  apiURL: String = 'https://green-life-artemisas.herokuapp.com';

  constructor(
    private http: HttpClient
    
  ) { }
  createProject(formData){
    return this.http.post<Project>(`${this.apiURL}/project/create`, formData)
  }
}
