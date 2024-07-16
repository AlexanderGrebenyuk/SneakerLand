import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
import SneakerItem from '../../entities/sneakers/ui/SneakerItem';
import Sidebar from '../../widgets/Sidebar/Sidebar';
import './SneakerPages.css'
import { Sneaker } from '../../entities/sneakers/types/sneakerType';


const SneakersPage= (): JSX.Element =>{

    const {sneakers} = useSelector((state: RootState) => state.sneakers)
    
    console.log(111, sneakers);

    const filters = useSelector((state: RootState) => state.filters);

    const filteredSneakers = sneakers.filter((sneaker: Sneaker) => {
        return (
            (filters.color === '' || sneaker.Color.name === filters.color) &&
            (filters.brand === '' || sneaker.Brand.name === filters.brand) &&
            (filters.size === 0 || sneaker.Size.size === filters.size) &&
            (filters.sex === '' || sneaker.Sex.title === filters.sex)
        );
    });


 

console.log(filteredSneakers, "ttrtrtr");



return (
  <div className='layout'>
      <div className='sidebar'>
      <Sidebar/>
      </div>
    <div className="SneakerPage">
      
      {filteredSneakers && filteredSneakers.map((sneaker)=> <SneakerItem sneaker={sneaker} key={sneaker.id} />)}  

    </div>
    </div>
 );
 
}
export default SneakersPage


  