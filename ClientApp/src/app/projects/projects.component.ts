import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import data from '../shared/content.json';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  img: string = "../../../assets/hero-figure.png";
  projects: typeof data.projects;
  projectCtrl = new FormControl(['ExLibris']);

  constructor() {
    this.projects = data.projects;
  }
}
