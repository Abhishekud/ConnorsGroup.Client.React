import React from 'react';
import {DropDownListFilterCell} from './';

const listItems = [
  {text: '', value: ''},
  {text: 'Active', value: true},
  {text: 'Inactive', value: false},
];

export default function ActiveFilterCell(props) {
  return (<DropDownListFilterCell options={listItems} {...props} />);
}
