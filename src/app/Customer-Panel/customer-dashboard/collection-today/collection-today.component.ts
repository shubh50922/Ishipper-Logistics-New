import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collection-today',
  templateUrl: './collection-today.component.html',
  styleUrls: ['./collection-today.component.css']
})
export class CollectionTodayComponent implements OnInit {
  collectionDate!:Date
Quotes!:any[]
  constructor() { }
  getQuotes(){
    const formdata=localStorage.getItem('formValue')
    const parsedForm = formdata?JSON.parse(formdata):[]
this.collectionDate=parsedForm.dateOfApplicable
console.log(this.collectionDate);

const data =localStorage.getItem('quotes')
const parsedData=data ? JSON.parse(data) : [];
console.log("data in collection today",parsedData);
this.Quotes=parsedData
  }

  ngOnInit(): void {
    this.getQuotes()
  }

}
