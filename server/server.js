const db = "mathem";
const PORT = 3200;
const fetch = require("node-fetch");
const Product = require("./models/Product");
const Category = require("./models/Category");
const DateUpdate = require("./models/DateUpdate");
//Classes here
const Mathem = require("./MathemHarvester");
const Citygross = require("./CityGrossHarvester");
const ShoppingCart = require('./Shopping')
let mathem = new Mathem();
let citygross = new Citygross();
let cart = new ShoppingCart();
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
      WillysHarvester.harvest()

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
        WillysHarvester.harvest()
      }
    }
  });
};

//WillysHarvester.harvest()
dailyDataHarvestCheck()
//Above is mathem harvester and below is willys harvester

//Get all Products from MongoDB
app.get("/api/mathem", async (req, res) => {
  await Product.find({}, (err, result) => {
    err ? res.json(err) : res.json(result);
  });
});

//Updated search Function
app.get("/api/mathem/:search", async (req, res) => {
  var regex = new RegExp(req.params.search, "i");
  await Product
    .find({ $text: { $search: regex } }, (err, result) => {
      return res.send(result);
    })
    .limit(10);
});

//Find Product by ID
app.get("/api/mathems/:id", async (req, res) => {
  await Product.findById(req.params.id, (err, result) => {
    err ? res.json(err) : res.json(result);
  });
});

let debounceID = null;

//This post is for the comparison list and returns possible products from other stores.
app.post("/api/cart/shopping", async (req, res) => {
  let dataPayload = ""
  let compareList = [];
  let cartData = req.body;
      if (debounceID !== null) {
        clearTimeout(debounceID);
        debounceID = null;
      }
      debounceID = setTimeout(() => {
    cartData.map(async (data, i) => {
    let keywords = data.productName.split(" ")
    keywords.map(async (word, j) => {
      await Product.find(
        { productFullName: { $regex: `.*${word}.*` } },
        (err, result) => {
          compareList = compareList.concat(result);
          compareList = compareList.filter(
            (product) => product.retail !== data.retail
          );
          compareList = [...compareList];
          dataPayload = compareList;
        }
      ).limit(5);
      if(i === cartData.length-1 && j === keywords.length-1){
        return res.send(dataPayload)
       }
      })
    })
  }, 250);
});

//SERVER
app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`));
