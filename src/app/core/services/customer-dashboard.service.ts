import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerDashboardService {
  encrypt(txt: any): string {
    return CryptoJS.AES.encrypt(txt, 'quotes').toString();
  }
  decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, 'quotes').toString(
      CryptoJS.enc.Utf8
    );
  }
  

  constructor() { }
}
