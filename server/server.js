const db = 'mathem';
const PORT = 3200
const fetch = require("node-fetch");

/*To connect with MongoDB
 It will create a db named 'mathem'
*/
const { app } = require('mongoosy')({
  connect: {
    url: 'mongodb://localhost/' + db
  }
});

 app.get("/api/harvestMathem", async (req, res) => {
   let dataHarvest = await fetch(
     `https://api.mathem.io/product-search/noauth/search/query?size=1000&index=1&storeId=10&memberType=P&searchType=recommended`
   );
   dataHarvest = await dataHarvest.json()
   return res.send(dataHarvest);
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