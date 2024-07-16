import React, { useState } from 'react';
import { useAppSelector } from '../../app/store/store';
import SneakerItem from '../../entities/sneakers/ui/SneakerItem';
import Sidebar from '../../widgets/Sidebar/Sidebar';
import './styles/SneakersPage.css';
import ModalWindow from '../../shared/ui/modal/Modal';
import FormAddSneakers from '../../entities/sneakers/ui/FormAddSneakers';

const SneakersPage = (): JSX.Element => {
  const sneakers = useAppSelector((state) => state.sneakers.sneakers);
  const { user } = useAppSelector((state) => state.user);
  
  //const filters = useAppSelector((state) => state.filters); // ПРОВЕРИТЬ

  const [active, setActive] = useState(false);
  const onToggle = (): void => {
    setActive((prev) => !prev);
  };

  // const filteredSneakers = sneakers.filter(
  //   (sneaker: Sneaker) => sneaker.Size.size === 40 && sneaker.Sex.title === 'Для него',
  // );
  // return (
  //   (filters.color === '' || sneaker.Color.name === filters.color) &&
  //   (filters.brand === '' || sneaker.Brand.name === filters.brand) &&
  //   (filters.size === 0 || sneaker.Size.size === filters.size) &&
  //   (filters.sex === '' || sneaker.Sex.title === filters.sex)
  // );

  return (
<div className="flexSideNCards">
  <div className="sidebar">
    <Sidebar />
  </div>
  <div className="allCards">
    
    <div className="addSneakersButton">
      {user?.isAdmin === true && (
        <button type="button" onClick={() => setActive((prev) => !prev)}>
          Добавить кроссовки
        </button>
      )}
    </div>
    <ModalWindow active={active} onToggle={onToggle}>
      <h4>Добавить кроссовки</h4>
      <FormAddSneakers />
    </ModalWindow>
    <div className='cardsFlex'>
    {sneakers && sneakers.map((sneak) => <SneakerItem sneak={sneak} key={sneak.id} />)}
    </div>
  </div>
</div>
  );
};
export default SneakersPage;
