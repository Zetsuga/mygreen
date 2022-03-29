import { Component, Input, OnInit } from '@angular/core';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-boton-slice',
  templateUrl: './boton-slice.component.html',
  styleUrls: ['./boton-slice.component.css']
})
export class BotonSliceComponent implements OnInit {

@Input() usuariohijo:number;
  private RiegoActivo = false;
  private TempActivo = false;
  private HumeActivo = false;
  private Riego2Activo = false;

  constructor(private toast:ToastService) { 
    
  }
  
  ngOnInit(): void {
  }

  public mostrarToast(){
    //console.log(this.usuariohijo);
    if(this.usuariohijo == 1){
      if(!this.RiegoActivo){
        this.toast.showOk("Riego Activo","Regando");
        this.RiegoActivo = true;
      }
      else{
        this.toast.showError("Riego Desactivado","Parada");
        this.RiegoActivo = false;
      }
    }else{
      if(this.usuariohijo==2){
        if(!this.TempActivo){
          this.toast.showOk("Ventilación Activa", "Ventilando");
          this.TempActivo = true;
        }else{
          this.toast.showError("Ventilación Desactivada", "Parada");
          this.TempActivo = false;
        }
      }else{
        if (this.usuariohijo == 3){
          if(!this.HumeActivo){
            this.toast.showOk("Humidificadores Activos","Activada");
            this.HumeActivo = true;
          }else{
            this.toast.showError("Humidificadores Parados","Parada");
            this.HumeActivo = false;
          }
        }else{
          if (this.usuariohijo == null){
            if(!this.Riego2Activo){
              this.toast.showOk("Riego Activo","Regando");
              this.Riego2Activo = true;
            }
            else{
              this.toast.showError("Riego Desactivado","Parada");
              this.Riego2Activo = false;
            }
          }
        }
      }
    }
    
  }

}
