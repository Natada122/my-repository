import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesPageComponent } from './favorites-page.component';
import { MaterialModule } from '../material/material.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ListOfResultsComponent } from '../list-of-results/list-of-results.component';
import { SearchPageComponent } from '../search-page/search-page.component';
import { AppRoutingModule } from '../app-routing.module';
import { PropertyListingPageComponent } from '../property-listing-page/property-listing-page.component';
import { FormsModule } from '@angular/forms';

describe('FavoritesPageComponent', () => {
  let component: FavoritesPageComponent;
  let fixture: ComponentFixture<FavoritesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchPageComponent,ListOfResultsComponent,FavoritesPageComponent,PropertyListingPageComponent],
      imports:[MaterialModule,BrowserAnimationsModule,AppRoutingModule,FormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
