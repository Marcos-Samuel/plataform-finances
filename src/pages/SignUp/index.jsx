import './style.css';
import Header from '../../components/Header';
import api from '../../services/base';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validationPost } from '../../components/RegisterValidation';

export default function SignUp() {
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationPost)
    });

    const onSubmit = async (data) => {
        try {
            await api.post('/usuario', data);
            console.log(data)
            reset();
            navigate('/');
        } catch (error) {
            setError(error.response.data.mensagem)
        };
    };

    return (
        <div className='container'>
            <div className='container-signup'>
                <Header />
                <form className='form-section'
                    onSubmit={handleSubmit(onSubmit)}>
                    <h2> Register </h2>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id='name'
                        {...register('nome')}
                    />
                    <span className='errors'>{errors.nome?.message}</span>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id='email'
                        {...register('email')}
                    />
                    <span className='errors'>{errors.email?.message}</span>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id='password'
                        {...register('senha')}
                    />
                    <span className='errors'>{errors.senha?.message}</span>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id='confirmPassword'
                        {...register('confirmeSenha')}
                    />
                    <span className='errors'>
                        {errors.confirmeSenha?.message}
                    </span>
                    {error && <span>{error}</span>}
                    <button
                        className="btn-sign"
                        type='submit'>
                        Sign up
                    </button>
                    <p>
                        Already registered?
                        <Link to="/" >
                            Click here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};