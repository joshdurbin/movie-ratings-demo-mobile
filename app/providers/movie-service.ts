import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import * as Collections from 'typescript-collections';

@Injectable()
export class MovieService {

    allMovies: any;

    movieSearchResults = new Collections.LinkedDictionary();

    constructor(private http: Http) {}

    getAllMovies() {

        if (this.allMovies) {

            return Promise.resolve(this.allMovies);
        } else {

            return new Promise(resolve => {

                this.http.get('https://movie-ratings-demo.herokuapp.com/api/movies')
                    .map(res => res.json())
                    .subscribe(data => {

                        this.allMovies = data;
                        resolve(this.allMovies);
                    });
            });
        }
    }

    searchForMovie(searchQuery: string) {

        let trimmedSearchQuery: String = searchQuery.trim();

        if (this.movieSearchResults.containsKey(trimmedSearchQuery)) {

            return Promise.resolve(this.movieSearchResults.getValue(trimmedSearchQuery));

        } else {

            return new Promise(resolve => {

                this.http.get('https://movie-ratings-demo.herokuapp.com/api/movies/search?q=' + trimmedSearchQuery)
                    .map(res => res.json())
                    .subscribe(data => {

                        this.movieSearchResults.setValue(trimmedSearchQuery, data);
                        resolve(this.movieSearchResults.getValue(trimmedSearchQuery));
                    });
            });
        }
    }

}