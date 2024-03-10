import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class transitionService {
  private _currentPage = 'Home';
  isLoaded$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  get currentPage() {
    return this._currentPage;
  }
  set currentPage(page: string) {
    this._currentPage = page;
  }

  constructor() {

  }
}
