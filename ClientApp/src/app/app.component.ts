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
      if (e.key == "ArrowDown" && transitionService.currentPage != "About") {
        router.navigate(["/projects"]);
      } else if (e.key == "ArrowLeft" && transitionService.currentPage != "Projects") {
        router.navigate(["/about"]);
      } else if (
        (e.key == "ArrowUp" && transitionService.currentPage != "About") ||
        (e.key == "ArrowRight" && transitionService.currentPage != "Projects")) {
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
