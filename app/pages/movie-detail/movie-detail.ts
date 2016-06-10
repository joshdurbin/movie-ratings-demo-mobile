import {NavParams, Loading, ActionSheet, NavController, Toast} from 'ionic-angular';
import {MovieService} from '../../providers/movie-service';
import {Component} from "@angular/core";
import {AuthService} from "../../providers/auth-service";

@Component({
  templateUrl: 'build/pages/movie-detail/movie-detail.html',
  providers: [MovieService, AuthService]
})
export class MovieDetailPage {

  movie: any;

  constructor(
      private movieService: MovieService,
      private navParams: NavParams,
      private navController: NavController,
      public auth: AuthService
  ) {


    this.movie = this.navParams.data;
  }

  presentToast(messageToDisplay) {
    let toast = Toast.create({
      message: messageToDisplay != null ? messageToDisplay : 'Thanks for your rating!',
      duration: 3000
    });

    this.navController.present(toast);
  }

  openRatingMenu() {

    let actionSheet = ActionSheet.create({
      title: 'Rate Movie',
      buttons: [{
        text: 'Literally the best ever',
        handler: () => {
          let navTransition = actionSheet.dismiss();
          this.movieService.getAllMovies().then(() => {
            navTransition.then(() => {
              this.presentToast(null);
            });
          });
          return false;
        }
      },
      {
        text: 'I\'d see it again',
        handler: () => {
          let navTransition = actionSheet.dismiss();
          this.movieService.getAllMovies().then(() => {
            navTransition.then(() => {
              this.presentToast(null);
            });
          });
          return false;
        }
      },
      {
        text: 'Solid, watch once',
        handler: () => {
          let navTransition = actionSheet.dismiss();
          this.movieService.getAllMovies().then(() => {
            navTransition.then(() => {
              this.presentToast(null);
            });
          });
          return false;
        }
      },
      {
        text: 'Wait for VHS release',
        handler: () => {
          let navTransition = actionSheet.dismiss();
          this.movieService.getAllMovies().then(() => {
            navTransition.then(() => {
              this.presentToast(null);
            });
          });
          return false;
        }
      },
      {
        text: 'Rather clean a litter box',
        handler: () => {
          let navTransition = actionSheet.dismiss();
          this.movieService.getAllMovies().then(() => {
            navTransition.then(() => {
              this.presentToast('Sorry it as bad. Thanks for the rating!');
            });
          });
          return false;
        }
      }]
    });

    this.navController.present(actionSheet);
  }
}
