import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcheComponent } from './marche.component';

describe('MarcheComponent', () => {
  let component: MarcheComponent;
  let fixture: ComponentFixture<MarcheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarcheComponent]
    });
    fixture = TestBed.createComponent(MarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
