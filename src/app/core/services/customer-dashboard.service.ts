import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CustomerDashboardService {
  private invokeFunctionSubject = new Subject<void>();
  invokeFunction$ = this.invokeFunctionSubject.asObservable();
  encrypt(txt: any): string {
    return CryptoJS.AES.encrypt(txt, 'quotes').toString();
  }
  decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, 'quotes').toString(
      CryptoJS.enc.Utf8
    );
  }
 

  

  triggerFunction() {
    this.invokeFunctionSubject.next();
  }

  constructor() { }
}
