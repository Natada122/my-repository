import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { URL } from "../constants";

@Injectable({
  providedIn: "root"
})
export class SerialService {
  public getSerials(query: string): Observable<ISerial[]> {
    const url = ` ${URL}${query}`;
    return this.http.get<IResponse[]>(url).pipe(
      map(data =>
        data.map(({ show }) => {
          return {
            id: show.id,
            name: show.name,
            genres: show.genres,
            image: show.image ? show.image.medium : null,
            status: show.status,
            summary: show.summary
          };
        })
      )
    );
  }
  constructor(private http: HttpClient) {}
}
