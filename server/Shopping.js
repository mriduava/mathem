const fetch = require("node-fetch");
const Cart = require('./models/Cart')

class Shopping{

    //Implement cart registration to db to simulate cart checkout
    createCart(products){
        new Cart({products: products}).save()
    }
    
    //Calculate price and compare with other stores of similar product
    calculatePrice(products){
        console.log(products);
        return "compare here"
    }
}
module.exports = Shopping