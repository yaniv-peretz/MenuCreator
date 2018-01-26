require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('./libs/session.js')(app);
const port = process.env.PORT || 8081;

/*#######################
* url Handeling sequance
* #######################*/
// setting routes for API
const routes = require(`${__dirname}/routes/index.js`);
app.use('/api', routes);
// setting routes for static webpages
app.use(express.static(`${__dirname}/public`))
// a script tag to your application's JavaScript file(s) - required for react router BrowserHistory.
app.get('*', (request, response) => {
  response.sendFile(`${__dirname}/public/index.html`);
})

//Error Handlers (Must be at the bottom!!!)
require('./routes/errorHandeling.js');
/*#####    END     #####*/

//Start Node Server
app.listen(port);
console.log(`Node js listen on port ${port}...`);

