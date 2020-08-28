import { OrderVM } from './order.model';

export class AccountVM {
  Username: string;
  Fullname: string;
  Email: string;
  Phone: string;
  RoleId: string;
  Orders: OrderVM[];
  constructor(props: { Fullname: string, Username: string, Email: string, Phone: string, RoleId: string, Orders: OrderVM[] }) {
    this.Username = props.Username;
    this.Fullname = props.Fullname;
    this.Email = props.Email;
    this.Phone = props.Phone;
    this.RoleId = props.RoleId;
    this.Orders = props.Orders;
  }
}

export class AccountUM {
  Username: string;
  Fullname: string;
  Email: string;
  Phone: string;
  RoleId: string;
  constructor(props: { Fullname: string, Username: string, Email: string, Phone: string, RoleId: string }) {
    this.Username = props.Username;
    this.Fullname = props.Fullname;
    this.Email = props.Email;
    this.Phone = props.Phone;
    this.RoleId = props.RoleId;
  }
}

export class AccountCM {
  Username: string;
  Fullname: string;
  Password: string;
  Email: string;
  Phone: string;
  RoleId: string;
  constructor(props: { Fullname: string, Username: string, Password: string, Email: string, Phone: string, RoleId: string }) {
    this.Username = props.Username;
    this.Fullname = props.Fullname;
    this.Password = props.Password;
    this.Email = props.Email;
    this.Phone = props.Phone;
    this.RoleId = props.RoleId;
  }
}
