import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SuperadminDetailService {
private apiUrl = "https://gs.mt.cisinlive.com/ishipper/api"
  constructor(private http: HttpClient) { }
  getCompanyDetails(){
    return this.http.get<any>(`${this.apiUrl}/Authenticate/GetAllCompanyDetails`)
  }
  updateCompanyStatus(data:any){
    return this.http.post<any>(`${this.apiUrl}/Authenticate/UpdateCompanyStatus`, data);
  }
  
}
