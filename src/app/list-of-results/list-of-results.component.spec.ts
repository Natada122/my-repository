import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfResultsComponent } from './list-of-results.component';
import { MaterialModule } from '../material/material.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SearchPageComponent } from '../search-page/search-page.component';
import { AppRoutingModule } from '../app-routing.module';
import { FavoritesPageComponent } from '../favorites-page/favorites-page.component';
import { PropertyListingPageComponent } from '../property-listing-page/property-listing-page.component';
import { FormsModule } from '@angular/forms';

describe('ListOfResultsComponent', () => {
  let component: ListOfResultsComponent;
  let fixture: ComponentFixture<ListOfResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchPageComponent,ListOfResultsComponent,FavoritesPageComponent,PropertyListingPageComponent],
      imports:[MaterialModule,BrowserAnimationsModule,AppRoutingModule,FormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
