import { OrderDetailCM, OrderDetailVM } from './order-detail.model';
export class OrderVM {
  Id: string;
  Username: string;
  OrderDetails: OrderDetailVM[];
  CreatedAt: Date;
}

export class OrderUM {
  Id: string;
  Username: string;
  constructor(props: { Username: string; Id: string }) {
    this.Id = props.Id;
    this.Username = props.Username;
  }

  getData = (): any => {
    const data = { ...this };
    delete data.getData;
    return data;
  };
}

export class OrderCM {
  OrderDetails: OrderDetailCM[];
  constructor(props: { OrderDetails: OrderDetailCM[] }) {
    this.OrderDetails = props.OrderDetails;
  }

  getData = (): any => {
    const data = { ...this };
    delete data.getData;
    return data;
  };
}
