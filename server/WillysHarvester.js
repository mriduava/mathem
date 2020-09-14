const fetch = require('node-fetch')
const Product = require('./models/WillysProduct')
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
                  name: scrubbedData[i][j].name,
                  brand: scrubbedData[i][j].brand,
                  volume: scrubbedData[i][j].unitVolume,
                  url: 'ja',
                  image: scrubbedData[i][j].imageUrl,
                  retail: 'Willys',
                  label: scrubbedData[i][j].name,
                  origin: scrubbedData[i][j].countryOfOrigin,
                  ecologic: scrubbedData[i][j].ecological,
                  priceUnit: scrubbedData[i][j].unitMeasurement,
                  price: scrubbedData[i][j].unitPrice,
                  compareUnit: scrubbedData[i][j].compareMeasurement,
                  comparePrice: scrubbedData[i][j].comparePrice,
                  discount: null,
                })
                //console.log(p)
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
                { name : data[i].name.toLowerCase() },
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

        
        console.log('Connected to DB!!!')
        
        try {
         this.uploadCategories(categories)
         this.getData(categories)
        }catch(err){
            console.log(err)
        }

      }

}