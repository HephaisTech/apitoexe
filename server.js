
/**
 * Music : Bear McCreary - God of War Ragnarök
 * author : Ramius
 * todo : create a RestFull Api for Municipal Taxe Paiement
 * mood : Sad
 * Date : 22/11/2023
 */


const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
var bodyParser = require('body-parser');
const path = require('path');
const swaggerJSdoc = require('swagger-jsdoc');
const swaggerUIexpress = require('swagger-ui-express');
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");
const express = require('express');
const app = express();
const port = 3000;


const guardpath = express.static(path.join(__dirname, './guard/'));
const { version } = require('process');
dotenv.config();


//swagger
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: ' SICOM API Documentation',
            version: '0.0.2',
            Author: 'ZANDJI yao Marius B.'
        },
        securityDefinition: {
            bearerAuth: {
                type: 'Cookie',
                name: 'CMken',
                in: 'header',
            },
        },

    },
    apis: ['server.js']
};

const swaggerDocs = swaggerJSdoc(swaggerOptions);
//app web config
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Content-Type', 'Application/json');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true, parameterLimit: 50000 }));
app.use(cors());
app.use(cookieParser());

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
        },
    }),
);
const limiter = RateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20,
});
// Apply rate limiter to all requests
app.use(limiter);
// app uses



app.use('/api/doc', swaggerUIexpress.serve, swaggerUIexpress.setup(swaggerDocs));
app.use('/api/v1/contrib', require('./src/routes/contribRouter'));
app.use('/api/v1/type', require('./src/routes/typeRouter'));
app.use('/api/v1/categories', require('./src/routes/categorieRouter'));
app.use('/api/v1/modeles', require('./src/routes/modelRouter'));
app.use('/api/v1/activites', require('./src/routes/activiteRouter'));
app.use('/api/v1/mesures', require('./src/routes/mesureRouter'));
app.use('/api/v1/marches', require('./src/routes/marcherRouter'));
app.use('/api/v1/communes', require('./src/routes/communeRouter'));
app.use('/api/v1/arrondissements', require('./src/routes/arrondissementRouter'));
app.use('/api/v1/agents', require('./src/routes/agentRouter'));
app.use('/api/v1/typeOpe', require('./src/routes/typeOpeRouter'));
app.use('/api/v1/operations', require('./src/routes/operationRouter'));
app.use('/api/v1/auth', require('./src/routes/authRouter'));

//endpoints
app.get('/', function (req, res) {
    res.send('Hello World')
})


//error handler
app.use((err, req, res, next) => { res.status(500).json({ message: err.message, statck: err.stack, result: false }); })

app.listen(port, () => { console.log(` listening on port localhost:${port}! `) });

module.exports = app;