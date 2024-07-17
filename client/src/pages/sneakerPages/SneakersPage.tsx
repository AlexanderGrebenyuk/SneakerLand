import React, { useState } from 'react';
import { useAppSelector } from '../../app/store/store';
import SneakerItem from '../../entities/sneakers/ui/SneakerItem';
import Sidebar from '../../widgets/Sidebar/Sidebar';
import './styles/SneakersPage.css';
import ModalWindow from '../../shared/ui/modal/Modal';
import FormAddSneakers from '../../entities/sneakers/ui/FormAddSneakers';
import { Sneaker } from '../../entities/sneakers/types/sneakerType';

// import { useSearchParams } from 'react-router-dom';
export interface Filters {
  color: string;
  brand: string;
  size: number;
  sex: string;
}


const SneakersPage = (): JSX.Element => {
  const sneakers = useAppSelector((state) => state.sneakers.sneakers);
  const { user } = useAppSelector((state) => state.user);



  // .............................................................................
  const [filters, setFilters] = useState<Filters>({
    color: '',
    brand: '',
    size: 0,
    sex: '',
  });

const filteredSneakers = sneakers.filter((sneaker) => {
  return (
    (filters.color === '' || sneaker.Color.name === filters.color) &&
    (filters.brand === '' || sneaker.Brand.name === filters.brand) &&
    (+filters.size === 0 || +sneaker.Size.size === +filters.size) &&
    (filters.sex === '' || sneaker.Sex.title === filters.sex)
  );
});
const result:Sneaker[] = []
function removeDuplicatesByArticle (arr:Sneaker[]) {
  const seenArticles = new Set<string|number>();
  ;
  
  arr.forEach(item => {
      const articul = item.articul;
      if (!seenArticles.has(articul)) {
          seenArticles.add(articul);
          result.push(item);
      }
  });
}
removeDuplicatesByArticle(filteredSneakers) 


// ................................................................................



const [active, setActive] = useState(false);
const onToggle = (): void => {
  setActive((prev) => !prev);
};







  return (
<div className="flexSideNCards">
  <div className="sidebar">
    <Sidebar filters={filters} setFilters={setFilters}/>
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
    {result && result.map((sneak) => <SneakerItem sneak={sneak} key={sneak.id} />)}
    </div>
  </div>
</div>
  );
};
export default SneakersPage;

