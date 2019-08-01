import { TestBed, getTestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { DataService } from "./data.service";
import { PLACE_SEARCH, URL, FAVORITE_KEY, SEARHES_KEY } from "../constants";
import {
  HttpClientJsonpModule,
  JsonpClientBackend,
  HttpBackend
} from "@angular/common/http";
import { Search } from "../Search";
import { TEST_HOUSES, TEST_SEARCHES } from "../testing";

describe("DataService", () => {
  let http: HttpTestingController;
  let injector: TestBed;
  let service: DataService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientJsonpModule],
      providers: [
        DataService,
        { provide: JsonpClientBackend, useExisting: HttpBackend }
      ]
    });
    injector = getTestBed();
    service = injector.get(DataService);
    http = injector.get(HttpTestingController);
  });
  afterEach(() => {
    http.verify();
  });
  it("should be created", () => {
    expect(service).toBeTruthy();
  });
  it("should return an Observable<any>", () => {
    const response = {
      total_result: "1000",
      listings: [{ price: "222" }],
      status_code: "102"
    };

    service.getData("b", PLACE_SEARCH).subscribe(data => {
      expect(data.totalResult).toEqual(1000);
      expect(data.listings.length).toEqual(1);
      expect(data.statusCode).toEqual("102");
    });

    const req = http.expectOne(`${URL}&page=1&place_name=b`);
    expect(req.request.method).toBe("GET");
    req.flush(response);
  });
  it("should get an House[]", () => {
    localStorage.setItem(FAVORITE_KEY, JSON.stringify(TEST_HOUSES));
    expect(service.getFavorites()).toEqual(TEST_HOUSES);
  });
  it("should set an House[]", () => {
    service.setFavorites(TEST_HOUSES);
    expect(JSON.parse(localStorage.getItem(FAVORITE_KEY))).toEqual(TEST_HOUSES);
  });
  it("should get an Search[]", () => {
    localStorage.setItem(SEARHES_KEY, JSON.stringify(TEST_SEARCHES));
    expect(service.getSearch()).toEqual(TEST_SEARCHES);
  });
  it("should set an Search[]", () => {
    service.setSearch(TEST_SEARCHES);
    expect(JSON.parse(localStorage.getItem(SEARHES_KEY))).toEqual(TEST_SEARCHES);
  });
});
