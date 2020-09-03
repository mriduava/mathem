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
   let products = [];
   let dataHarvest = await fetch(
     `https://api.mathem.io/product-search/noauth/search/products/10/categorytag/kott-o-chark?size=1000&storeId=10&searchType=category&sortTerm=popular&sortOrder=desc`
   ).then((data) => data.json());
   dataHarvest = dataHarvest.products
   dataHarvest.map(product => {
               let dataProduct = {
                 name: product.name,
                 fullName: product.fullName,
                 volume: `${product.quantity} ${product.unit}`,
                 url: product.url,
                 retail: "mathem",
                 label: product.badges.forEach((badge) => {
                   return badge.name;
                 }),
                 origin: product.origin ? product.origin.name : null,
                 ecologic: product.badges.forEach((badge) => {
                   badge.name === "Ekologisk" ? true : false;
                 }),
                 priceUnit: product.unit,
                 price: product.price,
                 comparePrice: product.comparisonPrice,
                 compareUnit: product.comparisonUnit,
                 discount: product.discount ? {
                   memberDiscount: product.discount ? true : false,
                   prePrice: product.discount ? product.price : null,
                   discountPrice: product.discount ? product.discount.price : null,
                   maxQuantity:product.discount ? product.discount.quantityToBeBought : null,
                 } : null,
               };
               products.push(dataProduct)
   })
   return res.send(products);
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