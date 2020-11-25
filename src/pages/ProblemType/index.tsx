import React, { FormEvent, useEffect, useState } from 'react';
import { FiEdit3, FiTrash2 } from 'react-icons/fi';
import { useToasts } from 'react-toast-notifications';

import api from '../../services/api';

import Separator from '../../components/Separator';
import Navbar from '../../components/Navbar';
import Input from '../../components/Input';

import '../../styles/pages/problem-type.css';
import { useAuth } from '../../contexts/Auth';

interface ProblemTypeData {
    id: number;
    name: string;
};

const ProblemType: React.FC = () => {
    const [problemTypes, setProblemTypes] = useState<ProblemTypeData[]>([]);

    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [buttonText, setButtonText] = useState('Salvar');
    const [filter, setFilter] = useState('');

    const { addToast } = useToasts();
    const { apikey } = useAuth();

    useEffect(() => {
        api.get('/problem-types', { params: { apikey } }).then(response => {
            setProblemTypes(response.data.filter((item: ProblemTypeData) => item.name.includes(filter)));
        });
    }, [filter, apikey]);

    function loadProblemTypes() {
        api.get('/problem-types', { params: { apikey } }).then(response => {
            setProblemTypes(response.data.filter((item: ProblemTypeData) => item.name.includes(filter)));
        });
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const method = buttonText === 'Salvar' ? 'post' : 'put';

        api[method]('/problem-types', null, { params: { id, name, apikey } }).then(response => {
            if(response.data.status) {
                addToast((buttonText === 'Salvar' ? 'Salvo' : 'Alterado') + ' sucesso!', {
                    appearance: 'success',
                    autoDismiss: true
                });

                setId(0);
                setName('');
                setButtonText('Salvar');
                loadProblemTypes();
            }
            else {
                addToast('Falha ' + (buttonText === 'Salvar' ? 'no salvar' : 'na alteração') + "!", {
                    appearance: 'error',
                    autoDismiss: true
                });
            }
        });
    }

    function handleChange(problemType: ProblemTypeData) {
        setId(problemType.id);
        setName(problemType.name);

        setButtonText('Alterar');
    }

    function handleDelete(id: number) {
        const response = window.confirm('Deseja mesmo excluir?');

        if(response) {
            api.delete(`/problem-types`, { params: { id, apikey } }).then(response => {
                if(response.data.status) {
                    addToast('Excluido com sucesso!', {
                        appearance: 'success',
                        autoDismiss: true
                    });
                    
                    setId(0);
                    setName('');
                    setButtonText('Salvar');
                    loadProblemTypes();
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
                <h1>Tipos de problema</h1>
                <form onSubmit={handleSubmit}>
                    <Input id="problemtype-id" text="ID" type="text" value={id} required disabled/>
                    <Input id="problemtype-name" text="Nome" type="text" value={name} onChange={event => setName(event.target.value)} required/>
                    <button type="submit">{buttonText}</button>

                    <Separator color="var(--color-cyan)"/>
                    
                    <Input id="problemtype-search" text="Search" type="text" onChange={event => setFilter(event.target.value)}/>

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
                                    problemTypes.map(item => {
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

export default ProblemType;