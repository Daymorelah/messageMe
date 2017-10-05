
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use( (req, res, next) =>{
// '*' is not good for production. Only if the API consumable is for public use.
  res.header("Access-Control-Allow-Origin", "*"); //allow another domain use ur api.
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();});
app.use('/', routes);
const port = process.env.PORT || 2340 ;


app.listen(port, () => {
  console.log('Server is up and listening on port ' +port);
});

export default app;