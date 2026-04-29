import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayoutSidebar } from './main-layout-sidebar';

describe('MainLayoutSidebar', () => {
  let component: MainLayoutSidebar;
  let fixture: ComponentFixture<MainLayoutSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayoutSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainLayoutSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
