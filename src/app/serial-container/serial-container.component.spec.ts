import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerialContainerComponent } from './serial-container.component';

describe('SerialContainerComponent', () => {
  let component: SerialContainerComponent;
  let fixture: ComponentFixture<SerialContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerialContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerialContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
