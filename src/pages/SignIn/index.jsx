import { useNavigate } from "react-router-dom";
import api from '../../services/base';
import { setItem } from "../../utils/storage";
import { useForm } from "react-hook-form";
import { useState } from "react";
import './style.css';
import Header from "../../components/Header";


export default function SignIn() {

    const navigate = useNavigate();

    const [error, setError] = useState('');

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = async (data) => {
        try {
            const response = await api.post('/login', data);
            setItem(response.data);
            navigate("/main");
            reset()
        } catch (error) {
            setError(error.response.data.mensagem)
        }
    }
    const handleSingUpNav = () => {
        navigate('/sign-up')
    }
    return (

        <div className="container">
            <Header />
            <div className="container-sign-in">
                <div className="content-text">
                    <h1>Control your <span>finances</span>,
                        without a boring spreadsheet.
                    </h1>
                    <p>
                        Organizing your finances has never been so easy,
                        with DINDIN, you have everything in one
                        place and just a click away.
                    </p>

                    <button
                        type="button" onClick={handleSingUpNav}>Sign up</button>
                </div>
                <div className="content-form">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            {...register('email')}
                        />
                        <span className='errors'>{errors.email?.message}</span>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            {...register('senha')}
                        />
                        {error && <span className="errors">{error}</span>}
                        <button className="btn-sign">Log in</button>
                    </form>

                </div>
            </div>
        </div>
    )
}