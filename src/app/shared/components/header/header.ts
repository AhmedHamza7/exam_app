import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private router = inject(Router);
  private sharedService = inject(SharedService);

  headerBacklink = this.sharedService.headerBacklink;
  headerTitle = this.sharedService.headerTitle;
  headerIcon = this.sharedService.headerIcon;

  goBack(): void {
    const link = this.headerBacklink();
    if (link) {
      void this.router.navigateByUrl(link);
    }
  }
}
