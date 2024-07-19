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
type PoiskProps = {
  activePoisk: boolean;
};

const SneakersPage = ({ activePoisk }: PoiskProps): JSX.Element => {
  const sneakers = useAppSelector((state) => state.sneakers.sneakers);
  const { user } = useAppSelector((state) => state.user);

  // .............................................................................
  const [values, setValue] = useState('');
  const [poisk, setPoisk] = useState('');

  const [filters, setFilters] = useState<Filters>({
    color: '',
    brand: '',
    size: 0,
    sex: '',
  });

  const filtered = sneakers.filter((sneaker) => {
    return (
      (filters.color === '' || sneaker.Color.name === filters.color) &&
      (filters.brand === '' || sneaker.Brand.name === filters.brand) &&
      (+filters.size === 0 || +sneaker.Size.size === +filters.size) &&
      (filters.sex === '' || sneaker.Sex.title === filters.sex)
    );
  });
  const result: Sneaker[] = [];
  function removeDuplicatesByArticle(arr: Sneaker[]) {
    const seenArticles = new Set<string | number>();
    arr.forEach((item) => {
      const articul = item.articul;
      if (!seenArticles.has(articul)) {
        seenArticles.add(articul);
        result.push(item);
      }
    });
  }
  removeDuplicatesByArticle(filtered);

  const filteredSneakers = result.filter((sneaker) => {
    return sneaker.model
      .toLocaleLowerCase()
      .replaceAll(' ', '')
      .split(' ')
      .sort()
      .join(' ')
      .includes(values.toLocaleLowerCase().replaceAll(' ', '').split(' ').sort().join(' '));
  });

  const handleButtonClick = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e.target, 77777777);

    e.preventDefault();
    setValue(poisk);
  };
  // ................................................................................

  const [active, setActive] = useState(false);
  const onToggle = (): void => {
    setActive((prev) => !prev);
  };

  return (
    <>
      <div className="flexSideNCards">
        <div className="sidebar">
          <Sidebar filters={filters} setFilters={setFilters} />
        </div>
        <div className="allCards">
          {activePoisk && (
            <div className='searchLine'>
            <form className="serch" onSubmit={handleButtonClick}>
              <input type="text" placeholder='Поиск' value={poisk} onChange={(e) => setPoisk(e.target.value)} />
              <button className="onSubmit">поиск</button>
            </form>
            </div>
          )}
          <div className="addSneakersButton">
            {user?.isAdmin === true && (
              <button
                className="buttonAddSneak"
                type="button"
                onClick={() => setActive((prev) => !prev)}
              >
                Добавить кроссовки
              </button>
            )}
          </div>
          <ModalWindow active={active} onToggle={onToggle}>
            <h4 style={{ marginLeft: '110px', marginBottom: '20px' }}>Добавить кроссовки</h4>
            <FormAddSneakers setActive={setActive} />
          </ModalWindow>
          <div className="cardsFlex">
            {filteredSneakers &&
              filteredSneakers.map((sneak) => <SneakerItem sneak={sneak} key={sneak.id} />)}
          </div>
        </div>
      </div>
    </>
  );
};
export default SneakersPage;
