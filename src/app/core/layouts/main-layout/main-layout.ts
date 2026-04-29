import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayoutSidebar } from './components/main-layout-sidebar/main-layout-sidebar';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { Header } from '../../../shared/components/header/header';

@Component({
  selector: 'app-main-layout',
  imports: [MainLayoutSidebar, Breadcrumb, Header, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {

}
