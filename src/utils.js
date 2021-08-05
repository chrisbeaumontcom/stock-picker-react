export function formatPrice(v) {
  if (v) {
    return '$' + v.toFixed(2);
  }
  return '';
}
export function formatImage(path, origin) {
  if (path) {
    return origin + path;
  }
  return '';
}
export function showQty(v) {
  if (v === 'na') {
    return '';
  }
  if (v === '0') {
    return 'Out of stock*';
  }
  return v;
}
export function showQtyTxt(v) {
  if (v === 'na' || v === '0') {
    return '';
  }
  return 'In stock';
}
export function isQty(v) {
  if (v === 'na' || v === '0') {
    return false;
  }
  return true;
}
export function sortOrder(items, sizes) {
  if (items.length > 0) {
    const getIndex = (val) => {
      return sizes.indexOf(val);
    };
    console.log('Start Sorting');
    items.sort((a, b) => {
      var x = getIndex(a.size);
      var y = getIndex(b.size);
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
    // Sort by colour (alpha)
    items.sort(function (a, b) {
      var x = a.colour.toLowerCase();
      var y = b.colour.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
    // Sort by Style (alpha)
    items.sort(function (a, b) {
      var x = a.style.toLowerCase();
      var y = b.style.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
  }
}
