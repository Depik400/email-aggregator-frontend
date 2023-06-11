import { useContext } from 'react';
import { Context } from '../../index';
import { useLocation, useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import './index.scss'
interface FormData {
    login: string,
    password: string,
}

function useLogin() {
    const { auth } = useContext(Context); 
    const navigate = useNavigate();
    const location = useLocation();
    return async () => {
        const result =await auth.login()
        if(result) {
            console.log('here');
            const returnTo = new URLSearchParams(location.search).get('returnTo');
            navigate(returnTo ?? '/')
        }
    }
}

function Component() {
  const { register, formState: { errors }, handleSubmit } = useForm<FormData>();
  const login = useLogin();
  const onSubmit = (e: FormData) => {
    login()
  }
  return (
    <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
        <div>Войдите в аккаунт</div>
      <input className='login__form-input' {...register("login", { required:  "поле 'Логин' обязательное для входа" })} 
        aria-invalid={errors.login ? "true" : "false"}  placeholder='Логин'/>
      {errors.login ? <span className='error'>{errors.login?.message}</span> : ''}
      <input className='login__form-input' placeholder='Пароль' type='password'   
      {...register("password", { required: "поле 'Пароль' обязательное для входа", minLength: {message: 'Минимально допустимая длина 6 символов', value: 6} })} 
        aria-invalid={errors.password ? "true" : "false"}  />
          {errors.password ? <span className='error'>{errors.password?.message}</span> : ''}
      <button className='login__form-btn'>Login</button>
    </form>
  );
}

export { Component };
