import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';

const RegisterForm = ({ history }) => {
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
            dispatch(check());
        }
    }, [auth, authError, dispatch]);

    // Make sure the user value is set correctly
    useEffect(() => {
        if (user) {
            history.push('/'); // Move to home page
        }
    }, [history, user]);

    return (
        <AuthForm 
            type="register" 
            form={form} 
            onChange={onChange} 
            onSubmit={onSubmit} 
        />
    );
};

export default withRouter(RegisterForm);