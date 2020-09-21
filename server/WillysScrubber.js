const fetch = require('node-fetch');
const Scrubber = require('./Scrubber');

module.exports = class WillysScrubber extends Scrubber {

  static translateSchema = {
    name: x => x.name,
    brand: x => {
     let value =  x.manufacturer
     if (value === '' || value === 'NaN'){
       return 'Sverige'
     }else {
       return value
     }
    },
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
    },
    url: x => {
      let productName = x.name.replace(/ /g, '-')
      let link = 'https://www.willys.se/produkt/' + productName + '-' + x.code
      return link
    },
    discount: x =>{
      let discountObj = []
      if(x.potentialPromotions.length <= 0){
        discountObj.push('')
        discountObj.push('')
        discountObj.push('')
        discountObj.push('')
        discountObj.push(false)
        return discountObj
      }

      let memberDiscount = false
      discountObj.push(memberDiscount)
      let prePrice = x.priceValue
      discountObj.push(prePrice)
      let discountPrice
      try{
        discountPrice = x.potentialPromotions.price.formattedValue.replace(/ kr/g, '')
      }catch(err){
        discountPrice = 0
      }
      let maxQuantity
      discountObj.push(discountPrice)
      try{
        maxQuantity = x.potentialPromotions.redeemLimitLabel.replace(/Max|köp| /g, '')
      }catch(err){
        maxQuantity = 0
      }
      
      discountObj.push(maxQuantity)
      let applied = x.potentialPromotions.applied
      discountObj.push(applied)
      

      return discountObj
    }
  }

}