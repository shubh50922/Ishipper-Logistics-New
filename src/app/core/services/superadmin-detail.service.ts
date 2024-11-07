import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SuperadminDetailService {
// private apiUrl = "https://gs.mt.cisinlive.com/ishipper/api"
//  private apiUrl = " http://192.168.2.134:8035/api"
private baseUrl = environment.apiUrl
  constructor(private http: HttpClient) { }
  getCompanyDetails(){
    return this.http.get<any>(`${this.baseUrl}/Authenticate/GetAllCompanyDetails`)
  }
  updateCompanyStatus(data:any){
    return this.http.post<any>(`${this.baseUrl}/Authenticate/UpdateCompanyStatus`, data);
  }
  
}
