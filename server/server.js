const db = "matpris";
const PORT = 3200;
const fetch = require("node-fetch");
const Product = require("./models/Product");
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
  DateUpdate.find({}, async (err, result) => {
    if (!result.length) {
      todaysDate.save();
      mathem.harvester();
      await citygross.harvester();
      await WillysHarvester.harvest();
    } else {
      const condition =
        todaysDate.dateUpdated.getDate() >
          result[result.length - 1].dateUpdated.getDate() &&
        todaysDate.dateUpdated.getTime() >
          result[result.length - 1].dateUpdated.getTime();
      if (condition) {
        todaysDate.save();
        mathem.harvester();
        await citygross.harvester();
        await WillysHarvester.harvest();
      }
    }
  });
};
let dailyHarvestID = null;
const dailyHarvestInterval = () => {
  dailyDataHarvestCheck();
  const twentyFourHoursInMilliseconds = 86400000;
  if (dailyHarvestID !== null) {
    clearInterval(dailyHarvestID);
    dailyHarvestID = null;
  }
  dailyHarvestID = setInterval(() => {
    dailyDataHarvestCheck();
  }, twentyFourHoursInMilliseconds);
};

dailyHarvestInterval();

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

const filterList = (category, store, allProducts, keywords) => {
  let filteredProducts = allProducts.filter(
    (product) =>
      product.retail === store &&
      //product.productName.includes(keywords[0]) &&
      product.category === category
  );

  let highestAmountOfWordsMatched = 0;

  let productMatch;

  filteredProducts.forEach((product) => {
    let wordMatches = 0;
    keywords.forEach((word) => {
      if (product.productName.toLowerCase().includes(word.toLowerCase())) {
        wordMatches++;
        if (wordMatches > highestAmountOfWordsMatched) {
          highestAmountOfWordsMatched = wordMatches;
          productMatch = product;
        }
      }
    });
  });
  return productMatch;
};

let debounceID = null;

function addToList(retailor, cartItem, retailorList, products, keywords) {
  if (cartItem.retail === retailor) {
    retailorList.push(cartItem);
  } else {
    retailorList.push(
      filterList(cartItem.category, retailor, products, keywords)
    );
  }
}
//This post is for the comparison list and returns possible products from other stores.
app.post("/api/cart/shopping", async (req, res) => {
  if (debounceID !== null) {
    clearTimeout(debounceID);
    debounceID = null;
  }
  debounceID = setTimeout(async () => {
    const cartData = req.body;

    const mathemList = [];
    const cityGrossList = [];
    const willysList = [];

    await Promise.all(
      cartData.map(async (cartItem, i) => {
        const keywords = cartItem.productName.split(" ");
        const products = await Product.find({
          productName: { $regex: `.*${keywords[0]}.*`, $options: "i" },
        });

        if (products.length) {
          addToList("mathem", cartItem, mathemList, products, keywords);
          addToList("cityGross", cartItem, cityGrossList, products, keywords);
          addToList("Willys", cartItem, willysList, products, keywords);
        }
      })
    );

    if (mathemList.length || cityGrossList.length || willysList.length) {
      res.send({
        mathem: mathemList,
        cityGross: cityGrossList,
        willys: willysList,
      });
    } else {
      res.send("");
    }
  }, 100);
});

//SERVER
app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`));
