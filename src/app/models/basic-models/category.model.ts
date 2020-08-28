export class CategoryVM {
  public Id: string;
  public Name: string;
  constructor(props: { Name: string, Id: string }) {
    this.Id = props.Id;
    this.Name = props.Name;
  }
}

export class CategoryUM {
  public Id: string;
  public Name: string;
  constructor(props: { Name: string, Id: string }) {
    this.Id = props.Id;
    this.Name = props.Name;
  }
}

export class CategoryCM {
  public Name: string;
  constructor(props: { Name: string }) {
    this.Name = props.Name;
  }
}
