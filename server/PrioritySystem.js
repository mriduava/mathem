module.exports = class FilterManager {
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

  // Sort by price
};
