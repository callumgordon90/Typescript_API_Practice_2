"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mysql_1 = __importDefault(require("mysql"));
const dotenv_1 = __importDefault(require("dotenv"));
//The following line enables us to import and run dotenv:
dotenv_1.default.config();
const app = (0, express_1.default)();
//body parser: 
// this allows us to recieve requests from url encoded body but NOT from raw data
app.use(body_parser_1.default.urlencoded({ extended: false }));
//this allows us to recieve requests in JSON format
app.use(body_parser_1.default.json());
//Note: express also allows us to perform the same function that bodyparser does
//This is a get endpoint:
app.get('/details/:id', (req, res) => {
    var pool = mysql_1.default.createPool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        connectionLimit: 10,
        multipleStatements: true
    });
    pool.getConnection(function (err, conn) {
        if (err) {
            console.log('Entered into error');
            console.log(err);
            res.send({
                success: false,
                statusCode: 500,
                message: 'Getting error during the connection'
            });
            return;
        }
        console.log('The id: ' + req.params.id);
        //if you got a connection ...
        conn.query('SELECT * FROM actor WHERE actor_id=?', [req.params.id], function (err, rows) {
            if (err) {
                conn.release();
                return res.send({
                    success: false,
                    statusCode: 400
                });
            }
        });
    });
    res.send({
        message: "Hello World!",
        id: req.params.id,
        name: req.params.name
    });
});
//post request endpoint:
app.post('/Id/:id/Name/:name', (req, res) => {
    res.send({
        data: req.body,
        params: {
            id: req.params.id,
            name: req.params.name
        }
    });
});
app.listen(process.env.PORT, () => {
    console.log(`The application is listening on port ${process.env.PORT}!`);
});
