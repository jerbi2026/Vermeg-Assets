import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSendMessageComponent } from './admin-send-message.component';

describe('AdminSendMessageComponent', () => {
  let component: AdminSendMessageComponent;
  let fixture: ComponentFixture<AdminSendMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSendMessageComponent]
    });
    fixture = TestBed.createComponent(AdminSendMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
