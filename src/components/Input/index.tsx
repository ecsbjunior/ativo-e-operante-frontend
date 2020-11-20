import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    type: string;
    text: string;
};

const Input: React.FC<InputProps> = ({ type, text, id, ...rest }) => {
    return (
        <div id="wrapper-input">
            <input id={id} type={type} {...rest}/>
            <label htmlFor={id}>{text}</label>
            <div></div>
        </div>
    );
};

export default Input;