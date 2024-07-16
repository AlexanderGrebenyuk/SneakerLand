import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/store';
import {
  setColor,
  setBrand,
  setSize,
  setSex,
  clearFilters,
} from '../../entities/filter/filterSlice';

const colors = ['black', 'white', 'red', 'blue'];
const brands = ['Nike', 'Adidas', 'Puma', 'Reebok'];
const sizes = [38, 39, 40, 41, 42, 43, 44, 45];
const sexes = ['Для него', 'Для нее'];

function Sidebar(): JSX.Element {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);

  const [localFilters, setLocalFilters] = useState({
    color: filters.color,
    brand: filters.brand,
    size: filters.size,
    sexes: filters.sex,
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalFilters({
      ...localFilters,
      [name]: name === 'size' ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setColor(localFilters.color));
    dispatch(setBrand(localFilters.brand));
    dispatch(setSize(localFilters.size));
    dispatch(setSex(localFilters.sexes));
  };

  return (
    <div>
      <h2>Фильтры</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Цвет:</label>
          <select name="color" value={localFilters.color} onChange={handleChange}>
            <option value="">Все</option>
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Бренд:</label>
          <select name="brand" value={localFilters.brand} onChange={handleChange}>
            <option value="">Все</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Размер:</label>
          <select name="size" value={localFilters.size} onChange={handleChange}>
            <option value={0}>Все</option>
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Пол:</label>
          <select name="sexes" value={localFilters.sexes} onChange={handleChange}>
            <option value="">Все</option>
            {sexes.map((sex) => (
              <option key={sex} value={sex}>
                {sex}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Применить фильтры</button>
        <button
          type="button"
          onClick={() => {
            setLocalFilters({ color: '', brand: '', size: 0, sexes: '' });
            dispatch(clearFilters());
          }}
        >
          Очистить фильтры
        </button>
      </form>
    </div>
  );
}

export default Sidebar;
