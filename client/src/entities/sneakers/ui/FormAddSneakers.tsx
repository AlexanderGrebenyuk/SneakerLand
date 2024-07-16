//@ts-nocheck
import React, { useState } from 'react';
import { number, object, string } from 'yup';
import { useAppDispatch } from '../../../app/store/store';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SneakerWithoutId } from '../types/sneakerType';
import { createSneakerThunk } from '../sneakerSlice';
import '../../../shared/ui/modal/Modal.css'

type FormValues = {
  model: string;
  description: string;
  price: number;
  sexId: number;
  sizeId: number;
  colorId: number;
  brandId: number;
};

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
});

type FormAddSneakersProps = {};
const FormAddSneakers = ({}: FormAddSneakersProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<FileList>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
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

  const onHandleSubmit = async (formData: {
    model: string;
    description: string;
    price: number;
    sexId: number;
    sizeId: number;
    colorId: number;
    brandId: number;
  }): Promise<void> => {
    const sneaker: SneakerWithoutId = {
      model: formData.model,
      description: formData.description,
      price: formData.price,
      sexId: formData.sexId,
      sizeId: formData.sizeId,
      colorId: formData.colorId,
      brandId: formData.brandId,
      articul: 0,
      Sex: { id: formData.sexId, title: '' },
      Size: { id: formData.sizeId, size: 0 },
      Color: { id: formData.colorId, name: '' },
      Brand: { id: formData.brandId, name: '' },
      Images: [],
    };

    const formDataToSend: any = new FormData();
    for (const key in sneaker) {
      formDataToSend.append(key, sneaker[key]);
    }

    formDataToSend.append('modelName', formData.model);

    for (let key in files) {
      formDataToSend.append('images', files[key]);
    }

    try {
      await dispatch(createSneakerThunk(formDataToSend));
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="FormAddSneakers">
      <form onSubmit={handleSubmit(onHandleSubmit)} enctype="multipart/form-data">
        <label htmlFor="model">
          Модель:
          <input type="text" {...register('model')} />
          <span>{errors.model?.message}</span>
        </label>
        <br />
        <label htmlFor="description">
          Описание:
          <input type="text" {...register('description')} />
          <span>{errors.description?.message}</span>
        </label>
        <br />
        <label htmlFor="price">
          Цена:
          <input type="number" {...register('price')} />
          <span>{errors.price?.message}</span>
        </label>
        <br />
        <label htmlFor="sexId">
          Пол:
          <input type="number" {...register('sexId')} />
          <span>{errors.sexId?.message}</span>
        </label>
        <br />
        <label htmlFor="sizeId">
          Размер:
          <input type="number" {...register('sizeId')} />
          <span>{errors.sizeId?.message}</span>
        </label>
        <br />
        <label htmlFor="colorId">
          Цвет:
          <input type="number" {...register('colorId')} />
          <span>{errors.colorId?.message}</span>
        </label>
        <br />
        <label htmlFor="brandId">
          Бренд:
          <input type="number" {...register('brandId')} />
          <span>{errors.brandId?.message}</span>
        </label>
        <br />
        <label htmlFor="images" className='input-file'>
          Изображения:
          <input
            type="file"
            id="images"
            name="images"
            multiple
            onChange={(e) => {
              if (e.target.files) {
                setFiles(e.target.files);
              }
            }}
          />
          <span>Добавить файлы</span>
        </label>
        <br />
        <button type="submit">Добавить</button>
      </form>
    </div>
  );
};
export default FormAddSneakers;
