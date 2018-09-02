'use strict'
var express     = require('express')
,   app         = express()
,   router      = express.Router()
,   mysql       = require('mysql')
// ,   morgan      = require('morgan')
,   bodyParser  = require('body-parser')
,   cors        = require('cors')
,   path        = require('path')
// ,   fileUpload  = require('express-fileupload')
,   enviroment         = require('./config/enviroment')
// ,   validator = require('express-validator');
// , exphbs  = require('express-handlebars');

// app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');



// app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
// app.use(fileUpload());
// app.use(validator());

app.get('/', function(req, res) {
    res.json({ message: 'Welcome to Financial API'});
});



//Routes
const strategies  = require("./routers/strategy");
// const store = require("./routes/store/store");
//
app.use('/strategy', strategies)
// app.use('/store', store)

app.listen(enviroment.PORT, () =>{
  console.log("Sever started on port =>> " + enviroment.PORT)
})
