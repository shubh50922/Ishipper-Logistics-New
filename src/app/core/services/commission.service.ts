import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupplierService } from './supplier.service';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CommissionService {
  apiData: any[] = [];
  serviceProviderTypes: any[] = [];
  serviceNames: string[] = [];
  private baseUrl = environment.apiUrl
  storedCommissionId!:number
//  private apiUrl = "https://gs.mt.cisinlive.com/ishipper/api"
//private apiUrl = " http://192.168.2.134:8035/api"
postCommission(data: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/Authenticate/PostCommission`, data);
}
// setCommissionId(id:number){
// this.storedCommissionId=id
// console.log("id inside service",this.storedCommissionId);

// }
// getCommissionId():number{
//   console.log("id inside get method service",this.storedCommissionId);
// return this.storedCommissionId

//}
getCommisions(){
  return this.http.get<any>(`${this.baseUrl}/Authenticate/GetCommissions`)
}
getCommissionById(id: number): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/Authenticate/GetCommissionById?id=${id}`);
}
deleteCommission(id:number):Observable<any>{
  return this.http.delete<any>(`${this.baseUrl}/Authenticate/DeleteCommission?id=${id}`);
}
updateCommission( data: any,id: number): Observable<any> {
  console.log("ggggggggggid",id, data);
  
  return this.http.post<any>(`${this.baseUrl}/Authenticate/UpdateCommission?id=${id}`, data);
}
  constructor(private http: HttpClient, private supplierservice: SupplierService) { }
}
