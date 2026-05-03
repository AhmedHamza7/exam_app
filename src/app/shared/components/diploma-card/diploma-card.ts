import { Component, input } from '@angular/core';
import { Diploma } from '../../../features/diplomas/models/diploma.models';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-diploma-card',
  imports: [RouterModule],
  templateUrl: './diploma-card.html',
  styleUrl: './diploma-card.scss',
})
export class DiplomaCard {
  diploma = input.required<Diploma>();
}
