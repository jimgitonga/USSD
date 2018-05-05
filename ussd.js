const Ussdmenu = require('ussd-menu-builder');
const express  = require('express');
var app = express();
let menu = new Ussdmenu();

menu.startState({
    run:() =>{
        menu.con('Welcome. Choose Option:'
        +'\n1. Show Balance'
        +'\n2. Buy Airtime');
    },
    next: {
        '1': 'showBalance',
        '2': 'buyAirtime'
    }
});
menu.state('showBalance',{
   run: () => {
       fetchBalance(menu.args.phoneNumber).then(function (bal) {
          menu.end('Your Balance is KES ' +bal);
       });
   }
});
menu.state('buyAirtime',{
   run: () => {
       menu.con('Enter Amount: ');
   },
   next: {
       '*\\d+': 'buyAirtime.amount'
   }
});
menu.state('buyAirtime.amount',{
   run: () => {
       var amount = Number(menu.val);
       buyAirtime(menu.args.phoneNumber,amount).then(function(res){
          menu.end('AirTime Bought Successfully');
       });
   }
});
app.post('/ussd',function(req,res){
    menu.run(req.body,ussdResult =>{
       res.send(ussdResult);
    });
})
