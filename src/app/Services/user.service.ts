import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: String = 'https://green-life-artemisas.herokuapp.com'
  constructor(
    private http: HttpClient
  ) { }

  createUser(formData){
    return this.http.post<User>(`${this.apiUrl}/user/create`, formData)
  }
}

