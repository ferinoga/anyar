const express = require('express');
const bodyParser = require('body-parser');
var morgan = require('morgan');
const app = express();


//parse appclication/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

//panggil routes
var routes = require('./routes');
routes(app);
//daftarkan menu routes dari index
app.use('/auth', require('./midleware'));
app.listen(3000, () => {
    console.log(`Server dimulai pada port 3000`);
});