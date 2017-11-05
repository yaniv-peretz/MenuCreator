const express = require('express');
const path    = require('path');

const app = express();
global.app = app;

// global setting for accessControl
require('./config/accessControl.js');




/*#######################
* url Handeling sequance
* #######################*/
// setting routes for static webpages
app.use( express.static(path.join(__dirname, 'public')))
// setting routes for API
const routes = require('./routes/index.js');
app.use('/api', routes);
//Error Handlers (Must be at the bottom!!!)
require('./config/errorHandeling.js');
/*#####    END     #####*/





//Start listen on port
const port = 8080;
app.listen(port);
console.log("Node js listen on port " + port + "...");
