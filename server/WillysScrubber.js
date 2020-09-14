const fetch = require('node-fetch');
const Scrubber = require('./Scrubber');

module.exports = class WillysScrubber extends Scrubber {

  static translateSchema = {
    name: x => x.name,
    brand: x => x.manufacturer,
    imageUrl: x => x.image && x.image.url,
    unitPrice: x => x.priceValue,
    unitVolume: x => { 
      let value = parseFloat(x.displayVolume.replace(/,/, '.'))
      if(value === '' || value === 'NaN'){
        return 'kg'
      }else{
        return value
      }
    },
    unitMeasurement: x => {
      let value = x.displayVolume.replace(/[0-9\.]/g, '')
      if (value === '' || value === 'NaN'){
        return 'kg'
      }else{
        return value
      }
    },
    comparePrice: x => {
      let value = parseFloat(x.comparePrice.replace(/,/, '.'))
      if (value === '' || value === 'NaN'){
        return 0
      }else{
        return value
      }
    },
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