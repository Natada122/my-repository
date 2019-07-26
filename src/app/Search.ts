export class Search {
  constructor(
    public location: string,
    public date: number,
    public listings: House[],
    public type: string,
    public totalResult: number,
    public curPage: number = 1
  ) {}
}
