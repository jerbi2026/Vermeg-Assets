import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAdminsComponent } from './contact-admins.component';

describe('ContactAdminsComponent', () => {
  let component: ContactAdminsComponent;
  let fixture: ComponentFixture<ContactAdminsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactAdminsComponent]
    });
    fixture = TestBed.createComponent(ContactAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
