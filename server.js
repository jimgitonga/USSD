const express = require('express')
const parser = require('body-parser')

const logger = require('morgan')

const port = process.env.PORT || 3030

var app = express();
function processBankTransaction(){
    app.use(logger('dev'));
    app.use(parser.json());
    app.use(parser.urlencoded({extended:true}));
    app.get('*',(req,res)=>{
        res.send('XYZ Bank USSD Module');
    });
    app.post('*',(req,res) =>{
        let {account_number, account_balance,text} = req.body
        if(text ==''){
            let response  = `CON Welcome To XYZ Bank, Please Select
            1. Check Account Balance
            2. Know Your Account Number`
            res.send(response);
        }else if(text == '1'){
            account_balance = 'KSH 10,000';
            res.send(account_balance);
        }
    });
}
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
            }else if (text == '1'){
                let response = `CON Please Choose Time for Your Reservation
                1. 11:00am 
                2. 3:30pm
                3. 5:00pm`
                res.send(response);
        }
            else{
                res.status(400).send('Bad Request');
            }

    });

    app.listen(port,()=>{
        console.log(`Server Listening on port ${port}`)
    })
}
function getTime(){
    let time = new Date()
    console.log(time.getTimezoneOffset());
    return time;
}
processBankTransaction();
//processRequest();
getTime();