const db = "mathem";
const PORT = 3200;
const fetch = require("node-fetch");
const mathemProduct = require("./models/Product");
const Category = require("./models/Category");
const DateUpdate = require("./models/DateUpdate");
//Classes here
const Mathem = require("./MathemHarvester");
const Citygross = require("./CityGrossHarvester");
let mathem = new Mathem();
let citygross = new Citygross();
const WillysProduct = require('./models/WillysProduct')
const WillysHarvester = require('./WillysHarvester')


// /*To connect with MongoDB
//  It will create a db named 'mathem'
// */
const { app } = require("mongoosy")({
  connect: {
    url: "mongodb://localhost/" + db,
  },
});

//Function that checks if today's already been fetched. If not then fetch data/harvest
const dailyDataHarvestCheck = () => {
  let todaysDate = new DateUpdate({ dateUpdated: new Date() });
  DateUpdate.find({}, (err, result) => {
    if (!result.length) {
      todaysDate.save();
      mathem.harvester();
      citygross.harvester();
      //  mathemHarvester();
      // willysHarvester()
    } else {
      const condition =
        todaysDate.dateUpdated.getDate() >
          result[result.length - 1].dateUpdated.getDate() &&
        todaysDate.dateUpdated.getTime() >
          result[result.length - 1].dateUpdated.getTime();
      if (condition) {
        todaysDate.save();
        mathem.harvester();
        citygross.harvester();
        // mathemHarvester();
        // willysHarvester();
      }
    }
  });
};

 //Function that checks if today's already been fetched. If not then fetch data/harvest
 const dailyDataHarvestCheck = () => {
   let todaysDate = new DateUpdate({ dateUpdated: new Date() });
   DateUpdate.find({}, (err, result) => {
     if (!result.length) {
       todaysDate.save();
         mathemHarvester();
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
          // willysHarvester();
       }
     }
   });
 }

//Above is mathem harvester and below is willys harvester

//Get all Products from MongoDB
app.get("/api/mathem", async (req, res) => {
  await mathemProduct.find({}, (err, result) => {
    err ? res.json(err) : res.json(result);
  });
});



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
app.get("/api/mathem/:search", async (req, res) => {
  var regex = new RegExp(req.params.search, "i");
  await mathemProduct
    .find({ $text: { $search: regex } }, (err, result) => {
      return res.send(result);
    })
    .limit(10);
});

app.get("/api/cart/:list", async (req, res) => {
  /*req.params.search*/
});

//Find Product by ID
app.get("/api/mathems/:id", async (req, res) => {
  await mathemProduct.findById(req.params.id, (err, result) => {
    err ? res.json(err) : res.json(result);
  });
});

//SERVER
app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`));
