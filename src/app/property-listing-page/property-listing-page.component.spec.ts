import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyListingPageComponent } from './property-listing-page.component';
import { MaterialModule } from '../material/material.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SearchPageComponent } from '../search-page/search-page.component';
import { ListOfResultsComponent } from '../list-of-results/list-of-results.component';
import { FavoritesPageComponent } from '../favorites-page/favorites-page.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
describe('PropertyListingPageComponent', () => {
  let component: PropertyListingPageComponent;
  let fixture: ComponentFixture<PropertyListingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchPageComponent,ListOfResultsComponent,FavoritesPageComponent,PropertyListingPageComponent],
      imports:[MaterialModule,BrowserAnimationsModule,AppRoutingModule,FormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyListingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
