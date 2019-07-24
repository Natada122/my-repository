import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyListingPageComponent } from './property-listing-page.component';

describe('PropertyListingPageComponent', () => {
  let component: PropertyListingPageComponent;
  let fixture: ComponentFixture<PropertyListingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyListingPageComponent ]
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
