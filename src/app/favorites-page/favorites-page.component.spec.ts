import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FavoritesPageComponent } from "./favorites-page.component";
import { MaterialModule } from "../material/material.module";
import { ListOfResultsComponent } from "../list-of-results/list-of-results.component";
import { SearchPageComponent } from "../search-page/search-page.component";
import { PropertyListingPageComponent } from "../property-listing-page/property-listing-page.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { DataService } from "../services/data.service";
import { RouterTestingModule } from "@angular/router/testing";
import { By } from "@angular/platform-browser";
import { DATA_SERVICE_MOCK, TEST_HOUSES, TEST_HOUSE } from "../testing";

describe("FavoritesPageComponent", () => {
  let component: FavoritesPageComponent;
  let fixture: ComponentFixture<FavoritesPageComponent>;
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
      providers: [{ provide: DataService, useValue: DATA_SERVICE_MOCK }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesPageComponent);
    component = fixture.componentInstance;
    dataService = TestBed.get(DataService);
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should getFavorites", () => {
    component.ngOnInit();
    expect(component.favorites).toEqual(TEST_HOUSES);
  });
  it(`should render houses`, () => {
    const [house] = TEST_HOUSES;
    component.favorites = TEST_HOUSES;
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
