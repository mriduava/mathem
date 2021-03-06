const mathemProduct = require("./models/Product");
const Category = require("./models/Category");
const fetch = require("node-fetch");

class Mathem {

  harvester = () => {
    let categories = this.databaseCategories();
    categories.forEach(async (category) => {
      let dataHarvest = await fetch(
        `https://api.mathem.io/product-search/noauth/search/products/10/categorytag/${category}?size=1000&storeId=10&searchType=category&sortTerm=popular&sortOrder=desc`
      ).then((data) => data.json());
      dataHarvest = dataHarvest.products;
      
      this.scrubber(dataHarvest);
    });
  };

  isLooseWeight(product) {
    if (product.comparisonUnit === 'kg'){
      return true
    }
    return false
  }

  getCat = (mathemCategory) => {
    if(mathemCategory === 'frukt-o-gront'){
      return 'Frukt-och-Gront'
    }else if (mathemCategory === 'mejeri-o-ost'){
      return 'Mejeri-ost-och-agg'
    } else if (mathemCategory === 'brod-o-bageri'){
      return 'Brod-och-Kakor'
    }else if (mathemCategory === 'kott-o-chark'){
      return 'Kott-chark-och-fagel'
    }else if (mathemCategory === 'dryck'){
      return 'Dryck'
    }else if (mathemCategory === 'skafferi'){
      return 'Skafferi'
    }else if (mathemCategory === 'fisk-o-skaldjur'){
      return 'Fisk-och-Skaldjur'
    }else if (mathemCategory === 'hem-o-hygien'){
      return 'Halsa-och-Skonhet'
    }else if (mathemCategory === 'fardigmat-o-halvfabrikat'){
      return 'Fardigmat'
    }else if (mathemCategory === 'glass-godis-o-snacks'){
      return 'Glass-godis-och-snacks'
    }else if (mathemCategory === 'barnmat-o-tillbehor'){
      return 'Barn'
    }else if (mathemCategory === 'apotek-o-halsa'){
      return 'Apotek'
    }else if (mathemCategory === 'smaksattre'){
      return 'Skafferi'
    }else if (mathemCategory === 'djurmat-o-tillbehor'){
      return 'Husdjur'
    }else if (mathemCategory === 'kiosk'){
      return 'Kiosk'
    }else {
      return mathemCategory
    }
  }

  databaseCategories = () => {
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
      let dataCategory = new Category({
        name: category,
        categoryId: null,
        retailName: "Mathem",
      });
      Category.find({ name: category }, (err, result) => {
        if (!result.length) {
          dataCategory.save();
        } else {
          dataCategory.update();
        }
      });
    });
    return categories;
  };

  getProductDescription = async (product) => {
    let descriptionText = product.url.split("/");
    let mathemProduct = await fetch(
      `https://api.mathem.io/product-search/noauth/stores/10/products/detail?url=${descriptionText[2]}/${descriptionText[3]}`
    );
    try {
      mathemProduct = await mathemProduct.json();
      let description = mathemProduct[0].info;
      let descriptionData = {
        productDescription: description.PRODUCT_DESCRIPTION
          ? description.PRODUCT_DESCRIPTION
          : null,
        nutrition: description.NUTRITION_DESCRIPTION
          ? description.NUTRITION_DESCRIPTION
          : null,
        ingredients: description.INGREDIENTS_DESCRIPTION
          ? description.INGREDIENTS_DESCRIPTION
          : null,
        usage: description.USAGE_DESCRIPTION
          ? description.USAGE_DESCRIPTION
          : null,
      };
      return descriptionData;
    } catch {
      return null;
    }
  };

  getLabels = (product) => {
    let labels = "";
    product.badges.forEach((badge) => {
      if (badge.name !== "Ekologisk") {
        labels += badge.name + ", ";
      }
    });
    if (labels === "") {
      labels = "No label";
    }
    return labels;
  };

  scrubber = async (dataHarvest) => {
    dataHarvest.map((product) => {
      this.getProductDescription(product).then((data) => {
        let dataProduct = new mathemProduct({
          productName: product.name,
          productFullName: product.fullName.toLowerCase(),
          description: data,
          volume: `${product.quantity} ${product.unit}`,
          url: product.url,
          image: product.images.MEDIUM,
          retail: "mathem",
          label: this.getLabels(product),
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
          category: this.getCat(product.department.url.toLowerCase()),
          looseWeight: this.isLooseWeight(product)
        });
        mathemProduct.find(
          {
            productFullName: dataProduct.productFullName.toLowerCase(),
          },
          (err, result) => {
            if (!result.length) {
              dataProduct.save();
            } else {
              dataProduct.update();
            }
          }
        );
      }).catch(() => null);
    });
  };
}
module.exports = Mathem;
