import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
import SneakerItem from '../../entities/sneakers/ui/SneakerItem';



const SneakersPage= (): JSX.Element =>{

    const {sneakers} = useSelector((state: RootState) => state.sneakers)

    // const sneaker = sneakers && sneakers.length > 0 ? sneakers[0] : null;
    
    //Есть 2 варианта: 1) Мы через find по артикулам пушим в пустой массив потом его мапаем. 2) Мы фильтруем по какому-то размеру, потом полученный массив мапаем и отрисовываем карточку
return (
    <div className="SneakerPage">

      {sneakers && sneakers.filter((sneaker) => (sneaker.Sex.title==='Для него' && sneaker.Size.size===40)).map((sneak) => (<SneakerItem key={sneak.id} sneak={sneak}/> ))}
      {/* {sneaker && <SneakerItem sneaker={sneaker} />} */}
    </div>
 );

} 
export default SneakersPage
