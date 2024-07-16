import React, { useState } from 'react';
import { Sneaker } from '../../sneakers/types/sneakerType';
import { useAppSelector } from '../../../app/store/store';

type SizeItemProps = {
  sneaker: Sneaker;
};
const SizeItem = ({ sneaker }: SizeItemProps): JSX.Element => {
  const { sizes } = useAppSelector((state) => state.sizes);
  const [newSize, setNewSize] = useState();
  return (
    <div className=" SizeItem">
      <form>
        <label htmlFor="size-select">
          <select onChange={(e) => setNewSize(+e.target.value)} name="size" id="size-select">
            <option value="">Выберите размер</option>
            {sizes.map((size) => (
              <option value={size.id}>{size.size}</option>
            ))}
          </select>
        </label>
      </form>
    </div>
  );
};
export default SizeItem;
