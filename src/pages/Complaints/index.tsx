import React, { useEffect, useState } from 'react';

import ComplaintItem from '../../components/ComplaintItem';
import Navbar from '../../components/Navbar';
import Input from '../../components/Input';

import api from '../../services/api';

import '../../styles/pages/complaints.css';

interface ComplaintsData {
    id: number;
    title: string;
    description: string;
    urgency: number;
    user: {
        email: string
    };
}

const Complaints: React.FC = () => {
    const [complaints, setComplaints] = useState<ComplaintsData[]>([]);
    const [filteredComplaints, setFilteredComplaints] = useState<ComplaintsData[]>([]);

    useEffect(() => {
        api.get('/complaints').then(response => {
            setComplaints(response.data);
            setFilteredComplaints(response.data);
        });
    }, []);

    function filterComplaints(filter: string) {
        setFilteredComplaints(complaints.filter((item: ComplaintsData) => item.title.includes(filter)));
    };
    
    return (
        <div id="complaints-container">
            <Navbar/>
            <div id="complaints-wrapper">
                <div className="search-wrapper">
                    <Input id="search-complaint" text="Search" type="text" onChange={event => filterComplaints(event.target.value)}/>
                </div>
                <div className="complaints-area">
                    {
                        filteredComplaints.map(item => {
                            return (
                                <ComplaintItem
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    description={item.description}
                                    urgency={item.urgency}
                                    user={item.user.email}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Complaints;