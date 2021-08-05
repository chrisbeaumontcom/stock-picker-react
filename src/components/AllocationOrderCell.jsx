import React from 'react';

export default function OrderCell(props) {
  return (
    <td className="order-list">
      {props.lineitems.map((item) => (
        <div key={'k' + item.itemid} className="no-wrap">
          Size {item.size}: {item.ordqty}
          <button
            onClick={() => {
              props.removeLineItem(item);
            }}
            className="btn del-item"
          >
            &times;
          </button>
        </div>
      ))}
    </td>
  );
}
