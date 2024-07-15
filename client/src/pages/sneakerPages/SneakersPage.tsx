import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
import SneakerItem from '../../entities/sneakers/ui/SneakerItem';
import ModalWindow from '../../shared/ui/modal/Modal';
import FormAddSneakers from '../../entities/sneakers/ui/FormAddSneakers';
import './styles/SneakersPage.css';

const SneakersPage = (): JSX.Element => {
  const { sneakers } = useSelector((state: RootState) => state.sneakers);
  const { user } = useSelector((state: RootState) => state.user);

  const [active, setActive] = useState(false);
  const onToggle = (): void => {
    setActive((prev) => !prev);
  };

  return (
    <>
      {user?.isAdmin === true && (
        <button type="button" onClick={() => setActive((prev) => !prev)}>
          Добавить кроссовки
        </button>
      )}
      <div className="SneakerPage">
        <ModalWindow active={active} onToggle={onToggle}>
          <h3>Добавить кроссовки</h3>
          <FormAddSneakers />
          <button type="button" onClick={onToggle}>
            Закрыть
          </button>
        </ModalWindow>
        {sneakers &&
          sneakers
            .filter((sneaker) => sneaker.Sex.title === 'Для него' && sneaker.Size.size === 40)
            .map((sneak) => <SneakerItem key={sneak.id} sneak={sneak} />)}
      </div>
    </>
};
export default SneakersPage;
