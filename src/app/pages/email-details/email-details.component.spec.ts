import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailDetailsComponent } from './email-details.component';

describe('EmailDetailsComponent', () => {
  let component: EmailDetailsComponent;
  let fixture: ComponentFixture<EmailDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
