import React from 'react';

export default function ImageCell(props) {
  return (
    <td className="thumb-col">
      <div>{props.colour}</div>
      <img src={props.img} alt="thumbnail image" />
      <div>{props.pricetxt}</div>
    </td>
  );
}
