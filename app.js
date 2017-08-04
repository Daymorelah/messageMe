
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use('/', routes);
const port = process.env.PORT || 2340 ;


app.listen(port, () => {
  console.log('Server is up and listening on port 2340');
});

export default app;