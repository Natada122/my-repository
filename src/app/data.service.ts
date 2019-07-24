import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { House } from "./House";
import { Search } from "./Search";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private http: HttpClient) {}
  getSearch():Search[] {
    return localStorage.getItem("lastSearches")
    ? JSON.parse(localStorage.getItem("lastSearches"))
    : [];;
  }
  setSearch(lastSearches:Search[]) {
    localStorage.setItem("lastSearches", JSON.stringify(lastSearches));
  }
  getData(location: string,page=1): Observable<House[]> {
    const url = `https://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=${page}&place_name=${location}`;

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
            id:Date.now()
          };
        });
      })
    );
  }
}
