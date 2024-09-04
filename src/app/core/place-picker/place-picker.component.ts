
import '@googlemaps/extended-component-library/lib/api_loader/api_loader';
import '@googlemaps/extended-component-library/lib/place_picker/place_picker';


import {Component, CUSTOM_ELEMENTS_SCHEMA,OnInit} from '@angular/core';

@Component({
  selector: 'app-place-picker',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './place-picker.component.html',
  styleUrls: ['./place-picker.component.css'],
  
})
export class PlacePickerComponent implements OnInit {
  ngOnInit(): void {
  }
  protected formattedAddress = '';

  protected handlePlaceChange(e: Event) {
    this.formattedAddress = (e.target as PlacePicker).value?.formattedAddress ?? '';
  }

  constructor() { }

 

}
