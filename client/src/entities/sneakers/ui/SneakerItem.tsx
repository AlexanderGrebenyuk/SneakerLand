import React from 'react';
import { Sneaker } from '../types/sneakerType';
import './styles/SneakerItem.css';

type SneakerItemProps = {
  sneaker: Sneaker;
};
const SneakerItem = ({ sneaker }: SneakerItemProps): JSX.Element => {
  console.log(sneaker);

  return (
    <div className="SneakerItem">
      <div className="SneakerImages">
        {sneaker.Images.map((image) => (
          <img key={image.id} src={image.link} alt={sneaker.model} />
        ))}
      </div>
      <h3>{sneaker.Brand.name}</h3>
      <p>{sneaker.model}</p>
      <p>{sneaker.price}</p>
    </div>
  );
};
export default SneakerItem;
