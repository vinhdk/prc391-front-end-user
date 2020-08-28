import { CameraVM } from './camera.model';
export class OrderDetailVM {
  Id: string;
  Quantity: number;
  OrderId: string;
  CameraId: string;
  Camera: CameraVM;
}

export class OrderDetailUM {
  Id: string;
  Quantity: number;
  OrderId: string;
  CameraId: string;
  constructor(props: { Id: string, Quantity: number, OrderId: string, CameraId: string }) {
      this.Id = props.Id;
      this.Quantity = props.Quantity;
      this.OrderId = props.OrderId;
      this.CameraId = props.CameraId;
  }
  getData = (): any => {
      const data = { ...this };
      delete data.getData;
      return data;
  }
}

export class OrderDetailCM {
  Quantity: number;
  CameraId: string;
  constructor(props: { Quantity: number, CameraId: string }) {
      this.Quantity = props.Quantity;
      this.CameraId = props.CameraId;
  }
  getData = (): any => {
      const data = { ...this };
      delete data.getData;
      return data;
  }
}
