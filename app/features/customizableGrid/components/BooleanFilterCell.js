import React from 'react';
import {DropDownListFilterCell} from './';

const listItems = [
  {text: '', value: ''},
  {text: 'Selected', value: true},
  {text: 'Not selected', value: false},
];
export default function BooleanFilterCell(props) {
  return (<DropDownListFilterCell options={listItems} {...props} />);
}
