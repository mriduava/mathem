let numArr = [
  3467,
  1501,
  11178,
  1502,
  1504,
  1510,
  1505,
  1448,
  1511,
  1508,
  1515,
  1512,
  1513,
  1506,
  1493,
  11197,
  1503,
  1507,
  1514,
  1509,
  3970,
  2680,
  3473,
];

class FilterManager {
  countingSort = (arr, min, max) => {
    let i = min,
      j = 0,
      len = arr.length,
      count = [];
    for (i; i <= max; i++) {
      count[i] = 0;
    }
    for (i = 0; i < len; i++) {
      count[arr[i]] += 1;
    }
    for (i = min; i <= max; i++) {
      while (count[i] > 0) {
        arr[j] = i;
        j++;
        count[i]--;
      }
    }
    return arr;
  };

  // Return Ecological values
  filterEcological = (arr) => {
    return arr.filter((element) => element.ecological === true);
  };

  // Priorities products with discounts

  // Return products in price range
  filterPriceRange = (arr, min, max) => {
    return arr.filter((element) => min < element.price && element.price < max);
  };

  // Sort by price
}

const filter = new FilterManager();

console.log("test");
