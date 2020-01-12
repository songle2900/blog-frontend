import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';

const RegisterForm = ({ history }) => {
    const [error, setError] =  useState(null);
    const dispatch = useDispatch();
    const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user
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
        // If any field is empty
        if ([username, password, passwordConfirm].includes('')) {
            setError('Please fill in all blanks.');
            return;
        }

        // If the passwords do not match
        if (password !== passwordConfirm) {
            setError('Passwords do not match.');
            dispatch(changeField({ form: 'register', key: 'password', value: '' }));
            dispatch(changeField({ form: 'register', key: 'passwordConfirm', value: '' }));
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
            // When user name already exists
            if (authError.response.status === 409) {
                setError('This user name already exists.');
                return;
            }
            // Other reasons
            setError('Register failed');
            return;
        }

        if (auth) {
            console.log('Register Success');
            console.log(auth);
            dispatch(check());
        }
    }, [auth, authError, dispatch]);

    // Make sure the user value is set correctly
    useEffect(() => {
        if (user) {
            history.push('/'); // Move to home page
            try {
                localStorage.setItem('user', JSON.stringify(user));
            } catch (e) {
                console.log('localStorage is not working');
            }
        }
    }, [history, user]);

    return (
        <AuthForm 
            type="register" 
            form={form} 
            onChange={onChange} 
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default withRouter(RegisterForm);