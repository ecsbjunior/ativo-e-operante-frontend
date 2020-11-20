import React from 'react';

import './styles.css';

const Loading: React.FC = () => {
  return (
    <div id="loading-container">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;