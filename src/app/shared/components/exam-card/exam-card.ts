import { Component, input } from '@angular/core';
import { Exam } from '../../../features/diplomas/models/exam.models';

@Component({
  selector: 'app-exam-card',
  imports: [],
  templateUrl: './exam-card.html',
  styleUrl: './exam-card.scss',
})
export class ExamCard {
  exam = input.required<Exam>();
}
