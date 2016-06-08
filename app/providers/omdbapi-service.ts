import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import * as Collections from 'typescript-collections';

@Injectable()
export class OmdbAPIService {

    movieSearchResults = new Collections.LinkedDictionary();

    constructor(private http: Http) {}

    searchForMovie(searchQuery: string) {

        let trimmedSearchQuery: String = searchQuery.trim();

        if (this.movieSearchResults.containsKey(trimmedSearchQuery)) {

            return Promise.resolve(this.movieSearchResults.getValue(trimmedSearchQuery));

        } else {

            return new Promise(resolve => {

                this.http.get('http://www.omdbapi.com/?s=' + trimmedSearchQuery)
                    .map(res => res.json())
                    .subscribe(data => {

                        let movieResults = data['Search'];

                        this.movieSearchResults.setValue(trimmedSearchQuery, movieResults);
                        resolve(this.movieSearchResults.getValue(trimmedSearchQuery));
                    });
            });
        }
    }

}