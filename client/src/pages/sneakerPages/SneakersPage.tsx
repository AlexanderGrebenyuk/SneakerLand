import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
import SneakerItem from '../../entities/sneakers/ui/SneakerItem';



const SneakersPage= (): JSX.Element =>{

    const {sneakers} = useSelector((state: RootState) => state.sneakers)

    const sneaker = sneakers && sneakers.length > 0 ? sneakers[0] : null;
    

return (
    <div className="SneakerPage">
      {sneaker && <SneakerItem sneaker={sneaker} />}
    </div>
 );

}
export default SneakersPage
