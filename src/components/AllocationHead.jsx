import React from 'react';

export default function AllocationHead(props) {
  return (
    <tr>
      <th>{props.col1txt}</th>
      <th>{props.col2txt}</th>
      {props.sizelist.map((size) => (
        <th key={'o' + size}>{size}</th>
      ))}
    </tr>
  );
}
