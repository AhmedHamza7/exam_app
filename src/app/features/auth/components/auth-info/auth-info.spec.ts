import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthInfo } from './auth-info';

describe('AuthInfo', () => {
  let component: AuthInfo;
  let fixture: ComponentFixture<AuthInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
