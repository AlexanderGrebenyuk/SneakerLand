export type Sex = {
  id: number;
  title: string;
};

export type SexId = Sex['id'];

export type Color = {
  id: number;
  name: string;
};

export type ColorId = Color['id'];

export type Size = {
  id: number;
  size: number;
};

export type SizeId = Size['id'];

export type Brand = {
  id: number;
  name: string;
};

export type BrandId = Brand['id'];

export type Image = {
  id: number;
  link: string;
  sneakerId: number;
};

export type ImageId = Image['id'];
export type ImageWithoutId = Omit<Image, 'id'>;
export type ImageLink = Image['link'];

export type Sneaker = {
  id: number
  model: string;
  description: string;
  price: number;
  articul: number; // ДОБАВИЛА и на Бэке тоже!!!!
  sexId: SexId;
  sizeId: SizeId;
  colorId: ColorId;
  brandId: BrandId;
  Sex: Sex;
  Size: Size;
  Color: Color;
  Brand: Brand;
  Images: Image[];
};

//Проверить с Владом
// export type SneakerForForm = {
//   model: string;
//   description: string;
//   price: number;
//   articul: number; // ДОБАВИЛА и на Бэке тоже!!!!
//   sexId: SexId;
//   sizeId: SizeId;
//   colorId: ColorId;
//   brandId: BrandId;
//   link: ImageLink;
// };

export type SneakerId = Sneaker['id'];

export type SneakerWithoutId = Omit<Sneaker, 'id'>;
