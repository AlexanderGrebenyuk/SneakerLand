import React from 'react';
import { useAppDispatch } from '../../app/store/store';
import { authorizationThunk } from '../../entities/users/authSlice';
import { object, string } from 'yup';
import { UserWithoutName } from '../../entities/users/types/userTypes';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = object().shape({
  email: string().email().nullable().trim().required('Не email'),
  password: string()
    .trim()
    .required('Необходимо указать пароль')
    .min(5, 'пароль жолжен быть не менее 5 символов ')
    .max(20, 'пароль должен быть не более 20 символов'),
});

function AuthorizationPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
 
  const onHandleSubmit = async (formData: { email: string; password: string }): Promise<void> => {
    const user: UserWithoutName = {
      email: formData.email,
      password: formData.password,
      isAdmin: false,
    };
    void dispatch(authorizationThunk(user));
  };

  return (
    <form onSubmit={handleSubmit(onHandleSubmit)}>
      <label htmlFor="email">
        Email:
        <input type="email" {...register('email')} />
        <span>{errors.email?.message}</span>
      </label>
      <br />
      <label htmlFor="password">
        Password:
        <input type="password" {...register('password')} />
        <span>{errors.password?.message}</span>
      </label>
      <button type="submit">login</button>
    </form>
  );
}

export default AuthorizationPage;
