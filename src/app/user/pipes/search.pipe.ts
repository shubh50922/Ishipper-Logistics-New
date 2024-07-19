import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    
    if(!value) return null
    if(!args) return null
    args=args.toLowerCase()
    return value.filter((item:any)=>{
      return item.userName.toLowerCase().includes(args) || 
      item.email.toLowerCase().includes(args);
    })
  }

}
