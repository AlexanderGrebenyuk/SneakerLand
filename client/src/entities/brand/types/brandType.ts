export type BrandForForm = {
  id: number;
  name: string;
};

export type BrandForFormId = BrandForForm['id'];
export type BrandForFormWithoutId = Omit<BrandForForm, 'id'>;
