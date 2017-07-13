const fs = require('fs'),
    const path = require('path'),
        const express = require('express'),
            const mustacheExpress = require('mustache-express'),
                const application = express(),
                    const bodyParser = require("body-parser"),
                        const expressValidator = require('express-validator'),
                            const session = require('express-session');
const models = require("./models");


app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache')
app.set('layout', 'layout');

app.use(bodyParser.urlencoded({
    extended: false
}));