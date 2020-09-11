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
            return scrubbedData
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
                    console.log(result)
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
         let data = this.getData(categories)
         this.uploadData(data)
        }catch(err){
            console.log(err)
        }

      }

}