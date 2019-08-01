import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PropertyListingPageComponent } from "./property-listing-page.component";
import { MaterialModule } from "../material/material.module";
import { SearchPageComponent } from "../search-page/search-page.component";
import { ListOfResultsComponent } from "../list-of-results/list-of-results.component";
import { FavoritesPageComponent } from "../favorites-page/favorites-page.component";
import { RouterTestingModule } from "@angular/router/testing";
import { DataService } from "../services/data.service";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
import { ActivatedRoute, convertToParamMap } from "@angular/router";
import { of } from "rxjs";
import { DATA_SERVICE_MOCK, TEST_HOUSES, TEST_HOUSE } from "../testing";
describe("PropertyListingPageComponent", () => {
  let component: PropertyListingPageComponent;
  let fixture: ComponentFixture<PropertyListingPageComponent>;
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
            queryParams: of({ location: "bat" }),
            params: of({ id: 0 })
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    dataService = TestBed.get(DataService);
    fixture = TestBed.createComponent(PropertyListingPageComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it(`should have true isFavorite`, () => {
    expect(component.isFavorite).toEqual(true);
  });
  it(`should render house`, () => {
    component.house = TEST_HOUSE;
    fixture.detectChanges();
    expect(
      element.query(By.css("mat-card-title > h2")).nativeElement.textContent
    ).toContain("$1,220.00");
    expect(
      element.query(By.css("mat-card-subtitle > h1")).nativeElement.textContent
    ).toContain(TEST_HOUSE.title);
    const [bedRoom, bathRoom, summary] = element.queryAll(
      By.css("mat-card-content > p")
    );
    expect(bathRoom.nativeElement.textContent).toContain(
      TEST_HOUSE.bathroomNumber
    );
    expect(bedRoom.nativeElement.textContent).toContain(
      TEST_HOUSE.bedroomNumber
    );
    expect(summary.nativeElement.textContent).toContain(TEST_HOUSE.summary);
    expect(
      element.query(By.css("img")).nativeElement.getAttribute("src")
    ).toEqual(TEST_HOUSE.imgUrl);
  });
  it("should call getFavorites", () => {
    const getFavoritesSpy = spyOn(dataService, "getFavorites");
    component.ngOnInit();
    expect(getFavoritesSpy).toHaveBeenCalled();
  });
  it("should call setFavorites", () => {
    const getFavoritesSpy = spyOn(dataService, "setFavorites");
    component.onSelect();
    expect(getFavoritesSpy).toHaveBeenCalled();
  });
});
