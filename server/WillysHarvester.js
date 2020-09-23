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

      static async getData(categories){
        let scrubbedData = []
        for (let i = 0; i < categories.children.length; i++){
          let raw = await this.getProducts(categories.children[i].url)
          let scrubbed = await WillysScrubber.scrubAll(raw)
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
        //console.log(data)
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

        //console.log('Connected to DB!!!')
        
        try {
         this.uploadCategories(categories)
         this.getData(categories)

        }catch(err){
            console.log(err)
        }

      }

}