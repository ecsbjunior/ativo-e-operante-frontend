import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts/Auth';

import Separator from '../../components/Separator';

import '../../styles/pages/home.css';

const Home: React.FC = () => {
    const {  username, signOut } = useAuth();

    function handleSignOut() {
        signOut();
    }

    return (
        <div className="container">
            <div className="wrapper">
                <h1>Seja bem vindo(a), {username}!</h1>
                <Separator color="var(--color-cyan)"/>
                <Link to="/complaints" className="link-styled">Visualizar Denuncias</Link>
                <Link to="/problem-types" className="link-styled">Gerenciar Tipos de Problemas</Link>
                <Link to="/competent-organs" className="link-styled">Gerencias Orgãos Competentes</Link>
                <Separator color="var(--color-cyan)"/>
                <button type="submit" onClick={handleSignOut}>Sign out</button>
                <p className="developers">Developers: Daniel Figueirinha, Eddy Augusto, Evandro Junior e Heitor Payão</p>
            </div>
        </div>
    );
};

export default Home;