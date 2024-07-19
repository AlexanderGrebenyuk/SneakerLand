
import { Sneaker, SneakerId } from "../../sneakers/types/sneakerType";

// // Define types for associated objects
// export type Sex = {
//   id: number;
//   title: string;

// };

// export type Size = {
//   id: number;
//   size: number;

// };

// export type Color = {
//   id: number;
//   name: string;

// };

// export type Brand = {
//   id: number;
//   name: string;

// };

// export type Image = {
//   id: number;
//   link: string;
//   sneakerId: number;

// };

// export type Sneaker = {
//   id: number;
//   model: string;
//   description: string;
//   price: number;
//   articul: number;
//   sexId: number;
//   sizeId: number;
//   colorId: number;
//   brandId: number;
//   Sex: Sex;
//   Size: Size;
//   Color: Color;
//   Brand: Brand;
//   Images: Image[];
// };

export type OrderLine = {
  id: number;
  count: number;
  priceLine: number;
  orderId: number;
  sneakerId: SneakerId;
  Sneaker: Sneaker;
};

export type Basket = {
  id: number;
  totalPrice: number;
  basketId: number;
  statusId: number;

  OrderLines: OrderLine[];
};

export type OrderResponse = {
  message: string;
  order: Basket;
};

export type OrderLineInOrder= {
    id: number;
    count: number;
    priceLine:number;
    orderId:number;
    sneakerId: number;
}

export type OrderLinesForStatus = {
    id:number;
    totalPrice: number;
    basketId: number;
    statusId: number;
    OrderLineInOrder: OrderLineInOrder[]
}

export type OrderLineId= OrderLinesForStatus['id']
export type OrderLineStatusId= OrderLinesForStatus['statusId']
