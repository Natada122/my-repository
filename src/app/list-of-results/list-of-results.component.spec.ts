import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ListOfResultsComponent } from "./list-of-results.component";
import { MaterialModule } from "../material/material.module";
import { SearchPageComponent } from "../search-page/search-page.component";
import { FavoritesPageComponent } from "../favorites-page/favorites-page.component";
import { PropertyListingPageComponent } from "../property-listing-page/property-listing-page.component";
import { RouterTestingModule } from "@angular/router/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { DataService } from "../services/data.service";
import { ActivatedRoute, convertToParamMap } from "@angular/router";
import { of, from } from "rxjs";
import { By } from "@angular/platform-browser";
import { TEST_HOUSES, DATA_SERVICE_MOCK } from "../testing";

describe("ListOfResultsComponent", () => {
  let component: ListOfResultsComponent;
  let fixture: ComponentFixture<ListOfResultsComponent>;
  let dataService: DataService;
  let element: any;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchPageComponent,
        ListOfResultsComponent,
        FavoritesPageComponent,
        PropertyListingPageComponent
      ],
      imports: [MaterialModule, RouterTestingModule],
      providers: [
        { provide: DataService, useValue: DATA_SERVICE_MOCK },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ location: "bat" })
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfResultsComponent);
    component = fixture.componentInstance;
    dataService = TestBed.get(DataService);
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should call load", () => {
    const getLoadSpy = spyOn(component, "load");
    element.query(By.css("button")).nativeElement.click();
    expect(getLoadSpy).toHaveBeenCalled();
  });
  it("should load new listings", () => {
    component.curSearch.listings = [];
    component.load();
    expect(component.curSearch.listings).toEqual(TEST_HOUSES);
  });
  it("should call setSearch", () => {
    const setSearchSpy = spyOn(dataService, "setSearch");
    component.ngOnDestroy();
    expect(setSearchSpy).toHaveBeenCalled();
  });
  it(`should render houses`, () => {
    const [house] = TEST_HOUSES;
    component.curSearch.listings = TEST_HOUSES;
    fixture.detectChanges();
    expect(
      element.query(By.css("mat-card-title > h1")).nativeElement.textContent
    ).toContain("$1,220.00");
    expect(
      element.query(By.css("mat-card-content > p")).nativeElement.textContent
    ).toContain(house.summary);
    expect(
      element.query(By.css("img")).nativeElement.getAttribute("src")
    ).toEqual(house.imgUrl);
  });
});
