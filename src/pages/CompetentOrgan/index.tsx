import React, { FormEvent, useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { FiEdit3, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import Input from '../../components/Input';
import Navbar from '../../components/Navbar';
import Separator from '../../components/Separator';

import '../../styles/pages/competent-organs.css';
import { useAuth } from '../../contexts/Auth';

interface CompetentOrganData {
    id: number;
    name: string;
};

const CompetentOrgan: React.FC = () => {
    const [competentOrgans, setCompetentOrgans] = useState<CompetentOrganData[]>([]);

    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [buttonText, setButtonText] = useState('Salvar');
    const [filter, setFilter] = useState('');

    const { addToast } = useToasts();
    const { apikey } = useAuth();

    useEffect(() => {
        api.get('/competent-organs', { params: { apikey } }).then(response => {
            setCompetentOrgans(response.data.filter((item: CompetentOrganData) => item.name.includes(filter)));
        });
    }, [filter, apikey]);

    function loadCompetentOrgans() {
        api.get('/competent-organs', { params: { apikey } }).then(response => {
            setCompetentOrgans(response.data.filter((item: CompetentOrganData) => item.name.includes(filter)));
        });
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const method = buttonText === 'Salvar' ? 'post' : 'put';

        api[method]('/competent-organs', null, { params: { id, name, apikey } }).then(response => {
            if(response.data.status) {
                addToast((buttonText === 'Salvar' ? 'Salvo' : 'Alterado') + ' sucesso!', {
                    appearance: 'success',
                    autoDismiss: true
                });

                setId(0);
                setName('');
                setButtonText('Salvar');
                loadCompetentOrgans();
            }
            else {
                addToast('Falha ' + (buttonText === 'Salvar' ? 'no salvar' : 'na alteração') + "!", {
                    appearance: 'error',
                    autoDismiss: true
                });
            }
        });

        
    }

    function handleChange(competentOrgan: CompetentOrganData) {
        setId(competentOrgan.id);
        setName(competentOrgan.name);

        setButtonText('Alterar');
    }

    function handleDelete(id: number) {
        const response = window.confirm('Deseja mesmo excluir?');

        if(response) {
            api.delete(`/competent-organs`, { params: { id, apikey } }).then(response => {
                if(response.data.status) {
                    addToast('Excluido com sucesso!', {
                        appearance: 'success',
                        autoDismiss: true
                    });

                    setId(0);
                    setName('');
                    setButtonText('Salvar');
                    loadCompetentOrgans();
                }
                else {
                    addToast('Problema ao excluir!', {
                        appearance: 'error',
                        autoDismiss: true
                    });
                }
            });
        }
    }

    return (
        <div className="container">
            <Navbar/>
            <div className="wrapper">
                <h1>Orgãos Competentes</h1>
                <form onSubmit={handleSubmit}>
                    <Input id="competentorgan-id" text="ID" type="text" value={id} required disabled/>
                    <Input id="competentorgan-name" text="Nome" type="text" value={name} onChange={event => setName(event.target.value)} required/>
                    <button type="submit">{buttonText}</button>

                    <Separator color="var(--color-cyan)"/>
                    
                    <Input id="competentorgan-search" text="Search" type="text" onChange={event => setFilter(event.target.value)}/>

                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <td>ID</td>
                                    <td>Nome</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    competentOrgans.map(item => {
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td onClick={() => handleChange(item)}>
                                                    <FiEdit3/>
                                                </td>
                                                <td onClick={() => handleDelete(item.id)}>
                                                    <FiTrash2/>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompetentOrgan;