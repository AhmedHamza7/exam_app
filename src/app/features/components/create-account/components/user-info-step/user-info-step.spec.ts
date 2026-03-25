import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoStep } from './user-info-step';

describe('UserInfoStep', () => {
  let component: UserInfoStep;
  let fixture: ComponentFixture<UserInfoStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInfoStep]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInfoStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
