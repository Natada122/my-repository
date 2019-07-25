export class Search {
  constructor(
    public location: string,
    public date: number,
    public listings: House[],
    public curPage:number=1
  ) {}
}
