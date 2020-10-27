var express = require('express');
const bodyParser = require("body-parser");
const user = require("./routes/user");
const UserModel = require("./model/User");
const BusinesslistModel = require("./model/Businesslist");
const InitiateMongoServer = require("./config/db");
var app = express();

const mongoose = require("mongoose");

const MONGOURI = "mongodb+srv://jaimini:jaimini@123@cluster0.ibqq8.mongodb.net/dbJaimini?retryWrites=true&w=majority";

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connected successfully");
});

app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/images', express.static(__dirname + 'public/images'))
app.use('/fonts', express.static(__dirname + 'public/fonts'))


app.use(bodyParser.urlencoded({ extended: true }));



app.use("/user", user);


//businesslist
app.get('/businesslist', async function (req, res) {

    try {
        
        const businesslistmodel = await BusinesslistModel.find()
       
        res.render('pages/businesslist',{'businesslists':businesslistmodel});
    } catch (error) {
        console.log({ error })
    }
    

});

// Update
app.post('/businesslist/:id', async function (req, res) {
    try {
        const id = req.params.id
        const business = await BusinesslistModel.findOne({ _id: id })
        business.contact_name = req.body.contact_name;
        business.contact_number = req.body.contact_number;
        business.email_address = req.body.email_address;
        
        await business.save()

     res.redirect('/businesslist');
    } catch (error) {
        console.log({ error })
    }

});


app.post('/businesslist', async function (req, res) {

    try {
        const business = await BusinesslistModel.create({
            contact_name: "jimu",
            contact_number: "123456789",
            email_adddress: "jimu@yahoo.com"
        })

        console.log({ business })

    } catch (error) {
        console.log({ error })
    }
    res.render('pages/home');

});


app.get('/businesslist/:id', async function (req, res) {

    try {
        const id = req.params.id
        const business = await BusinesslistModel.findOne({ _id: id })
        res.render('pages/update',{"business":business});
    } catch (error) {
        console.log({ error })
    }
    

});


// Delete
app.get('/businesslist/delete/:id', async function (req, res) {

    try {
        const id = req.params.id
        const business = await BusinesslistModel.deleteOne({ _id: id })
       
    } catch (error) {
        console.log({ error })
    }
    res.redirect('/businesslist');

});


// home page
app.get('/home', function(req, res) {
    res.render('pages/home');
});

// index page
app.get('/', function(req, res) {
    res.render('pages/home');
});

// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

// services page
app.get('/services', function(req, res) {
    res.render('pages/services');
});

// project page
app.get('/project', function(req, res) {
    res.render('pages/project');
});

// contact page
app.get('/contact', function(req, res) {
    res.render('pages/contact');
});

//Update
app.get('/update', function (req, res) {
    res.render('pages/update');
});

app.listen(process.env.PORT || 3000);