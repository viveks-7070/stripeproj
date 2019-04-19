const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphanldebars = require('express-handlebars');
const expEjsLayout = require('express-ejs-layouts');
const routes = express.Router();
const keys = require('./config/key');
const stripe = require('stripe')(keys.stripeSecretKey)


app.use(express.urlencoded({extended: false}));

app.use(expEjsLayout);
app.set('view engine', 'ejs');


const PORT = process.env.PORT || 2000;


app.get('/', function(req,res) {
    console.log('ddddddd')
    res.render('index', {
        pub: keys.stripePublishableKey
    })
})

app.post('/charge', function(req,res){
    const amount = 200
console.log('111111')
console.log(stripe.customers)


    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
    .then(customer => stripe.charges.create({
        amount,
        description: 'aaa',
        currency: 'usd',
        customer: customer.id
    }))
    .then(charge => res.render('success'))
})

app.listen(PORT, console.log(`server running on port ${PORT}`))
