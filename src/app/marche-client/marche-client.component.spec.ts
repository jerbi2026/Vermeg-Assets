import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcheClientComponent } from './marche-client.component';

describe('MarcheClientComponent', () => {
  let component: MarcheClientComponent;
  let fixture: ComponentFixture<MarcheClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarcheClientComponent]
    });
    fixture = TestBed.createComponent(MarcheClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
