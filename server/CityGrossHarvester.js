const fetch = require("node-fetch");
const mongoose = require("mongoose");
const Product = require("./models/mathemProduct");

//Temporary
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

class Citygross {
  async fetchData(categoryID) {
    let raw = await fetch(
      "https://www.citygross.se/api/v1/esales/products?categoryId=" +
        categoryID +
        "&size=900"
    );
    return (await raw.json()).data;
  }

  ///<Summary>
  /// Makes the api data readable to our database
  ///</Summary>
  async saveCategories(categories) {
    const that = this;
    return Promise.all(
      categories.map((category) => that.saveCategoryProducts(category))
    );
  }

  async saveCategoryProducts(categoryProducts) {
    return Promise.all(
      categoryProducts.map((product) => {
        const volume = product.grossWeight
          ? `${product.grossWeight.value}${this.units(
              product.grossWeight.unitOfMeasure
            )}`
          : undefined;

        const p = {
          categoryName: product.superCategory,
          productName: product.name,
          productFullName: product.name,
          volume,
          image:
            "https://www.citygross.se/images/products/" +
            product.images[0].url +
            "?w=300",
          url: "https://www.citygross.se" + product.url,
          label: product.brand,
          retail: "City gross",
          origin: product.country || "unknown",
          descriptiveSize: product.descriptiveSize,
          price: product.defaultPrice.currentPrice.price,
          comparisonPrice: product.defaultPrice.currentPrice.comparisonPrice,

          /// --------------------------------------------

          discount: !product.defaultPrice.hasDiscount
            ? {
                memberPrice: product.defaultPrice.memberPrice,
                prePrice: product.defaultPrice.ordinaryPrice.price,
              }
            : undefined,
          ecologic: this.isEcological(product.markings),
        };

        return Product.replaceOne(
          { productFullName: p.productFullName },
          p,
          {
            upsert: true,
          }
        ).exec();
      })
    );
  }

  async getAllProducts() {
    // Add a request to get categories from the database when implemented.
    return Promise.all(
      categoryList.map((category) => this.fetchData(category))
    );
  }

  async harvester() {
    const categories = await this.getAllProducts();
    await this.saveCategories(categories);
  }

  //Utility functions

  ///<Summary>
  ///Loops through the citygross markings array to search for ecological labels
  ///</Summary >
  isEcological(arr) {
    let b = false;
    if (!Array.isArray(arr)) return b;

    arr.forEach((e) => {
      if (this.isBrand(e.code) === true) {
        b = true;
      }
    });

    return b;
  }

  isBrand(type) {
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

  units(type) {
    return {
      0: "g",
      1: "hg",
      2: "kg",
    }[type];
  }
}

module.exports = Citygross;
