import { Component, computed } from '@angular/core';
import { Breadcrumb as breadCrumbModule} from 'primeng/breadcrumb';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-breadcrumb',
  imports: [breadCrumbModule],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
})
export class Breadcrumb {

  constructor(
    private sharedService:SharedService
  ){}

  items = computed(() => this.sharedService.breadcrumbData());
}
