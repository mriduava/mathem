const db = 'mathem';
const PORT = 3200

/*To connect with MongoDB
 It will create a db named 'mathem'
*/
const { app } = require('mongoosy')({
  connect: {
    url: 'mongodb://localhost/' + db
  }
});

//Example of product to save in MongoDB


// let Product = require('./models/Product');
// let product = new Product({
//       title: "Gullök",
//       desc: "Svensk Gullök, having a strong, sharp smell and taste!",
//       price: "23.90"
// })
// product.save();



//SERVER 
app.listen(PORT, ()=> 
      console.log(`Server is listening at port ${PORT}`))