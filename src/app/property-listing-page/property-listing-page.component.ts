import { Component, OnInit } from '@angular/core';
import { House } from '../House';
//в разработке
@Component({
  selector: 'app-property-listing-page',
  templateUrl: './property-listing-page.component.html',
  styleUrls: ['./property-listing-page.component.css']
})
export class PropertyListingPageComponent implements OnInit {
house:House;
  constructor() { }

  ngOnInit() {
  }

}
