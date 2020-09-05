const db = 'mathem';
const PORT = 3200
const fetch = require("node-fetch");
const Product = require("./models/Product");

/*To connect with MongoDB
 It will create a db named 'mathem'
*/
const { app } = require('mongoosy')({
  connect: {
    url: 'mongodb://localhost/' + db
  }
});


// URLS
let urls = [
  "https://api.mathem.io/product-search/noauth/search/products/10/categorytag/kott-o-chark?size=1000&storeId=10&searchType=category&sortTerm=popular&sortOrder=desc",
  "https://www.citygross.se/api/v1/esales/products"
]

app.get("/api/harvestMathem", async (req, res) => {
  let products = [];
  let dataHarvest = await fetch(
    `https://api.mathem.io/product-search/noauth/search/products/10/categorytag/kott-o-chark?size=1000&storeId=10&searchType=category&sortTerm=popular&sortOrder=desc`
  ).then((data) => data.json());
  dataHarvest = dataHarvest.products
  dataHarvest.map(product => {
  let dataProduct = new Product({
    productName: product.name,
    productFullName: product.fullName,
    volume: `${product.quantity} ${product.unit}`,
    url: product.url,
    retail: "mathem",
    label:
      product.badges.length > 1
        ? `${product.badges.forEach((badge) => {
            return badge.name;
          })}`
        : null,
    origin: product.origin ? product.origin.name : "Not specified",
    ecologic:
      product.badges.length > 1
        ? product.badges.forEach((badge) => {
            //badge.name == "Ekologisk" ? true : false;
          })
        : false,
    priceUnit: product.unit,
    price: product.price,
    comparePrice: product.comparisonPrice,
    compareUnit: product.comparisonUnit,
    discount: product.discount
      ? {
          memberDiscount: product.discount ? true : false,
          prePrice: product.discount ? product.price : null,
          discountPrice: product.discount
            ? product.discount.price
            : null,
          maxQuantity: product.discount
            ? product.discount.quantityToBeBought
            : null,
        }
      : null,
  });
  //console.log(dataProduct);
  products.push(dataProduct)
  // dataProduct.save()
})
   return res.send(products);
 });

//https://api.mathem.io/product-search/noauth/search/query?size=25&keyword=mj%C3%B6lk&searchType=searchResult&type=p&sortTerm=popular&sortOrder=desc&storeId=10&q=mj%C3%B6lk
//Get by product name
app.get('/api/harvestMathem/:name', async(req, res)=>{
  let productName = req.params.name
  let products = [];
  let dataHarvest = await fetch(
    `https://api.mathem.io/product-search/noauth/search/query?size=25&searchType=searchResult&type=p&sortTerm=popular&sortOrder=desc&storeId=10&q=` + productName
  ).then((data) => data.json());
  dataHarvest = dataHarvest.products
  dataHarvest.map(product => {
      let dataProduct = new Product({
        productName: product.name,
        productFullName: product.fullName,
        volume: `${product.quantity} ${product.unit}`,
        url: product.url,
        retail: "mathem",
        label:
          product.badges.length > 1
            ? `${product.badges.forEach((badge) => {
                return badge.name;
              })}`
            : null,
        origin: product.origin ? product.origin.name : "Not specified",
        ecologic:
          product.badges.length > 1
            ? product.badges.forEach((badge) => {
                //badge.name == "Ekologisk" ? true : false;
              })
            : false,
        priceUnit: product.unit,
        price: product.price,
        comparePrice: product.comparisonPrice,
        compareUnit: product.comparisonUnit,
        discount: product.discount
          ? {
              memberDiscount: product.discount ? true : false,
              prePrice: product.discount ? product.price : null,
              discountPrice: product.discount
                ? product.discount.price
                : null,
              maxQuantity: product.discount
                ? product.discount.quantityToBeBought
                : null,
            }
          : null,
      });
      products.push(dataProduct)
      // dataProduct.save()
  })
  return res.json(products);
})

//Example of product to save in MongoDB
const Products = require("./models/CitygrossProduct");
app.get("/api/mathem", (req, res) => {
  Products.find({}, (err, result) => {
    err ? res.json(err) : res.json(result);
  });
});

//SERVER 
app.listen(PORT, ()=> 
      console.log(`Server is listening at port ${PORT}`))