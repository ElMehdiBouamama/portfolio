import { Component } from '@angular/core';
import content from '../shared/content.json';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  about: { picture: string, name: string, role: string, bio: string, cta: string };
  constructor() {
    this.about = content.about;
  }
}
