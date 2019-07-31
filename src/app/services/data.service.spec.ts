import { TestBed, getTestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { DataService } from "./data.service";
import { PLACE_SEARCH,URL } from '../constants';

describe("DataService", () => {
  let http: HttpTestingController;
  let injector: TestBed;
  let service: DataService;
  beforeEach(() =>{
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    })
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
  it('should return an Observable<any>', () => {
    const response = 
      { total_result: '1000' ,
       listings: [{'price':"222"}],
       status_code:"102"
       };

    service.getData("b",PLACE_SEARCH).subscribe(data => {
      expect(data.totalResult).toEqual(1000);
      expect(data.listings.length).toEqual(1);
      expect(data.statusCode).toEqual("102");
    });

    const req = http.expectOne(`${URL}&page=1&place_name=b`);
    expect(req.request.method).toBe("GET");
    req.flush(response);
  });
});
