const express = require('express');
const path = require('path')
const app = express();
const bodyParser = require('body-parser');
const User = require('./Models/userModel');
const dotenv = require('dotenv')
const cors = require('cors');
const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRouter');
const payGatewayRouter = require('./routes/payGatewayRouter')
const memeRouter = require('./routes/memeRoutes');
const statisticsRouter = require('./routes/statisticsRouter');
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));   
app.use(cors())
app.use(express.json())
dotenv.config()


app.use('/api/users', userRouter);
app.use('/api/memes', memeRouter)
app.use('/api/admin', adminRouter);
app.use('/api/admin/paygateway', payGatewayRouter)
app.use('/api/statistics', statisticsRouter);


app.get('/', (req, res) => {
    res.render("user-dashboard/index")
});

app.get('/login', (req, res) => {
    res.render("user-dashboard/login")
});

app.get('/register', (req, res) => {
    res.render("user-dashboard/register")
});

app.get('/forgot-password', (req, res) => {
    res.render("forgot-pass");
})
app.get('/reset/:uid/:resettoken', (req, res) => {
    res.render("reset-pass", {uid: req.params.uid, resettoken: req.params.resettoken});
})

app.get('/user', (req, res) => {
    res.render("user-dashboard/index");
})
app.get('/admin', (req, res) => {
    res.render("admin-dashboard/index");
})

app.get('/logout', (req, res) => {
    res.redirect('/login')
})



app.get('/design', (req, res) => {
    res.render("Tool/tool")
})

app.listen(process.env.APP_PORT);