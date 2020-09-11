const mathemProduct = require("./models/mathemProduct");
const Category = require("./models/Category");

const mathem = class {
    mathemHarvester = () => {
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
    let dataHarvest = await fetch(
      `https://api.mathem.io/product-search/noauth/search/products/10/categorytag/${category}?size=1000&storeId=10&searchType=category&sortTerm=popular&sortOrder=desc`
    ).then((data) => data.json());
    dataHarvest = dataHarvest.products;
    dataHarvest.map((product) => {
      let getLabels = () => {
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
};

}
//Mathem's harvester and scrubber
