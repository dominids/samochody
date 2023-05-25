import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PucharseComponent } from './pucharse.component';

describe('PucharseComponent', () => {
  let component: PucharseComponent;
  let fixture: ComponentFixture<PucharseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PucharseComponent]
    });
    fixture = TestBed.createComponent(PucharseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
