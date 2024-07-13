import React from 'react';
import { RootState, useAppSelector } from '../../../app/store/store';


type NavbarProps={
}
const Navbar= ({}: NavbarProps): JSX.Element =>{
    const { user } = useAppSelector((state: RootState) => state.user);
    console.log(user);
    
return (
<div className=' Navbar'>
 </div>
 );

}
export default Navbar
