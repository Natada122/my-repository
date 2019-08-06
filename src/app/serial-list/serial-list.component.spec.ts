import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerialListComponent } from './serial-list.component';

describe('SerialListComponent', () => {
  let component: SerialListComponent;
  let fixture: ComponentFixture<SerialListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerialListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
