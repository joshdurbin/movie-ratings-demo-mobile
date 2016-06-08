import {Component} from '@angular/core';
import {Loading, NavController, Modal} from 'ionic-angular';
import {MovieService} from '../../providers/movie-service';
import {MovieDetailPage} from '../movie-detail/movie-detail';
import {AddMovieModalPage} from '../add-movie-modal/add-movie-modal';
import {AuthService} from "../../providers/auth-service";

@Component({
  templateUrl: 'build/pages/list-of-movies/list-of-movies.html',
  providers: [MovieService, AuthService]
})
export class ListOfMoviesPage {

  movies: any;

  constructor(
      private movieService: MovieService,
      private navController: NavController,
      public auth: AuthService
  ) {

    let loading = Loading.create({ content: "Loading movies..." });
    navController.present(loading);

    movieService
        .getAllMovies()
        .then(data => {

          loading.dismiss();
          this.movies = data;
        })
  }

  goToMovieDetail(movie) {
    this.navController.push(MovieDetailPage, movie);
  }

  launchAddMovieModal() {

    let modal = Modal.create(AddMovieModalPage);
    modal.onDismiss(data => {
      console.log(JSON.stringify(data));
    });
    this.navController.present(modal);
  }

  searchForMovie(searchbar) {

    var q = searchbar.value;

    if (q.trim() == '') {

      this.movieService
          .getAllMovies()
          .then(data => {

            this.movies = data;
          })

    } else {

      let loading = Loading.create({ content: "Searching for movies..." });
      this.navController.present(loading);

      this.movieService
          .searchForMovie(q)
          .then(data => {

            loading.dismiss();
            this.movies = data;
          })
    }
  }
}