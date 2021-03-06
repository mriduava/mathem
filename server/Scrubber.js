module.exports = class Scrubber {

    // Method that scrubs a product 
    // based on the translateSchema in our subClass
    static async scrubOne(product) {
      let scrubbed = {};
      let tschema = this.translateSchema;
      for (let key in tschema) {
        let scrubFunc = tschema[key];
        scrubbed[key] = await scrubFunc(product);
      }
      return scrubbed;
    }
  
    // Scrub a whole array of products
    static async scrubAll(products) {
      let scrubbed = [];
      for (let product of products) {
        scrubbed.push(await this.scrubOne(product));
      }
      return scrubbed;
    }
  
  }