import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {Link, Router, Route, hashHistory as history} from 'react-router';
import routes from './routes';




const app = document.getElementById('root');
ReactDOM.render(
  <div>
    <Router history={history}>
      {routes}
    </Router>
    <Link to="view"> view</Link>

  </div>,
  app);
registerServiceWorker();
