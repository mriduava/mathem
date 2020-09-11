const fetch = require('node-fetch');
const Scrubber = require('./Scrubber');

module.exports = class WillysScrubber extends Scrubber {

  static translateSchema = {
    name: x => x.name,
    brand: x => x.manufacturer,
    imageUrl: x => x.image && x.image.url,
    unitPrice: x => x.priceValue,
    unitVolume: x => parseFloat(x.displayVolume.replace(/,/, '.')),
    unitMeasurement: x => x.displayVolume.replace(/[0-9\.]/g, ''),
    comparePrice: x => parseFloat(x.comparePrice.replace(/,/, '.')),
    compareMeasurement: x => x.comparePriceUnit,
    inStock: x => !x.outOfStock,
    frozen: x => x.labels.includes('frozen'),
    ecological: x => x.labels.includes('ecological'),
    Swedish: x => x.labels.includes('swedish_flag'),
    countryOfOrigin: async x => {
      return 'Sweden'
    }
  }

}