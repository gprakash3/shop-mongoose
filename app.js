const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const User = require('./models/user');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const contactRoutes= require('./routes/contact');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('65abe38a0ef39503c32820d9')
    .then(user => {
      req.user = user
      // console.log(req.user);
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(contactRoutes);

app.use(errorController.get404);


mongoose.connect(process.env.MONGODB_CONNECT)
    .then(result =>{
        User.findOne()
        .then(user => {
            if(!user){
                const user= new User({
                    name:'roy',
                    email: 'r@1',
                    cart: {items:[]}
                });
                user.save();
            }
        })
        app.listen(3000)
    })
    .catch(err => console.log(err));