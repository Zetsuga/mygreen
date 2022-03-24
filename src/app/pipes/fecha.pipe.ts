import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(fecha:Date): unknown {
    let fechaPipe: string;
    let dateTimeParts= String(fecha).split(/[- : T]/);
    if(dateTimeParts[0].length<4){
      fechaPipe = fecha.getDate()+"-"+(fecha.getMonth()+1)+"-"+fecha.getFullYear();
    }else{
      fechaPipe = dateTimeParts[2]+"-"+dateTimeParts[1]+"-"+dateTimeParts[0];
    }
    
    return fechaPipe;
  }

}
