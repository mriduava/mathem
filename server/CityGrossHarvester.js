const fetch = require("node-fetch");
const Product = require("./models/Product");

//TODO: Move to database and use their categories instead
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

module.exports = class Citygross {
  async fetchData(categoryID) {
    let raw = await fetch(
      "https://www.citygross.se/api/v1/esales/products?categoryId=" +
        categoryID +
        "&size=900"
    );
    return (await raw.json()).data;
  }

  async saveCategories(categories) {
    return Promise.all(
      categories.map((category) => this.saveCategoryProducts(category))
    );
  }

  async saveCategoryProducts(categoryProducts) {
    return Promise.all(
      categoryProducts.map((product) => {
        const dbProduct = {
          productName: product.name,
          productFullName: product.name,
          description: {
            productDescription: product.description,
            nutrition:
              product.foodAndBeverageExtension === null
                ? null
                : product.foodAndBeverageExtension.nutrientInformations[0]
                    .nutrientStatement,
            ingridients:
              product.foodAndBeverageExtension === null
                ? null
                : product.foodAndBeverageExtension.ingredientStatement,
            usage: null,
          },
          volume: this.calculateVolume(product),
          image:
            "https://www.citygross.se/images/products/" +
            product.images[0].url +
            "?w=300",
          url: "https://www.citygross.se" + product.url,
          label: product.brand,
          retail: "City gross",
          origin: product.country || "unknown",
          descriptiveSize: product.descriptiveSize,
          price: this.findPrice(product),
          comparePrice: product.defaultPrice.currentPrice.comparisonPrice,
          compareUnit: this.unitLookupTable(product.grossWeight.unitOfMeasure),
          discount: this.findDiscount(product),
          ecologic: this.isEcological(product.markings),
        };

        return Product.replaceOne(
          { productFullName: dbProduct.productFullName },
          dbProduct,
          {
            upsert: true,
          }
        ).exec();
      })
    );
  }

  async getAllProducts() {
    return Promise.all(
      categoryList.map((category) => this.fetchData(category))
    );
  }

  async harvester() {
    const categories = await this.getAllProducts();
    await this.saveCategories(categories);
  }

  isEcological(arr) {
    let b = false;
    if (!Array.isArray(arr)) return b;

    arr.forEach((e) => {
      if (this.hasMarking(e.code) === true) {
        b = true;
      }
    });

    return b;
  }

  hasMarking(type) {
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

  unitLookupTable(type) {
    return {
      0: "g",
      1: "hg",
      2: "kg",
    }[type];
  }

  calculateVolume(product) {
    return product.grossWeight
      ? `${product.grossWeight.value}${this.unitLookupTable(
          product.grossWeight.unitOfMeasure
        )}`
      : undefined;
  }

  findDiscount(product) {
    const memberPrice = product.defaultPrice.memberPrice;
    return product.defaultPrice.hasDiscount
      ? {
          memberPrice: memberPrice === null ? false : memberPrice,
          prePrice: product.defaultPrice.ordinaryPrice.price,
          validFrom: product.defaultPrice.promotions[0].validFrom,
          validTo: product.defaultPrice.promotions[0].validTo,
        }
      : undefined;
  }

  findPrice(product) {
    if (product.defaultPrice.hasPromotion) {
      console.log(product.defaultPrice.promotions[0]);
      const itemQuantity = product.defaultPrice.promotions[0].numberOfItems;
      const pricePerProduct = product.defaultPrice.promotions[0].effectAmount;
      if (itemQuantity > 1) {
        return `${itemQuantity} för ${pricePerProduct}`;
      } else {
        return pricePerProduct;
      }
    } else return product.defaultPrice.currentPrice.price;
  }
};
