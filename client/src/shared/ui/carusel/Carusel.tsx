import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Sneaker } from '../../../entities/sneakers/types/sneakerType';
import Carousel from 'react-bootstrap/Carousel';
import './Carusel.css';

type CaruselProps = {
  sneak: Sneaker;
};
const Carusel = ({ sneak }: CaruselProps): JSX.Element => {
  return (
    <div className="SneakerImages">
      <Carousel>
        {sneak.Images.map((image) => (
          <Carousel.Item key={image.id}>
            <img
              className="d-block w-100"
              src={`http://localhost:3000/${image.link}`}
              alt={sneak.model}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};
export default Carusel;
