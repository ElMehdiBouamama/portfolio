import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  @Input() title: string = "Climate Change Impact Forecasting Software";
  @Input() overview: string = "Augurisk is a comprehensive risk assessment platform covering risks such as Crime, Storms, Wildfires, Floods, and 8 other risk factors. It utilizes proprietary data and scoring algorithms to provide a thorough risk analysis. Augurisk's mission is to assist people and businesses in better preparing for crime and natural disasters anywhere in the US. Enterprises use Augurisk's data to decrease their risk exposure, create value for their users, and help accelerate processes and sales growth."
  @Input() responsibilities = [
    { title: "Research and Modeling", content: "Conducted in-depth research and developed models to predict the impact of climate change on properties, considering factors such as sea-level rise, extreme weather events, and changing environmental regulations." },
    { title: "Planning and Coordination", content: "Collaborated with teams to create a detailed project plan, ensuring that milestones were met and the project progressed smoothly." },
    { title: "Data Acquisition and Processing", content: "Oversaw the acquisition of data and developed algorithms to process and analyze it, ensuring accurate and reliable results." },
    { title: "Software Development", content: "Led the development of the software, including the implementation of features for data visualization, scenario analysis, and risk assessment." },
    { title: "Integration of Environmental and Social Factors", content: "Collaborated with teams to create a detailed project plan, ensuring that milestones were met and the project progressed Incorporated a wide range of environmental and social factors into the software, such as population density, infrastructure quality, and proximity to coastlines, to provide a comprehensive analysis of property risks." },
    { title: "User Interface Design", content: "Designed the user interface of the software to be intuitive and user-friendly, allowing users to easily navigate and understand the data and analysis." },
    { title: "Testing and Quality Assurance", content: "Conducted thorough testing of the software to ensure its accuracy, reliability, and effectiveness in predicting climate change impacts." }
  ]
  @Input() achievements = [
    "Successfully developed and presented Augurisk, providing investors with a powerful tool to assess the potential impact of climate change on properties.",
    "Integrated a wide range of social and environmental factors into the software, providing users with a comprehensive and accurate analysis of property risks.",
    "Designed and implemented a user-friendly interface that made complex data and analysis accessible to users, improving decision-making processes."
  ]
  @Input() mainImg = "/assets/imgs/projects/augurisk.png";
  @Input() sideImgs = [
    "/assets/imgs/projects/augurisk1.png",
    "/assets/imgs/projects/augurisk2.png",
    "/assets/imgs/projects/augurisk1.png"
  ]
}
