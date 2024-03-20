import { Component } from '@angular/core';

@Component({
  selector: 'app-techs',
  templateUrl: './techs.component.html',
  styleUrls: ['./techs.component.scss']
})
export class TechsComponent {
  categories = [
    {
      name: "FrontEnd", technologies: [
        {name: "Angular", img: "", link: ""}
      ]
    },
    {
      name: "BackEnd", technologies: [
        {name: "Angular", img: "", link: ""}
      ]
    },
    {
      name: "Datascience", technologies: [
        {name: "Angular", img: "", link: ""}
      ]
    },
    {
      name: "Cloud", technologies: [
        {name: "Angular", img: "", link: ""}
      ]
    },
    {
      name: "Databases", technologies: [
        {name: "Angular", img: "", link: ""}
      ]
    },
    {
      name: "Project Management", technologies: [
        {name: "Angular", img: "", link: ""}
      ]
    }
  ]
}
