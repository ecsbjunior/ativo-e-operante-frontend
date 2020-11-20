import React, { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import api from '../../services/api';

import Navbar from '../../components/Navbar';
import Separator from '../../components/Separator';

import '../../styles/pages/complaint.css';

interface ComplaintData {
    title: string;
    description: string;
    urgency: number;
    user: {
        email: string;
    };
    competentOrgan: {
        name: string;
    };
    problemType: {
        name: string;
    };
};

interface ComplaintParams {
    id: string;
};

interface FeedbackData {
    id: number;
    description: string;
}

const Complaint: React.FC = () => {
    const [complaint, setComplaint] = useState<ComplaintData>();
    const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]);
    const [message, setMessage] = useState('');

    const { addToast } = useToasts();

    const params = useParams<ComplaintParams>();

    useEffect(() => {
        api.get(`/complaints/${params.id}`).then(response => {
            setComplaint(response.data[0]);
        });
    }, [params.id]);

    useEffect(() => {
        api.get(`/feedbacks/${params.id}`).then(response => {
            setFeedbacks(response.data.sort((a: FeedbackData, b: FeedbackData) => a.id - b.id));
        });
    }, [params.id]);

    function loadFeedback() {
        api.get(`/feedbacks/${params.id}`).then(response => {
            setFeedbacks(response.data.sort((a: FeedbackData, b: FeedbackData) => a.id - b.id));
        });
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        api.post('/feedbacks', null, { params: { description: message, complaint_id: params.id } }).then(response => {
            if(response.data.status) {
                addToast('Feedback enviado com sucesso!', {
                    appearance: 'success',
                    autoDismiss: true
                });

                loadFeedback();
                setMessage('');
            }
            else {
                addToast('Falha ao enviar o feedback!', {
                    appearance: 'error',
                    autoDismiss: true
                });
            }
        });
    }

    return (
        <div className="container">
            <Navbar/>
            <div className="complaint-wrapper">
                <h1>{complaint?.title}</h1>
                <p>{complaint?.description}</p>
                <h4>{complaint?.competentOrgan.name}</h4>
                <h4>{complaint?.problemType.name}</h4>
                <Separator color="var(--color-cyan)"/>
                <p>{complaint?.user.email}</p>
                <Separator color="var(--color-cyan)"/>
                <div className="feedback-wrapper">
                    <h2>Feedback</h2>
                    <div className="feedback">
                        {
                            feedbacks.map(item => {
                                return (
                                    <p key={item.id} className="message">
                                        <strong>{item.id}: </strong>
                                        {item.description}
                                    </p>
                                )
                            })
                        }
                    </div>
                    <form onSubmit={handleSubmit}>
                        <textarea value={message} onChange={event => setMessage(event.target.value)} required></textarea>
                        <button type="submit">Enviar!</button>
                    </form>
                </div>
                <div className={`urgency priority-${complaint?.urgency}`}>{complaint?.urgency}</div>
            </div>
        </div>
    );
};

export default Complaint;