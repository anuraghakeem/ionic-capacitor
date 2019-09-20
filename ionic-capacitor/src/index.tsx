import React from 'react';
import ReactDOM from 'react-dom';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
