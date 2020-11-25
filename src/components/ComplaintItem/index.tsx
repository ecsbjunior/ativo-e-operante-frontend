import React from 'react';
import { FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useAuth } from '../../contexts/Auth';

import api from '../../services/api';

import Separator from '../Separator';

import './styles.css';

interface ComplaintItemProps {
    id: number;
    title: string;
    description: string;
    urgency: number;
    user: string
};

const ComplaintItem: React.FC<ComplaintItemProps> = ({ id, title, description, urgency, user }) => {
    const { addToast } = useToasts();
    const { apikey } = useAuth();
    
    function handleDeleteComplaint() {
        const ans = window.confirm("Deseja realmente exluir essa denuncia?");

        if(ans) {
            api.delete('/complaints', { params: { id, apikey } }).then(async response => {
                console.log(response.data);

                if(response.data.status) {
                    addToast('Exclusão realizada com sucesso!', {
                        appearance: 'success',
                        autoDismiss: true
                    });

                    await new Promise(resolve => setInterval(resolve, 1000));

                    window.location.reload();
                }
                else {
                    addToast('Erro na exclusão!', {
                        appearance: 'error',
                        autoDismiss: true
                    });
                }
            });
        }
    }

    return (
        <div id="complaint-item">
            <Link to={`complaints/${id}`} className='styled-link'>
                <h1>{title}</h1>
            </Link>
            <p>{description}</p>
            <div className={`urgency priority-${urgency}`}>{urgency}</div>
            <div className="delete-complaint" onClick={handleDeleteComplaint}>
                <FiX size={24}/>
            </div>
            <Separator color="var(--color-cyan)"/>
            <p className="user-description">{user}</p>
        </div>
    );
};

export default ComplaintItem;