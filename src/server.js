const app = require('./app.js');

const port = process.env.PORT || 5000;

app.set('port', port);

app.listen(app.get('port'), ()=> {
    console.log(`Listening on port ${port}`);
});

