import {Component} from '@angular/core';
import {Loading, ViewController, NavController} from 'ionic-angular';
import {OmdbAPIService} from '../../providers/omdbapi-service';

@Component({
  templateUrl: 'build/pages/add-movie-modal/add-movie-modal.html',
  providers: [OmdbAPIService]
})
export class AddMovieModalPage {

  constructor(
      private viewController: ViewController,
      private omdbapiService: OmdbAPIService,
      private navController: NavController
  ) {}

  movies: any;

  searchForMovie(searchBar) {

    let loading = Loading.create({ content: "Searching for movies..." });
    this.navController.present(loading);

    alert(searchBar);

    this.omdbapiService.searchForMovie(searchBar.value)
        .then(data => {

          loading.dismiss();
          this.movies = data;
        });
  }

  closeModalAndAddMovie(movie) {
    this.viewController.dismiss(movie);
  }

  dismiss() {
    this.viewController.dismiss();
  }
}
