import React, { useState, useEffect } from 'react';
import { formatPrice } from '../utils.js';

export default function OrderInfo(props) {
  const [lineitems, setLineitems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (props.discountPercentage) {
      countOrder(props.discountPercentage);
    }
    setLineitems(styleItems(props.order, props.style));
  }, [props.order]);

  function styleItems(order, style) {
    return order.filter((el) => {
      if (el.style === style) {
        return true;
      }
    });
  }

  function countOrder(discountPercentage) {
    let count = 0; // all order
    let orderSubtotal = 0;
    let orderTotal = 0;
    let styleSubtotal = 0;
    let styleTotal = 0;
    let styleDiscount = 0;

    props.order.forEach((item) => {
      //Count whole order
      count += item.ordqty;
      //Subtotal for whole order
      orderSubtotal += parseFloat(item.customerPrice) * item.ordqty;
      if (props.style && props.style === item.style) {
        //Sub total for this Style
        styleSubtotal += parseFloat(item.customerPrice) * item.ordqty;
      }
    });

    if (orderSubtotal > 0) {
      orderTotal =
        orderSubtotal - (orderSubtotal * parseFloat(discountPercentage)) / 100;
    }

    if (styleSubtotal > 0) {
      styleDiscount = (styleSubtotal * parseFloat(discountPercentage)) / 100;
      styleTotal = styleSubtotal - styleDiscount;
    }

    setSubtotal(styleSubtotal);
    setDiscount(styleDiscount);
    setTotal(styleTotal);
    props.updateBag(count, orderTotal);
    //console.log('OrderInfo Component countOrder():', count);
  }

  return (
    <table className="page-order">
      <tbody>
        {lineitems.map((item) => (
          <tr key={'list' + item.itemid}>
            <td className="thumb-col">
              <img src={item.img} alt="thumbnail image" />
            </td>
            <td>{item.style}</td>
            <td>{item.colour}</td>
            <td>{item.styletext}</td>
            <td>{item.size}</td>
            <td>{formatPrice(item.customerPrice)}</td>
            <td>
              <input
                name={'ord' + item.itemid}
                value={item.ordqty}
                onChange={(event) =>
                  props.handleChange(event.target, item, item.img)
                }
              />
            </td>
            <td>
              <button
                onClick={() => {
                  props.removeLineItem(item);
                }}
                className="btn del-item"
              >
                &times;
              </button>
            </td>
            <td>{formatPrice(item.customerPrice * item.ordqty)}</td>
          </tr>
        ))}
        {total > 0 && (
          <>
            <tr>
              <td colSpan="8">Sub Total</td>
              <td>{formatPrice(subtotal)}</td>
            </tr>
            {discount > 0 && (
              <tr>
                <td colSpan="8">Discount ({props.discountPercentage}%)</td>
                <td>{formatPrice(discount)}</td>
              </tr>
            )}
            <tr>
              <td colSpan="8">Total</td>
              <td>{props.country + formatPrice(total)}</td>
            </tr>
          </>
        )}
      </tbody>
    </table>
  );
}
