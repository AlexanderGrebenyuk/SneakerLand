import React, { useState } from 'react';
import { Sneaker } from '../../sneakers/types/sneakerType';
import { useAppSelector } from '../../../app/store/store';
import { useNavigate } from 'react-router-dom';

const SizeItem = (): JSX.Element => {
  const { sizes } = useAppSelector((state) => state.sizes);
  const {sexes} =useAppSelector((state) => state.sexes)
  const { sneakers } = useAppSelector((state) => state.sizes);
  const [newSize, setNewSize] = useState(0);
  const [newSex, setNewSex] = useState('')

  const navigate = useNavigate()

  //Роут на баскет
    const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
    //   void dispatch(updateMovieThunk({ id: movie.id, body: { title, director, rating, genreId } }));
    };

  return (
    <div className=" SizeItem">
      <p>Для оформления заказа выберите размер и пол</p>
      <form onSubmit={onHandleSubmit}>
        <label htmlFor="size-select">
          <select onChange={(e) => setNewSize(+e.target.value)} name="size" id="size-select">
            <option value="">Размер</option>
            {sizes.map((size) => (
              <option value={size.id}>{size.size}</option>
            ))}
          </select>
        </label>

        {/* Скорректировать для пола */}
        <label htmlFor="sex-select">
          <select onChange={(e) => setNewSex(e.target.value)} name="sex" id="sex-select">
            <option value="">Пол</option>
            {sexes.map((sex) => (
              <option value={sex.id}>{sex.title}</option>
            ))}
          </select>
        </label>
      </form>
      <button type="submit">Добавить</button>
      <button onClick={() => navigate(-1)}>Назад</button>
    </div>
  );
};
export default SizeItem;
