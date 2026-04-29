import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamQuestions } from './exam-questions';

describe('ExamQuestions', () => {
  let component: ExamQuestions;
  let fixture: ComponentFixture<ExamQuestions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamQuestions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamQuestions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
