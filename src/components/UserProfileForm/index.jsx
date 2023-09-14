import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import { validationPost } from '../RegisterValidation';
import useUser from '../../hooks/useUser';

function UserProfileForm({ initialValues, onSubmit }) {

    const {
        nome,
        email,
    } = initialValues;

    const { error } = useUser()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationPost)
    });

    const handleTeste = (data) => {
        onSubmit(
            data
        );
    }

    return (
        <form className='form-section'
            onSubmit={handleSubmit(handleTeste)}>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                defaultValue={nome}
                id='name'
                {...register('nome')}
            />
            <span className='errors'>{errors.nome?.message}</span>
            <label htmlFor="email">Email</label>
            <input
                type="email"
                defaultValue={email}
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
                type="submit"
                className='btn-confirm-modal'>
                Editar Perfil
            </button>
        </form>
    );
}

export default UserProfileForm;