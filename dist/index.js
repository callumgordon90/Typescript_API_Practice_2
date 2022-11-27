"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
//body parser: 
// this allows us to recieve requests from url encoded body but NOT from raw data
app.use(body_parser_1.default.urlencoded({ extended: false }));
//this allows us to recieve requests in JSON format
app.use(body_parser_1.default.json());
//Note: express also allows us to perform the same function that bodyparser does
//This is a get endpoint:
app.get('/Id/:id/Name/:name', (req, res) => {
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
app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
});
