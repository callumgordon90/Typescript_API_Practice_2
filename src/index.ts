import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import mysql from 'mysql';

const app = express();

//body parser: 
// this allows us to recieve requests from url encoded body but NOT from raw data
app.use(bodyParser.urlencoded({extended: false}))
//this allows us to recieve requests in JSON format
app.use(bodyParser.json())
//Note: express also allows us to perform the same function that bodyparser does



//This is a get endpoint:
app.get('/details/:id',(req: Request, res: Response) => {
    res.send({
        message: "Hello World!",
        id: req.params.id,
        name: req.params.name
    });
})


//post request endpoint:
app.post('/Id/:id/Name/:name', (req: Request, res: Response) => {
    res.send({
        data: req.body,
        params: {
            id: req.params.id,
            name: req.params.name
        }
    })
})

app.listen(3000, () => {
    console.log('The application is listening on port 3000!')
})