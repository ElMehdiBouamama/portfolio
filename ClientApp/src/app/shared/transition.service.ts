import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class transitionService {
  private _currentPage = 'Home';
  get currentPage() {
    return this._currentPage;
  }
  set currentPage(page: string) {
    this._currentPage = page;
  }

  constructor() {

  }
}
