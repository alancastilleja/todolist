const express = require('express');

const app = express();

app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.use(express.static('public'));

let items = [];

let workitems = ['work'];

var today = new Date();
let poop = today.getDay();

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

app.get('/', (req, res) => {
    let day;
    if (today.getDay() === 6 || today.getDay() === 0){
        day = today.toLocaleDateString('en-US', options);
        res.render('list', {foo: day, foo2: poop, newListItem: items});
    }
    else{
        day = today.toLocaleDateString('en-US', options);
        res.render('list', {foo: day, foo2: poop, newListItem: items});
    }

})

app.get('/work', (req, res) => {
    let title;
    if (today.getDay() === 6 || today.getDay() === 0){
        title = 'Weekend means no work';
        res.render('list', {foo: title,foo2: poop, newListItem: workitems})
    }
    else{
        title = 'Work Stuff';
        res.render('list', {foo: title,foo2: poop, newListItem: workitems})
    }
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.post('/', (req, res) => {
    let item = req.body.newItem;
    if (req.body.list === 'Work Stuff' || req.body.list === 'Weekend means no work'){
        workitems.push(item);
        res.redirect('/work');
    }
    else {
        items.push(item);
        res.redirect('/');
    }
})

app.listen(3000, () => {
    console.log('running');
})

