import { Component, input } from '@angular/core';
import { Diploma } from '../../../features/diplomas/models/diploma.models';

@Component({
  selector: 'app-diploma-card',
  imports: [],
  templateUrl: './diploma-card.html',
  styleUrl: './diploma-card.scss',
})
export class DiplomaCard {
  diploma = input.required<Diploma>();
}
