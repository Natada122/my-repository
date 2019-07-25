import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Search } from "../Search";
import { Observable } from "rxjs";
import { URL } from "../constants";
import { SEARHES_KEY,FAVORITE_KEY } from "../constants";
@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private http: HttpClient) {}
  getSearch(): Search[] {
    return localStorage.getItem(SEARHES_KEY)
      ? JSON.parse(localStorage.getItem(SEARHES_KEY))
      : [];
  }
  setSearch(lastSearches: Search[]) {
    localStorage.setItem(SEARHES_KEY, JSON.stringify(lastSearches));
  }
  getFavorites(): House[] {
    return localStorage.getItem(FAVORITE_KEY)
      ? JSON.parse(localStorage.getItem(FAVORITE_KEY))
      : [];
  }
  setFavorites(houses:House[])
  {
    localStorage.setItem(FAVORITE_KEY, JSON.stringify(houses));
  }
  getData(location: string, page = 1): Observable<House[]> {
    const url = `${URL}&page=${page}&place_name=${location}`;

    return this.http.jsonp(url, "callback").pipe(
      map(({ response }) => {
        let { listings } = response;
        return listings.map(house => {
          return {
            bathroomNumber: house.bathroom_number,
            bedroomNumber: house.bedroom_number,
            price: house.price,
            imgUrl: house.img_url,
            summary: house.summary,
            id: `f${(~~(Math.random()*1e8)).toString(16)}`
          };
        });
      })
    );
  }
}
