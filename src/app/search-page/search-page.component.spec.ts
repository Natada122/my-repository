import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SearchPageComponent } from "./search-page.component";
import { DataService } from "../services/data.service";
import { MaterialModule } from "../material/material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "../app-routing.module";
import { ListOfResultsComponent } from "../list-of-results/list-of-results.component";
import { FavoritesPageComponent } from "../favorites-page/favorites-page.component";
import { PropertyListingPageComponent } from "../property-listing-page/property-listing-page.component";
import { MESSAGE_SEARCH, PLACE_SEARCH } from "../constants";

describe("SearchPageComponent", () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;
  let dataService: DataService;
  let element :any;
  const dataServiceStub = {
    getData: () => {},
    setSearch: () => {},
    getSearch: () => {},
    getLocations: () => {}
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchPageComponent,
        ListOfResultsComponent,
        FavoritesPageComponent,
        PropertyListingPageComponent
      ],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        FormsModule,
        AppRoutingModule
      ],
      providers: [{ provide: DataService, useValue: dataServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    dataService = TestBed.get(DataService);
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.nativeElement;
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
  it(`should render message in a h2 tag`, () => {
    expect(element.querySelector("section > h2").textContent).toContain(MESSAGE_SEARCH);
  });
  it("should call getSearch", () => {
    const getSearchSpy = spyOn(dataService, "getSearch");
    component.ngOnInit();
    expect(getSearchSpy).toHaveBeenCalled();
  });
  it("should call search", () => {
    const getDataSpy = spyOn(dataService, "getData");
    element.querySelector("section > button").click();
    expect(getDataSpy).toHaveBeenCalled();
  });
});
