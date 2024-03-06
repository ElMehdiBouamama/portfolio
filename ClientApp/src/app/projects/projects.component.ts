import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import data from '../shared/content.json';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  img: string = "../../../assets/hero-figure.png";
  //projects = ['Spotbills', 'Augurisk', 'New Wave Telecom and Technologies', 'DSI Services et Conseils'];
  projects: typeof data.projects;
  projectCtrl = new FormControl(['ExLibris']);

  constructor() {
    this.projects = data.projects;
  }
}
