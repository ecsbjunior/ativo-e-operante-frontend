import React from 'react';
import { Link } from 'react-router-dom';
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
    return (
        <div id="complaint-item">
            <Link to={`complaints/${id}`} className='styled-link'>
                <h1>{title}</h1>
            </Link>
            <p>{description}</p>
            <div className={`urgency priority-${urgency}`}>{urgency}</div>
            <Separator color="var(--color-cyan)"/>
            <p className="user-description">{user}</p>
        </div>
    );
};

export default ComplaintItem;