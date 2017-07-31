
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use('/', routes);



app.listen(2340, () => {
  console.log('Server is up and listening on port 234');
});

export default app;