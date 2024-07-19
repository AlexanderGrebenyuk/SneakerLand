//@ts-nocheck
import React,{ useState } from 'react';
import { updateOrderAdminThunk } from '../adminBasketSlice';
import { useAppDispatch } from '../../../app/store/store';





const AdminOrdenItem =({sneakers, status})=>{
    const[orderStatus, setOrderStatus] = useState('')
    const dispatch = useAppDispatch();
    const[one, setOne] = useState('')
    const[two, setTwo] = useState('')
    const[three, setThree] = useState('')
    const[four, setFour] = useState('')
console.log(status, 33333);


// function stete(){


// switch(status){
//     case '1': 
//     setOne('в обработке')
//     setTwo('передаётся в доставку')
//     setThree('в пути')
//     setFour('доставлен')
//      break;
//      case '2': 
//      setOne('в обработке')
//      setTwo('передаётся в доставку')
//      setThree('в пути')
//      setFour('доставлен')
//      break;
//      case '3': 
//      setOne('в обработке')
//      setTwo('передаётся в доставку')
//      setThree('в пути')
//      setFour('доставлен')
//      break;
//      case '4': 
//      setOne('в обработке')
//      setTwo('передаётся в доставку')
//      setThree('в пути')
//      setFour('доставлен')
//      break
// }
// }
// useEffect(()=>{
//     stete()
// },[])



const onHendeleSelect= (status) =>{
    let id: number;
    switch(status){
        // case'передаётся в доставку': id =2; break;
        case 'В пути': id = 2; break;
        case 'Доставлено': id=3; break;
        // case'передаётся в доставку': id =2; break;

    }
    console.log(id,55555555);
    
   void dispatch(updateOrderAdminThunk(id))
}



return(
    <div className="BasketContainer">
  {sneakers.map((el)=> <p>{el.Sneaker.model}</p>
  )}
    <select defaultValue={status.name} onChange={(e)=>onHendeleSelect(e.target.value)}>
    <option  value='Передаётся в доставку'>передаётся в доставку</option>
    <option value='В пути'>в пути</option>
    <option value='Доставлено'>доставлен</option>
   </select>
  
  </div>

)

}


export default AdminOrdenItem