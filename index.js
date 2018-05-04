const app = require('express')
const bodyParser = require('body-parser')

const logger = require('morgan')

const port = process.env.PORT || 3030

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('*',(req,res) => {
    res.send('Node Js Application to test USSD programming')
})

app.post('*',(req,res) => {
    let {sessionId ,serviceCode, phoneNumber, text} = req.body
    if(text == ''){
        let response = `CON what would you want to check
        1. My Account
        2. My Phone Number`
        res.send(response)
    }else if(text == '1'){
        let response = `CON Choose Account Information you want to view
        1. Account Number
        2. Account Balance`
        res.send(response)
    }else if(text == '2'){
        let response = `END Your phone number is ${phoneNumber}`
        res.send(response)
    }else if(text == '1*1'){
        let accountNumber = 'ACC1001'

        let response =  `END Your Account Number is ${accountNumber}`
        res.send(response)
    }else if (text == '1*2'){
        let balance = 'KSH 10,000'
        let response = `END Your balance is ${balance}`
        res.send(response)
    }else{
        res.status(400).send('Bad Request!')
    }
})
app.listen(port,() => {
    console.log(`Server Running on port ${port}`)
})