import React, { FormEvent, useState } from 'react';
import { useToasts } from 'react-toast-notifications';

import { useAuth } from '../../contexts/Auth';

import Input from '../../components/Input';

import '../../styles/pages/signin.css';

const Signin: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { addToast } = useToasts();

    const { signIn } = useAuth()

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const response = await signIn(username, password);

        if(!response) {
            addToast('Não foi possivel fazer login!', {
                appearance: 'error',
                autoDismiss: true
            });
        }
        else {
            addToast('Login realizado com sucessor! Aguarde...', {
                appearance: 'success',
                autoDismiss: true
            });

            await new Promise(resolve => setTimeout(resolve, 1000));

            window.location.reload(false);
        }
    }

    return (
        <div className="container">
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>Signin</h1>
                    <Input id="username" text="Username" type="text" onChange={event => setUsername(event.target.value)} required/>
                    <Input id="password" text="Password" type="password" onChange={event => setPassword(event.target.value)} required/>
                    <button type="submit" style={{marginTop: "40px"}}>Sign in</button>
                </form>
            </div>
        </div>
    );
};

export default Signin;