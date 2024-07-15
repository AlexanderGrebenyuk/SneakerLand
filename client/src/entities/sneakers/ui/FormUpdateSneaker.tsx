import React, { useState } from 'react';
import { Sneaker } from '../types/sneakerType';
import { useAppDispatch } from '../../../app/store/store';
// import { updateSneakerThunk } from '../sneakerSlice';


type FormUpdateSneakerProps={
    sneak: Sneaker
}
const FormUpdateSneaker= ({sneak}: FormUpdateSneakerProps): JSX.Element =>{
    const dispatch = useAppDispatch()
    
    const [model, setModel] = useState(sneak.model)
    const [description, setDescription] = useState(sneak.description)
    const [price, setPrice] = useState(sneak.price)
    const [articul, setArticul] = useState(sneak.articul)
    const [sexId, setSexId] = useState(sneak.Sex.id)
    const [sizeId, setSizeId] = useState(sneak.Size.id)
    const [colorId, setColorId] = useState(sneak.Color.id)
    const [brandId, setBrandId] = useState(sneak.Brand.id)
    const [sex, setSex] =useState(sneak.Sex.title)
    const[size, setSize] = useState(sneak.Size.size)
    const [color, setColor] = useState(sneak.Color.name)
    const [image, setImage] = useState(sneak.Images) // СПРОСИТЬ У ВЛАДА

    const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        // e.preventDefault()
        // void dispatch(updateSneakerThunk({id: sneak.id, body:{model, description, price, articul, sexId, sizeId, colorId, brandId, Images: image}}))
    }
 
return (
<div className=' FormUpdateSneaker'>
 </div>
 );

}
export default FormUpdateSneaker
