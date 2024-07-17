export type SexForForm = {
    id: number;
    title: string;
  };
  
  export type SexForFormId = SexForForm['id'];
  export type SexForFormWithoutId = Omit<SexForForm, 'id'>;
  