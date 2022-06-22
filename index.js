const express = require('express');
const path = require('path')
const app = express();
const bodyParser = require('body-parser');
const User = require('./Models/userModel');
const dotenv = require('dotenv')
const cors = require('cors');
const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRouter');
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));   
app.use(cors())
app.use(express.json())
dotenv.config()



app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);

app.get('/', (req, res) => {
    res.render("index")
});

app.get('/login', (req, res) => {
    res.render("login")
});

app.get('/register', (req, res) => {
    res.render("register")
});

app.get('/forgot-password', (req, res) => {
    res.render("forgot-pass");
})
app.get('/reset/:uid/:resettoken', (req, res) => {
    res.render("reset-pass", {uid: req.params.uid, resettoken: req.params.resettoken});
})

app.get('/admin', (req, res) => {

})




app.get('/design', (req, res) => {
    console.log(req.query)
    res.render("tool")
})

app.listen(process.env.APP_PORT);