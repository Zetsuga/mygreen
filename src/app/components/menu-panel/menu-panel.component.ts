import { Component, OnInit } from '@angular/core';
import{faAddressBook} from '@fortawesome/free-solid-svg-icons';
import{faDoorClosed} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-menu-panel',
  templateUrl: './menu-panel.component.html',
  styleUrls: ['./menu-panel.component.css']
})
export class MenuPanelComponent implements OnInit {

<<<<<<< HEAD
  

  constructor() {

=======
  public faAddressBook;
  public faDoorClosed;

  constructor() {
    this.faAddressBook = faAddressBook;
    this.faDoorClosed = faDoorClosed;
>>>>>>> 36498eec706025d531a7cf4872e820c0ef6e8456
  }

  ngOnInit(): void {
  }

}
