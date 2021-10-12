export class Category {
  public id: number;
  public nameCategory: string;
  public avatarCategory: string;
  constructor(id: number,nameCategory: string, avatarCategory: string) {
    this.id = id;
    this.nameCategory = nameCategory;
    this.avatarCategory = avatarCategory;
  }
}
