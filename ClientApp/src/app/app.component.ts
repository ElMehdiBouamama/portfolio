import { Component } from '@angular/core';
import { ChildrenOutletContexts, Router } from '@angular/router';
import { slideInAnimation } from './shared/route-animation';
import { transitionService } from './shared/transition.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [slideInAnimation]
})
export class AppComponent {
  private currentRoute = undefined;
  constructor(private contexts: ChildrenOutletContexts, router: Router, private transitionService: transitionService) {
    window.addEventListener("keydown", (e) => {
      e.stopPropagation();
      if (e.key == "ArrowDown" && transitionService.currentPage == "Home") {
        router.navigate(["/projects"]);
      } else if (e.key == "ArrowLeft") {
        if (transitionService.currentPage == 'Techs') {
          router.navigate(["/"]);
        } else {
          router.navigate(["/about"]);
        }
      } else if (e.key == "ArrowRight") {
        if (transitionService.currentPage == "About") {
          router.navigate(["/"]);
        } else {
          router.navigate(["/techs"]);
        }
      } else if (e.key == "ArrowUp" && transitionService.currentPage == "Projects") {
        router.navigate(["/"]);
      }
    });
  }

  getRouteAnimationData() {
    const nextRoute = this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
    if (this.currentRoute != nextRoute) {
      this.currentRoute = nextRoute;
      this.transitionService.currentPage = nextRoute;
      return this.currentRoute;
    }
    return this.currentRoute;
  }
}
