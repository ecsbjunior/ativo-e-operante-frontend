import React from 'react';

import "./styles.css";

interface SeparatorProps {
    color: string;
}

const Separator: React.FC<SeparatorProps> = ({ color }) => {
    return (
        <div id="separator" style={{backgroundColor: color}}></div>
    );
};

export default Separator;