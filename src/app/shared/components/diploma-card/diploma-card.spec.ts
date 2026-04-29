import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaCard } from './diploma-card';

describe('DiplomaCard', () => {
  let component: DiplomaCard;
  let fixture: ComponentFixture<DiplomaCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiplomaCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiplomaCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
