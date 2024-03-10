import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent {
  @ViewChild('burger', { static: false }) burger: ElementRef;
  @ViewChild('mainNav', { static: false }) mainNav: ElementRef;
  constructor() {
  }

  flipToogles(evt: MouseEvent) {
    this.burger.nativeElement.classList.toggle('is-open');
    this.mainNav.nativeElement.classList.toggle('is-open');
  }
}
