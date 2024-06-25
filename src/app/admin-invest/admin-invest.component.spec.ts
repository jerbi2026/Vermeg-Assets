import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInvestComponent } from './admin-invest.component';

describe('AdminInvestComponent', () => {
  let component: AdminInvestComponent;
  let fixture: ComponentFixture<AdminInvestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminInvestComponent]
    });
    fixture = TestBed.createComponent(AdminInvestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
