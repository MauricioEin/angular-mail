import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAppComponent } from './item-app.component';

describe('ItemAppComponent', () => {
  let component: ItemAppComponent;
  let fixture: ComponentFixture<ItemAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
