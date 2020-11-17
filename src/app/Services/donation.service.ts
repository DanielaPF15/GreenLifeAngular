import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Donation } from '../Models/Donation';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  apiURL: String = 'https://green-life-artemisas.herokuapp.com';

  constructor(
    private http: HttpClient
  ) { }

  createDonation(formData){
    return this.http.post<Donation>(`${this.apiURL}/donation/create`, formData)
  }

  getAll(){
    return this.http.get(`${this.apiURL}/donation/getAll`)
  }

  updateDonation(formData, idDonation){
    return this.http.put<Donation>(`${this.apiURL}/donation/update/${idDonation}`, formData)
  }
}
