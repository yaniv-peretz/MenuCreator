const express = require('express');
const path = require('path');

const app = express();
global.app = app;

// global setting for accessControl
require('./config/accessControl.js');



/*#######################
* url Handeling sequance
* #######################*/
// setting routes for API
const routes = require('./routes/index.js');
app.use('/api', routes);
// setting routes for static webpages
app.use(express.static(path.join(__dirname, 'public')))
// a script tag to your application's JavaScript file(s) - required for react router BrowserHistory.
app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
  })
  
//Error Handlers (Must be at the bottom!!!)
require('./config/errorHandeling.js');
/*#####    END     #####*/





//Start listen on port
const port = 8081;
app.listen(port);
console.log(`Node js listen on port ${port}...`);
