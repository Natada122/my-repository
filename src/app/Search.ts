import { House } from "./House";
export class Search {
  constructor(
    public location: string,
    public date: number,
    public listings: House[]
  ) {}
}
