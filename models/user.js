const mongoose=require('mongoose');
const Order = require('./order');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type:String,
        require:true
    },
    email: {
        type:String,
        required:true
    },
    cart: {
        items: [{productId : {type: Schema.Types.ObjectId, ref:'Product', required:true}, quantity: {type:Number,required:true }}]
    }
})

userSchema.methods.addTocart = function(product){
    var cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.productId.toString() === product._id.toString();
              });
            //if item exist in cart then
            let newQuantity = 1;
            const updatedCartItems = [...this.cart.items];
        
            //if product found in cart, then increase quantity by one.
            if (cartProductIndex >= 0) {
              newQuantity = this.cart.items[cartProductIndex].quantity + 1;
              updatedCartItems[cartProductIndex].quantity = newQuantity;
            }
            //if product not found in cart then add product to cart and add quantity as 1.
            else{
              updatedCartItems.push({
                productId: product._id,
                quantity: newQuantity
              });
            }
            
            const updatedCart = {
              items: updatedCartItems
            };
            this.cart=updatedCart;
            //this will refere to schema
            console.log("this is updatedcart items" , updatedCartItems);

            return this.save();
        }

 //delete cart items
  userSchema.methods.deleteById = function(prodId){
    const updatedcart = this.cart.items.filter(item => {
        // console.log(item.productId.toString(), " ", prodId.toString());
      return item.productId.toString()!=prodId.toString();
    });
    this.cart.items = updatedcart;
    
    return this.save();

  }

  userSchema.methods.clearCart = function(){
    this.cart= {items:[]};
    return this.save()
  }



module.exports = mongoose.model('User', userSchema);



