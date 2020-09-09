const db = 'mathem';
const PORT = 3200
const fetch = require("node-fetch");
const Product = require("./models/Product");
const Category = require("./models/Category");

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
   let categories = [
     "frukt-o-gront",
     "mejeri-o-ost",
     "brod-o-bageri",
     "kott-o-chark",
     "dryck",
     "skafferi",
     "fisk-o-skaldjur",
     "hem-o-hygien",
     "fardigmat-o-halvfabrikat",
     "glass-godis-o-snacks",
     "barnmat-o-tillbehor",
     "apotek-o-halsa",
     "smaksattare",
     "djurmat-o-tillbehor",
     "kiosk",
    ]
    categories.forEach(async (category) => {
     let dataCategory = new Category({name: category})
               Category.find(
                 { name: category},
                 (err, result) => {
                   if (!result.length) {
                     dataCategory.save();
                   } else {
                     dataCategory.update();
                   }
                 }
               );
      let dataHarvest = await fetch(
     `https://api.mathem.io/product-search/noauth/search/products/10/categorytag/${category}?size=1000&storeId=10&searchType=category&sortTerm=popular&sortOrder=desc`
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
                         badge.name == "Ekologisk" ? true : false;
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
               Product.find({productFullName : dataProduct.productFullName}, (err, result) => {
                 if(!result.length){
                  dataProduct.save()
                 }
                 else{
                  dataProduct.update()
                 }
               })
              })
    })
 });

 const bustCache = () =>{
  return '?avoidCache=' + (Math.random() + '').split('.')[1]
}

const stringToLink = (url) => {
  let updatedURL = url.replace(/ /g, "-")
//  console.log(updatedURL)
  return updatedURL
}

const convertPriceToEngSyntax = (num) => {
  let updatedNum = num.replace(/,/g, ".")
  return updatedNum
}

const priceToInt = (price) => {
  let newPrice = price.replace(/k/g, "")
  newPrice = newPrice.replace(/r/g, "")
  newPrice = newPrice.replace(/ /g, "")
  return newPrice
}

const removeWords = (word, wordToBeRemoved, wordToReplaceWith) => {
  let newWord = word.replace(/wordToBeRemoved/g, wordToReplaceWith)
  return newWord
}

const genericNullValue = (value) => {
  if (value === "") return 0
}

 app.get('/api/harvestWillys', async (req, res) => {
   let products = []
   
   
   let categories = await fetch('https://www.willys.se/leftMenu/categorytree' + bustCache())
   categories = await categories.json()
  
  
  for (let i = 0; i < categories.children.length; i++){

  let raw = await fetch('https://www.willys.se/c/' + categories.children[i].url + bustCache() + '$size=1000').then((data) => data.json());
   
   raw = raw.results
   //console.log(raw)
   raw.map(product => {
     let dataProduct = new Product({
       productName: product.name,
       productFullName: product.pickupProductLine2,
       volume: product.displayVolume,
       url: 'https://www.willys.se/produkt/' + stringToLink(product.name) + '-' + product.code,
       retail: 'willys',

       origin: "Not specified",

       priceUnit: product.priceUnit,
       price: convertPriceToEngSyntax(priceToInt(product.price)),
       comparePrice: genericNullValue(convertPriceToEngSyntax(priceToInt(product.comparePrice))),
       compareUnit: genericNullValue(product.comparePriceUnit),
       discount: product.discount
                   ? {
                       memberDiscount: product.potentialPromotions.applied ? true : false,
                       prePrice: removeWords(priceToInt(product.conditionLabel), 'Spara', '') ? product.comparePrice : null,
                       discountPrice: product.discount
                         ? product.discount.price
                         : null,
                       maxQuantity: product.discount
                         ? product.discount.quantityToBeBought
                         : null,
                     }
                   : null,
               
     }) 
     products.push(dataProduct)
     Product.find({productFullName : dataProduct.productFullName}, (err, result) => {
       if (!result.length){
         dataProduct.save()
       }else{
         dataProduct.update()
       }
     })
   })

  }
  console.log(products)
  return res.send(products);
 })

//Example of product to save in MongoDB


// let Product = require('./models/Product');
// let product = new Product({
//       title: "Gullök",
//       desc: "Svensk Gullök, having a strong, sharp smell and taste!",
//       price: "23.90"
// })

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