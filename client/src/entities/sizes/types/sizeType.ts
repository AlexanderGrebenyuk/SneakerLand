import { Sneaker } from "../../sneakers/types/sneakerType";

export type SizeForSelect = {
    id: number;
    size: number;
    sneakers: Sneaker[]
  };
  
  export type SizeForSelectId = SizeForSelect['id'];
