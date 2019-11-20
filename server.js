const express = require('express');
const app = express();
const router = require('./router/main')(app);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


app.listen(3000, () =>
    console.log('Example app listening on port 3000.'),
);
app.use(express.static('public'));
