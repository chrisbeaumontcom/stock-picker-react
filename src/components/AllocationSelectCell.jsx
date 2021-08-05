import React from 'react';
import { showQty, showQtyTxt, isQty } from '../utils.js';

export default function SelectCell(props) {
  const size = props.size;
  return (
    <td key={size.itemid} title={'size: ' + size.size} className="stock-data">
      {isQty(size.qty) && (
        <input
          name={size.itemid}
          onChange={(event) =>
            props.handleChange(event.target, size, props.img)
          }
          value={props.orderVal(size.itemid)}
        />
      )}
      <div>{showQty(size.qty)}</div>
      <div className="no-wrap">{showQtyTxt(size.qty)}</div>
    </td>
  );
}
