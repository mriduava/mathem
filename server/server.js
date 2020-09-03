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

// //  create cart api
// app.post('/createCart', (req, res) => {
//   // Insert logic here
//   return res.send('Cart created')
// })

// // Get products api
// app.post("/getProductsByFilter", (req, res) => {
//   // Insert logic here
//   return res.send("Products fetched");
// });

// app.get("/calculatePrice", (req, res) => {
//   // Insert logic here
//   return res.send("Calculated price")
// })

//Example of product to save in MongoDB


let Products = require('./models/CitygrossProduct');
// let product = new Product({
//       title: "Gullök",
//       desc: "Svensk Gullök, having a strong, sharp smell and taste!",
//       price: "23.90"
// })
// product.save();

app.get('/citygross', (req, res)=>{
  Products.find({}, (err, result)=>{
    err?res.json(err):res.json(result)
  })
})



//SERVER 
app.listen(PORT, ()=> 
      console.log(`Server is listening at port ${PORT}`))