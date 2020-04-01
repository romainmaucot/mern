import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import emoji from 'node-emoji';
import responseTime from 'response-time';
import favicon from 'serve-favicon';
import indexRouter from './routes/index';
import playerRouter from './routes/player';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user';
import messageRouter from './routes/message';
import personRouter from './routes/person';
import fishRouter from './routes/fish';
const app = express();

dotenv.config();
// secure the server by setting various HTTP headers
app.use(helmet());

// only parse JSON
app.use(express.json());

// only parse urlencoded bodies
app.use(express.urlencoded({ extended: false }));

// protect against HTTP parameter pollution attacks
app.use(hpp());

// gzip/deflate/br compression outgoing responses
app.use(compression());

// parse Cookie header and populate req.cookies with an object keyed by the cookie names
app.use(cookieParser());

// allow AJAX requests to skip the Same-origin policy and access resources from remote hosts
app.use(cors());

// serve a visual favicon for the browser
app.use(favicon(__dirname + '/favicon.ico'));

// request logger | (dev) output are colored by response status
app.use(morgan('dev'));

// records the response time for HTTP requests
app.use(responseTime());

dotenv.config();
// limit repeated requests to endpoints such as password reset
app.use(
  new rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // limit each IP to 50 requests per windowMs
    message: 'Too many requests from this IP, please try again in 15 minutes'
  })
);
mongoose
  .connect('mongodb://test:test@localhost:27017/mern', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(emoji.get('heavy_check_mark'), 'MongoDB connection success');
  });

// routes
app.use('/', indexRouter);
app.use('/player', playerRouter);
app.use('/message', messageRouter);
app.use('/user', userRouter);
app.use('/person', personRouter);
app.use('/fish', fishRouter);

// setup ip address and port number
app.set('port', process.env.PORT || 3000);
app.set('ipaddr', '0.0.0.0');

// start express server
app.listen(app.get('port'), app.get('ipaddr'), function () {
  console.log(
    emoji.get('heart'),
    'The server is running @ ' + 'http://localhost:' + app.get('port'),
    emoji.get('heart')
  );
});
