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

const mathemHarvester = () => {
  const data = app.get(
    `https://api.mathem.io/product-search/noauth/search/products/10/categorytag/frukt-o-gront?size=1000&storeId=10&searchType=category&sortTerm=popular&sortOrder=desc`,
  (req, res) => {
    return res.json
  });
  console.log(data)
  return data
}
app.get('/dataLog',(req,res) => {
  console.log(mathemHarvester());
  return res.send('In datalog')
})

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