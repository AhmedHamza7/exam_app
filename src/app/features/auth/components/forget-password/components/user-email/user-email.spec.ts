import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEmail } from './user-email';

describe('UserEmail', () => {
  let component: UserEmail;
  let fixture: ComponentFixture<UserEmail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserEmail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserEmail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
