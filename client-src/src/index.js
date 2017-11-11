import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './components/routes';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    <Routes />,
    document.getElementById('root')
);
registerServiceWorker();
