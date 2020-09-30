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
          description: this.findDescription(product),
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
          price: product.defaultPrice.currentPrice.price,
          comparePrice: product.defaultPrice.currentPrice.comparisonPrice,
          compareUnit: "kg",
          kgPrice: this.findKgPrice(product),
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
    if (!Array.isArray(arr)) return false;
    return arr.reduce(
      (hasMarking, element) => hasMarking || this.hasMarking(element.code),
      false
    );
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

  convertToKgPrice(product) {
    if (product.grossWeight) return undefined;
    const volume = product.grossWeight.value;
    const unit = this.unitLookupTable(product.grossWeight.unitOfMeasure);
    if (!volume || !unit) return;
    const conversionFactor = {
      g: 1000,
      hg: 10,
      kg: 1,
      st: 1,
    }[unit];
    return (
      (product.defaultPrice.currentPrice.price * conversionFactor) / volume
    );
  }

  calculateVolume(product) {
    if (product.grossWeight)
      return `${product.grossWeight.value}${this.unitLookupTable(
        product.grossWeight.unitOfMeasure
      )}`;
    return undefined;
  }

  findDiscount(product) {
    if (!product.defaultPrice.hasDiscount) return undefined;

    const discount = {
      memberDiscount: product.defaultPrice.hasPromotion,
      prePrice: product.defaultPrice.ordinaryPrice.price,
    };

    const promotion = product.defaultPrice.promotions[0];
    if (promotion) {
      discount.maxQuantity = promotion.amountLimitPerReceipt;

      const itemQuantity = promotion.numberOfItems;
      if (itemQuantity > 1) {
        discount.bulkPrice = `${itemQuantity} för ${promotion.effectAmount}`;
      }
    }

    return discount;
  }

  findDescription(product) {
    const description = {
      productDescription: product.description,
    };

    const productDesc = product.foodAndBeverageExtension;

    if (productDesc) {
      description.ingridients = product.foodAndBeverageExtension =
        productDesc.ingredientStatement;

      if (productDesc.nutrientInformations) {
        description.nutrition =
          productDesc.nutrientInformations[0].nutrientStatement;
      }
    }

    return description;
  }
};
