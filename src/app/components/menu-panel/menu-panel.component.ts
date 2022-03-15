import { Component, OnInit } from '@angular/core';
import{faAddressBook} from '@fortawesome/free-solid-svg-icons';
import{faDoorClosed} from '@fortawesome/free-solid-svg-icons';
import { UsuarioService } from 'src/app/shared/usuario.service';


@Component({
  selector: 'app-menu-panel',
  templateUrl: './menu-panel.component.html',
  styleUrls: ['./menu-panel.component.css']
})
export class MenuPanelComponent implements OnInit {

  public faAddressBook;
  public faDoorClosed;
  
  constructor(public usuario:UsuarioService) {
    this.faAddressBook = faAddressBook;
    this.faDoorClosed = faDoorClosed;
  }

  ngOnInit(): void {
  }

}
