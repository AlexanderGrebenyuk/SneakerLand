// // src/store/filtersSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface FiltersState {
//     color: string;
//     brand: string;
//     size: number;
//     sex: string;
// }

// const initialState: FiltersState = {
//     color: '',
//     brand: '',
//     size: 40,
//     sex: '',
// };

// const filtersSlice = createSlice({
//     name: 'filters',
//     initialState,
//     reducers: {
//         setColor(state, action: PayloadAction<string>) {
//             state.color = action.payload;
//         },
//         setBrand(state, action: PayloadAction<string>) {
//             state.brand = action.payload;
//         },
//         setSize(state, action: PayloadAction<number>) {
//             state.size = action.payload;
//         },
//         setSex(state, action: PayloadAction<string>) {
//             state.sex = action.payload;
//         },
//         clearFilters(state) {
//             state.color = '';
//             state.brand = '';
//             state.size = 40;
//             state.sex = '';
//         },
//     },
// });

// export const { setColor, setBrand, setSize, setSex, clearFilters } = filtersSlice.actions;
// export default filtersSlice;


// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Sneaker } from '../sneakers/types/sneakerType';

// interface FiltersState {
//   color: string;
//   brand: string;
//   size: number;
//   sex: string;
//   sneakers: Sneaker[];
//   filteredSneakers: Sneaker[];
// }

// const initialState: FiltersState = {
//   color: '',
//   brand: '',
//   size: 0, // Начальный фильтр размера 40
//   sex: '',
//   sneakers: [], // Все кроссовки
//   filteredSneakers: [] // Отфильтрованные кроссовки
// };

// const filtersSlice = createSlice({
//   name: 'filters',
//   initialState,
//   reducers: {
//     setColor: (state, action: PayloadAction<string>) => {
//       state.color = action.payload;
//       state.filteredSneakers = applyFilters(state);
//     },
//     setBrand: (state, action: PayloadAction<string>) => {
//       state.brand = action.payload;
//       state.filteredSneakers = applyFilters(state);
//     },
//     setSize: (state, action: PayloadAction<number>) => {
//       state.size = action.payload;
//       state.filteredSneakers = applyFilters(state);
//     },
//     setSex: (state, action: PayloadAction<string>) => {
//       state.sex = action.payload;
//       state.filteredSneakers = applyFilters(state);
//     },
//     clearFilters: (state) => {
//       state.color = '';
//       state.brand = '';
//       state.size = 0;
//       state.sex = '';
//       state.filteredSneakers = applyFilters(state);
//     },
//     setSneakers: (state, action: PayloadAction<Sneaker[]>) => {
//       state.sneakers = action.payload;
//       state.filteredSneakers = applyFilters(state);
//     }
//   }
// });

// const applyFilters = (state: FiltersState): Sneaker[] => {
//   return state.sneakers.filter(sneaker => 
//     (state.color ? sneaker.Color.name === state.color : true) &&
//     (state.brand ? sneaker.Brand.name === state.brand : true) &&
//     (+state.size ? +sneaker.Size.size === +state.size : true) &&
//     (state.sex ? sneaker.Sex.title === state.sex : true) 
    
//   );
// };

// export const { setColor, setBrand, setSize, setSex, clearFilters, setSneakers } = filtersSlice.actions;

// export default filtersSlice;