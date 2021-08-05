var order = JSON.parse(`[
  {
  "sku": "631891",
  "itemid": "sku631891",
  "style": "1637L",
  "styleid": 26,
  "colour": "SKY",
  "colourcode": "SKY",
  "size": "39",
  "qty": 53,
  "ordqty": 1,
  "sizeseq": 3,
  "price": 39,
  "customerPrice": 39
  },
  {
  "sku": "654699",
  "itemid": "sku654699",
  "style": "1637L",
  "styleid": 26,
  "colour": "NAVY",
  "colourcode": "NVY",
  "size": "37",
  "qty": 47,
  "ordqty": 1,
  "sizeseq": 1,
  "price": 39,
  "customerPrice": 39
}

]`);
const sizes = [
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '46',
  '47',
  '49',
  '50',
  '52',
  '54',
  '56',
  '58',
  '60',
];

const getIndex = (val) => {
  return sizes.indexOf(val);
};
//Sort by size (match array index: fn 'check')
const sizeSort = order.sort((a, b) => {
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
console.log('Size Sort', sizeSort);
