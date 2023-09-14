import * as yup from "yup";

export const validationPost = yup
    .object().shape({
        nome: yup
            .string()
            .required('Name is a required field')
            .matches(/^[A-Za-z\s]+$/, 'Enter only letters in the name field')
            .transform((originalValue) => {
                if (originalValue.trim() === '') {
                    return;
                }
                return originalValue.trim().split(' ').map(letra => {
                    return letra[0].toUpperCase().concat(letra.substring(1));
                }).join(' ');
            }),
        email: yup
            .string()
            .required('Email is a required field').email()
            .transform((email) => email.toLowerCase()),
        senha: yup
            .string()
            .required('Password is a required field')
            .min(6, 'Password must be at least 6 characters'),
        confirmeSenha: yup
            .string()
            .required()
            .test('check-password', 'Passwords must be the same', function (value) {
                return this.parent.senha === value;
            }),
    })
    .required();