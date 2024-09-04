import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MergeService {
private apiUrl = "https://gs.mt.cisinlive.com/ishipper/api"
  constructor(private http: HttpClient) { }
  getIShipperCalculation(quotationId: string, userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/Merged/GetIShipperCalculation?quotationId=${quotationId}&UserId=${userId}`);
  }
  getinsuranceList():Observable<any> {
   
    return this.http.get<any>(`${this.apiUrl}/FastCourierAPIIntegration/GetInsuranceList`);
  }
}
