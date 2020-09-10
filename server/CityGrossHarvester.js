const fetch = require("node-fetch");

let categoryList = [
  3467,
  1501,
  11178,
  1502,
  1504,
  1510,
  1505,
  1448,
  1511,
  1508,
  1515,
  1512,
  1513,
  1506,
  1493,
  11197,
  1503,
  1507,
  1514,
  1509,
  3970,
  2680,
  3473,
];

let data = [];

function units(type) {
  return {
    0: "g",
    1: "hg",
    2: "kg",
  }[type];
}

function isBrand(type) {
  return {
    SVANEN: true,
    ECOCERT_COSMOS_ORGANIC: true,
    FAIR_TRADE_MARK: true,
    EU_ORGANIC_FARMING: true,
    RAINFOREST_ALLIANCE: true,
    UTZ_CERTIFIED: true,
    KRAV_MARK: true,
  }[type];
}

function isEcological(arr) {
  let b = false;
  if (!Array.isArray(arr)) return b;

  arr.forEach((e) => {
    if (isBrand(e.code) === true) {
      b = true;
    }
  });

  return b;
}

async function FetchData(categoryID) {
  let raw = await fetch(
    "https://www.citygross.se/api/v1/esales/products?categoryId=" +
      categoryID +
      "&size=900"
  );
  return (await raw.json()).data;
}

async function Scrubber() {
  products = [];
  data[0].map((item) => {
    let product = {
      productName: item.name,
      productFullName: item.name,
      volume: `${item.grossWeight.value}${units(
        item.grossWeight.unitOfMeasure
      )}`,
      url:
        "https://www.citygross.se/images/products/" +
        item.images[0].url +
        "?w=300",
      label: item.brand,
      orgin: item.country,
      retail: "City gross",
      descriptiveSize: item.descriptiveSize,
      price: item.defaultPrice.currentPrice.price,
      comparisonPrice: item.defaultPrice.currentPrice.comparisonPrice,

        /// --------------------------------------------

      discount: !item.defaultPrice.hasDiscount
        ? {
            memberPrice: item.defaultPrice.memberPrice,
            prePrice: item.defaultPrice.ordinaryPrice.price,
          }
        : undefined,
      ecological: isEcological(item.markings),
    };
    products.push(product);
  });
}

async function GetAllProducts() {
  // Add a request to get categories from the database when implemented.
  // for (let i = 0; i < categoryList.length; i++) {
  //   data.push(await FetchData(categoryList[i]));
  // }
  data.push(await FetchData(categoryList[7]));
}

GetAllProducts().then(() => {
  Scrubber();
  console.log(products);
});

function UploadToDB() {}
