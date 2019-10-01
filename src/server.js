const express = require('express');
const path = require('path');
const morgan = require('morgan');
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  //{ DB } = require('./config/DB'),
  
  medicionRoutes = require('./routes/medicion');
  medidorRoutes = require('./routes/medidor');
  itemRoutes = require('./routes/item');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://admin_:Multi123@cluster0-kjgjp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true,
useUnifiedTopology: true }
);

/*
mongoose.connect(DB, { useMongoClient: true})
  .then(() => console.log('Db is conencted'))
  .catch(err => console.error(err));
*/
const app = express();
var port = process.env.PORT || 4000;

// middlewares
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

// routes
app.use('/medidor', medidorRoutes);
app.use('/items', itemRoutes);
app.use('/medicion', medicionRoutes);


// static file
app.use(express.static(path.join(__dirname, 'public')));

// start the server
var server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});
