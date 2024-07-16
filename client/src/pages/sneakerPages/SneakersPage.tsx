import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
import SneakerItem from '../../entities/sneakers/ui/SneakerItem';
import Sidebar from '../../widgets/Sidebar/Sidebar';
import './SneakerPages.css' // ОБРАТИТЬ ВНИМАНИЕ
import { Sneaker } from '../../entities/sneakers/types/sneakerType';
import ModalWindow from '../../shared/ui/modal/Modal';
import FormAddSneakers from '../../entities/sneakers/ui/FormAddSneakers';
import './styles/SneakersPage.css'; // ОБРАТИТЬ ВНИМАНИЕ


const SneakersPage= (): JSX.Element =>{

    const {sneakers} = useSelector((state: RootState) => state.sneakers)
    const { user } = useSelector((state: RootState) => state.user);
    const filters = useSelector((state: RootState) => state.filters); // ПРОВЕРИТЬ

    const [active, setActive] = useState(false);
    const onToggle = (): void => {
    setActive((prev) => !prev);
  };
    
    
    const filteredSneakers = sneakers.filter((sneaker: Sneaker) => {
        return (
            (filters.color === '' || sneaker.Color.name === filters.color) &&
            (filters.brand === '' || sneaker.Brand.name === filters.brand) &&
            (filters.size === 0 || sneaker.Size.size === filters.size) &&
            (filters.sex === '' || sneaker.Sex.title === filters.sex)
        );
    });


return (
  <div className='layout'>
      <div className='sidebar'>
      <Sidebar/>
      </div>
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
      {filteredSneakers && filteredSneakers.map((sneak)=> <SneakerItem sneak={sneak} key={sneak.id} />)}  
<!-- ТЕМА ЛЕРЫ        {sneakers &&
         sneakers
            .filter((sneaker) => sneaker.Sex.title === 'Для него' && sneaker.Size.size === 40).map((sneak) => <SneakerItem key={sneak.id} sneak={sneak} />)} -->

    </div>
    </div>
 );
 
}
export default SneakersPage


  