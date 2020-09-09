const db = 'mathem';
const PORT = 3200
const fetch = require("node-fetch");
const Product = require("./models/Product");
const Category = require("./models/Category");
const DateUpdate = require("./models/DateUpdate")

/*To connect with MongoDB
 It will create a db named 'mathem'
*/
const { app } = require('mongoosy')({
  connect: {
    url: 'mongodb://localhost/' + db
  }
});

 const mathemHarvester = () => {
   let todaysDate = new DateUpdate({dateUpdated:new Date()})
   DateUpdate.find({},(err, result) => {
     if(!result.length){
         todaysDate.save()
     }
     else{
              result.map((date) => {
                console.log(todaysDate.dateUpdated);
                console.log(date.dateUpdated);
                if(todaysDate.dateUpdated.getDate() > date.dateUpdated.getDate() && todaysDate.dateUpdated.getTime() > date.dateUpdated.getTime()){
                  // todaysDate.save()
                  return
                }
              });
     }
   })
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
   ];
   categories.forEach(async (category) => {
     let dataCategory = new Category({ name: category });
     Category.find({ name: category }, (err, result) => {
       if (!result.length) {
         dataCategory.save();
       } else {
         dataCategory.update();
       }
     });
     let dataHarvest = await fetch(
       `https://api.mathem.io/product-search/noauth/search/products/10/categorytag/${category}?size=1000&storeId=10&searchType=category&sortTerm=popular&sortOrder=desc`
     ).then((data) => data.json());
     dataHarvest = dataHarvest.products;
     dataHarvest.map((product) => {
       let labels = ''
       let dataProduct = new Product({
         productName: product.name,
         productFullName: product.fullName,
         volume: `${product.quantity} ${product.unit}`,
         url: product.url,
         image: product.images.MEDIUM,
         retail: "mathem",
         label: labels ?
           product.badges.length > 1
             ? product.badges.forEach((badge) => {
                  labels.concat(badge.name);
               })
             : null : null,
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
               discountPrice: product.discount ? product.discount.price : null,
               maxQuantity: product.discount
                 ? product.discount.quantityToBeBought
                 : null,
             }
           : null,
       });
       products.push(dataProduct);
    //    Product.find(
    //      { productFullName: dataProduct.productFullName },
    //      (err, result) => {
    //        if (!result.length) {
    //          dataProduct.save();
    //        } else {
    //          dataProduct.update();
    //        }
    //      }
    //    );
     });
   });
 }

 const dailyDataHarvest = () => {
  mathemHarvester()
 }

 dailyDataHarvest()


//This is the api that finds products in the db, can increase query flexibility by adding fields in the find params.
app.get("/api/mathem/:name",async (req, res) => {
    await Product.find(
      { productFullName: { $regex: `.*${req.params.name}.*`} },
      (err, result) => {
        err ? res.json(err) : res.json(result);
      });
});

//SERVER 
app.listen(PORT, ()=> 
      console.log(`Server is listening at port ${PORT}`))