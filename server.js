const db = 'mathem';
const PORT = 3200
const fetch = require("node-fetch");
const mathemProduct = require("./models/mathemProduct");
const Category = require("./models/Category");
const DateUpdate = require("./models/DateUpdate")
const WillysProduct = require('./models/WillysProduct')
const WillysHarvester = require('./WillysHarvester')


// /*To connect with MongoDB
//  It will create a db named 'mathem'
// */
 const { app } = require('mongoosy')({
   connect: {
     url: 'mongodb://localhost/' + db
   }
 });

//Mathem's harvester and scrubber
 const mathemHarvester = () => {
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
     let dataCategory = new Category({ name: category, categoryId: null, retailName: 'Mathem' });
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
       let getLabels = () => {
         let labels = '';
            product.badges.forEach((badge) => {
              if(badge.name !== "Ekologisk"){
                labels += badge.name + ", "    
              }
               })
               if(labels === ''){
                 labels = "No label"
               }
             return labels
       }
       let dataProduct = new mathemProduct({
         productName: product.name,
         productFullName: product.fullName.toLowerCase(),
         volume: `${product.quantity} ${product.unit}`,
         url: product.url,
         image: product.images.MEDIUM,
         retail: "mathem",
         label: getLabels(),
         origin: product.origin ? product.origin.name : "Not specified",
         ecologic:
           product.badges.length >= 1
             ? product.badges.forEach((badge) => {
                 return badge.name === "Ekologisk" ? true : false;
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
       mathemProduct.find(
         { productFullName: dataProduct.productFullName.toLowerCase() },
         (err, result) => {
           if (!result.length) {
             dataProduct.save();
           } else {
             dataProduct.update();
           }
         }
       );
      });
    });
  }

 //Function that checks if today's already been fetched. If not then fetch data/harvest
 const dailyDataHarvestCheck = () => {
   let todaysDate = new DateUpdate({ dateUpdated: new Date() });
   DateUpdate.find({}, (err, result) => {
     if (!result.length) {
       todaysDate.save();
         mathemHarvester();
        // willys.harvest()
        // willysHarvester()
        
     } else {
       const condition =
         todaysDate.dateUpdated.getDate() >
           result[result.length - 1].dateUpdated.getDate() &&
         todaysDate.dateUpdated.getTime() >
           result[result.length - 1].dateUpdated.getTime();
       if (condition) {
         todaysDate.save();
        // willys.harvest()
          mathemHarvester();
        //  willysHarvester();
       }
     }
   });
 }

 dailyDataHarvestCheck()
 WillysHarvester.harvest()

 //Above is mathem harvester and below is willys harvester

//Get all Products from MongoDB
app.get("/api/mathem", async(req, res)=>{
  await mathemProduct.find({}, (err, result)=>{
    err? res.json(err): res.json(result);
  })
})



 app.get('*api/willys', async(req, res) => {
   await WillysProduct.find({}, (err, result) => {
     err? res.json(err): res.json(result)
   })
 })

 app.get('/api/willys/:search', async (req,res)=>{
  var regex = new RegExp(req.params.search, 'i')
  await WillysProduct.find(
    {$text: {$search: regex}},
    (err, result)=>{
      return res.send(result)
  }).limit(10)
});

app.get("/api/willys/:id", async (req, res) => {
  await WillysProduct.findById(req.params.id, (err, result) => {
      err ? res.json(err) : res.json(result)
    }
  )
})

//Updated search Function
app.get('/api/mathem/:search', async (req,res)=>{
    var regex = new RegExp(req.params.search, 'i'); 
    await mathemProduct.find(
      {$text: {$search: regex}},
      (err, result)=>{
        return res.send(result);
    }).limit(10);
});


//Find Product by ID
app.get("/api/mathems/:id", async (req, res) => {
    await mathemProduct.findById(req.params.id, (err, result) => {
        err ? res.json(err) : res.json(result);
      }
    );
});

//SERVER 
app.listen(PORT, ()=> 
      console.log(`Server is listening at port ${PORT}`))