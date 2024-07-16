import React from 'react';
import { useAppSelector } from '../../app/store/store';
import { useParams } from 'react-router-dom';
import SneakerItemPage from '../../entities/sneakers/ui/SneakerItemPage';


const SneakerPage= (): JSX.Element =>{

    const {sneakers} = useAppSelector((state) => state.sneakers)
    const {sneakerId} = useParams()
    let sneaker 
    if(sneakerId){
        sneaker = sneakers.find((s) => s.id === +sneakerId)
    }
return (
<div className=' SneakerPage'>
    {sneaker && <SneakerItemPage sneaker={sneaker}/>}
 </div>
 );

}
export default SneakerPage
