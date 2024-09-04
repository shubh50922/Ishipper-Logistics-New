import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { ComponentRestrictions } from 'ngx-google-places-autocomplete/objects/options/componentRestrictions';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';

import { LatLngBounds } from 'ngx-google-places-autocomplete/objects/latLngBounds';
import {LatLng} from 'ngx-google-places-autocomplete/objects/latLng';
@Component({
  selector: 'app-collection-adress',
  templateUrl: './collection-adress.component.html',
  styleUrls: ['./collection-adress.component.css']
})
export class CollectionAdressComponent implements OnInit {
  @ViewChild("placesRef1") placesRef1! : GooglePlaceDirective;
  @ViewChild("placesRef2") placesRef2!: GooglePlaceDirective;
 formattedAddress1:any=''
  formattedAddress2:any=''
 options: Options = {
  bounds: null as unknown as LatLngBounds, // or use a specific LatLngBounds object
  types: [], // You can specify place types like ['address', 'establishment'] if needed
  fields: [], // Specify fields you want to retrieve, e.g., ['formatted_address', 'geometry']
  strictBounds: false, // Keep as false if you want to allow results outside the bounds
  origin: null as unknown as LatLng, // or use a specific LatLng object if needed
  componentRestrictions: { country: 'AU' }  // Restrict to Australia
};
    
  public handleAddressChange(address: any,field: string) {
  if (field=='formattedAddress1'){
    this.formattedAddress1=address.formatted_address;
  }else if(field=='formattedAddress2'){
    this.formattedAddress2=address.formatted_address;
  }
}
public clearAddresses() {
 this.formattedAddress1 = '';
  this.formattedAddress2 = '';
  if (this.placesRef1) {
    this.placesRef1.reset(); // Clear the input field in ngx-google-places-autocomplete
  }
  if (this.placesRef2) {
    this.placesRef2.reset(); // Clear the input field in ngx-google-places-autocomplete
  }
}
  constructor() { }

  ngOnInit(): void {
  }

}
