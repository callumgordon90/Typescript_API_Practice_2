import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv';
//The following line enables us to import and run dotenv:
dotenv.config();

const app = express();

//body parser: 
// this allows us to recieve requests from url encoded body but NOT from raw data
app.use(bodyParser.urlencoded({extended: false}))
//this allows us to recieve requests in JSON format
app.use(bodyParser.json())
//Note: express also allows us to perform the same function that bodyparser does



//This is a get endpoint:
app.get('/details/:id',(req: Request, res: Response) => {

    var pool = mysql.createPool({
        host        : process.env.HOST,
        user        : process.env.USER,
        password    : process.env.PASSWORD,
        database    : process.env.DATABASE,
        connectionLimit: 10,        //This is the maximum number of connections before your pool starts waiting for a release
        multipleStatements : true
    });

    pool.getConnection(function (err: any, conn: any) {
        if (err)
        {
            console.log('Entered into error')
            console.log(err)
            res.send({
                success: false,
                statusCode: 500,
                message: 'Getting error during the connection'
            })

            return;
        }

        console.log('The id: ' + req.params.id);

        //if you got a connection ...
        conn.query('SELECT * FROM actor WHERE actor_id=?', [req.params.id], function(err : any, rows : any) {
            if(err) {
                conn.release();
                return res.send({
                    success: false,
                    statusCode: 400 
                })
            }
        })
    })





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

app.listen(process.env.PORT, () => {

    console.log(`The application is listening on port ${process.env.PORT}!`)
})