import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const { form, auth, authError } = useSelector(({ auth }) => ({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError
    }));

    // Input change event handler
    const onChange = e => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'register',
                key: name,
                value
            })
        );
    };

    // Form registration event handler
    const onSubmit = e => {
        e.preventDefault();
        const { username, password, passwordConfirm } = form;
        if (password !== passwordConfirm) {
            // TODO: error
            return;
        }
        dispatch(register({ username, password }));
    };

    // Initialize the form when the component is first rendered
    useEffect(() => {
        dispatch(initializeForm('register'));
    }, [dispatch]);

    // register success / failure
    useEffect(() => {
        if (authError) {
            console.log('Error');
            console.log(authError);
            return;
        }
        if (auth) {
            console.log('Register Success');
            console.log(auth);
        }
    }, [auth, authError]);

    return (
        <AuthForm 
            type="register" 
            form={form} 
            onChange={onChange} 
            onSubmit={onSubmit} 
        />
    );
};

export default RegisterForm;