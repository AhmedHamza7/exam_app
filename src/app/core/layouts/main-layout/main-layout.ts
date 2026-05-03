import { Component, HostListener, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayoutSidebar } from './components/main-layout-sidebar/main-layout-sidebar';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { Header } from '../../../shared/components/header/header';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [MainLayoutSidebar, Breadcrumb, Header, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  drawerOpen = signal(false);

  openDrawer(): void {
    this.drawerOpen.set(true);
  }

  closeDrawer(): void {
    this.drawerOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.drawerOpen()) {
      this.closeDrawer();
    }
  }
}
