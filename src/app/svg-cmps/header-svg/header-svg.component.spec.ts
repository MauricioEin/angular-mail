import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSvgComponent } from './header-svg.component';

describe('HeaderSvgComponent', () => {
  let component: HeaderSvgComponent;
  let fixture: ComponentFixture<HeaderSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderSvgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
