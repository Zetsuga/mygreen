import { Component, OnInit } from '@angular/core';
import{faAddressBook} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu-panel',
  templateUrl: './menu-panel.component.html',
  styleUrls: ['./menu-panel.component.css']
})
export class MenuPanelComponent implements OnInit {

  public faAddressBook;

  constructor() {
    this.faAddressBook = faAddressBook;
  }

  ngOnInit(): void {
  }

}
