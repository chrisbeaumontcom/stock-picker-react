// This component is a table that displays a list of selected
// SKUs for this style page only as well as discount and totals
import React, { useState, useEffect } from 'react';
import { formatPrice } from '../utils.js';

export default function OrderInfo(props) {
  const [lineitems, setLineitems] = useState([]);

  useEffect(() => {
    setLineitems(
      props.order.filter((el) => {
        return el.style === props.style;
      })
    );
    props.updateBag(count);
  }, [props.order]);

  // Count whole order
  const count = props.order.reduce((total, acc) => {
    return total + parseInt(acc.ordqty);
  }, 0);
  // Get sub total for this style only
  const subtotal =
    props.order.reduce((total, acc) => {
      if (acc.style === props.style) {
        return total + parseFloat(acc.customerPrice) * 100 * acc.ordqty;
      }
    }, 0) / 100;
  // Calculate discount
  const discount = (subtotal * parseFloat(props.discountPercentage)) / 100;
  // Total for this style selection
  const total = subtotal - discount;

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
            <td className="money">
              {formatPrice(item.customerPrice * item.ordqty)}
            </td>
          </tr>
        ))}
        {total > 0 && (
          <>
            <tr>
              <td colSpan="8" className="right">
                Sub Total
              </td>
              <td className="money">{formatPrice(subtotal)}</td>
            </tr>
            {discount > 0 && (
              <tr>
                <td colSpan="8" className="right">
                  Discount ({props.discountPercentage}%)
                </td>
                <td className="money">{formatPrice(discount)}</td>
              </tr>
            )}
            <tr>
              <td colSpan="8" className="right">
                Total
              </td>
              <td className="money">{props.country + formatPrice(total)}</td>
            </tr>
          </>
        )}
      </tbody>
    </table>
  );
}
