import React from 'react';
import { FiHome, FiBookOpen, FiAlertTriangle } from 'react-icons/fi';
import { FaBusinessTime } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Separator from '../Separator';

import './styles.css';

const Navbar: React.FC = () => {
    return (
        <div className="nav-wrapper">
            <Link to="/" className="styled-link">
                <FiHome size={26}/>
            </Link>
            <Separator color="var(--color-cyan)"/>
            <Link to="/complaints" className="styled-link">
                <FiBookOpen size={26}/>
            </Link>
            <Link to="/problem-types" className="styled-link">
                <FiAlertTriangle size={26}/>
            </Link>
            <Link to="/competent-organs" className="styled-link">
                <FaBusinessTime size={26}/>
            </Link>
        </div>
    );
};

export default Navbar;