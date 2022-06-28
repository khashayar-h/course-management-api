const express = require('express');
const Joi = require('joi');
const logger = require('./logger');
const morgan = require('morgan');
const config = require('config');
const app = express();
const debug = require('debug')('app:debug');
const home = require('./routes/home');

app.use(express.json());
app.use(logger.log);
app.use(express.urlencoded({ extended:true }));
app.use(express.static('public'));
app.use('/', home);

if(app.get('env') === 'developement'){
    app.use(morgan());
    debug('Morgan Enabled...');
}
console.log(`NODE_ENV : ${process.env.NODE_ENV}`);
console.log(`env : ${app.get('env')}`);

console.log(config.get('name'));
console.log(config.get('password'));

const port = process.env.PORT || 3000;

app.listen(port, ()=>{console.log(`Listening on port ${port}`)});

function validateName(course){
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema);
}