import { Component, OnInit } from '@angular/core';
import{faAddressBook} from '@fortawesome/free-solid-svg-icons';
import{faDoorClosed} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu-panel',
  templateUrl: './menu-panel.component.html',
  styleUrls: ['./menu-panel.component.css']
})
export class MenuPanelComponent implements OnInit {

  public faAddressBook;
  public faDoorClosed;

  constructor() {
    this.faAddressBook = faAddressBook;
    this.faDoorClosed = faDoorClosed;
  }

  ngOnInit(): void {
  }

}
