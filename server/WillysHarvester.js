const fetch = require('node-fetch')
const Product = require('./models/Product')
const WillysScrubber = require('./WillysScrubber')
const Category = require("./models/Category");

module.exports = class WillysHarvester {


    static bustCache() {
        return '?avoidCache=' + (Math.random() + '').split('.')[1]
      }

      static async getCategories() {
        let raw = await fetch('https://www.willys.se/leftMenu/categorytree'
          + this.bustCache())
        return await raw.json()
      }
    
      static async getProducts(categoryURL) {
        let raw = await fetch('https://www.willys.se/c/'
          + categoryURL + this.bustCache() + '&size=10000')
        return (await raw.json()).results
      }

      static isLooseWeight(product) {
        if (product.unitMeasurement === 'kg'){
          return true
        }
        return false
      }

      static async getDataOld(categories){
        let scrubbedData = []
        let productCategories = []
        for (let i = 0; i < categories.children.length; i++){
          let raw = await this.getProducts(categories.children[i].url)
          let scrubbed = await WillysScrubber.scrubAll(raw)
          productCategories.push(categories.children[i].url)
          scrubbedData.push(scrubbed)
        }
        let data = []
        for (let i = 0; i < scrubbedData.length; i++){
          for (let j = 0; j < scrubbedData[i].length; j++){
            let p = new Product({
              productName: scrubbedData[i][j].name,
              productFullName: scrubbedData[i][j].name,
              volume: scrubbedData[i][j].unitVolume,
              url: scrubbedData[i][j].url,
              image: scrubbedData[i][j].imageUrl,
              retail: 'Willys',
              label: scrubbedData[i][j].name,
              origin: scrubbedData[i][j].countryOfOrigin,
              ecologic: scrubbedData[i][j].ecological,
              priceUnit: scrubbedData[i][j].unitMeasurement,
              price: scrubbedData[i][j].unitPrice,
              compareUnit: scrubbedData[i][j].compareMeasurement,
              comparePrice: scrubbedData[i][j].comparePrice,
              discount: {
                memberDiscount: scrubbedData[i][j].discount[0],
                prePrice: scrubbedData[i][j].discount[1],
                discountPrice: scrubbedData[i][j].discount[2],
                maxQuantity: scrubbedData[i][j].discount[3],
                applied: scrubbedData[i][j].discount[4]
              },
              category: productCategories[i],
              looseWeight: this.isLooseWeight(scrubbedData[i][j])
            })
          
          data.push(p)
          }
        }

        this.uploadData(data)
      }

      static async getData(categories) {
        let data = []
        for (let i = 0; i < categories.children.length; i++){
          
          let raw = await this.getProducts(categories.children[i].url)
          let scrubbed = await WillysScrubber.scrubAll(raw)
          for (let j = 0; j < raw.length; j++){
            let p = new Product({
              productName: scrubbed[j].name,
              productFullName: scrubbed[j].name,
              volume: scrubbed[j].unitVolume,
              url: scrubbed[j].url,
              image: scrubbed[j].imageUrl,
              retail: 'Willys',
              label: scrubbed[j].name,
              origin: scrubbed[j].countryOfOrigin,
              ecologic: scrubbed[j].ecological,
              priceUnit: scrubbed[j].unitMeasurement,
              price: scrubbed[j].unitPrice,
              compareUnit: scrubbed[j].compareMeasurement,
              comparePrice: scrubbed[j].comparePrice,
              discount: {
                memberDiscount: scrubbed[j].discount[0],
                prePrice: scrubbed[j].discount[1],
                discountPrice: scrubbed[j].discount[2],
                maxQuantity: scrubbed[j].discount[3],
                applied: scrubbed[j].discount[4]
              },
              category: categories.children[i].url,
              looseWeight: this.isLooseWeight(scrubbed[j])
            })
            data.push(p)
          }
        }
        this.uploadData(data)
      }

      static async uploadCategories(categories){
        categories.children.forEach(async (category) => {
            let dataCategory = new Category({
              name: category.title,
              categoryId: category.id,
              retailName: "Willys",
            });
            Category.find({ name: category.title }, (err, result) => {
              if (!result.length) {
                dataCategory.save();
              } else {
                dataCategory.update();
              }
            });
          });
      }

      static async uploadData(data){
          for (let i = 0; i < data.length; i++){
            Product.find(
                { productFullName : data[i].productFullName.toLowerCase() },
                (err, result) => {
                    if (!result.length){
                        data[i].save()
                    }else{
                        data[i].update()
                    }
                }
            )
        
          }
      }


      static async harvest(){
        let categories = await this.getCategories()

        try {
         await this.uploadCategories(categories)
         await this.getData(categories)
          
        }catch(err){
            console.log(err)
        }

      }

}