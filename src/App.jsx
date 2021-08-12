import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableLegend from './components/AllocationLegend';
import SelectCell from './components/AllocationSelectCell';
import OrderCell from './components/AllocationOrderCell';
import ImageCell from './components/AllocationImageCell';
import OrderInfo from './components/OrderInfo';
import { formatPrice, formatImage, sortOrder } from './utils.js';
import './App.css';

const config = {
  urlProduct: 'http://localhost:3001/product/',
  imagePath:
    'https://res.cloudinary.com/web-school/image/upload/w_50,q_auto:best/dev/',
  sessionKey: 'Example-order',
};
//https://res.cloudinary.com/gloweave/image/upload/w_1200,q_auto:best/career/CAREER-Banners-Main_meh3kp.jpg
//https://www.gloweavecareer.com
export default function App() {
  const [msg, setMsg] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [colours, setColours] = useState([]);
  const [product, setProduct] = useState({});
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const docstyle = document.getElementById('root');
    const id =
      docstyle && docstyle.dataset && docstyle.dataset.id
        ? docstyle.dataset.id
        : '0';
    fetchProductData(config.urlProduct + id);
  }, []);

  async function fetchProductData(endpoint) {
    try {
      const response = await axios.get(endpoint);
      if (response && response.data && response.data.success === true) {
        const data = response.data;
        //console.log('Get Product:', data);
        if (data && data.success === true) {
          setColours(data.allocation);
          const newProduct = {
            style: data.style,
            styletext: data.styletext,
            sizelist: data.sizelist.split(' '),
            userid: data.userid,
            accountCode: data.accountCode,
            country: data.country,
            discountPercentage: data.discountPercentage,
            zerowarn: data.zerowarn,
          };
          setProduct(newProduct);
          fetchOrderData();
          setLoaded(true);
        } else {
          throw new Error('Incorrect fetch data problem');
        }
      } else {
        throw new Error('Incorrect fetch response');
      }
    } catch (err) {
      console.log('Get Product Error:', err.message);
    }
  }

  function fetchOrderData() {
    console.log('Getting cart...');
    if (sessionStorage[config.sessionKey]) {
      setOrder(JSON.parse(sessionStorage.getItem(config.sessionKey)));
    }
  }

  function addLineItem(sku) {
    const filterOrder = order.filter((item) => {
      if (sku.itemid !== item.itemid) {
        return item;
      }
    });
    const newSKU = { ...sku, styletext: product.styletext };
    const newOrder = [...filterOrder, newSKU];
    sortOrder(newOrder, product.sizelist);
    setOrder(newOrder);
    saveOrder(newOrder);
  }

  function removeLineItem(sku) {
    const filterOrder = order.filter((item) => {
      if (sku.itemid !== item.itemid) {
        return item;
      }
    });
    setOrder(filterOrder);
    saveOrder(filterOrder);
  }

  function saveOrder(items) {
    //console.log('Add to storage...');
    sessionStorage.setItem(config.sessionKey, JSON.stringify(items));
  }

  function orderVal(v) {
    const result = order.find(({ itemid }) => itemid === v);
    return result ? result.ordqty : '';
  }

  function colourItems(style, colour) {
    return order.filter((el) => {
      if (el.colour === colour && el.style === style) {
        return true;
      }
    });
  }

  const handleChange = (input, item, img) => {
    const valTest = /^-?[0-9]+$/;
    const initQty = '';
    const inputVal = input.value;
    if (inputVal === '' || inputVal === '0') {
      removeLineItem(item);
      input.value = '';
      return;
    }
    if (inputVal != '' && !valTest.test(inputVal)) {
      alert('Warning: not a number.');
      input.value = initQty;
      return;
    }
    if (inputVal != '' && parseInt(inputVal) > parseInt(item.qty)) {
      alert('Warning: too high.');
      input.value = initQty;
      return;
    }
    const skuObj = {
      ...item,
      ordqty: parseInt(input.value),
      qty: parseInt(item.qty),
      img,
      styletext: product.styletext,
    };
    //console.log(input.value, skuObj);
    addLineItem(skuObj);
  };

  function updateBag(count, total) {
    var display = document.getElementById('bagdisplay');
    if (display) {
      if (count > 0) {
        display.innerHTML =
          '<a href="/checkout">My Cart [' +
          count +
          '] items $' +
          total.toFixed(2) +
          '</a>';
      } else {
        display.innerHTML = 'My Cart 0 items';
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h2>Stock Picker for {product.style}</h2>
          <table className="allocation">
            <thead>
              {loaded && (
                <TableLegend
                  col1txt={product.style}
                  col2txt="Order"
                  sizelist={product.sizelist}
                />
              )}
            </thead>
            <tbody>
              {loaded &&
                colours.map((colour) => (
                  <tr key={'colour' + colour.colour}>
                    <ImageCell
                      colour={colour.colour}
                      img={formatImage(colour.thumb, config.imagePath)}
                      pricetxt={product.country + formatPrice(colour.price)}
                    />
                    <OrderCell
                      removeLineItem={removeLineItem}
                      lineitems={colourItems(product.style, colour.colour)}
                    />
                    {colour.sizes.map((size) => (
                      <SelectCell
                        size={size}
                        handleChange={handleChange}
                        orderVal={orderVal}
                        key={size.itemid}
                        img={formatImage(colour.thumb, config.imagePath)}
                      />
                    ))}
                  </tr>
                ))}
            </tbody>
            <tfoot>
              {loaded && (
                <TableLegend
                  col1txt=""
                  col2txt=""
                  sizelist={product.sizelist}
                />
              )}
            </tfoot>
          </table>

          <hr />

          <OrderInfo
            style={product.style}
            order={order}
            country={product.country}
            discountPercentage={product.discountPercentage}
            removeLineItem={removeLineItem}
            handleChange={handleChange}
            updateBag={updateBag}
          />
        </div>
      </header>
    </div>
  );
}
