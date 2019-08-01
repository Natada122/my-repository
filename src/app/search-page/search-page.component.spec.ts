import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SearchPageComponent } from "./search-page.component";
import { DataService } from "../services/data.service";
import { MaterialModule } from "../material/material.module";
import { MESSAGE_SEARCH, PLACE_SEARCH } from "../constants";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ListOfResultsComponent } from "../list-of-results/list-of-results.component";
import { FavoritesPageComponent } from "../favorites-page/favorites-page.component";
import { PropertyListingPageComponent } from "../property-listing-page/property-listing-page.component";
import { RouterTestingModule } from "@angular/router/testing";
import { By } from "@angular/platform-browser";
import { DATA_SERVICE_STUB, routerSpy } from "../testing";
import { Router } from "@angular/router";

describe("SearchPageComponent", () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;
  let dataService: DataService;
  let router: Router;
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
        { provide: DataService, useValue: DATA_SERVICE_STUB },
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    dataService = TestBed.get(DataService);
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it(`should have false errorState`, () => {
    expect(component.errorState).toEqual(false);
  });
  it(`should have false inputState`, () => {
    expect(component.inputState).toEqual(false);
  });
  it(`should have message as "Recent Searches"`, () => {
    expect(component.message).toEqual(MESSAGE_SEARCH);
  });
  it(`should have empty searchValue`, () => {
    expect(component.searchValue).toBeFalsy;
  });
  it(`should render message in a h2 tag`, () => {
    expect(element.query(By.css("h2")).nativeElement.textContent).toContain(
      MESSAGE_SEARCH
    );
  });
  it("should call getSearch", () => {
    const getSearchSpy = spyOn(dataService, "getSearch");
    component.ngOnInit();
    expect(getSearchSpy).toHaveBeenCalled();
  });
  it("should call search", () => {
    const getDataSpy = spyOn(dataService, "getData");
    element.query(By.css("button")).nativeElement.click();
    expect(getDataSpy).toHaveBeenCalled();
  });
  it("should navigate after search", () => {
    component.search("bat", PLACE_SEARCH);
    const spy = router.navigateByUrl as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toBe("/results?location=bat");
  });
});
