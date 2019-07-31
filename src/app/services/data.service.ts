import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, catchError, takeUntil } from "rxjs/operators";
import { Search } from "../Search";
import { Observable, throwError, timer } from "rxjs";
import { URL } from "../constants";
import { SEARHES_KEY, FAVORITE_KEY } from "../constants";
import { generateId } from "../helpers";
@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private http: HttpClient) {}
  public getSearch(): Search[] {
    return localStorage.getItem(SEARHES_KEY)
      ? JSON.parse(localStorage.getItem(SEARHES_KEY))
      : [];
  }
  public setSearch(lastSearches: Search[]) {
    localStorage.setItem(SEARHES_KEY, JSON.stringify(lastSearches));
  }
  public getFavorites(): House[] {
    return localStorage.getItem(FAVORITE_KEY)
      ? JSON.parse(localStorage.getItem(FAVORITE_KEY))
      : [];
  }
  public setFavorites(houses: House[]) {
    localStorage.setItem(FAVORITE_KEY, JSON.stringify(houses));
  }
  public getLocations(text: string): Observable<Place[]> {
    const url = `${URL}&page=1&place_name=${text}`;
    return this.http.jsonp(url, "callback").pipe(
      map<any,any>(({ response }) => {
        let { locations } = response;
        locations = locations.map(
          (location: { place_name: string; title: string }) => {
            return {
              id: generateId(),
              placeName: location.place_name,
              title: location.title
            };
          }
        );
        return locations;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }
  public getData(
    location: string,
    typeSearch: string,
    page = 1
  ): Observable<any> {
    const timer$ = timer(5000);
    const url = `${URL}&page=${page}&${typeSearch}=${location}`;
    return this.http.jsonp(url, "callback").pipe(
      map<any,any>(({ response }) => {
        let { listings, total_results, status_code } = response;
        listings = listings.map(house => {
          return {
            bathroomNumber: house.bathroom_number,
            bedroomNumber: house.bedroom_number,
            price: house.price,
            imgUrl: house.img_url,
            summary: house.summary,
            id: generateId(),
            location: location,
            title: house.title
          };
        });

        return {
          listings,
          totalResult: total_results,
          statusCode: status_code
        };
      }),
      takeUntil(timer$),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
