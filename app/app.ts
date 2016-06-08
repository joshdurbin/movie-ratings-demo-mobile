import {Component, provide} from "@angular/core";
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {ListOfMoviesPage} from './pages/list-of-movies/list-of-movies';
import {AuthHttp, AuthConfig, AUTH_PROVIDERS} from 'angular2-jwt';
import {Http} from "@angular/http";

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [
    provide(AuthHttp, {
      useFactory: (http) => {
        return new AuthHttp(new AuthConfig, http);
      },
      deps: [Http]
    })
  ]
})
export class MyApp {
  rootPage: any = ListOfMoviesPage;

  constructor(platform: Platform, authHttp: AuthHttp) {
    platform.ready().then(() => {



      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);