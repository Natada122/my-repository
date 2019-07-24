import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfResultsComponent } from './list-of-results.component';

describe('ListOfResultsComponent', () => {
  let component: ListOfResultsComponent;
  let fixture: ComponentFixture<ListOfResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfResultsComponent ]
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
