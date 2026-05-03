import { Component, input } from '@angular/core';
import { Exam } from '../../../features/diplomas/models/exam.models';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-exam-card',
  imports: [RouterLink],
  templateUrl: './exam-card.html',
  styleUrl: './exam-card.scss',
})
export class ExamCard {
  exam = input.required<Exam>();
}
