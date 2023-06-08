import React from 'react';
import {DropDownListFilterCell} from './';

const listItems = [
  {text: '', value: ''},
  {text: 'Fixed', value: true},
  {text: 'Variable', value: false},
];
export default function FixedVariableFilterCell(props) {
  return (<DropDownListFilterCell options={listItems} {...props} />);
}
