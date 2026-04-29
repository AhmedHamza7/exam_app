import { Component } from '@angular/core';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SharedService } from '../../../../shared/services/shared.service';
@Component({
  selector: 'app-diplomas',
  imports: [],
  templateUrl: './diplomas.html',
  styleUrl: './diplomas.scss',
})
export class Diplomas {
  platformId = inject(PLATFORM_ID);
  private sharedService = inject(SharedService)
  
  constructor(){}
  ngOnInit() {
    this.sharedService.breadcrumbData.set([{label:'Diplomas'}])


    let token: string | null = null;
  
    if (isPlatformBrowser(this.platformId)) {
      const userDataString = localStorage.getItem('userData');
      const userData = userDataString ? JSON.parse(userDataString) : null;
      console.log(userData);
      console.log(userData?.token);
      
      token = userData?.token;
    }
  
    console.log(token);
  }
}
