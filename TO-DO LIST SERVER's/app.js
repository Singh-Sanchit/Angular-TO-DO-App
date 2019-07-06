const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const taskRoutes = require('./api/routes/task');

const userRoutes = require('./api/routes/user');

mongoose.connect('mongodb://' + process.env.MONGO_DB_US + ':' + process.env.MONGO_DB_PW + '@ds247479.mlab.com:47479/todo-rawengg', {
    useCreateIndex: true,
    useNewUrlParser: true
});

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});


app.use(process.env.PATH_URL_v1 + '/user', userRoutes);

app.use(process.env.PATH_URL_v1 + '/task', taskRoutes);

app.use((req, res, next) => {
    const error = new Error('Routes Error Occured. No Match Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;

