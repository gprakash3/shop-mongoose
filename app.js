const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const User=require('./models/user');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findById('65a8c41aacb05dbb546bf9cd')
//     .then(user => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       // console.log(req.user);
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


mongoose.connect('mongodb+srv://prakash:prakash9031@cluster0.c9lcyai.mongodb.net/shop?retryWrites=true&w=majority')
.then(result => app.listen(3000))
.catch(err => console.log(err));