import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderListSvgComponent } from './folder-list-svg.component';

describe('FolderListSvgComponent', () => {
  let component: FolderListSvgComponent;
  let fixture: ComponentFixture<FolderListSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolderListSvgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FolderListSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
