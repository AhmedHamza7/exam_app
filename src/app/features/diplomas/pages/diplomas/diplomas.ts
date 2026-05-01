import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SharedService } from '../../../../shared/services/shared.service';
import { DiplomasService } from '../../services/diplomas.service';
import { Diploma } from '../../models/diploma.models';
import { DiplomaCard } from '../../../../shared/components/diploma-card/diploma-card';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';


@Component({
  selector: 'app-diplomas',
  imports: [
    DiplomaCard,
    InfiniteScrollDirective,
    LoadingComponent,
    EmptyStateComponent,
  ],
  templateUrl: './diplomas.html',
  styleUrl: './diplomas.scss',
})
export class Diplomas {
  private readonly destroyRef = inject(DestroyRef);
  private sharedService = inject(SharedService);
  private diplomasService = inject(DiplomasService);

  diplomas = signal<Diploma[]>([]);
  loading = signal(false);
  isEmpty = computed(() => !this.loading() && this.diplomas().length === 0);
  diplomasParams = {
    page: 1,
    limit: 6,
  };
  totalPages = signal<number | null>(null)
  
  ngOnInit() {
    this.setHeaderData()
    this.getDiplomas()
  }

  setHeaderData(): void {
    this.sharedService.breadcrumbData.set([{ label: 'Diplomas' }]);
    this.sharedService.headerTitle.set('Diplomas');
    this.sharedService.headerIcon.set('pi pi-graduation-cap');
    this.sharedService.headerBacklink.set(undefined);
  }

  getDiplomas(): void {
    if (this.loading()) {
      return;
    }

    this.loading.set(true);
    this.diplomasService
      .getDiplomas(this.diplomasParams)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.diplomas.update(prev => [...prev, ...response.payload.data]);
          this.totalPages.set(response.payload.metadata.totalPages)
          this.loading.set(false);
        },
        error: () => {
          this.diplomas.set([]);
          this.loading.set(false);
        },
      });
  }

  onScroll() {
    if (this.diplomasParams.page == this.totalPages()) return
    this.diplomasParams.page += 1;
    this.getDiplomas();
  }
}
