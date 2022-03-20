import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toast : ToastrService) { }

  public showError(mensaje:string,titulo:string){
    this.toast.error(mensaje,titulo);
  }

  public showOk(mensaje:string,titulo:string){
    this.toast.success(mensaje,titulo);
  }
  
}
