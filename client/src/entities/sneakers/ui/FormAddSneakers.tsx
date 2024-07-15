import React, { useRef } from 'react';
import { number, object, string } from 'yup';
import { useAppDispatch } from '../../../app/store/store';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SneakerWithoutId } from '../types/sneakerType';
import { createSneakerThunk } from '../sneakerSlice';

const schema = object().shape({
  model: string().nullable().trim().required('Обязательно для заполнения'),

  description: string().nullable().trim().required('Обязательно для заполнения'),

  price: number()
    .required('Цена обязательна для заполнения')
    .positive('Цена должна быть положительным числом')
    .integer('Цена должна быть целым числом'),

  sexId: number()
    .required('Идентификатор пола обязателен для заполнения')
    .integer('Идентификатор пола должен быть целым числом'),

  sizeId: number()
    .required('Идентификатор размера обязателен для заполнения')
    .integer('Идентификатор размера должен быть целым числом'),

  colorId: number()
    .required('Идентификатор цвета обязателен для заполнения')
    .integer('Идентификатор цвета должен быть целым числом'),

  brandId: number()
    .required('Идентификатор бренда обязателен для заполнения')
    .integer('Идентификатор бренда должен быть целым числом'),
  images: object().nullable(),
});

type FormAddSneakersProps = {};
const FormAddSneakers = ({}: FormAddSneakersProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      model: '',
      description: '',
      price: 0,
      sexId: 0,
      sizeId: 0,
      colorId: 0,
      brandId: 0,
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onHandleSubmit = async (formData: {
    model: string;
    description: string;
    price: number;
    sexId: number;
    sizeId: number;
    colorId: number;
    brandId: number;
    images: FileList;
  }): Promise<void> => {
    const sneaker: SneakerWithoutId = {
      model: formData.model,
      description: formData.description,
      price: formData.price,
      sexId: formData.sexId,
      sizeId: formData.sizeId,
      colorId: formData.colorId,
      brandId: formData.brandId,
      articul: 0, // Пример значения по умолчанию
      createdAt: null,
      updatedAt: null,
      Sex: { id: formData.sexId, title: '', createdAt: null, updatedAt: null },
      Size: { id: formData.sizeId, size: 0, createdAt: null, updatedAt: null },
      Color: { id: formData.colorId, name: '', createdAt: null, updatedAt: null },
      Brand: { id: formData.brandId, name: '', createdAt: null, updatedAt: null },
      Images: [],
    };

    const formDataToSend = new FormData();
    formDataToSend.append('model', sneaker.model);
    formDataToSend.append('description', sneaker.description);
    formDataToSend.append('price', sneaker.price.toString());
    formDataToSend.append('sexId', sneaker.sexId.toString());
    formDataToSend.append('sizeId', sneaker.sizeId.toString());
    formDataToSend.append('colorId', sneaker.colorId.toString());
    formDataToSend.append('brandId', sneaker.brandId.toString());
    for (let i = 0; i < formData.images.length; i++) {
      formDataToSend.append('images', formData.images[i]);
    }

    try {
      await dispatch(createSneakerThunk(sneaker));
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" FormAddSneakers">
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <label htmlFor="model">
          Model:
          <input type="text" {...register('model')} />
          <span>{errors.model?.message}</span>
        </label>
        <br />
        <label htmlFor="description">
          description:
          <input type="text" {...register('description')} />
          <span>{errors.description?.message}</span>
        </label>
        <br />
        <label htmlFor="price">
          price:
          <input type="number" {...register('price')} />
          <span>{errors.price?.message}</span>
        </label>
        <br />
        <label htmlFor="sexId">
          sexId:
          <input type="number" {...register('sexId')} />
          <span>{errors.sexId?.message}</span>
        </label>
        <br />
        <label htmlFor="sizeId">
          sizeId:
          <input type="number" {...register('sizeId')} />
          <span>{errors.sizeId?.message}</span>
        </label>
        <br />
        <label htmlFor="colorId">
          colorId:
          <input type="number" {...register('colorId')} />
          <span>{errors.colorId?.message}</span>
        </label>
        <br />
        <label htmlFor="brandId">
          brandId:
          <input type="number" {...register('brandId')} />
          <span>{errors.brandId?.message}</span>
        </label>
        <br />
        <label htmlFor="images">
          Images:
          <input type="file" id='images' name='images' multiple ref={fileInputRef} onChange={(e) => register('images', {required: true})}/>
          <span>{errors.images?.message}</span>
        </label>
        <br />
        <button type="submit">Добавить</button>
        <input type="file" name="" id="" />
        <br />
      </form>
    </div>
  );
};
export default FormAddSneakers;
