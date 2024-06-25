import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfertMarcheComponent } from './transfert-marche.component';

describe('TransfertMarcheComponent', () => {
  let component: TransfertMarcheComponent;
  let fixture: ComponentFixture<TransfertMarcheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransfertMarcheComponent]
    });
    fixture = TestBed.createComponent(TransfertMarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
