export type ColorForForm = {
    id: number;
    name: string;
  };
  
  export type ColorForFormId = ColorForForm['id'];
  export type ColorForFormWithoutId = Omit<ColorForForm, 'id'>