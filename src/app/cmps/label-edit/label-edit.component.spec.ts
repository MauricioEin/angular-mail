import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelEditComponent } from './label-edit.component';

describe('LabelEditComponent', () => {
  let component: LabelEditComponent;
  let fixture: ComponentFixture<LabelEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
