const express = require('express');
const app = express();

const wnba = require('./routes/wnba');

app.use('/wnba', wnba);

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`)
})