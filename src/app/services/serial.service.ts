import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {URL} from "../constants"

@Injectable({
  providedIn: "root"
})
export class SerialService {
  public getSerials(query: string): Observable<ISerial[]> {
    const url = ` ${URL}${query}`;
    return this.http.get<IResponse[]>(url).pipe(
      map(data =>
        data.map(value => {
          return {
            id: value.show.id,
            name: value.show.name,
            genres: value.show.genres,
            image: value.show.image ? value.show.image.medium : null,
            status: value.show.status,
            summary: value.show.summary
          };
        })
      )
    );
  }
  constructor(private http: HttpClient) {}
}
