import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-techs',
  templateUrl: './techs.component.html',
  styleUrls: ['./techs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TechsComponent {
  @ViewChild('tabGroup', { static: true }) tabGroup: MatTabGroup;
  public selected: number;
  private swipeCoord?: [number, number];
  private swipeTime?: number;
  categories = [
    {
      name: "FrontEnd", technologies: [
        { name: "Angular2+", img: "/assets/imgs/logos/angular.webp", link: "https://angular.io/" },
        { name: "Typescript", img: "/assets/imgs/logos/typescript.webp", link: "https://www.typescriptlang.org/" },
        { name: "HTML5", img: "/assets/imgs/logos/html5.webp", link: "https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5" },
        { name: "CSS3", img: "/assets/imgs/logos/css3.webp", link: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
        { name: "NGRX", img: "/assets/imgs/logos/ngrx.webp", link: "https://ngrx.io/" },
        { name: "RXJS", img: "/assets/imgs/logos/rxjs.webp", link: "https://rxjs.dev/" },
        { name: "Ionic", img: "/assets/imgs/logos/ionic.webp", link: "https://ionicframework.com/" },
        { name: "Javascript", img: "/assets/imgs/logos/javascript.webp", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
        { name: "Apache Cordova", img: "/assets/imgs/logos/cordova.webp", link: "https://cordova.apache.org/" },
        { name: "JSON", img: "/assets/imgs/logos/json.webp", link: "https://www.json.org/" }
      ]
    },
    {
      name: "BackEnd", technologies: [
        { name: "ASP.NET", img: "/assets/imgs/logos/asp.net.webp", link: "https://dotnet.microsoft.com/apps/aspnet" },
        { name: "NodeJS", img: "/assets/imgs/logos/nodejs.webp", link: "https://nodejs.org/" },
        { name: "Express", img: "/assets/imgs/logos/express.webp", link: "https://expressjs.com/" },
        { name: "Django", img: "/assets/imgs/logos/django.webp", link: "https://www.djangoproject.com/" },
        { name: "JEE", img: "/assets/imgs/logos/jee.webp", link: "https://www.oracle.com/java/technologies/java-ee-glance.html" },
        { name: "Redis", img: "/assets/imgs/logos/redis.webp", link: "https://redis.io/" },
        { name: "RabbitMQ", img: "/assets/imgs/logos/rabbitmq.webp", link: "https://www.rabbitmq.com/" },
        { name: "Seq Log", img: "/assets/imgs/logos/seqlog.webp", link: "https://datalust.co/seq" },
        { name: "Envoy Proxy", img: "/assets/imgs/logos/envoy proxy.webp", link: "https://www.envoyproxy.io/" },
        { name: "GRPC", img: "/assets/imgs/logos/grpc.webp", link: "https://grpc.io/" },
        { name: "Bash", img: "/assets/imgs/logos/bash.webp", link: "https://www.gnu.org/software/bash/" },
        { name: "Linux", img: "/assets/imgs/logos/linux.webp", link: "https://www.linux.org/" }
      ]
    },
    {
      name: "Datascience", technologies: [
        { name: "Python", img: "/assets/imgs/logos/python.webp", link: "https://www.python.org/" },
        { name: "Matlab", img: "/assets/imgs/logos/matlab.webp", link: "https://www.mathworks.com/products/matlab.html" },
        { name: "Tensorflow", img: "/assets/imgs/logos/tensorflow.webp", link: "https://www.tensorflow.org/" },
        { name: "Tensorboard", img: "/assets/imgs/logos/tensorboard.webp", link: "https://www.tensorflow.org/tensorboard" },
        { name: "Numpy", img: "/assets/imgs/logos/numpy.webp", link: "https://numpy.org/" },
        { name: "Matplotlib", img: "/assets/imgs/logos/matplotlib.webp", link: "https://matplotlib.org/" },
        { name: "Pandas", img: "/assets/imgs/logos/pandas.webp", link: "https://pandas.pydata.org/" },
        { name: "ScikitLearn", img: "/assets/imgs/logos/scikitlearn.webp", link: "https://scikit-learn.org/" },
        { name: "Seaborn", img: "/assets/imgs/logos/seaborn.webp", link: "https://seaborn.pydata.org/" },
        { name: "Scrappy", img: "/assets/imgs/logos/scrapy.webp", link: "https://scrapy.org/" },
        { name: "Beautiful Soup", img: "/assets/imgs/logos/bs.webp", link: "https://www.crummy.com/software/BeautifulSoup/" }
      ]
    },
    {
      name: "Cloud", technologies: [
        { name: "GCP", img: "/assets/imgs/logos/gcp.webp", link: "https://cloud.google.com/" },
        { name: "Azure", img: "/assets/imgs/logos/azure.webp", link: "https://azure.microsoft.com/" },
        { name: "AWS", img: "/assets/imgs/logos/aws.webp", link: "https://aws.amazon.com/" },
        { name: "Kafka", img: "/assets/imgs/logos/kafka.webp", link: "https://kafka.apache.org/" },
        { name: "Hadoop", img: "/assets/imgs/logos/hadoop.webp", link: "https://hadoop.apache.org/" },
        { name: "Hive", img: "/assets/imgs/logos/hive.webp", link: "https://hive.apache.org/" },
        { name: "Spark", img: "/assets/imgs/logos/spark.webp", link: "https://spark.apache.org/" }
      ]
    },
    {
      name: "Databases", technologies: [
        { name: "SQL Server", img: "/assets/imgs/logos/sql server.webp", link: "https://www.microsoft.com/en-us/sql-server" },
        { name: "EFCore", img: "/assets/imgs/logos/efcore.webp", link: "https://docs.microsoft.com/en-us/ef/core/" },
        { name: "Identity Framework", img: "/assets/imgs/logos/identity.webp", link: "https://docs.microsoft.com/en-us/aspnet/identity/" },
        { name: "MangoDB", img: "/assets/imgs/logos/mangodb.webp", link: "https://www.mongodb.com/" },
        { name: "Firebase", img: "/assets/imgs/logos/firebase.webp", link: "https://firebase.google.com/" },
        { name: "IPFS", img: "/assets/imgs/logos/ipfs.webp", link: "https://ipfs.io/" }
      ]
    },
    {
      name: "Project Management", technologies: [
        { name: "Scrum", img: "/assets/imgs/logos/scrum.webp", link: "https://www.scrum.org/" },
        { name: "Extreme Programming", img: "/assets/imgs/logos/extremeprogrmaming.webp", link: "http://www.extremeprogramming.org/" },
        { name: "Google Design Sprint", img: "/assets/imgs/logos/googledesignsprint.webp", link: "https://designsprintkit.withgoogle.com/" }
      ]
    }
  ];

  openTechPage(technology: { name: string, img: string, link: string }) {
    window.open(technology.link);
  }

  swipe(e: TouchEvent, when: string): void {
    const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
    const time = new Date().getTime();

    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    } else if (when === 'end' && this.swipeCoord && this.swipeTime) {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;

      if (duration < 1000 //
        && Math.abs(direction[0]) > 30 // Long enough
        && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough
        const swipe = direction[0] < 0 ? 'next' : 'previous';
        switch (swipe) {
          case 'previous':
            if (this.selected > 0) { this.selected--; }
            break;
          case 'next':
            if (this.tabGroup && this.selected < this.tabGroup._tabs.length - 1) { this.selected++; }
            break;
        }
      }
    }
  }

}
