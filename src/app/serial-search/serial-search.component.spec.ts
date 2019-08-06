import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerialSearchComponent } from './serial-search.component';

describe('SerialSearchComponent', () => {
  let component: SerialSearchComponent;
  let fixture: ComponentFixture<SerialSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerialSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerialSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
