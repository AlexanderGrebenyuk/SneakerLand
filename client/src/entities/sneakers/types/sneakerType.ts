export type Sex = {
  id: number;
  title: string;
  createdAt: string | null;
  updatedAt: string | null;
};

export type SexId = Sex['id'];

export type Color = {
  id: number;
  name: string;
  createdAt: string | null;
  updatedAt: string | null;
};

export type ColorId = Color['id'];

export type Size = {
  id: number;
  size: number;
  createdAt: string | null;
  updatedAt: string | null;
};

export type SizeId = Size['id'];

export type Brand = {
  id: number;
  name: string;
  createdAt: string | null;
  updatedAt: string | null;
};

export type BrandId = Brand['id'];

export type Image = {
  id: number;
  link: string;
  sneakerId: number;
  createdAt: string | null;
  updatedAt: string | null;
};

export type ImageId = Image['id'];
export type ImageWithoutId = Omit<Image, 'id'>;

export type Sneaker = {
  id: number;
  model: string;
  description: string;
  price: number;
  sexId: SexId;
  sizeId: SizeId;
  colorId: ColorId;
  brandId: BrandId;
  createdAt: string | null;
  updatedAt: string | null;
  Sex: Sex;
  Size: Size;
  Color: Color;
  Brand: Brand;
  Images: Image[];
};

export type SneakerId = Sneaker['id'];

export type SneakerWithoutId = Omit<Sneaker, 'id'>;
