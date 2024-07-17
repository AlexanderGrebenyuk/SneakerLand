import React from 'react';
import './Sidebar.css';
import { Filters } from '../../pages/sneakerPages/SneakersPage';


interface SidebarProps {
  filters: Filters,
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}
const Sidebar :React.FC<SidebarProps> = ({filters,setFilters}) => {


  
  const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="Sidebar">
      <h2>Фильтры</h2>
      <div>
        <label htmlFor="color">Цвет:</label>
        <select
          id="color"
          name="color"
          value={filters.color}
          onChange={handleChange}
        >
          <option value="">Любой</option>
          <option value="белый">белый</option>
          <option value="черный">черный</option>
          <option value="серый">серый</option>
          <option value="бежевый">бежевый</option>
          <option value="красный">красный</option>
          <option value="розовый">розовый</option>
          <option value="голубой">голубой</option>
          <option value="синий">синий</option>
          <option value="коричневый">коричневый</option>
          <option value="мультиколор">мультиколор</option>
          <option value="черный">черный</option>
        </select>
      </div>
      <div>
        <label htmlFor="brand">Бренд:</label>
        <select
          id="brand"
          name="brand"
          value={filters.brand}
          onChange={handleChange}
        >
          <option value="">Любой</option>
          <option value="Nike">Nike</option>
          <option value="Adidas">Adidas</option>
          <option value="Reebok">Reebok</option>
          <option value="Puma">Puma</option>
          <option value="New Balance">New Balance</option>
        </select>
      </div>
      <div >
        <label htmlFor="size">Размер:</label>
        <select
          id="size"
          name="size"
          value={+filters.size}
          onChange={handleChange}
        >
          <option value="">Любой</option>
          <option value="36">36</option>
          <option value="37">37</option>
          <option value="38">38</option>
          <option value="39">39</option>
          <option value="40">40</option>
          <option value="41">41</option>
          <option value="42">42</option>
          <option value="43">43</option>
          <option value="44">44</option>
          <option value="45">45</option>
        </select>
      </div>
      <div >
        <label htmlFor="sex">Пол:</label>
        <select
          id="sex"
          name="sex"
          value={filters.sex}
          onChange={handleChange}
        >
          <option value="">Любой</option>
          <option value="Для него">Для него</option>
          <option value="Для нее">Для неё</option>
        </select>
      </div>
      <button
         type="button"
         onClick={() => {
           setFilters({ color: '', brand: '', size: 0, sex: '' });
           
         }}
         >
         Очистить фильтры
       </button>
    </div>
  );
};

export default Sidebar;








// import React, { useState } from 'react';
// import { useAppDispatch, useAppSelector } from '../../app/store/store';

// function Sidebar(): JSX.Element {
//   const dispatch = useAppDispatch();
  




  
//   return (
//     <div className="Sidebar">


//     </div>
//   );
// }

// export default Sidebar;

// const filters = useAppSelector((state) => state.filters);
// const [localFilters, setLocalFilters] = useState({
  //   color: filters.color,
  //   brand: filters.brand,
  //   size: filters.size,
  //   sexes: filters.sex,
  // });
  
  // const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //   const { name, value } = e.target;
    //   setLocalFilters({
      //     ...localFilters,
      //     [name]: name === 'size' ? Number(value) : value,
      //   });
      // };
      
      // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        //   e.preventDefault();
        //   dispatch(setColor(localFilters.color));
        //   dispatch(setBrand(localFilters.brand));
        //   dispatch(setSize(localFilters.size));
        //   dispatch(setSex(localFilters.sexes));
        // };
        // import {
        //   setColor,
        //   setBrand,
        //   setSize,
        //   setSex,
        //   clearFilters,
        // } from '../../entities/filter/filterSlice';
        // import './Sidebar.css'
        
        // const colors = ['black', 'white', 'red', 'blue'];
        // const brands = ['Nike', 'Adidas', 'Puma', 'Reebok'];
        // const sizes = [38, 39, 40, 41, 42, 43, 44, 45];
        // const sexes = ['Для него', 'Для нее'];
      // <h2>Фильтры</h2>
      // <form onSubmit={handleSubmit}>
      //   <div>
      //     <label>Цвет:</label>
      //     <select name="color" value={localFilters.color} onChange={handleChange}>
      //       <option value="">Все</option>
      //       {colors.map((color) => (
      //         <option key={color} value={color}>
      //           {color}
      //         </option>
      //       ))}
      //     </select>
      //   </div>
      //   <div>
      //     <label>Бренд:</label>
      //     <select name="brand" value={localFilters.brand} onChange={handleChange}>
      //       <option value="">Все</option>
      //       {brands.map((brand) => (
      //         <option key={brand} value={brand}>
      //           {brand}
      //         </option>
      //       ))}
      //     </select>
      //   </div>
      //   <div>
      //     <label>Размер:</label>
      //     <select name="size" value={localFilters.size} onChange={handleChange}>
      //       <option value={0}>Все</option>
      //       {sizes.map((size) => (
      //         <option key={size} value={size}>
      //           {size}
      //         </option>
      //       ))}
      //     </select>
      //   </div>
      //   <div>
      //     <label>Пол:</label>
      //     <select name="sexes" value={localFilters.sexes} onChange={handleChange}>
      //       <option value="">Все</option>
      //       {sexes.map((sex) => (
      //         <option key={sex} value={sex}>
      //           {sex}
      //         </option>
      //       ))}
      //     </select>
      //   </div>
      //   <button type="submit">Применить фильтры</button>
      //   <button
      //     type="button"
      //     onClick={() => {
      //       setLocalFilters({ color: '', brand: '', size: 0, sexes: '' });
      //       dispatch(clearFilters());
      //     }}
      //     >
      //     Очистить фильтры
      //   </button>
      // </form>