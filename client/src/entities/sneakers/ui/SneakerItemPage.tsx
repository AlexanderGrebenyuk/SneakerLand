import React, { useState } from 'react';
import { Sneaker } from '../types/sneakerType';

type SneakerItemPageProps = {
  sneaker: Sneaker;
};

// const Sizes = [37,38,39,40,41,42,43,44,45];

const SneakerItemPage = ({ sneaker }: SneakerItemPageProps): JSX.Element => {
  const [size, setSize] = useState('');
  console.log(size);

  return (
    <div className=" SneakerItemPage">
      <div className="SneakerPageImages">
        {sneaker.Images.map((image) => (
          <img key={image.id} src={image.link} alt={sneaker.model} />
        ))}
      </div>
      <div className="SneakerItemPageDescription">
        <h3>{sneaker.Brand.name}</h3>
        <h5>Описание</h5>
        <p>Цвет: {sneaker.Color.name}</p>
        <p>Описание товара: {sneaker.description}</p>
        <p>Цена: {sneaker.price} ₽</p>
      </div>
      <div className="SneakerItemPageForBasket">
        <p>{sneaker.model}</p>
        <form>
          <label htmlFor="size-select">
            <select onChange={(e) => setSize(e.target.value)} name="size" id="size-select">
              <option value="">Ваш размер</option>
              {/* {Sizes.map((el) => (
                <option value={el}>{el}</option>
              ))} */}

              {/* Добавить размеры */}
            </select>
          </label>
        </form>
        <button>Добавить в корзину</button>
        <button>Добавить в избранное</button>
      </div>
    </div>
  );
};
export default SneakerItemPage;
