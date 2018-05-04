const express = require('express')
const parser = require('body-parser')

const logger = require('morgan')

const port = process.env.PORT || 3030

var app = express();

function  processRequest() {
    app.use(logger('dev'))
    app.use(parser.json())
    app.use(parser.urlencoded({extended:true}))

    app.get('*',(req,res) =>{
        res.send('USSD application ');
    });

    app.post('*',(req,res)=>{
        let {sessionId,serviceCode,phoneNumber,text} = req.body
            if(text == '' ){
                let response = `CON Welcome to Daystar University Ticketing System
                1. Book Bus
                2. Check Reservation`
                res.send(response);
            }else{
                res.status(400).send('Bad Request');
            }

    });

    app.listen(port,()=>{
        console.log(`Server Listening on port ${port}`)
    })
}

processRequest();