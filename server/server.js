const db = "mathem";
const PORT = 3200;
const fetch = require("node-fetch");
const Product = require("./models/Product");
const Category = require("./models/Category");
const DateUpdate = require("./models/DateUpdate");
//Classes here
const Mathem = require("./MathemHarvester");
const Citygross = require("./CityGrossHarvester");
const ShoppingCart = require("./Shopping");
let mathem = new Mathem();
let citygross = new Citygross();
let cart = new ShoppingCart();
const WillysHarvester = require("./WillysHarvester");
const { distinct } = require("./models/Product");

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
      WillysHarvester.harvest();
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
        WillysHarvester.harvest();
      }
    }
  });
};


  let dailyHarvestID = null;
  const dailyHarvestInterval = () => {
    dailyDataHarvestCheck()
    const twentyFourHoursInMilliseconds = 86400000
    if (dailyHarvestID !== null) {
      clearInterval(dailyHarvestID);
      dailyHarvestID = null;
    }
    dailyHarvestID = setInterval(() => {
      console.log("in interval fetch");
      dailyDataHarvestCheck();
    }, twentyFourHoursInMilliseconds);
  };

dailyHarvestInterval()

//Updated search Function
app.get("/api/mathem/:search", async (req, res) => {
  var regex = new RegExp(req.params.search, "i");
  const query = {
    $text: { $search: regex },
    price: { $gt: 0, $lt: 999 },
    ...(req.query.ecologic === "true" && { ecologic: true }),
    ...(req.query.discount === "true" && { discount: { $type: "object" } }),
  };
  await Product.find(query, (err, result) => {
    return res.send(result);
  })
    .limit(parseInt(req.query.limit))
    .skip(parseInt(req.query.skip));
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
  let dataPayload = "";
  let compareList = [];
  let mathemList = [];
  let cityGrossList = [];
  let willysList = [];
  let cartData = req.body;
  if (debounceID !== null) {
    clearTimeout(debounceID);
    debounceID = null;
  }
  debounceID = setTimeout(() => {
    cartData.map(async (data, i) => {
      let keywords = data.productName.split(" ");
        await Product.find(
          { productName: { '$regex': `.*${keywords[0]}.*`,'$options' : 'i'}},
          (err, result) => {
            if(result.length > 0){
              console.log(compareList);
              compareList = compareList.concat(result);
              compareList = [...new Set(compareList)];
              mathemList = compareList.filter(
                (product) => product.retail === "mathem"
              );
              mathemList = mathemList.slice(0,5)
              cityGrossList = compareList.filter(
                (product) => product.retail === "cityGross"
              );
              cityGrossList = cityGrossList.slice(0,5)
              willysList = compareList.filter(
                (product) => product.retail === "Willys"
              );
              willysList = willysList.slice(0,5)
              dataPayload = {
                mathem: mathemList,
                cityGross: cityGrossList,
                willys: willysList,
              };
            }
          }
        );
        if (i === cartData.length - 1) {
          return res.send(dataPayload);
        }
    });
  }, 250);
});

//SERVER
app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`));
