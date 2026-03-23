import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Auth } from './features/pages/auth/auth';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, Auth],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('exam_app');
}
