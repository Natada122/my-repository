import { Search } from "./Search";
import { of } from "rxjs";

export const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
export const TEST_HOUSES: House[] = [
  {
    bathroomNumber: 1,
    bedroomNumber: 1,
    price: 1220,
    imgUrl: "url1",
    summary: "text1",
    id: 0,
    location: "bat",
    title: "title1"
  },
  {
    bathroomNumber: 2,
    bedroomNumber: 2,
    price: 1200,
    imgUrl: "/url2",
    summary: "text2",
    id: 1,
    location: "bat",
    title: "title2"
  }
];
export const TEST_SEARCHES: Search[] = [
  {
    location: "bat",
    date: 122,
    listings: [],
    type: "type",
    totalResult: 0,
    curPage: 1
  }
];
export const TEST_HOUSE: House = {
  bathroomNumber: 3,
  bedroomNumber: 2,
  price: 1220,
  imgUrl: "/url",
  summary: "text",
  id: 1239,
  location: "bat",
  title: "title"
};
export const DATA_SERVICE_STUB = {
  getData: () => { },
  setSearch: () => { },
  getSearch: () => { },
  getLocations: () => { }
};
export const DATA_SERVICE_MOCK = {
  setSearch: () => { },
  getData: () => {
    return of({
      listings: TEST_HOUSES
    });
  },
  setFavorites: () => { },
  getFavorites: () => {
    return TEST_HOUSES;
  },
  getSearch: () => {
    return [
      {
        location: "bat",
        date: 122,
        listings: [
          {
            bathroomNumber: 3,
            bedroomNumber: 2,
            price: 1220,
            imgUrl: "/url",
            summary: "text",
            id: 0,
            location: "bat",
            title: "title"
          }
        ],
        type: "type",
        totalResult: 0,
        curPage: 1
      }
    ];
  }
};
