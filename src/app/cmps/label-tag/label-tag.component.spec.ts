import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelTagComponent } from './label-tag.component';

describe('LabelTagComponent', () => {
  let component: LabelTagComponent;
  let fixture: ComponentFixture<LabelTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelTagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
