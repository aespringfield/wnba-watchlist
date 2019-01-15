const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const wnba = require('./routes/wnba');
const index = require('./routes/index');

app.use(express.static(path.join(__dirname, './public')));

app.use('/wnba', wnba);
app.use('*', index);

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`)
})