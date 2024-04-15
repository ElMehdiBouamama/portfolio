import { CdkListboxModule } from '@angular/cdk/listbox';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { GraphicsComponent } from './graphics/graphics.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { MobileMenuComponent } from './shared/mobile-menu/mobile-menu.component';
import { ProjectComponent } from './shared/project/project.component';
import { TechsComponent } from './techs/techs.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectsComponent,
    GraphicsComponent,
    AboutComponent,
    ProjectComponent,
    MobileMenuComponent,
    TechsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule,
    CommonModule,
    CdkListboxModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatExpansionModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full', data: { animation: 'Home' } },
      { path: 'projects', component: ProjectsComponent, data: { animation: 'Projects' } },
      { path: 'techs', component: TechsComponent, data: { animation: 'Techs' }, },
      { path: 'about', component: AboutComponent, data: { animation: 'About' }, }
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
