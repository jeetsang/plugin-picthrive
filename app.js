import createError from 'http-errors';
import express from 'express';
import path from 'path';
import Logger from './Logger';
import cookieParser from 'cookie-parser';
import router from './router';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined', {stream: Logger.stream}));

app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

export default app;
